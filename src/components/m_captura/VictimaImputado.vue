  <template>  
<v-layout align-start>
    <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a>
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'mcaptura'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>  
            
          
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                    Carpetas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-registro'== '#' ? '' :  'mcaptura-registro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-listacarpetas'== '#' ? '' :  'mcaptura-listacarpetas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">view_list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Lista de carpetas asignadas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Seguimiento a carpeta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-informaciongeneral'== '#' ? '' :  'mcaptura-informaciongeneral'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Información general.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-victimaimputado'== '#' ? '' :  'mcaptura-victimaimputado'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Víctima(s) directa, indirecta, testigo y/o imputado.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-delito'== '#' ? '' :  'mcaptura-delito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Delito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-vehiculo'== '#' ? '' :  'mcaptura-vehiculo'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">commute</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Vehiculo
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esFacilitador" :to="{ name: 'mcaptura-justiciarestaurativa'== '#' ? '' :  'mcaptura-justiciarestaurativa'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Justicia restaurativa
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidasproteccion'== '#' ? '' :  'mcaptura-medidasproteccion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas de protección
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidascautelares'== '#' ? '' :  'mcaptura-medidascautelares'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">label</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas cautelares
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-resolucion'== '#' ? '' :  'mcaptura-resolucion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">verified_user</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Resolución
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>
        
        </v-list>
      </v-navigation-drawer>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
        <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Víctima(s) directa, indirecta, testigo y/o imputado.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                     <v-flex xs12 sm6 md3>
                      
                        <v-text-field class="font-weight-regular"
                            v-model="nuc" disabled  prepend-icon="folder"
                            filled
                        ></v-text-field>
                       </v-flex>
                         <v-btn class="mx-2" @click="cerrarcarpeta" fab dark small color="primary">
                            <v-icon dark>close</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn> 
            
                    
         </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="raps"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    
                    <td class="justify-center layout px-0">
                        <div v-if="props.item.inicioDetenido">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        >
                                        recent_actors
                                    </v-icon>                                                                 
                                </template>
                                <span>Esta persona fue detenida.</span>
                            </v-tooltip> 
                        </div>
                    </td>
                    <td>{{ props.item.clasificacionPersona }}</td> 
                    <td>{{ props.item.tipoPersona }}</td> 
                    <td>{{ props.item.curp }}</td> 
                    <td>{{ props.item.nombre + ' ' + props.item.apellidoPaterno + ' ' + props.item.apellidoMaterno}}</td>   
                    <td>{{ props.item.correo}}</td>
                    <td>{{ props.item.telefono1 }}</td>                    
                    <td class="justify-center layout">

                        <div  class="justify-center layout" v-if="props.item.inicioDetenido">
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="infoadicionalpdetenida(props.item)"
                                        >
                                        queue
                                    </v-icon>                                                                 
                                </template>
                                <span>Agregar información adicional de persona detenida.</span>
                            </v-tooltip> 
                        </div>

                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" 
                                    @click="actualizarclasi(props.item)"
                                    >
                                    update
                                </v-icon>                                                                 
                            </template>
                            <span>Actualizar clasificación de persona</span>
                        </v-tooltip> 

                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" color="warning" 
                                    @click="infoItem(props.item)"
                                    >
                                    info
                                </v-icon>
                            
                                
                            </template>
                            <span>Información detallada de la persona</span>
                        </v-tooltip>   
                        
                    
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }"> 
                            
                                <v-icon 
                                    class="mr-2" v-on="on"
                                    @click="editItem(props.item)"
                                    >
                                    edit
                                </v-icon>
                            </template>
                            <span>Actualizar información</span>
                        </v-tooltip>                       

                    </td> 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listarrap">Resetear</v-btn>
                </template>
        </v-data-table>
          
        
        <v-dialog   v-model="modalAdd"  fullscreen hide-overlay transition="dialog-bottom-transition">  
            <v-card>
                <v-toolbar dark color="primary">
                   
                    <v-avatar  size="30">
                        <v-icon >{{ formIcon }}</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click.native="guardar">
                          GUARDAR INFORMACION</v-btn>
                         <v-btn icon   @click="modalclose()">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
     
                <v-stepper v-model="step" non-linear vertical>
                    <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('tipo de persona') && !errors.has('nombre') && !errors.has('apellido paterno') ]">
                        Captura de datos
                        <small>Datos generales de la vícima u ofendido.</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                            <v-container grid-list-md >
                                <v-layout row wrap> 
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 > 

                                        <v-radio-group v-model="radios" v-if="switch2==false" row :mandatory="false">
                                            <v-radio label="Fisica" @change="ocultarTP" color="success" value="Fisica"></v-radio>
                                            <v-radio label="Moral" @change="mostrarTP" color="success" value="Moral"></v-radio> 
                                        </v-radio-group>
                                        
                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                            
                                        <v-text-field 
                                            name="rfc" 
                                            label="*RFC:" 
                                            v-model="rfc"   
                                            v-validate="'required'"
                                            v-if="verTP==1"
                                            :error-messages="errors.collect('rfc')">                                                       
                                        </v-text-field>

                                        <v-text-field 
                                            name="razón social"   
                                            label="*Razón social:" 
                                            v-model="razonsocial"   
                                            v-validate="'required'"
                                            v-if="verTP==1"
                                            :error-messages="errors.collect('razón social')">                                                   
                                        </v-text-field>

                                        <v-autocomplete 
                                            name="clasificacion de persona"
                                            :items="clasificacionpersonas"
                                            v-model="clasificacionpersona" 
                                            v-validate="'required'"
                                            v-if="switch2==false"
                                            label="*Clasificación de persona:"
                                            :error-messages="errors.collect('clasificacion de persona')">
                                        </v-autocomplete>
                                    
                                        <v-text-field 
                                            name="nombre" 
                                            label="*Nombre(s):" 
                                            v-model="nombres"   
                                            v-validate="'required'"
                                            v-if="switch2==false && radios == 'Fisica'"
                                            :error-messages="errors.collect('nombre')">                                  
                                        </v-text-field>

                                        <v-text-field 
                                            name="apellido paterno" 
                                            label="*Apellido paterno:" 
                                            v-model="apaterno" 
                                            v-validate="'required'"
                                            v-if="switch2==false"
                                            :error-messages="errors.collect('apellido paterno')">                                   
                                        </v-text-field>

                                        <v-text-field 
                                            name="apellido materno" 
                                            label="Apellido materno:" 
                                            v-model="amaterno" 
                                            v-if="switch2==false" >                                   
                                        </v-text-field>

                                        <v-text-field 
                                            name="fecha de nacimiento" 
                                            label="Fecha de nacimiento:" 
                                            v-model="fnacimiento" 
                                            v-validate="'date_format:dd/MM/yyyy'"
                                            :error-messages="errors.collect('fecha de nacimiento')">                       
                                        </v-text-field>

                                        <v-switch
                                            color="success"
                                            v-if="clasificacionpersona == 'Imputado'"
                                            v-model="detenciondetenido"
                                            :label="`El detenido fue capturado al momento de la creación de la carpeta ? : ${detenciondetenido ? 'Si' : 'No'}`"
                                        ></v-switch> 

                                        <v-autocomplete 
                                            name="la detención cumple requisitos de ley?"
                                            :items="opcionesinfoadicional"
                                            v-model="cumplerequisitosley" 
                                            v-if="detenciondetenido && (clasificacionpersona == 'Imputado')"
                                            label="La detención cumple requisitos de ley?">
                                        </v-autocomplete>     

                                        <v-autocomplete 
                                            name="documento que acredita su personalidad"
                                            :items="documentoacreditas"
                                            v-model="documentoacredita" 
                                            v-if="switch2==false && radios == 'Moral'"
                                            label="Documento que acredita su personalidad:"
                                            :error-messages="errors.collect('documento que acredita su personalidad')">
                                        </v-autocomplete>

                                        <v-switch v-if="clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta'  " v-model="relacion"  :label="'La victima tiene relación con el imputado?'"  color="success"  hide-details></v-switch> 
                            
                                        <v-autocomplete
                                            :items="relacionados"
                                            v-model="relacionado"
                                            label="Relación:" 
                                            v-if="(clasificacionpersona == 'Victima directa' || clasificacionpersona == 'Victima indirecta') && relacion ">
                                        </v-autocomplete>
                                        
                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >   
                                        
                                        <v-text-field
                                            name="edad"
                                            v-model="edadf"
                                            label="Edad:" >
                                        </v-text-field>

                                        <v-autocomplete
                                            name="sexo"
                                            :items="sexos"
                                            v-model="sexo"
                                            label="Sexo:" 
                                            v-if="switch2==false">
                                        </v-autocomplete>

                                        <v-autocomplete
                                            name="entidad federativa"
                                            :items="estados"
                                            v-model="abreviacion"
                                            label="Entidad federativa de nacimiento:" 
                                            return-object  
                                            v-if="switch2==false"  >
                                        </v-autocomplete> 
                                        
                                        <v-autocomplete 
                                            name="documento de identificación"
                                            :items="docsidentificaciones"
                                            v-model="docidentificacion"
                                            label="Documento de identificación:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>
                                    
                                        <v-text-field name="curp" v-model="curp"   label="CURP:" ></v-text-field> 

                                        <v-autocomplete 
                                            name="se decreto libertad durante la investigación?"
                                            :items="opcionesinfoadicional"
                                            v-model="decretolibertad" 
                                            v-if="cumplerequisitosley == 'Si'"
                                            label="Se decreto libertad durante la investigación?">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            name="se dispuso su libertad?"
                                            :items="opcionesinfoadicional"
                                            v-model="dispusolibertad" 
                                            v-if="cumplerequisitosley == 'No'"
                                            label="Se dispuso su libertad?">
                                        </v-autocomplete>

                                        <v-text-field 
                                            name="nombre del apoderado o representante" 
                                            label="*Nombre del apoderado o representante" 
                                            v-model="nombres"   
                                            v-validate="'required'"
                                            v-if="switch2==false && radios == 'Moral'"
                                            :error-messages="errors.collect('nombre del apoderado o representante')">                                  
                                        </v-text-field>
                                                                                                                                
                                    </v-flex>                   
                                </v-layout>
                                
                                <div class="text-xs-right">
                                    <v-btn color="primary"  @click.native="step = 2">Continuar</v-btn>
                                </div>
                            </v-container> 
                                
                        </v-card>

                        
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 2" step="2"   editable >
                        Información complementaria
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                            <v-container grid-list-md >
                                <v-layout row wrap> 
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 

                                        <v-text-field label="Teléfono:" v-if="switch2==false" v-model="telefono1"></v-text-field>

                                        <v-text-field label="Correo electrónico:" v-if="switch2==false" v-model="correo"></v-text-field>

                                        <v-autocomplete 
                                            name="nacionalidad"
                                            :items="nacionalidades"
                                            v-model="nacionalidad" 
                                            label="Nacionalidad:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="estado familiar"
                                            :items="estadosciviles"
                                            v-model="estadocivil" 
                                            label="Estado familiar:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="género"
                                            :items="generos"
                                            v-model="genero" 
                                            label="Género:"
                                        ></v-autocomplete>

                                    </v-flex> 
                                    
                                    
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >  
                                        
                                        <v-autocomplete 
                                            name="ocupación"
                                            :items="ocupaciones"
                                            v-model="ocupacion" 
                                            label="Ocupación:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="nivel de estudios"
                                            :items="nivelestudios"
                                            v-model="nivelestudio" 
                                            label="Nivel de estudios:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="lengua"
                                            :items="lenguas"
                                            v-model="lengua" 
                                            label="Lengua:"
                                            v-if="switch2==false" 
                                        ></v-autocomplete>

                                        <v-autocomplete 
                                            name="religión"
                                            :items="religiones"
                                            v-model="religion" 
                                            label="Religión:"
                                            v-if="switch2==false"
                                        ></v-autocomplete>                                
                                        
                                    </v-flex>
                                </v-layout>
                                <div class="text-xs-right">
                                    <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                    <v-btn color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click.native="step = 3">Continuar</v-btn>
                                </div>
                            </v-container>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 3"  step="3"  editable :rules="[]">
                        Dirección personal
                    </v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                            <v-container grid-list-md >
                                <v-layout row wrap> 
                                    
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                                        
                                        <v-text-field 
                                            label="Calle:" 
                                            name="calle" 
                                            v-model="calle" 
                                            v-if="switch2==false"
                                            :error-messages="errors.collect('calle')">
                                        </v-text-field>

                                        <v-text-field 
                                            name="numero exterior" 
                                            label="No. exterior:" 
                                            v-model="noExt" 
                                            v-if="switch2==false"
                                            :error-messages="errors.collect('numero exterior')">                                
                                        </v-text-field> 

                                        <v-text-field label="No. Interior:" v-if="switch2==false"  v-model="noInt"></v-text-field>    

                                        <v-text-field 
                                            label="Pais:" 
                                            name="pais" 
                                            v-model="pais" 
                                            v-if="switch2==false"
                                            value="México">
                                        </v-text-field> 

                                    </v-flex>  
                                    
                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >                                   

                                        <v-autocomplete 
                                            label="Estado:" 
                                            name="estado"     
                                            v-model="estadoid"
                                            :items="ciudades"  
                                            v-if="switch2==false"
                                            return-object
                                            v-on:change="listarPorEstado"  > 
                                        </v-autocomplete>
                                    
                                        <v-autocomplete 
                                            label="Municipio:" 
                                            name="municipio" 
                                            v-model="municipioid" 
                                            :items="municipios"
                                            v-if="switch2==false"
                                            return-object  
                                            v-on:change="listarPorMunicipio">
                                        </v-autocomplete>

                                        <v-autocomplete 
                                            label="Localidad:" 
                                            name="localidad" 
                                            v-model="localidadid" 
                                            :items="localidades" 
                                            v-if="switch2==false"
                                            return-object
                                            v-on:change="listarPorLocalidad">
                                        </v-autocomplete>

                                        <v-text-field 
                                            label="Código postal" 
                                            name="Cp" 
                                            v-model="cp" 
                                            disabled
                                            value="Cp">
                                        </v-text-field> 

                                    </v-flex> 
                            
                                </v-layout>

                                <div class="text-xs-right">
                                    <v-btn flat @click.native="step = 2">Anterior</v-btn>                                  
                                </div> 
                            </v-container>
                        
                        </v-card> 
                        
                    </v-stepper-content>                  
                </v-stepper> 
            </v-card> 

        </v-dialog>

        
         <v-dialog v-model="modalduplicidad" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Información  general de los registros que ha tenido la persona.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
              
                  <v-btn icon   @click="cerrarModalDuplicidad()">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
                <v-card-text>
                    <v-data-table
                        :headers="headersDuplicidad"
                        :items="hechos"
                        :search="search"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        >
                        <template slot="items" class="white" slot-scope="props">
                        <td>{{ props.item.registradoPor }}</td>
                        <td>{{ props.item.distritoInicial }}</td>
                        <td>{{ props.item.dirSubProcuInicial}}</td>   
                        <td>{{ props.item.agenciaInicial}}</td>
                        <td>{{ props.item.fechaHoraRegistro }}</td>
                        <td>{{ props.item.clasificacionPersona }}</td>
                        <td>{{ props.item.rac }}</td>
                        <td>{{ props.item.nuc }}</td>  
                         
                        </template>
                        <template slot="no-data">
                        <v-btn color="primary">Resetear</v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogoactualizar"  max-width="1000px" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>                  
                    <v-toolbar-title class="subheading">Actualizar clasificacion de {{nombrep}}</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout wrap>

                                    <v-autocomplete 
                                        name="clasificacion de persona"
                                        :items="clasificacionpersonas"
                                        v-model="clasificacionpersona" 
                                        return-object
                                        label="Clasificación de persona:">
                                    </v-autocomplete>

                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogoactualizar=false" >Cerrar</v-btn>    
                            <v-btn color="success"  @click.native="actualizarclasiapi" >Guardar</v-btn>                                 
                        </v-card-actions> 
                    </v-form>              
                </v-card-text> 
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogoinformacionadicional"  max-width="1000px" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">queue</v-icon>
                    </v-avatar>                  
                    <v-toolbar-title class="subheading">Actualizar/agregar información adicional de persona detenida {{nombrep}}</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md12 lg12 > 

                                    <v-autocomplete 
                                        name="la detención cumple requisitos de ley?"
                                        :items="opcionesinfoadicional"
                                        v-model="cumplerequisitosley" 
                                        label="La detención cumple requisitos de ley?">
                                    </v-autocomplete>

                                    <v-autocomplete 
                                        name="se decreto libertad durante la investigación?"
                                        :items="opcionesinfoadicional"
                                        v-model="decretolibertad" 
                                        v-if="cumplerequisitosley == 'Si'"
                                        label="Se decreto libertad durante la investigación?">
                                    </v-autocomplete>

                                    <v-autocomplete 
                                        name="se dispuso su libertad?"
                                        :items="opcionesinfoadicional"
                                        v-model="dispusolibertad" 
                                        v-if="cumplerequisitosley == 'No'"
                                        label="Se dispuso su libertad?">
                                    </v-autocomplete>

                                </v-flex>


                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogoinformacionadicional=false" >Cerrar</v-btn>    
                            <v-btn color="success"  @click ="actualizarinfoadicional()" >Guardar</v-btn>                                 
                        </v-card-actions> 
                    </v-form>              
                </v-card-text> 
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogoinformacion"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer> 
                    <v-btn @click.native="dialogoinformacion=false" >Cerrar</v-btn>                  
                </v-toolbar>
                <v-card-text>
                    <v-stepper elevation-0 v-model="step" non-linear vertical> 
                        <v-stepper-step :complete="step > 1" editable step="1"   >
                            Datos de la persona.
                        </v-stepper-step>
                        <v-stepper-content step="1">
                            <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout wrap>
                                        <v-flex  xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nombre:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.clasificacionPersona }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Clasificación de persona:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nombre }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Sexo:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.sexo }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                    
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex> 
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Apellido paterno:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoPaterno }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Alias:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.alias }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entidad federativa de nacimiento:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.entidadFederativa }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>   
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Apellido materno:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoMaterno }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de nacimiento:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.fechaNacimiento }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>CURP:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.curp }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                     
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>                              
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </v-stepper-content>
                        <v-stepper-step :complete="step > 2" editable step="2"   >
                            Documento de identificación
                        </v-stepper-step>
                        <v-stepper-content step="2">
                            <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout wrap>
                                        <v-flex   xs12 sm12 md12 lg12 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list three-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">subject</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-4 font-weight-bold"><a>Documento de identificación:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ tdocumento }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                            <v-img
                                                :src="rutaconsulta" 
                                                aspect-ratio="1"
                                                class="black"
                                                contain 
                                                max-height="1000"
                                            ></v-img>                                          
                                        </v-flex>                              
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-spacer></v-spacer>                                
                                </v-card-actions> 
                            </v-form>
                        </v-stepper-content>
                        <v-stepper-step :complete="step > 3" editable step="3"   >
                            Información complementaria
                        </v-stepper-step>
                        <v-stepper-content step="3">
                            <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout wrap>
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Medio de notificación:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.medionotificacion }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Género:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.genero }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Ocupación:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.ocupacion }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>     
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Religión:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.religion }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile v-if="datospersona.discapacidad">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tipo de discapacidad:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.tipoDiscapacidad }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                              
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex> 
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Teléfono 1:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.telefono1 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Alias:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.telefono2 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nivel de estudios:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nivelEstudio }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>   
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado familiar:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.estadoCivil }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                         
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>   
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Correo electronico:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.apellidoMaterno }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Lengua:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.lengua }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nacionalidad:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.nacionalidad }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>  
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>¿Tiene alguna discapacidad ?:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{datospersona.discapacidad ? "Si" : "No" }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                   
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>                              
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>                              
                                </v-card-actions> 
                            </v-form>
                        </v-stepper-content>
                        <v-stepper-step :complete="step > 4" editable step="4"   >
                            Dirección personal
                        </v-stepper-step>
                        <v-stepper-content step="4">
                            <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout wrap>
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Calle:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.calle }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Exterior:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.noext }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Interior:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.noint }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>     
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Código postal:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.cp }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                             
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex> 
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Pais:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.pais }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.estado }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Municipio:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.municipio }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>   
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Localidad:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.localidad }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                         
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>   
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 1:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.entrecalle1 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 2:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.entrecalle2 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                             
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Referencia:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infodp.referencia }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                   
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>                              
                                    </v-layout>
                                </v-container>

                            </v-form>

                        </v-stepper-content>
                        <v-stepper-step :complete="step > 5" editable step="5"   >
                            Dirección de notifación
                        </v-stepper-step>
                        <v-stepper-content step="5">
                            <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout wrap>
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Calle:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.calle }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Exterior:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.noext }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>No.Interior:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.noint }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>     
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Código postal:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.cp }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                             
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex> 
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Pais:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.pais }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estado:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.estado }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Municipio:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.municipio }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>   
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Localidad:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.localidad }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                         
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>   
                                        <v-flex   xs6 sm6 md4 lg4 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 1:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.entrecalle1 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                            
                                                    </v-list> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Entre calle 2:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.entrecalle2 }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                             
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">view_day</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Referencia:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{infode.referencia }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                   
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>                              
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </v-stepper-content>      
                    </v-stepper>                  
                </v-card-text> 
            </v-card>

        </v-dialog>


    </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import VeeValidate from 'vee-validate' 
  import { WebCam } from "vue-web-cam";
  import n401 from './401.vue'
  import n403 from './403.vue' 
  import { error, isNull } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';


  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        "vue-web-cam": WebCam
    },
    data: () => ({ 
        components: {  
            n401,
            n403
        }, 
        showpage:true,
        e401:false,
        e403:false,
        modalduplicidad:false, 
        idPersona:0,
        hechos:[],
        headersDuplicidad: [ 
            { text: 'Atendio', value: 'registradoPor' }, 
            { text: 'Distrito', value: 'distritoInicial' }, 
            { text: 'Dirección o Subprocuraduria', value: 'dirSubProcuInicial' }, 
            { text: 'Agencia', value: 'agenciaInicial' }, 
            { text: 'Fecha de registro', value: 'fechaHoraRegistro',  },  
            { text: 'Clasificación persona', value: 'clasificacionPersona',  },  
            { text: 'RAC', value: 'rac',  },    
            { text: 'NUC', value: 'nuc',  },                                 
        ],
       
        dialog: false, 
        verTP:0, 
        rapid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
        //*************** */
        raps:[],
        step: 1,
        //*************** */
        headers: [
            { text: 'PRCD', value: 'inicioDetenido', sortable: false }, 
            { text: 'Clasificación', value: 'clasificacion' },
            { text: 'Tipo', value: 'tipo' },
            { text: 'CURP', value: 'curp'},
            { text: 'Nombre', value: 'nombre' }, 
            { text: 'Correo electronico', value: 'correo electronico', sortable: false },
            { text: 'Telefonos', value: 'telefonos', sortable: false },  
            { text: 'Opciones', value: 'opciones', sortable: false },                                  
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        modalAdd:0,
        geoloc:0,
        modalGeolocalizacion:0,
        modalGeolocalizacion01:0,
        //****************************** */
        center: { lat: 45.508, lng: -73.587 },
        center01: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null, 
        markers01: [],
        places01: [],
        currentPlace01: null, 
        //****************************** */
        step:1, 
        //********************************/
        //CAPTURA DE DATOS
        idPersona:'',
        radios: 'Fisica',
        rfc:'',
        razonsocial:'',
        clasificacionpersona:'',
        clasificacionpersonas:[], 

        docidentificacion:'',
        docsidentificaciones:[], 

        sexo:'',
        sexos:[], 

        entidadFederativa:'',
        abreviacion:'',
        estados:[],   

        //img: null,
        camera: null,
        deviceId: null,
        devices: [],

        imageName: '',
        imageUrl: null,
        imageFile: '',
        //DATOS PARA LA GENERACION DEL CURP
        nombres:'',
        apaterno:'',
        amaterno:'',
        alias:'',
        fnacimiento:'', 
        curp:'',
        //INFORMACION COMPLEMENTARIA
        medionotificacion:'',
        medionotificaciones:[],

        telefono1:'',
        correo:'', 

        nacionalidad:'Mexicana',
        nacionalidades:[],

        estadocivil:'',
        estadosciviles:[],

        genero:'',
        generos:[],

        ocupacion:'',
        ocupaciones:[],

        nivelestudio:'',
        nivelestudios:[],

        lengua:'',
        lenguas:[],

        religion:'',
        religiones:[], 

        switch1: false,
        switch2: false,

        discapacidad:'',
        discapaciodades:[],
        presexuales:false,
        
        relacionados:[
            {text:'Abuelo(a)',value:'Abuelo(a)'},
            {text:'Cónyuge o pareja',value:'Cónyuge o pareja'},
            {text:'Amigo',value:'Amigo'},
            {text:'Expareja',value:'Expareja'},
            {text:'Hermano(a)',value:'Hermano(a)'},
            {text:'Hijo(a)',value:'Hijo(a)'},
            {text:'Jefe(a) o patron(a)',value:'Jefe(a) o patron(a)'},
            {text:'Madre o padre',value:'Madre o padre'},
            {text:'Nieto(a)',value:'Nieto(a)'},
            {text:'Novio(a)',value:'Novio(a)'},
            {text:'Padrastro/madrastra',value:'Padrastro/madrastra'},
            {text:'Primo(a)',value:'Primo(a)'},
            {text:'Sobrino(a)',value:'Sobrino(a)'},
            {text:'Tio(a)',value:'Tio(a)'},
            {text:'Vecino(a)',value:'Vecino(a)'},
            {text:'Conocido(a)',value:'Conocido(a)'},          
        ],
        relacionado:'',
        relacion:false,
        edadf:'',
       dialogoinformacion: false,
        // DIRECCION PERSONAL
        calle:'',
        noExt:'',
        noInt:'',
        entreCalle1:'',
        entreCalle2:'',
        referencia:'',
        pais:'Mexico',

        estado:'',
        estadoid:0,
        ciudades:[],

        municipio:'',
        municipioid:0,
        municipios:[],

        
        localidad:'',
        localidadid:0,
        localidades:[],

        cp:'', 
        lat:'',
        lng:'',
        //************************************** */
        rac:'',
        datosprotegidos:false,
        ruta:'',
        documentoacreditas:[
            {text:"Nombramiento",value:"Nombramiento"},
            {text:"Poder notarial",value:"Poder notarial"},
            {text:"Instrumento notarial",value:"Instrumento notarial"}
        ],
        documentoacredita:'',
        dialogoinformacionadicional:false,
        cumplerequisitosley:'',
        decretolibertad:'',
        dispusolibertad:'',
        opcionesinfoadicional:[
            {text:"Si",value:"Si"},
            {text:"No",value:"No"},
        ],
        idpersona:'',
        //-----CLAIM------------------------------------------
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
        u_subproc:'',
        //----------------------------------------------------
        estado:'',
        estadoid:0,
        ciudades:[],

        calle:'',

        municipio:'',
        municipioid:0,
        municipios:[], 

        localidad:'',
        localidadid:0,
        localidades:[],

        //-------------------------
        GUID:'',
        statusActualizar:false,
        dialogoactualizar:false,
        nombrep:'',
        idrapac:'',
        datospersona:[],
        infodp:[],
        infode:[],
        rutaconsulta:'',
        tdocumento:'',
        sindocumento :false,
        idDoccumentoPersona:0,
        detenciondetenido:false,
    }),
       
    created () {
            let me = this 
            me.rHechoId =  me.$store.state.rhechoid;
            me.nuc = me.$store.state.nuc;
            me.rAtencionId = me.$store.state.ratencionid;
            if (me.rHechoId== null)
            {
                    me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpetas y luego en Lista de carpetas asignadas y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 

                            me.$router.push('./mcaptura-listacarpetas')
                    })
            }
            else{
                    me.$notify('Carpeta abierta correctamente !!!','success')
                    me.listarrap();

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
                    me.u_subproc=me.$store.state.usuario.subProc;
                    // DATOS GENERALES
                    me.listarTipoPersona();
                    me.listarSexo();
                    me.listarIdentificacion();
                    me.listarEstados();
                    // INFORMACION COMPLEMENTARIA
                    me.listarMedionotificacion();
                    me.listarNacionalidad();
                    me.listarEstadoCivil();
                    me.listarGenero();
                    me.listarOcupacion();
                    me.listarNivelEstudio();
                    me.listarLengua();
                    me.listarReligion();
                    me.listarDiscapacidad();
                    // DIRECCION PERSONAL 
                    me.listarCiudades();
                    // DIRECCION ESCUCHA 
                    me.de_listarCiudades();
            }
      
      
       // Add a request interceptor
        axios.interceptors.request.use( (config)=> {
          // Do something before request is sent
        console.log(config);
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

          // Add a response interceptor
          axios.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (error)=> {
        
     // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });


    },
    computed: {
        formTitle () {
                return this.editedIndex === -1 ? 'Registrar a una nueva persona' : 'Actualizar informacion de la persona'
        },
        formIcon () {
            return this.editedIndex === -1 ? 'add' : 'edit'
        },
        device: function() {return this.devices.find(n => n.deviceId === this.deviceId);},
        logueado(){
                return this.$store.state.usuario;
            },
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            esRecepcion(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
            },
            esAMPOAMP(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
            },
            esDirector(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
            },
            esCoordinador(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
            },
            esAmpoMixto(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
            },
            esFacilitador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
            },
            usuario(){
                return this.$store.state.usuario.usuario;
            },
            email(){
                return this.$store.state.usuario.email;
            },
            drawer(){
                return this.$store.state.drawer
            }
        },
    watch: {
        camera: function(id) {
        this.deviceId = id;
        },
  
        devices: function() {
        // Once we have a list select the first one
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods:{ 
        cerrarcarpeta () {
            this.$store.state.rHechoId= null;
            this.$store.state.nuc= null;
            this.$router.push('./listacarpetas')
        },
        agregar(){
            this.step = 1;
            this.modalAdd= 1;
        },
        close () {
            
            this.modalAdd = 0;
            this.limpiar();
        },
        editItem (item) {  

            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
          
                me.rapid= item.idRAP; 
                me.idPersona = item.personaId;
                me.switch2 = item.statusAnonimo;
                me.radios = item.tipoPersona;
                if (me.radios =="Fisica"){
                    me.verTP=0;
                }
                else{
                me.verTP=1;
                }
                me.edadf = item.edad
                me.datosprotegidos = item.datosProtegidos;
                me.clasificacionpersona = item.clasificacionPersona;
                me.rfc = item.rfc;
                me.razonsocial = item.razonSocial;
                me.nombres= item.nombre;
                me.apaterno = item.apellidoPaterno;
                me.amaterno = item.apellidoMaterno;
                me.alias = item.alias;
                me.fnacimiento= item.fechaNacimiento;
                me.sexo = item.sexo;
                me.entidadFederativa=item.entidadFederativa;
                me.selectEFederativa(item.entidadFederativa);
                me.docidentificacion = item.docIdentificacion;
                me.curp = item.curp; 
                me.documentoacredita = item.docPoderNotarial
                //********************************* */
                me.medionotificacion = item.medionotificacion;
                me.telefono1 = item.telefono1;
                me.telefono2 = item.telefono2;
                me.correo = item.correo;
                me.estadocivil = item.estadoCivil;
                me.genero = item.genero;
                me.ocupacion = item.ocupacion;
                me.nivelestudio = item.nivelEstudio;
                me.lengua = item.lengua;
                me.religion = item.religion;
                me.switch1 = item.discapacidad;
                me.discapacidad= item.tipoDiscapacidad;
                me.relacion = item.relacion,
                me.relacionado = item.parentesco
                me.detenciondetenido = item.inicioDetenido
                me.cumplerequisitosley = item.cumpleRequisitoLey
                me.decretolibertad = item.decretoLibertad 
                me.dispusolibertad = item.dispusoLibertad
                me.listarDireccionPersonal();
                me.listarDireccionEscucha();
                me.editedIndex=1;
                me.modalAdd =1;

                me.$cat.get('api/DocumentosPesonas/Listar/'+ item.personaId,configuracion).then(function(response){
               
            
                    me.imageUrl = response.data.ruta;
                    me.idDoccumentoPersona = response.data.idDocumentoPersona;
                    me.sindocumento=true;
             
              

        
               

             
            }).catch(error => {
                    me.imageUrl = "";
                    me.idDoccumentoPersona = 0;
                    me.sindocumento=false;
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
        listarDireccionPersonal(){
            let me=this;    
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$cat.get('api/RAPs/ListarDP/'+ me.idPersona,configuracion).then(function(response){
                
                console.log(response.data);
                me.calle =response.data.calle;
                me.noInt= response.data.noint; 
                me.noExt=response.data.noext; 
                me.entreCalle1 = response.data.entrecalle1;
                me.entreCalle2 = response.data.entrecalle2;
                me.referencia= response.data.referencia;  
                me.estado = response.data.estado; 
                me.municipio = response.data.municipio; 
                me.localidad = response.data.localidades;
                me.municipio=response.data.municipio; 
                me.localidad= response.data.localidad; 
                me.pais=response.data.pais;
                me.cp=response.data.cp;
                me.lat=response.data.lat;
                me.lng=response.data.lng;
               
                me.selectEstado(me.estado);
                
              
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        listarDireccionEscucha(){
           
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$cat.get('api/RAPs/ListarDE/'+ me.rapid,configuracion).then(function(response){
                
                console.log(response.data);
                me.de_calle =response.data.calle;
                me.de_noInt= response.data.noint; 
                me.de_noExt=response.data.noext; 
                me.de_entreCalle1 = response.data.entrecalle1;
                me.de_entreCalle2 = response.data.entrecalle2;
                me.de_referencia= response.data.referencia;  
                me.de_estado = response.data.estado; 
                me.de_municipio = response.data.municipio; 
                me.de_localidad = response.data.localidades;
                me.de_municipio=response.data.municipio; 
                me.de_localidad= response.data.localidad; 
                me.de_pais=response.data.pais;
                me.de_cp=response.data.cp;
                me.de_lat=response.data.lat;
                me.de_lng=response.data.lng; 
                me.de_selectEstado(me.de_estado);
                
              
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        selectEFederativa: function(val) {      
        
            for (var i = 0; i < this.estados.length; i++) {
                
                if (this.estados[i].text === val)
                {
                        this.abreviacion =  new Object();
                        this.abreviacion.text =this.estados[i].text;
                        this.abreviacion.value = this.estados[i].value; 
               
                }
            }
        },
        
        infoItem (item) {   

            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.step = 1;
            me.$cat.get('api/RAPs/ListarDP/'+ item.personaId,configuracion).then(function(response){
                me.infodp = response.data;

                me.$cat.get('api/RAPs/ListarDE/'+ item.idRAP,configuracion).then(function(response){
                        me.infode = response.data;
                        me.$cat.get('api/DocumentosPesonas/Listar2/' +item.personaId,configuracion).then(function(response){   
                        me.rutaconsulta = response.data.ruta;
                        me.tdocumento = response.data.tipoDocumento             
                        me.datospersona = item;
                        me.dialogoinformacion = true;
                    }).catch(err => { 
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')    
                        } 
                    });
                }).catch(err => { 

                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
            }).catch(err => { 

                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
            
        },
        mostrarTP(){
            this.verTP=1;
        },
        ocultarTP (){
            this.verTP=0;
        },
        limpiar(){     
            this.statusActualizar=false;
            //************************************************************* */
            //step no 1
            this.switch2= false;
            this.radios= 'Fisica';
            this.verTP=0;
            this.rfc="";
            this.razonsocial="";
            this.clasificacionpersona="";
            this.nombres="";
            this.apaterno="";
            this.amaterno="";
            this.fnacimiento="";
            this.sexo="";
            this.abreviacion="";
            this.alias = "";
            this.docidentificacion="";
            this.curp="";
            this.imageName="";
            this.imageFile ="";
            this.imageUrl ="";
            //************************************************************* */
            //step no2
            this.medionotificacion="";
            this.telefono1="";
            this.telefono2="";
            this.correo="";
            this.nacionalidad="Mexicana";
            this.estadocivil="";
            this.genero="";
            this.nivelestudio="";
            this.ocupacion="";
            this.lengua="";
            this.religion="";
            this.switch1= false,
            this.tipoDiscapacidad="";
            this.ruta =''
            this.documentoacredita = ""
            //************************************************************* */
            //step no3
            this.calle="";
            this.noInt="";
            this.noExt="";
            this.entreCalle1="";
            this.entreCalle2="";
            this.referencia="";
            this.pais="Mexico";
            this.estadoid=0;
            this.estado="";
            this.municipioid=0;
            this.municipio="";
            this.localidadid=0; 
            this.localidad="";
            this.cp=""; 
            this.lat="";
            this.lng="";
                //step no4
            this.de_calle="";
            this.de_noInt="";
            this.de_noExt="";
            this.de_entreCalle1="";
            this.de_entreCalle2="";
            this.de_referencia="";
            this.de_pais="Mexico";
            this.de_estadoid=0;
            this.de_estado="";
            this.de_municipioid=0;
            this.de_municipio="";
            this.de_localidadid=0; 
            this.de_localidad="";
            this.de_cp=""; 
            this.de_lat="";
            this.de_lng="";
            this.$validator.reset();
            this.step=1;
            this.editedIndex=-1;
            this.datosprotegidos = false;
            this.relacion = false
            this.relacionado = ""
            this.edadf = ""
            this.duplicarDireccion = false
            this.decretolibertad= ""
            this.dispusolibertad = ""
            this.cumplerequisitosley = ""
        },
        generaredad(){
            var date = moment(this.fnacimiento, 'DD/MM/YYYY');
            return moment().diff(date, 'years',false);
        },
        listarrap(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$cat.get('api/RAPs/ListarTodosModuloCaptura/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data);
                me.raps=response.data;
              
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        // STEP 1 CAPTURA DE DATOS
       
        listarTipoPersona(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var clasificacionpersonaArray=[];
            this.$conf.get('api/ClasificacionPersonas/Listar',configuracion).then(function(response){
                //console.log(response.data);
                clasificacionpersonaArray=response.data;
                clasificacionpersonaArray.map(function(x){
                    me.clasificacionpersonas.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        }, 
        listarSexo(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var sexoArray=[];
            this.$conf.get('api/Sexoes/Listar',configuracion).then(function(response){
                //console.log(response.data);
                sexoArray=response.data;
                sexoArray.map(function(x){
                    me.sexos.push({text: x.nombre,value: x.clave});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        listarEstados(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadosArray=[]; 
            this.$conf.get('api/Estadoes/Listar',configuracion).then(function(response){
                //console.log(response);
                estadosArray=response.data;
                estadosArray.map(function(x){
                    me.estados.push({text: x.nombre, value: x.abreviacion});
                    
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },
        
        listarIdentificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var docIdentificaionArray=[];
            this.$conf.get('api/DocIdentificacions/Listar',configuracion).then(function(response){
                //console.log(response.data);
                docIdentificaionArray=response.data;
                docIdentificaionArray.map(function(x){
                    me.docsidentificaciones.push({text: x.nombre,value: x.nombre});
                });
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        generarcurp(){

         
            var str = this.fnacimiento;
            var res = str.split("/"); 
            var curpstr = curp({
            nombre: this.nombres,
            apellido_paterno: this.apaterno,
            apellido_materno: this.amaterno,
            sexo: this.sexo,
            estado: this.abreviacion.value, 
            fecha_nacimiento: res
            }); 
            
            this.curp = curpstr; 
            
            
        },  
        validadduplicidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$cat.get('api/Personas/BuscarPersona/' +me.curp,configuracion).then(function(response){  
                
   

                    me.idPersona = response.data.personaId;  
                    me.medionotificacion= response.data.medionotificacion;
                    me.telefono1 = response.data.telefono1;
                    me.telefono2= response.data.telefono2;
                    me.correo = response.data.correo;  
                    me.nacionalidad= response.data.nacionalidad;  
                    me.estadocivil = response.data.estadoCivil; 
                    me.genero= response.data.genero;  
                    me.ocupacion= response.data.ocupacion;
                    me.nivelestudio= response.data.nivelEstudio;
                    me.lengua= response.data.lengua;
                    me.religion= response.data.religion;
                    me.switch1= response.data.discapacidad; 
                    me.discapacidad= response.data.tipoDiscapacidad;
  
                    me.statusActualizar=true;
                    me.listarDireccionPersonal(); 
                    me.listarRAtencioPersona();
                    me.modalduplicidad=true;
 
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
       
        },
        cerrarModalDuplicidad(){
            
            this.hechos=[];
            this.modalduplicidad= false;
        },
        actualizarclasi(item){
            this.limpiar();
            this.nombrep = item.nombreCompleto
            this.idrapac = item.idRAP
            this.clasificacionpersona = item.clasificacionPersona
            this.dialogoactualizar = true

        },      
        infoadicionalpdetenida(item){

            this.limpiar();
            this.nombrep = item.nombreCompleto
            this.idpersona = item.personaId
            this.cumplerequisitosley = item.cumpleRequisitoLey
            this.decretolibertad = item.decretoLibertad
            this.dispusolibertad = item.dispusoLibertad
            this.dialogoinformacionadicional = true

        },
        actualizarclasiapi(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var aux;        
            me.$cat.put('api/RAPs/ActualizarClasificacion',{

                'IdRAP' : this.idrapac,
                'ClasificacionPersona' : this.clasificacionpersona.value,

            },configuracion).then(function(response){                            
                me.$notify('La información se actualizo correctamente !!!','success') 
                me.limpiar();   
                me.dialogoactualizar = false
                me.listarrap();    
            }).catch(err => { 
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                } 
            });
        },
        actualizarinfoadicional(){

            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 

            me.$cat.put('api/Personas/ActualizarInfoAdicionalDetenido',{

                'PersonaId' : me.idpersona,
                'CumpleRequisitoLey' : me.cumplerequisitosley,
                'DecretoLibertad' : me.cumplerequisitosley == "Si" ? me.decretolibertad : "Na",
                'DispusoLibertad' : me.cumplerequisitosley == "No" ? me.dispusolibertad : "Na",

            },configuracion).then(function(response){                            
                me.$notify('La información se actualizo correctamente !!!','success') 
                me.limpiar();   
                me.dialogoinformacionadicional = false
                me.listarrap();    
            }).catch(err => { 
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                } 
            });
        },
        listarRAtencioPersona(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var registrosArray=[]; 
            me.$cat.get('api/RAPs/ListarRegistroPorPersona/'+ me.idPersona,configuracion).then(function(response){
                
                registrosArray=response.data;
 
                for (let i in registrosArray) {
                    var ratencionid = registrosArray[i].rAtencionId; 
                    var clasificacionpersona = registrosArray[i].clasificacionPersona;
                    me.$cat.get('api/RHechoes/ListarPorrAtencionId/'+ ratencionid,configuracion).then(function(response){ 
                         
                        
                         me.hechos.push(
                                {
                                    rHechoId: response.data.rHechoId,
                                    rAtencion: response.data.rAtencionId,
                                    registradoPor: response.data.registradoPor,
                                    distritoInicial: response.data.distritoInicial,
                                    dirSubProcuInicial: response.data.dirSubProcuInicial,
                                    agenciaInicial: response.data.agenciaInicial,
                                    agenciaid: response.data.agenciaid,
                                    fechaHoraRegistro: response.data.fechaHoraRegistro, 
                                    clasificacionPersona: clasificacionpersona, 
                                    fechaElevaNuc: response.data.fechaElevaNuc,
                                    fechaHoraSuceso: response.data.fechaHoraSuceso, 
                                    rac: response.data.rac,
                                    nuc: response.data.nuc,
                                });

                          
                        
                    }).catch(err => { 
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')    
                        } 
                    });
                    
                }
                 
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },
        onCapture() {
           this.imageUrl = this.$refs.webcam.capture();  
           var blob =  this.dataURItoBlob(this.imageUrl, 'image/jpg'); 
           var file = new File([blob], 'Documento.jpg', {type: 'image/jpg', lastModified: Date.now()});
           this.imageFile = file
           this.imageName = this.imageFile.name;
          
        },
        dataURItoBlob(dataURI, type) {
            // convertir base64 to raw binary data held in a string
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: type });
            return bb;
        },
        onStarted(stream) {
            console.log("On Started Event", stream);
        },
        onStopped(stream) {
            console.log("On Stopped Event", stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
            console.log("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log("On Cameras Event", cameras);
        },
        onClose () {
            this.dialog = false; 
        },    
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
            console.log("On Camera Change Event", deviceId);
        }, 
        // STEP 2 INFORMACION COMPLEMENTARIA
        listarMedionotificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var medionotificacionArray=[]; 
            this.$conf.get('api/MedioNotificacions/Listar',configuracion).then(function(response){
                //console.log(response);
                medionotificacionArray=response.data;
                medionotificacionArray.map(function(x){
                    me.medionotificaciones.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },
        listarNacionalidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nacionalidadArray=[]; 
            this.$conf.get('api/Nacionalidads/Listar',configuracion).then(function(response){
                //console.log(response);
                nacionalidadArray=response.data;
                nacionalidadArray.map(function(x){
                    me.nacionalidades.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },
        listarEstadoCivil(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var estadocivilArray=[]; 
            this.$conf.get('api/EstadoCivils/Listar',configuracion).then(function(response){
                //console.log(response);
                estadocivilArray=response.data;
                estadocivilArray.map(function(x){
                    me.estadosciviles.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },
        listarGenero(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var generoArray=[]; 
            this.$conf.get('api/Generoes/Listar',configuracion).then(function(response){
                //console.log(response);
                generoArray=response.data;
                generoArray.map(function(x){
                    me.generos.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },
        listarOcupacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ocupacionArray=[]; 
            this.$conf.get('api/Ocupacions/Listar',configuracion).then(function(response){
                //console.log(response);
                ocupacionArray=response.data;
                ocupacionArray.map(function(x){
                    me.ocupaciones.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },  
        listarNivelEstudio(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nivelestudioArray=[]; 
            this.$conf.get('api/NivelEstudios/Listar',configuracion).then(function(response){
                //console.log(response);
                nivelestudioArray=response.data;
                nivelestudioArray.map(function(x){
                    me.nivelestudios.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },  
        listarLengua(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var lenguaArray=[]; 
            this.$conf.get('api/Lenguas/Listar',configuracion).then(function(response){
                //console.log(response);
                lenguaArray=response.data;
                lenguaArray.map(function(x){
                    me.lenguas.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        },  
        listarReligion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var religionArray=[]; 
            this.$conf.get('api/Religions/Listar',configuracion).then(function(response){
                //console.log(response);
                religionArray=response.data;
                religionArray.map(function(x){
                    me.religiones.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        }, 
        listarDiscapacidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var discapacidadArray=[]; 
            this.$conf.get('api/Discapacidads/Listar',configuracion).then(function(response){
                //console.log(response);
                discapacidadArray=response.data;
                discapacidadArray.map(function(x){
                    me.discapaciodades.push({text: x.nombre,value: x.nombre});
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        },  
        // STEP 3 DIRECCION PERSONAL
      
        listarCiudades(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var ciudadesArray=[];
            this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){ 
                ciudadesArray=response.data; 
                ciudadesArray.map(function(x){
                    me.ciudades.push({text: x.nombre, value:x.idEstado});  
                });   
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        }, 
        listarPorEstado(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.estadoid.value== 0){
                me.estado = me.estadoid.text;
                me.estadoid = me.estadoid.value;
            }
                var municipiosArray=[];
                me.municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoid,configuracion).then(function(response){
                
                    municipiosArray=response.data;
                
                    municipiosArray.map(function(x){
                    me.municipios.push({text: x.nombre,value: x.idMunicipio});  
                    }); 
                    if (me.editedIndex == 1){
                     me.selectMunicipio(me.municipio);
                    }
                    if (me.statusActualizar==true){
                         me.selectMunicipio(me.municipio);
                    }
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
               
                
        },
        listarPorMunicipio(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.municipioid.value== 0){
            me.municipio = me.municipioid.text;
            me.municipioid = me.municipioid.value;
            }
      
          
            var localidadArray=[];
            me.localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.localidades.push({text: x.nombre,value: x.idLocalidad});     
                });
                 if (me.editedIndex == 1){
                      me.selectLocalidad(me.localidad);
                }
                if (me.statusActualizar==true){
                         me.selectLocalidad(me.localidad);
                    }
              }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
      
          
        }, 
        listarPorLocalidad(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.localidad = me.localidadid.text;
            me.localidadid = me.localidadid.value;
            this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadid,configuracion).then(function(response){
                  me.cp=response.data.cp;    
                
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                  //console.log(response)
                  me.estadoid=response.data.idEstado;    
                  me.listarPorEstado();
                  me.municipioid=response.data.idMunicipio;   
                  me.buscarPorCpMpo() 
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        buscarPorCpMpo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var localidadArray=[];
            me.localidades.length = 0;
             this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioid +',' + this.cp,configuracion).then(function(response){ 
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.localidades.push({text: x.nombre,value: x.idLocalidad}); 
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        selectEstado: function(val) {  
             
            let me=this;    
            for (var i = 0; i < me.ciudades.length; i++) {
                if (me.ciudades[i].text === val)
                {
                    me.estadoid=  me.ciudades[i].value; 
                }
            }
            me.listarPorEstado();
        },
        selectMunicipio: function(val) { 
            let me=this; 
           
            for (var i = 0; i < me.municipios.length; i++) {
                if (me.municipios[i].text === val){
                   
                     me.municipioid=  me.municipios[i].value; 
                }   
            } 
          me.listarPorMunicipio();
        },
        selectLocalidad: function(val) { 
           let me=this; 
            for (var i = 0; i < me.localidades.length; i++) {
                if (me.localidades[i].text === val)
                {
                    me.localidadid=  me.localidades[i].value; 
                }
                
            } 
          
        },
         // APIS PARA CONSULTA DE DIRECCION ESCUCHA
        de_listarCiudades(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ciudadesArray=[];
            this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){ 
                ciudadesArray=response.data; 
                ciudadesArray.map(function(x){ 
                    me.de_ciudades.push({text: x.nombre, value:x.idEstado}); 
                });   
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        de_listarPorEstado(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.de_estadoid.value== 0){
                me.de_estado = me.de_estadoid.text;
                me.de_estadoid = me.de_estadoid.value;
            }
                var municipiosArray=[];
                me.de_municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.de_estadoid,configuracion).then(function(response){
                
                    municipiosArray=response.data;
                
                    municipiosArray.map(function(x){ 
                    me.de_municipios.push({text: x.nombre,value: x.idMunicipio}); 
                    }); 
                    if (me.editedIndex == 1){
                     me.de_selectMunicipio(me.de_municipio);
                    }
                    if (me.statusActualizar==true){
                         me.de_selectMunicipio(me.municipio);
                    }
                    if (me.duplicarDireccion==true){
                         me.de_selectMunicipio(me.municipio);
                    }
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
               
                
        },
        de_listarPorMunicipio(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.de_municipioid.value== 0){
            me.de_municipio = me.de_municipioid.text;
            me.de_municipioid = me.de_municipioid.value;
            }
      
          
            var localidadArray=[];
            me.de_localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + me.de_municipioid,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){  
                    me.de_localidades.push({text: x.nombre,value: x.idLocalidad});  
                });
                 if (me.editedIndex == 1){
                      me.de_selectLocalidad(me.de_localidad);
                }
                 if (me.statusActualizar==true){
                         me.de_selectLocalidad(me.de_localidad);
                    }
                 if (me.duplicarDireccion==true){
                    me.de_selectLocalidad(me.de_localidad);
                    }
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
      
          
        }, 
        de_listarPorLocalidad(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.de_localidad = me.de_localidadid.text;
            me.de_localidadid = me.de_localidadid.value;
            this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.de_localidadid,configuracion).then(function(response){
                 
                  me.de_cp=response.data.cp;  
                
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        de_buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                  //console.log(response)
                  
                  me.de_estadoid=response.data.idEstado;  
                  me.de_listarPorEstado();
                  me.de_municipioid=response.data.idMunicipio;  
                  me.de_buscarPorCpMpo() 
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
        }, 
        de_buscarPorCpMpo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var localidadArray=[];
            me.de_localidades.length = 0;
             this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.de_municipioid +',' + this.de_cp,configuracion).then(function(response){ 
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.de_localidades.push({text: x.nombre,value: x.idLocalidad}); 
                });
            }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
        }, 
        de_selectEstado: function(val) {  
            let me=this;    
            for (var i = 0; i < me.de_ciudades.length; i++) {
                if (me.de_ciudades[i].text === val){
                    me.de_estadoid=  me.de_ciudades[i].value; 
                } 
            }
            me.de_listarPorEstado();
        },
        de_selectMunicipio: function(val) { 
            let me=this; 
            for (var i = 0; i < me.de_municipios.length; i++) {
                if (me.de_municipios[i].text === val){
                    me.de_municipioid=  me.de_municipios[i].value; 
                }    
            } 
          me.de_listarPorMunicipio();
        },
        de_selectLocalidad: function(val) { 
           let me=this; 
            for (var i = 0; i < me.de_localidades.length; i++) {
                if (me.de_localidades[i].text === val){
                    me.de_localidadid=  me.de_localidades[i].value; 
                }  
            } 
          
        },
        modalclose(){
            this.modalAdd=false;
            this.limpiar();
        },
        //-------------------------------------------------
        btn_geoloc2(){       
            if(this.estado !='' && this.municipio != '' && this.localidad != '' && this.calle != ''){
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                    this.lugar = this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado
                    this.listener();
                    this.addMarkergeocoder();
                    this.geoloc=2; 
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')               
        }, 
        btn_geoloc01(){         
            if(this.de_estado !='' && this.de_municipio != '' && this.de_localidad != '' && this.de_calle != ''){
                    
                    this.modalGeolocalizacion01 = 1;
                    this.listener01();
                    this.addMarkergeocoder01();
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')     
        }, 
        listener01(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa01'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center01.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.center01.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        addMarkergeocoder01() {
                    const marker = {
                        lat: this.center01.lat,
                        lng: this.center01.lng, 
                    };
                    this.markers01 =[]
                    this.places01 = []
                    this.markers01.push({ position: marker });
                    this.places01.push(this.currentPlace);
                    this.center01 = marker;
                    this.currentPlace01 = null;                 
        },
        updateCoordinates01(location) {
            this.lataux01 = location.latLng.lat()
            this.lngaux01 = location.latLng.lng()
        },
        updatecenter01(){
            this.center01.lat = this.lataux01;
            this.center01.lng = this.lngaux01;
        },

        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
        },
        setPlace01(place) {
                this.markers01= [],
                this.places01= [],
                this.currentPlace01 = place;
        },
        addMarker01() {
                if (this.currentPlace01) {
                    const marker = {
                        lat: this.currentPlace01.geometry.location.lat(),
                        lng: this.currentPlace01.geometry.location.lng(), 

                    };
                    this.markers01.push({ position: marker });
                    this.places01.push(this.currentPlace01);
                    this.center01 = marker;
                    this.currentPlace01 = null;
                    }
        }, 
        guardarGeolocalizacion01(){
            
                if(this.lataux01 != '' && this.lngaux01 != ''){
                    this.de_lat = this.lataux01
                    this.de_lng = this.lngaux01
                }else{
                    this.de_lat = this.markers01[0].position.lat
                    this.de_lng = this.markers01[0].position.lng
                }                            
                this.modalGeolocalizacion01=0;
        },


//------------------------------------------------------------------------------------------
        listener(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.calle+" "+ this.localidad+" "+this.municipio+" "+this.estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.center.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        
        
        addMarkergeocoder() {
                    const marker = {
                        lat: this.center.lat,
                        lng: this.center.lng, 
                    };
                    this.markers =[]
                    this.places = []
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;                 
        },
        updateCoordinates(location) {
            this.lataux = location.latLng.lat()
            this.lngaux = location.latLng.lng()
        },
        updatecenter(){
            this.center.lat = this.lataux;
            this.center.lng = this.lngaux;
        },
        
        
        
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
        },
        
        addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng(), 

                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    }
        },  
           
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude, 
            
                };
            });
        },
        guardarGeolocalizacion(){
            
            if(this.lataux != '' && this.lngaux != ''){
                this.lat = this.lataux
                this.lng = this.lngaux
            }else{
                this.lat = this.markers[0].position.lat
                this.lng = this.markers[0].position.lng
            }                            
            this.modalGeolocalizacion=0;
        },
        

        //************************************** */
        
        
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
            },
        addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng(), 

                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    }
            },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude, 
            
                };
            });
        },
        
         //************************************* */
        dupdiresc(){
            let me=this;
            if (me.duplicarDireccion==true){
             
                me.cp= me.cp;
                me.de_calle= me.calle;
                me.de_noExt=me.noExt;
                me.de_noInt=me.noInt;
                me.de_entreCalle1=me.entreCalle1;
                me.de_entreCalle2= me.entreCalle2;
                me.de_referencia=me.referencia;
                me.de_pais=me.pais;
                me.de_estado=me.estado;
                me.de_selectEstado(me.de_estado);
                me.de_municipio=me.municipio;
                me.de_localidad=me.localidad;
                me.de_cp= me.cp;
                me.de_lat= me.lat;
                me.de_lng=me.lng;
                
            }
            else{ 
                me.de_calle= "";
                me.de_noExt="";
                me.de_noInt="";
                me.de_entreCalle1="";
                me.de_entreCalle2= "";
                me.de_referencia=""; 
                me.de_estado="";
                me.de_municipio="";
                me.de_localidad="";
                me.de_cp="";
                me.de_lat="";
                me.de_lng="";
            }

        },
        guardar(){
            this.$validator.validate().then(result => {
            if (result) { 
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                var idPoliciaDetuvo='';
                idPoliciaDetuvo = '00000000-0000-0000-0000-000000000000';

                if (this.editedIndex > -1) {

                    me.$cat.put('api/RAPs/Actualizar',{  

                        'rapId': me.rapid,
                        'clasificacionpersona': me.clasificacionpersona,
                        'pInicio': false,
                        //***************************** PERSONA*/ 
                        'personaId': me.idPersona, 
                        'statusAnonimo': me.switch2,
                        'tipoPersona': me.radios,
                        'rfc': me.rfc,
                        'razonsocial': me.razonsocial,  
                        'nombre': me.nombres,
                        'apellidoPaterno' : me.apaterno,
                        'apellidoMaterno' : me.amaterno,
                        'alias': me.alias,
                        'PoliciaDetuvo' : idPoliciaDetuvo,
                        'statusAlias': false,
                        'fechaNacimiento' : me.fnacimiento,
                        'entidadFederativa': me.abreviacion.text,
                        'docIdentificacion': me.docidentificacion,
                        'curp': me.curp,
                        'sexo' : me.sexo,
                        'estadoCivil': me.estadocivil,
                        'genero': me.genero,
                        'telefono1': me.telefono1,
                        'telefono2': me.telefono2,
                        'correo': me.correo,
                        'medioNotificacion': me.medionotificacion,
                        'nacionalidad': me.nacionalidad,
                        'ocupacion': me.ocupacion,
                        'nivelEstudio': me.nivelestudio,
                        'lengua': me.lengua,
                        'religion': me.religion,
                        'discapacidad': me.switch1,
                        'tipoDiscapacidad': me.discapacidad, 
                        'Relacion': me.relacion,
                        'Parentesco': me.relacionado,
                        'Edad': me.edadf, 
                        'DocPoderNotarial':me.documentoacredita,
                        'InicioDetenido': me.detenciondetenido,
                        'CumpleRequisitoLey': me.cumplerequisitosley,
                        'DecretoLibertad': me.decretolibertad,
                        'DispusoLibertad': me.dispusolibertad,
                        //***************************** DIRECCION*/ 
                        
                        'calle': me.calle,
                        'noExt': me.noExt,
                        'noInt': me.noInt,
                        'entreCalle1': me.entreCalle1,
                        'entreCalle2': me.entreCalle2,
                        'referencia': me.referencia,
                        'pais': me.pais,
                        'estado': me.estado,
                        'municipio': me.municipio,
                        'localidad': me.localidad,
                        'cp': me.cp,
                        'lat': me.lat,
                        'lng':me.lng,
                        //************************************ DIRECCION ESCUCHA */
                        
                        'de_calle': me.calle,
                        'de_noExt': me.noExt,
                        'de_noInt': me.noInt,
                        'de_entreCalle1': me.entreCalle1,
                        'de_entreCalle2': me.entreCalle2,
                        'de_referencia': me.referencia,
                        'de_pais': me.pais,
                        'de_estado': me.estado,
                        'de_municipio': me.municipio,
                        'de_localidad': me.localidad,
                        'de_cp': me.cp,
                        'de_lat': me.lat,
                        'de_lng': me.lng,
                        //************************************ */
                        
                    },configuracion).then(function(response){ 
                        
                        me.$cat.put('api/DocumentosPesonas/ActualizarporIdpersona',{  
                            'IdDocumentoPersona': me.idDoccumentoPersona,
                            'idpersona': me.idPersona, 
                            'TipoDocumento': me.docidentificacion,
                            'NombreDocumento': "Documento",
                            'Descripcion': "",
                            'Ruta':"ruta",
                            'Distrito': me.u_distrito,
                            'DirSubProc':me.u_dirSubPro,
                            'Agencia':me.u_agencia,
                            'Usuario': me.u_nombre,
                            'Puesto': me.u_puesto,
                        },configuracion).then(function(response){  
                            me.$notify('La información se guardo correctamente !!!','success')   
                        }).catch(err => { 
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        }); 

                        me.$notify('La información se guardo correctamente !!!','success') 
                        me.listarrap();
                        me.close();  

                    }).catch(err => { 
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        } 
                    });

                }                         
                else{

                    if(me.cp =='') me.cp = 0
                    if(me.edadf == '') me.edadf = 99
                    if(me.noInt == '') me.noInt = 0
                    if(me.noExt == '') me.noExt = 0
                    if(me.telefono1 == '') me.telefono1 = 0


                    me.$cat.post('api/RAPs/CrearModuloCaptura',{  
                        
                        //***************************** PERSONA*/ 
                        'rAtencionId': me.rAtencionId, 
                        'clasificacionpersona': me.clasificacionpersona,
                        'pInicio': false,
                        
                        'statusAnonimo': me.switch2,
                        'tipoPersona': me.radios,
                        'rfc': me.rfc,
                        'razonsocial': me.razonsocial, 
                        
                        'nombre': me.nombres,
                        'apellidoPaterno' : me.apaterno,
                        'apellidoMaterno' : me.amaterno,
                        'alias': me.alias,
                        'PoliciaDetuvo' : idPoliciaDetuvo,
                        'statusAlias': false,
                        'fechaNacimiento' : me.fnacimiento,
                        'entidadFederativa': me.abreviacion.text,
                        'docIdentificacion': me.docidentificacion,
                        'curp': me.curp,
                        'sexo' : me.sexo,
                        'estadoCivil': me.estadocivil,
                        'genero': me.genero,
                        'telefono1': me.telefono1,
                        'telefono2': me.telefono2,
                        'correo': me.correo,
                        'medioNotificacion': me.medionotificacion,
                        'nacionalidad': me.nacionalidad,
                        'ocupacion': me.ocupacion,
                        'nivelEstudio': me.nivelestudio,
                        'lengua': me.lengua,
                        'religion': me.religion,
                        'discapacidad': me.switch1,
                        'tipoDiscapacidad': me.discapacidad, 
                        'DatosProtegidos': me.datosprotegidos,
                        'Relacion': me.relacion,
                        'Parentesco': me.relacionado,
                        'Edad': me.edadf, 
                        'DocPoderNotarial':me.documentoacredita,
                        'InicioDetenido': me.detenciondetenido,
                        'CumpleRequisitoLey': me.cumplerequisitosley,
                        'DecretoLibertad': me.decretolibertad,
                        'DispusoLibertad': me.dispusolibertad,
                        //***************************** DIRECCION PERSONAL */ 
                        'calle': me.calle,
                        'noExt': me.noExt,
                        'noInt': me.noInt,
                        'entreCalle1': me.entreCalle1,
                        'entreCalle2': me.entreCalle2,
                        'referencia': me.referencia,
                        'pais': me.pais,
                        'estado': me.estado,
                        'municipio': me.municipio,
                        'localidad': me.localidad,
                        'cp': me.cp,
                        'lat': 0,
                        'lng': 0,
                        
                    },configuracion).then(function(response){ 

                        me.$cat.post('api/DocumentosPesonas/Crear',{  

                            'PersonaId': response.data.personaid, 
                            'TipoDocumento': me.docidentificacion,
                            'NombreDocumento': "Documento",
                            'Descripcion': "",
                            'Ruta':"ruta",
                            'Distrito': me.u_distrito,
                            'DirSubProc':me.u_dirSubPro,
                            'Agencia':me.u_agencia,
                            'Usuario': me.u_nombre,
                            'Puesto': me.u_puesto,
                            
                        },configuracion).then(function(response){  
                            me.$notify('La información se guardo correctamente !!!','success')   
                        }).catch(err => { 
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        }); 

                        me.$notify('La información se guardo correctamente !!!','success')                 
                        me.listarrap();
                        me.close(); 

                        }).catch(err => { 
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        });

                    } 
                }  
            })
        },
        generateUUID: function() { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return newGuid;
        },
        pickFile () {
            this.removeImage()
            this.$refs.image.click ()
        }, 
        removeImage () {
            this.$refs.image.value = ''
        },
		onFilePicked (e) {
			const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            

             imprim1(){
                
                var printContents = document.getElementById('mapa').outerHTML;
                var w = window.open();
                w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
                //w.document.write(printContents);
                w.print();
        
            },
            btn_geoloc12(){
                this.geoloc2=1;
                this.modalGeolocalizacion2 = 1;
            },
            btn_geoloc22(){
                this.geoloc2=2;
                this.modalGeolocalizacion2 = 1;
            }, 
            setPlace2(place) {
                    this.markers2= [],
                    this.places2= [],
                    this.currentPlace2 = place;
            },
            addMarker2() {
                    
                const marker = {
                    lat: this.center2.lat,
                    lng: this.center2.lng, 

                };
                this.markers2.push({ position: marker });
                this.places2.push(this.currentPlace2);
                this.center2 = marker;
                this.currentPlace2 = null;
                        
            },
            geolocate2: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center2 = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude, 
                
                    };
                });
            },
            guardarGeolocalizacion2(){
                if(this.geoloc==1){
                    this.lat2 = this.center2.lat;
                    this.lng2 = this.center2.lng;
                    this.geoloc2=0;
                    this.modalGeolocalizacion2=0;
                }
                if(this.geoloc==2){
                    this.de_lat2 = this.center2.lat;
                    this.de_lng2 = this.center2.lng;
                    this.geoloc2=0;
                    this.modalGeolocalizacion2=0;
                }
            },
            activarterreno(){
               this.opcionesmapa.mapTypeId = 'roadmap'
            },
            activarsatellite(){
                this.opcionesmapa.mapTypeId = 'hybrid' 
            },
            aumentarzoorm(){
                this.zoom++;
            },
            disminuirzoom(){
                this.zoom--;
            },
        },
 
       
   }
</script>
<style>
.espaciado{
    padding: 10px !important; 
}

</style>