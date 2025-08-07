<template>
   <v-layout align-start v-if="isReady">
    <v-navigation-drawer v-model="this.drawer" app  class="primary"  >
            <div class="text-xl-center text-md-center text-xs-center my-4">
                <a href="/Panel"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
            </div>
  
            <v-list dense dark class="pt-0 primary" >
                <template v-if="esAdministrador">
                    <v-list-tile  :to="{name:'control-acceso'}">
                    <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
                    </v-list-tile>
                </template>  
         
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator"> 
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Panel de control
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-panel-control' == '#' ? '' :  'control-acceso-panel-control'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">view_module</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Configuracion del panel de control
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    </v-list-group>
                </template>
  
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator">   
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Roles
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-rol'== '#' ? '' :  'control-acceso-rol'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">security</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Roles
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    </v-list-group>
                </template>
  
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator">   
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Usuarios
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-usuario'== '#' ? '' :  'control-acceso-usuario'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">account_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                        Gestión de usuarios
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 

                    <v-list-tile :to="{ name: 'clonacionesfallidas' }"  active-class="secondary">  
                        <v-list-tile-action>
                            <v-icon class="centenarioMenuIcon">report</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="centenarioMenuModules">
                            Clonaciones fallidas
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    
                    </v-list-group>
                </template> 
          
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator"> 
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Almacenamiento
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-almacenamiento'== '#' ? '' :  'control-acceso-almacenamiento'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">storage</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Administración de discos duros
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
            <v-toolbar-title class="font-weight-regular" >Usuarios.</v-toolbar-title>
            
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
                    > account_box</v-icon>
                </v-badge>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
                <v-btn class="mx-2" @click="agregar" fab dark small color="primary">
                    <v-icon dark>add</v-icon>
                </v-btn>

        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="usuarios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"  
            class="elevation-1"  >
            <template slot="items" class="white" slot-scope="props">
                
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.responsableCuenta }}</td>
                <td><v-icon  small  class="mr-2" color="success">bookmark</v-icon>{{ props.item.nombrerol }}</td>
                <td><v-icon  small  class="mr-2"  >person</v-icon>{{ props.item.usuario }}</td> 
                <td>{{ props.item.distrito }}</td>
                <td>{{ props.item.agencia }}</td>
                <td><v-icon  small  class="mr-2" color="info">bookmark</v-icon>{{ props.item.modulonombre }}</td> 
                <td>
                    <div v-if="props.item.condicion">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </td>
                
                <td class="justify-center layout px-0">
                    <!--<v-icon 
                        class="mr-2" color="warning"
                        @click="agregarpanel(props.item)"
                        >
                        view_module
                    </v-icon>-->
                    <v-icon
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
                    </v-icon>
                    <v-icon 
                        class="mr-2"
                        @click="verHistorial(props.item)"
                        >
                        visibility
                    </v-icon>
                    <template v-if="props.item.condicion">
                        <v-icon 
                        @click="activarDesactivarMostrar(2,props.item)"
                        >
                        block
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon 
                            class="mr-2"
                            @click="activarDesactivarMostrar(1,props.item)"
                            >
                            closed_caption
                        </v-icon>
                    </template>
                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
            </template>
        </v-data-table>

    </v-flex>

        <v-dialog   v-model="dialog"  fullscreen hide-overlay transition="dialog-bottom-transition">
                            
            <v-card>
                <v-toolbar dark color="primary">

                    <v-toolbar-title>{{formTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="guardar()">Guardar</v-btn>
                        <v-btn icon   @click="dialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-form ref="form" data-vv-scope="dialogoUsuario">


                <v-container grid-list-md text-xs-center>

                    <v-layout row wrap>
                    
                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 


                            <v-text-field 
                                name="nombre" 
                                label="Nombre:"
                                v-model="nombre" 
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.nombre')">
                            </v-text-field>

                            <v-text-field
                                name="responsablecuenta" 
                                label="Responsable de la cuenta:"
                                v-model="responsableCuenta" 
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.responsablecuenta')">
                            </v-text-field>

                            <v-text-field 
                                    name="puesto" 
                                    label="Puesto:"
                                    v-model="puesto" 
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.puesto')">
                                  </v-text-field> 

                            <v-autocomplete 
                                    name="rol"
                                    label="Rol:"
                                    v-model="idrol"
                                    :items="roles" 
                                    return-object
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.rol')" >
                                </v-autocomplete>

                                <v-text-field
                                    name="email" 
                                    label="Email:"
                                    v-model="email" 
                                    v-validate="'required|email'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.email')">
                                </v-text-field>

                            <v-text-field 
                                    name="telefono" 
                                    label="Telefono:"
                                    v-model="telefono" 
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.telefono')">
                                </v-text-field>

                            <v-text-field 
                                    name="oficio" 
                                    label="Oficio de solicitud para la edición:"
                                    v-model="oficio" 
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.oficio')">
                                </v-text-field>

                        </v-flex>

                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 

                            <v-text-field 
                                    name="dirección" 
                                    label="Dirección:"
                                    v-model="direccion" 
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    :error-messages="errors.collect('dialogoUsuario.dirección')">
                                </v-text-field>

                            <v-autocomplete
                                name="distrito"
                                label="Distrito:"
                                v-model="distrito"
                                :items="distritos"
                                return-object
                                v-on:change="listarDSP()"  
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.distrito')">
                            </v-autocomplete>

                            <v-autocomplete 
                                    name="direccion subprocuraduria" 
                                    label="Direccion subprocuraduria:"
                                    v-model="iddsp"
                                    :items="dsp" 
                                    return-object
                                    v-validate="'required'"
                                    data-vv-scope="dialogoUsuario"
                                    v-on:change="listarAgencia()"  
                                    :error-messages="errors.collect('dialogoUsuario.direccion subprocuraduria')">
                                </v-autocomplete>

                            <v-autocomplete 
                                name="agencia"
                                label="Agencia:"
                                v-model="idagencia"
                                :items="agencias"
                                return-object
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                v-on:change="listarModulo()"   
                                :error-messages="errors.collect('dialogoUsuario.agencia')">
                            </v-autocomplete> 

                            <v-autocomplete 
                                name="modulo"
                                label="Modulo:"
                                v-model="idModuloServicio"
                                :items="modulos" 
                                return-object
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.modulo')" >
                            </v-autocomplete> 

                            <v-text-field
                                name="usuario" 
                                label="Usuario:"
                                v-model="usuario" 
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.usuario')">
                            </v-text-field>

                            <v-text-field 
                                name="password"
                                label="Password:"
                                type="password" 
                                v-model="password" 
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.password')">
                            </v-text-field>

                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                            <v-btn 
                                                color="success" 
                                                text 
                                                @click="generarContrasenia()"
                                                >
                                                Generar contraseña
                                            </v-btn>
                                    </template>
                                </v-tooltip>

                        </v-flex>

                        <v-select
                                v-model="panel"
                                :items="panels"
                                multiple
                                deletable-chips
                                label="Modulos"
                                name="modulos"
                                chips
                                hint="Modulos asignados"
                                persistent-hint
                                return-object
                                :menu-props="{ offsetY: true, zIndex: 1000 }"
                                v-validate="'required'"
                                data-vv-scope="dialogoUsuario"
                                :error-messages="errors.collect('dialogoUsuario.modulos')"
                            />
                    
                    </v-layout>
                </v-container> 
            </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="adModal" max-width="400px">
            <v-card>
                <v-card-title class="subheading thin" v-if="adAccion==1"><v-icon>security</v-icon> ¿Activar usuario?</v-card-title>
                <v-card-title class="subheading thin" v-if="adAccion==2"><v-icon>security</v-icon> ¿Desactivar usuario?</v-card-title>
                <v-card-text>
                    Estás a punto de 
                     <span class="bold-text" v-if="adAccion==1"><strong>ACTIVAR</strong></span>
                    <span class="bold-text" v-if="adAccion==2"><strong>DESACTIVAR</strong> </span>
                    el usuario con  el nombre: {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="adModal = false">
                        Cancelar
                    </v-btn>
                    <v-btn v-if="adAccion==1" color="success"   @click="activar">
                        Activar
                    </v-btn>
                    <v-btn v-if="adAccion==2" color="success"   @click="desactivar">
                        Desactivar
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
        <v-dialog v-model="addPanel" persistent max-width="1500px">
                <v-card elevation="0" > 
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="30">
                                <v-icon class="grey lighten-2">add</v-icon>
                            </v-avatar> 
                        <v-toolbar-title class="subheading">Agregar modulos al usuario</v-toolbar-title>
                    <v-spacer></v-spacer> 
                    </v-toolbar>
                        <v-form ref="form">
            <v-card-text  class="px-5">   
                
                    <v-list two-line>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="primary">account_box</v-icon>
                            </v-list-tile-action>
                
                            <v-list-tile-content>
                                <v-list-tile-title>Usuario:</v-list-tile-title>
                                <v-list-tile-sub-title>{{nombre}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                
                            <v-list-tile-action>
                                <v-icon>check</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                            <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="primary">account_tree</v-icon>
                            </v-list-tile-action>
                
                            <v-list-tile-content>
                                <v-list-tile-title>Puesto:</v-list-tile-title>
                                <v-list-tile-sub-title> {{ puesto }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                
                            <v-list-tile-action>
                                <v-icon>check</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="primary">account_balance</v-icon>
                            </v-list-tile-action>
                
                            <v-list-tile-content>
                                <v-list-tile-title>Agencia:</v-list-tile-title>
                                <v-list-tile-sub-title>{{nombreAgencia}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                
                            <v-list-tile-action>
                                <v-icon>check</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                            <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="primary">work</v-icon>
                            </v-list-tile-action>
                
                            <v-list-tile-content>
                                <v-list-tile-title>Modulo:</v-list-tile-title>
                                <v-list-tile-sub-title> {{nombreModulo}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                
                            <v-list-tile-action>
                                <v-icon>check</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
            
                        
                        <v-divider inset></v-divider>
                            
                                
                                <div px-5>
                                <v-select
                                    v-model="panel"
                                    :items="panels"
                                    multiple
                                    deletable-chips
                                    label="Modulos"
                                    chips
                                    hint="Modulos asignados"
                                    persistent-hint
                                    return-object
                                    :menu-props="{ offsetY: true, zIndex: 10000 }"
                                />
                            </div>                    
                    </v-list>
                    
            </v-card-text>
                <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="close" >Cancelar</v-btn>
                            <v-btn @click.native="guardarPaneles" class="success" >Guardar</v-btn>
                        </v-card-actions>
                            </v-form>

        </v-card>
        </v-dialog>
        <!-- Animacion de espera clonacion de usuarios -->
        <v-dialog v-model="cargando" persistent  max-width="1000px" content-class="dialog-top-center">
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                    <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading"
                    >El usuario se esta clonando a {{ distritoEnProceso }} </v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                </div>
            </v-card>
        </v-dialog>
        <!-- Modal para historial de usuario -->
        <v-dialog v-model="modalhistorial" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Información de historial del usuario.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn icon @click="modalhistorial = false">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                            :headers="headersH"
                            :items="historialUsuario"
                            :search="search"
                            :rows-per-page-items="rowsPerPageItems"
                            :pagination.sync="pagination"
                        >
                            <template slot="items" class="white" slot-scope="props">
                                <td>{{ props.item.usuario }}</td>
                                <td>{{ props.item.descripcionMovimiento }}</td>
                                <td>{{ props.item.proceso }}</td>    
                                <td>{{ props.item.distritoHaceMovimiento }}</td>
                                <td>{{ props.item.dirSubHaceMovimiento }}</td>
                                <td>{{ props.item.agenciaHaceMovimiento }}</td>
                                <td>{{ props.item.moduloHaceMovimiento }}</td> 
                                <td>{{ props.item.responsableCuentaHaceMovimiento }}</td> 
                                <td>
                                    {{
                                    props.item.fechaRegistro.substring(8, 10) +
                                    " de " +
                                    obtenermes(props.item.fechaRegistro.substring(5, 7) - 1) +
                                    " del " +
                                    props.item.fechaRegistro.substring(0, 4)+
                                    " a las " +
                                    props.item.fechaRegistro.substring(11, 16)
                                    }}
                                </td>
                                <td v-if="props.item.rutaResponsiva !== null" class="justify-center layout px-0">
                                    <v-icon 
                                        class="mr-2" color="success"
                                        @click="reimprimirResponsiva(props.item)"
                                        >
                                        print
                                    </v-icon>
                               </td>
                            </template>
                            <template slot="no-data">
                                <v-btn color="primary">Resetear</v-btn>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    </v-card>
            </v-dialog>
    </v-layout> 
    
</template>

<script>
    import n401 from '../../components/control_acceso/401.vue'
    import n403 from '../../components/control_acceso/403.vue'
    import axios from 'axios'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';
    import pdfMake from "pdfmake/build/pdfmake";
    import moment from 'moment';
    import "moment/locale/es";
    import { generarQRCodeBase64 } from '../../components/control_acceso/crearQR';
    import pdfFonts from "pdfmake/build/vfs_fonts";
    import htmlToPdfmake from "html-to-pdfmake";
   
    export default {
         components:{
             n401,
             n403
        },
        data(){
            return {
                keycloakUserToken:'',
                keycloakPasswordToken:'',
                createdKeycloakUserId: [],
                isReady: false,
                u_iddistrito:'',
                u_distrito:'',
                u_dirSubPro:'',
                u_idagencia:'',
                u_agencia:'',
                u_idmoduloservicio:'',
                u_modulo:'',
                u_idusuario:'',
                u_nombre:'',
                u_responsablecuenta:'',
                e401:false, 
                e403:false,
                showpage:true,  

                show: true,
                dense:true,
                usuarios:[],                
                dialog: false,
                headers: [
                    
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Responsable de la cuenta', value: 'responsableCuenta' },
                    { text: 'Rol', value: 'nombrerol' },
                    { text: 'Usuario', value: 'usuario'},
                    { text: 'Distrito', value: 'distrito'},
                    { text: 'Agencia', value: 'agencia'},
                    { text: 'Modulo', value: 'modulonombre'},  
                    { text: 'Estado', value: 'condicion'}, 
                    { text: 'Opciones', value: 'opciones'},                
                ],
                headersH: [
                    { text: 'Usuario Centenario', value: 'usuario' },
                    { text: 'Movimientos realizados', value: 'descripcionMovimiento' },
                    { text: 'Proceso', value: 'proceso' },
                    { text: 'Distrito', value: 'distrito'},
                    { text: 'Subdireccion', value: 'dirSubHaceMovimiento'},
                    { text: 'Agencia', value: 'agenciaHaceMovimiento'},
                    { text: 'Modulo', value: 'moduloHaceMovimiento'},  
                    { text: 'Usuario', value: 'responsableCuentaHaceMovimiento'}, 
                    { text: 'fecha del movimiento', value: 'fechaRegistro' },
                    { text: 'Opciones', value: 'opciones'}, 
                ],
                search: '',
                rowsPerPageItems: [15, 30, 40, 50],
                pagination: {
                    rowsPerPage: 15
                },
            editedIndex: -1, 
                
                nombre:'',
                idUsuario: '',
                distritos:[],
                distrito:'',
                dsp:[],
                iddsp:'',

                agencias:[], 
                idagencia:'',

                idrol:'',
                roles:[], 

                modulos: [],
                idModuloServicio: '',

                puesto:'',
                direccion:'',
                telefono: '',
                email: '',
                condicion: true,
                contador:0,
                nombreModulo:'',
                nombreAgencia:'',
                nombreSubDir:'',

                usuario:'',
                password:'',
                actPassword:false,
                passwordAnt:'',
                responsableCuenta:'',
                urlDistrito:'',

                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: '', 
                
                addPanel:false,
                panel:[],
                panels:[],
                panelesAnteriores:[],
                distritoActual:'',
                idDistritoPach:'7f662ec1-6705-406e-bcd0-f56ade7bcae2',
                distritoFallo:[],

                cargando: false,
                distritoEnProceso:'',
                descripcionMovimiento:'',
                ModuloServicioIdAnterior:'',
                //Variable para descripcion de cambio
                nombreAnt:'',
                responsableAnt:'',
                puestoAnt:'',
                direcionAnt:'',
                distritoAnt:'',
                distritoIdAnt:'',
                subdirAnt:'',
                subdirIdAnt:'',
                agenciaAnt:'',
                agenciaIdAnt:'',
                moduloAnt:'',
                moduloIdAnt:'',
                rolAnt:'',
                rolIdAnt:'',
                emailAnt:'',
                telefonoAnt:'',
                usuarioAnt:'',
                historialUsuario:[],
                modalhistorial:false,
                oficio:'',
                datosImpresion:[],
                contrasena:'',
                indicaPass:false,
                texto: 'Vista Previa',
                qrCode: null,
            }
        },
      
       computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo usuario' : 'Actualizar usuario'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            //ESTO LO COLOCAMOS PORQUE LO REQUIERE EL COMPONENTE DE DRAW MENU
            logueado(){
                return this.$store.state.usuario;
            },
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            usuario(){
                return this.$store.state.usuario.usuario;
            },
            email(){
                return this.$store.state.usuario.email;
            },
            drawer(){
                return this.$store.state.drawer //es para acceder al valor que esta almacenado en el storage
            }
        },

        watch: {
            dialog (val) 
            {
                val || this.close()
            },
        },
        mounted(){
        },
        created () {
          
            if(!localStorage.getItem("token"))
            {
              window.location.href = "/"
            }
            else 
            {
              this.isReady = true;
              this.$store.dispatch("guardarToken", localStorage.getItem("token"))
              this.$store.dispatch("setLogin", localStorage.getItem("token"))
            }

            this.u_iddistrito=this.$store.state.usuario.iddistrito;
            this.u_distrito=this.$store.state.usuario.distrito; 

            this.u_dirSubPro=this.$store.state.usuario.dirSubProc;
            this.u_idagencia=this.$store.state.usuario.idagencia;
            this.u_agencia=this.$store.state.usuario.agencia;
            this.u_idmoduloservicio=this.$store.state.usuario.idmoduloservicio;
            this.u_modulo=this.$store.state.usuario.modulo;
            this.u_idusuario=this.$store.state.usuario.idusuario;
            this.u_responsablecuenta=this.$store.state.usuario.responsablecuenta;

            // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
            // Do something before request is sent
            this.$store.commit('LOADER',true);
            return config;
            }, (error)=> {
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });

            // Add a response interceptor
            axios.interceptors.response.use((response)=>{
            this.$store.commit('LOADER',false);
            // Do something with response data
            return response;
            },  (err)=> {
            
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });

            this.listar();
            this.selectroles();
            this.listarPanels();
            this.listardistritos();
            this.listarLogo();
        },

        methods:{


          //Esta funcion no debe implementarse, se recomienda agregar un campo para CURP y otro para RFC
          // se usa debido a que no es posible enviar datos vacios a keycloak
          generarCurpYRfc(nombre, apellidoP) {
            const estados = [
              'AS','BC','BS','CC','CL','CM','CS','CH','DF','DG','GT','GR','HG','JC',
              'MC','MN','MS','NT','NL','OC','PL','QT','QR','SP','SL','SR','TC','TS','TL','VZ','YN','ZS','NE'
            ];

            const nombres = ['JUAN', 'MARIA', 'JOSE', 'LUIS', 'ANA'];
            const apellidos = ['HERNANDEZ', 'GOMEZ', 'LOPEZ', 'MARTINEZ', 'GARCIA'];

            const vocales = 'AEIOU';
            const consonantes = 'BCDFGHJKLMNPQRSTVWXYZ';

            const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

            //const nombre = getRandom(nombres);
            //const apellidoP = getRandom(apellidos);
            const apellidoM = getRandom(apellidos);

            const getVocalInterna = str => [...str.slice(1)].find(l => vocales.includes(l)) || 'X';
            const getConsonanteInterna = str => [...str.slice(1)].find(l => consonantes.includes(l)) || 'X';

            const fecha = new Date(
                Math.floor(Math.random() * (2005 - 1950 + 1)) + 1950,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            );

            const año = fecha.getFullYear();
            const añoStr = String(año).slice(2);
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const dia = String(fecha.getDate()).padStart(2, '0');

            const sexo = Math.random() < 0.5 ? 'H' : 'M';
            const estado = getRandom(estados);

            const curp =
                apellidoP[0] +
                getVocalInterna(apellidoP) +
                apellidoM[0] +
                nombre[0] +
                añoStr + mes + dia +
                sexo +
                estado +
                getConsonanteInterna(apellidoP) +
                getConsonanteInterna(apellidoM) +
                getConsonanteInterna(nombre) +
                Math.floor(Math.random() * 10) + '0';

            const rfc =
                apellidoP[0] +
                getVocalInterna(apellidoP) +
                apellidoM[0] +
                nombre[0] +
                añoStr + mes + dia +
                Math.random().toString(36).substring(2, 5).toUpperCase();

            return {
              nombreCompleto: `${nombre} ${apellidoP} ${apellidoM}`,
              fechaNacimiento: `${año}-${mes}-${dia}`,
              sexo,
              estado,
              curp: curp.toUpperCase(),
              rfc: rfc.toUpperCase()
            };
          },





          //Generar los tokens para las peticiones de keycloak
          async generateTokenPassword(){
            try {
              const data = new URLSearchParams();
              data.append('grant_type', 'password');
              data.append('client_id', 'admin-cli');
              data.append('password', 'admin');
              data.append('username', 'alessandro2204@outlook.com');
              data.append('realm', 'procu');


              const response = await this.$controlacceso.post('api/Usuarios/GetTokenKeyCloakWithGrantTypePassword', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded',}} );

              if (!response.data || !response.data.access_token) {
                throw new Error("Token no obtenido desde Keycloak");
              }

              this.keycloakPasswordToken = response.data.access_token;
              return response.data.access_token
            } catch (error) {
              throw error;
            }
          },


          async generateUserToken() {
             try {
              const data = new URLSearchParams();
              data.append('grant_type', 'client_credentials');
              data.append('client_id', 'api-custom-client');
              data.append('client_secret', '8PNGHcO6NortLoGBGGSG563IqdFPLNTj');

              const response = await this.$controlacceso.post(
                  'api/Usuarios/GetTokenKeyCloak',
                  data,
                  { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
              );

              this.keycloakUserToken = response.data.access_token;
              return response.data.access_token;
            } catch (error) {
              throw error;
            }
          },




          //Metodo para crear al usuario en keycloak
          async createKeycloakUser(configuracion){
            let me = this

            if(!me.nombre.split(" ")[1]){
              this.errors.add({
                field: 'nombre',
                msg: 'Ingrese un nombre con al menos un apellido separados por un espacio'
              });
            }

            if(me.password.length<8){
              this.errors.add({
                field: 'password',
                msg: 'La contraseña debe tener al menos 8 carácteres'
              });
            }
            else if(!/(?=.*?[0-9])/.test(me.password)){
              this.errors.add({
                field: 'password',
                msg: 'La contraseña debe tener al menos un número'
              });
            }
            else if(!/(?=.*?[A-Z])/.test(me.password)){
              this.errors.add({
                field: 'password',
                msg: 'La contraseña debe tener al menos una mayúscula'
              });
            }
            else if(!/(?=.*?[a-z])/.test(me.password)){
              this.errors.add({
                field: 'password',
                msg: 'La contraseña debe tener al menos una minúscula'
              });
            }
            else if(!/^(?=.*\d)(?=.*[!@#$%^&*])/.test(me.password)){
              this.errors.add({
                field: 'password',
                msg: 'La contraseña debe tener al menos un símbolo'
              });
            }


            if(me.password.length<8 || !/(?=.*?[0-9])/.test(me.password) || !/(?=.*?[A-Z])/.test(me.password) || !/(?=.*?[a-z])/.test(me.password)){
              me.$notify("Utilice al menos 8 carácteres utilice mayúsculas, minúsculas y números", 'error');
              return;
            }
              
            let passwordToken = await this.generateTokenPassword();
            
            //El email en keycloak se considera como el usuario, deben de tener datos todos los campos, de lo contrario existirán errores
            const data = [{
              username: me.usuario,
              email: me.email,
              CURP: this.generarCurpYRfc(me.nombre.split(" ")[0], me.nombre.split(" ")[1]).curp,
              rfc: this.generarCurpYRfc(me.nombre.split(" ")[0], me.nombre.split(" ")[1]).rfc,
              firstName: me.nombre,
              lastName: me.nombre,
              segundoApellido: me.nombre,
              telefono: me.telefono,
              Calle: me.direccion,
              Numero: me.direccion,
              Estado: me.direccion,
              Municipio: me.direccion,
              Colonia: me.direccion,
              PreferenciaContacto: "SMS",
              cp: me.direccion,
              password: me.password,
              type_persona: "Fisica",
            }]

            //Creamos el usuario en keycloak
            me.$controlacceso.post('api/Usuarios/CrearUsuarioKeycloak', data, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then( (response) => {

              //Si la creación en keycloak es exitosa procedemos a crear la contraseña para el usuario creado
              let passwordData = { type: "password", value: me.password, temporary: false }

              //Si la respuesta es un error se muestran los detalles - usuario duplicado, telefono, nombre etc.
              if (response.data.usuariosConError &&
                  response.data.usuariosConError.length > 0 &&
                  response.data.usuariosConError[0].error &&
                  response.data.usuariosConError[0].error.trim() !== ''){
                me.$notify("Error "+response.data.usuariosConError[0].error,'error')
              }
              else {
                //obtenemos el ID del usuario recién creado en keycloak
                this.createdKeycloakUserId = response.data.listaDeUsuariosCreados

                me.$controlacceso.put('api/Usuarios/'+this.createdKeycloakUserId[0]+'/ActualizarContrasenaKeycloak', passwordData,{
                  headers: {
                    'Content-Type': 'application/json',
                    //usamos el token del password
                    'Token': passwordToken
                  }
                }).then((response) => {
                  //si la contraseña es agregada exitosamente se procede a crear al usuario en la base de centenario
                  me.$notify("Usuario creado exitosamente en Keycloak")

                  this.$controlacceso.post('api/Usuarios/Crear',{
                    'rolId':me.idrol,
                    'moduloservicioId': me.idModuloServicio,
                    'puesto': me.puesto,
                    'nombre':me.nombre,
                    'direccion':me.direccion,
                    'telefono': me.telefono,
                    'email':me.email,
                    'condicion':me.condicion,
                    'usuario': me.usuario,
                    'password':me.password
                  }, configuracion).then(function(response){
                    me.close();
                    me.$notify('La información se guardo correctamente !!!','success')
                    me.listar();
                    me.limpiar();
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

                  //En caso de que exista un error en la creación de la contraseña, el usuario existirá en keycloak pero no en la base de centenario
                }).catch((error) => {me.$notify("Contraseña no actualizada", 'error')})
              }
            }).catch(error => {
              //En caso de que el usuario no se crease en keycloak, no se creara en la base de datos ni se intentará actualizar la contraseña
              if (error.response.status==409){
                let errorMessage = error.response.data;
                me.$notify(errorMessage, 'error')
              }else {
                me.$notify('No se creo el usuario en Keycloak:', "error")
              }
            });
          },


          //métodos para actualizar al usuario en keycloak
          async updateKeycloakUser(configuracion){
              let me = this

              if(me.password.length<8){
                this.errors.add({
                  field: 'password',
                  msg: 'La contraseña debe tener al menos 8 carácteres'
                });
              }
              else if(!/(?=.*?[0-9])/.test(me.password)){
                this.errors.add({
                  field: 'password',
                  msg: 'La contraseña debe tener al menos un número'
                });
              }
              else if(!/(?=.*?[A-Z])/.test(me.password)){
                this.errors.add({
                  field: 'password',
                  msg: 'La contraseña debe tener al menos una mayúscula'
                });
              }
              else if(!/(?=.*?[a-z])/.test(me.password)){
                this.errors.add({
                  field: 'password',
                  msg: 'La contraseña debe tener al menos una minúscula'
                });
              }

              if(me.password.length<8 || !/(?=.*?[0-9])/.test(me.password) || !/(?=.*?[A-Z])/.test(me.password) || !/(?=.*?[a-z])/.test(me.password)){
                me.$notify("Utilice al menos 8 carácteres y use mayúsculas, minúsculas y números", 'error');
                return;
              }


              //el usuario se actualiza sin contraseña por lo que hay que realizar otra petición para actualizarla
              let passwordToken = await this.generateTokenPassword();


              //el email en keycloak se considera como el usuario, deben de tener datos todos los campos, de lo contrario existirán errores

              //obtener los datos del usuario en keycloak, es necesario el id para actualizar la contraseña
              this.$controlacceso.get('api/Usuarios/ObtenerUsuarioKeycloak/'+me.usuarioAnt,
                  {
                    headers: {
                      'Token': passwordToken
                    }})
                  .then((response)=>{
                    this.createdKeycloakUserId = response.data[0].id;
                    const data = [{
                      username: me.usuarioAnt,
                      newUsername: me.usuario,
                      email: me.email,
                      CURP: response.data[0].curp,
                      firstName: me.nombre,
                      lastName: me.nombre,
                      segundoApellido: "",
                      telefono: me.telefono,
                      Calle: me.direccion,
                      Numero: me.direccion,
                      Estado: me.direccion,
                      Municipio: me.direccion,
                      Colonia: me.direccion,
                      PreferenciaContacto: "SMS",
                      cp: me.direccion,
                      rfc: response.data[0].rfc,
                      type_persona: "Fisica"
                    }]

                    //actualizar el usuario
                    this.$controlacceso.put('api/Usuarios/ActualizarUsuarioKeycloak', data, {
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    }).then( (response) => {

                      //si la creación en keycloak es exitosa procedemos a crear la contraseña para el usuario actualizado
                      let passwordData = {
                        type: "password",
                        value: me.password,
                        temporary: false
                      }

                      if (me.password!=me.passwordAnt) {
                        //actualizar la contraseña si el hash cambia

                        this.$controlacceso.put(
                            'api/Usuarios/'+this.createdKeycloakUserId+'/ActualizarContrasenaKeycloak',
                            passwordData
                            ,{
                              headers: {
                                'Content-Type': 'application/json',
                                'Token': passwordToken
                              }})
                            .then( (response) => {
                              //actualizacion del usuario en centenario con contraseña
                              me.$notify("la contraseña se ha actualizado correctamente")
                              if (me.distritoActual == me.idDistritoPach && me.distrito == me.idDistritoPach) {
                                console.log('son en el mismo distrito')
                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.close();
                                  me.$notify('La información se actualizo correctamente !!!', 'success')
                                  me.listar();
                                  me.limpiar();
                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });
                              }
                              else if (me.distritoActual == me.idDistritoPach && me.distrito != me.idDistritoPach) {
                                console.log('va de pachuca a otro distrito')

                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                                    'idusuario': me.idUsuario,
                                    'rolId': me.idrol,
                                    'moduloservicioId': me.idModuloServicio,
                                    'puesto': me.puesto,
                                    'nombre': me.nombre,
                                    'direccion': me.direccion,
                                    'telefono': me.telefono,
                                    'email': me.email,
                                    'condicion': me.condicion,
                                    'usuario': me.usuario,
                                    'password': me.password,
                                    'idDistrito': me.distrito,
                                    'caso': 2,
                                  }, configuracion).then(function (response) {

                                    me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                      'UsuarioId': me.idUsuario,
                                      'idDistrito': me.me.distrito,
                                      'caso': 2,
                                    }, configuracion).then(function (response) {

                                      me.close();
                                      me.$notify('La información se actualizo correctamente !!!', 'success')
                                      me.listar();
                                      me.limpiar();
                                    }).catch(error => {
                                      if (error.response.status == 400) {
                                        me.$notify("No es un usuario válido", 'error')
                                      } else if (error.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                            me.showpage = false
                                      } else if (error.response.status == 403) {
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false
                                      } else if (error.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                      } else {
                                        me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                      }

                                    });
                                  }).catch(error => {
                                    if (error.response.status == 400) {
                                      me.$notify("No es un usuario válido", 'error')
                                    } else if (error.response.status == 401) {
                                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                      me.e401 = true,
                                          me.showpage = false
                                    } else if (error.response.status == 403) {
                                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                                      me.e403 = true
                                      me.showpage = false
                                    } else if (error.response.status == 404) {
                                      me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else if (error.response.status == 504) {
                                      me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                                    }
                                    else {
                                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                    }

                                  });


                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });
                              }
                              else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {

                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                                    'idusuario': me.idUsuario,
                                    'rolId': me.idrol,
                                    'moduloservicioId': me.idModuloServicio,
                                    'puesto': me.puesto,
                                    'nombre': me.nombre,
                                    'direccion': me.direccion,
                                    'telefono': me.telefono,
                                    'email': me.email,
                                    'condicion': me.condicion,
                                    'usuario': me.usuario,
                                    'password': me.password,
                                    'idDistritoO': me.distritoActual,
                                    'idDistritoD': me.distrito,
                                    'caso': 3,
                                  }, configuracion).then(function (response) {
                                    // console.log(response)
                                    // me.close();
                                    // me.$notify('La información se actualizo correctamente !!!','success')
                                    // me.listar();
                                    // me.limpiar();
                                    me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                      'UsuarioId': me.idUsuario,
                                      'idDistritoD': me.distrito,
                                      'caso': 3,
                                    }, configuracion).then(function (response) {
                                      me.close();
                                      me.$notify('La información se actualizo correctamente !!!', 'success')
                                      me.listar();
                                      me.limpiar();
                                    }).catch(error => {
                                      if (error.response.status == 400) {
                                        me.$notify("No es un usuario válido", 'error')
                                      } else if (error.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                            me.showpage = false
                                      } else if (error.response.status == 403) {
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false
                                      } else if (error.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                      } else {
                                        me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                      }

                                    });
                                  }).catch(error => {
                                    if (error.response.status == 400) {
                                      me.$notify("No es un usuario válido", 'error')
                                    } else if (error.response.status == 401) {
                                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                      me.e401 = true,
                                          me.showpage = false
                                    } else if (error.response.status == 403) {
                                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                                      me.e403 = true
                                      me.showpage = false
                                    } else if (error.response.status == 404) {
                                      me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else if (error.response.status == 504) {
                                      me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                                    }
                                    else {
                                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                    }

                                  });

                                  // me.close();
                                  // me.$notify('La información se actualizo correctamente !!!','success')
                                  // me.listar();
                                  // me.limpiar();
                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });

                              }

                            })
                            .catch(error => {
                              //actualizacion del usuario en centenario con contraseña - falla el cambio de contraseña
                              me.$notify("la contraseña no se actualizó consulte un administrador: ", error)
                              if (me.distritoActual == me.idDistritoPach && me.distrito == me.idDistritoPach) {
                                console.log('son en el mismo distrito')
                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.close();
                                  me.$notify('La información se actualizo correctamente !!!', 'success')
                                  me.listar();
                                  me.limpiar();
                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });
                              }
                              else if (me.distritoActual == me.idDistritoPach && me.distrito != me.idDistritoPach) {
                                console.log('va de pachuca a otro distrito')

                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                                    'idusuario': me.idUsuario,
                                    'rolId': me.idrol,
                                    'moduloservicioId': me.idModuloServicio,
                                    'puesto': me.puesto,
                                    'nombre': me.nombre,
                                    'direccion': me.direccion,
                                    'telefono': me.telefono,
                                    'email': me.email,
                                    'condicion': me.condicion,
                                    'usuario': me.usuario,
                                    'password': me.password,
                                    'idDistrito': me.distrito,
                                    'caso': 2,
                                  }, configuracion).then(function (response) {
                                    // console.log(response)
                                    // me.close();
                                    // me.$notify('La información se actualizo correctamente !!!','success')
                                    // me.listar();
                                    // me.limpiar();

                                    me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                      'UsuarioId': me.idUsuario,
                                      'idDistrito': me.me.distrito,
                                      'caso': 2,
                                    }, configuracion).then(function (response) {

                                      me.close();
                                      me.$notify('La información se actualizo correctamente !!!', 'success')
                                      me.listar();
                                      me.limpiar();
                                    }).catch(error => {
                                      if (error.response.status == 400) {
                                        me.$notify("No es un usuario válido", 'error')
                                      } else if (error.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                            me.showpage = false
                                      } else if (error.response.status == 403) {
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false
                                      } else if (error.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                      } else {
                                        me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                      }

                                    });
                                  }).catch(error => {
                                    if (error.response.status == 400) {
                                      me.$notify("No es un usuario válido", 'error')
                                    } else if (error.response.status == 401) {
                                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                      me.e401 = true,
                                          me.showpage = false
                                    } else if (error.response.status == 403) {
                                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                                      me.e403 = true
                                      me.showpage = false
                                    } else if (error.response.status == 404) {
                                      me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else if (error.response.status == 504) {
                                      me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                                    }
                                    else {
                                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                    }

                                  });


                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });
                              }
                              else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {

                                me.$controlacceso.put('api/Usuarios/Actualizar', {
                                  'idusuario': me.idUsuario,
                                  'rolId': me.idrol,
                                  'moduloservicioId': me.idModuloServicio,
                                  'puesto': me.puesto,
                                  'nombre': me.nombre,
                                  'direccion': me.direccion,
                                  'telefono': me.telefono,
                                  'email': me.email,
                                  'condicion': me.condicion,
                                  'usuario': me.usuario,
                                  'password': me.password,
                                  'act_password': me.actPassword
                                }, configuracion).then(function (response) {

                                  me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                                    'idusuario': me.idUsuario,
                                    'rolId': me.idrol,
                                    'moduloservicioId': me.idModuloServicio,
                                    'puesto': me.puesto,
                                    'nombre': me.nombre,
                                    'direccion': me.direccion,
                                    'telefono': me.telefono,
                                    'email': me.email,
                                    'condicion': me.condicion,
                                    'usuario': me.usuario,
                                    'password': me.password,
                                    'idDistritoO': me.distritoActual,
                                    'idDistritoD': me.distrito,
                                    'caso': 3,
                                  }, configuracion).then(function (response) {
                                    // console.log(response)
                                    // me.close();
                                    // me.$notify('La información se actualizo correctamente !!!','success')
                                    // me.listar();
                                    // me.limpiar();
                                    me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                      'UsuarioId': me.idUsuario,
                                      'idDistritoD': me.distrito,
                                      'caso': 3,
                                    }, configuracion).then(function (response) {
                                      me.close();
                                      me.$notify('La información se actualizo correctamente !!!', 'success')
                                      me.listar();
                                      me.limpiar();
                                    }).catch(error => {
                                      if (error.response.status == 400) {
                                        me.$notify("No es un usuario válido", 'error')
                                      } else if (error.response.status == 401) {
                                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                        me.e401 = true,
                                            me.showpage = false
                                      } else if (error.response.status == 403) {
                                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                                        me.e403 = true
                                        me.showpage = false
                                      } else if (error.response.status == 404) {
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                      } else {
                                        me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                      }

                                    });
                                  }).catch(error => {
                                    if (error.response.status == 400) {
                                      me.$notify("No es un usuario válido", 'error')
                                    } else if (error.response.status == 401) {
                                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                      me.e401 = true,
                                          me.showpage = false
                                    } else if (error.response.status == 403) {
                                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                                      me.e403 = true
                                      me.showpage = false
                                    } else if (error.response.status == 404) {
                                      me.$notify("El recuso no ha sido encontrado", 'error')
                                    } else if (error.response.status == 504) {
                                      me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                                    }
                                    else {
                                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                    }

                                  });

                                  // me.close();
                                  // me.$notify('La información se actualizo correctamente !!!','success')
                                  // me.listar();
                                  // me.limpiar();
                                }).catch(error => {
                                  if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                  } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                  } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                  } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                  } else {
                                    me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                  }

                                });

                              }

                            })

                      }
                      else{
                        //es actualizacion del usuario en centenario sin contraseña
                        me.$notify("Usuario actualizado exitosamente en Keycloak")
                        //el distritoActual es el distrito del usuario que se esta editando
                        //el idDistritoPach es Pachuca
                        //cuando no cambia el distrito
                        if (me.distritoActual == me.idDistritoPach && me.distrito == me.idDistritoPach) {
                          console.log('son en el mismo distrito')
                          me.$controlacceso.put('api/Usuarios/Actualizar', {
                            'idusuario': me.idUsuario,
                            'rolId': me.idrol,
                            'moduloservicioId': me.idModuloServicio,
                            'puesto': me.puesto,
                            'nombre': me.nombre,
                            'direccion': me.direccion,
                            'telefono': me.telefono,
                            'email': me.email,
                            'condicion': me.condicion,
                            'usuario': me.usuario,
                            'password': me.password,
                            'act_password': me.actPassword
                          }, configuracion).then(function (response) {

                            me.close();
                            me.$notify('La información se actualizo correctamente !!!', 'success')
                            me.listar();
                            me.limpiar();
                          }).catch(error => {
                            if (error.response.status == 400) {
                              me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status == 401) {
                              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                              me.e401 = true,
                                  me.showpage = false
                            } else if (error.response.status == 403) {
                              me.$notify("No esta autorizado para ver esta pagina", 'error')
                              me.e403 = true
                              me.showpage = false
                            } else if (error.response.status == 404) {
                              me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                              me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                            }

                          });
                        }
                        //cuando el distrito actual es diferente de Pachuca caso 2
                        else if (me.distritoActual == me.idDistritoPach && me.distrito != me.idDistritoPach) {
                          console.log('va de pachuca a otro distrito')

                          me.$controlacceso.put('api/Usuarios/Actualizar', {
                            'idusuario': me.idUsuario,
                            'rolId': me.idrol,
                            'moduloservicioId': me.idModuloServicio,
                            'puesto': me.puesto,
                            'nombre': me.nombre,
                            'direccion': me.direccion,
                            'telefono': me.telefono,
                            'email': me.email,
                            'condicion': me.condicion,
                            'usuario': me.usuario,
                            'password': me.password,
                            'act_password': me.actPassword
                          }, configuracion).then(function (response) {

                            me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                              'idusuario': me.idUsuario,
                              'rolId': me.idrol,
                              'moduloservicioId': me.idModuloServicio,
                              'puesto': me.puesto,
                              'nombre': me.nombre,
                              'direccion': me.direccion,
                              'telefono': me.telefono,
                              'email': me.email,
                              'condicion': me.condicion,
                              'usuario': me.usuario,
                              'password': me.password,
                              'idDistrito': me.distrito,
                              'caso': 2,
                            }, configuracion).then(function (response) {
                              // console.log(response)
                              // me.close();
                              // me.$notify('La información se actualizo correctamente !!!','success')
                              // me.listar();
                              // me.limpiar();

                              me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                'UsuarioId': me.idUsuario,
                                'idDistrito': me.me.distrito,
                                'caso': 2,
                              }, configuracion).then(function (response) {

                                me.close();
                                me.$notify('La información se actualizo correctamente !!!', 'success')
                                me.listar();
                                me.limpiar();
                              }).catch(error => {
                                if (error.response.status == 400) {
                                  me.$notify("No es un usuario válido", 'error')
                                } else if (error.response.status == 401) {
                                  me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                  me.e401 = true,
                                      me.showpage = false
                                } else if (error.response.status == 403) {
                                  me.$notify("No esta autorizado para ver esta pagina", 'error')
                                  me.e403 = true
                                  me.showpage = false
                                } else if (error.response.status == 404) {
                                  me.$notify("El recuso no ha sido encontrado", 'error')
                                } else {
                                  me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                }

                              });
                            }).catch(error => {
                              if (error.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                              } else if (error.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                    me.showpage = false
                              } else if (error.response.status == 403) {
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403 = true
                                me.showpage = false
                              } else if (error.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                              } else if (error.response.status == 504) {
                              me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                              }
                            else {
                                me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                              }

                            });


                          }).catch(error => {
                            if (error.response.status == 400) {
                              me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status == 401) {
                              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                              me.e401 = true,
                                  me.showpage = false
                            } else if (error.response.status == 403) {
                              me.$notify("No esta autorizado para ver esta pagina", 'error')
                              me.e403 = true
                              me.showpage = false
                            } else if (error.response.status == 404) {
                              me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                              me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                            }

                          });
                        }
                        //cuando el distrito del usuario a editar es diferente de pachuca y  caso 3
                        else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {

                          me.$controlacceso.put('api/Usuarios/Actualizar', {
                            'idusuario': me.idUsuario,
                            'rolId': me.idrol,
                            'moduloservicioId': me.idModuloServicio,
                            'puesto': me.puesto,
                            'nombre': me.nombre,
                            'direccion': me.direccion,
                            'telefono': me.telefono,
                            'email': me.email,
                            'condicion': me.condicion,
                            'usuario': me.usuario,
                            'password': me.password,
                            'act_password': me.actPassword
                          }, configuracion).then(function (response) {

                            me.$controlacceso.post('api/Usuarios/ClonarUsuario', {
                              'idusuario': me.idUsuario,
                              'rolId': me.idrol,
                              'moduloservicioId': me.idModuloServicio,
                              'puesto': me.puesto,
                              'nombre': me.nombre,
                              'direccion': me.direccion,
                              'telefono': me.telefono,
                              'email': me.email,
                              'condicion': me.condicion,
                              'usuario': me.usuario,
                              'password': me.password,
                              'idDistritoO': me.distritoActual,
                              'idDistritoD': me.distrito,
                              'caso': 3,
                            }, configuracion).then(function (response) {
                              // console.log(response)
                              // me.close();
                              // me.$notify('La información se actualizo correctamente !!!','success')
                              // me.listar();
                              // me.limpiar();
                              me.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                'UsuarioId': me.idUsuario,
                                'idDistritoD': me.distrito,
                                'caso': 3,
                              }, configuracion).then(function (response) {
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!', 'success')
                                me.listar();
                                me.limpiar();
                              }).catch(error => {
                                if (error.response.status == 400) {
                                  me.$notify("No es un usuario válido", 'error')
                                } else if (error.response.status == 401) {
                                  me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                  me.e401 = true,
                                      me.showpage = false
                                } else if (error.response.status == 403) {
                                  me.$notify("No esta autorizado para ver esta pagina", 'error')
                                  me.e403 = true
                                  me.showpage = false
                                } else if (error.response.status == 404) {
                                  me.$notify("El recuso no ha sido encontrado", 'error')
                                } else {
                                  me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                                }

                              });
                            }).catch(error => {
                              if (error.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                              } else if (error.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                    me.showpage = false
                              } else if (error.response.status == 403) {
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403 = true
                                me.showpage = false
                              } else if (error.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                              } else if (error.response.status == 504) {
                                me.$notify("El servidor tardó demasiado en responder. Intenta de nuevo más tarde o contacta al administrador.", 'error');
                              }
                              else {
                                me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                              }

                            });

                            // me.close();
                            // me.$notify('La información se actualizo correctamente !!!','success')
                            // me.listar();
                            // me.limpiar();
                          }).catch(error => {
                            if (error.response.status == 400) {
                              me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status == 401) {
                              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                              me.e401 = true,
                                  me.showpage = false
                            } else if (error.response.status == 403) {
                              me.$notify("No esta autorizado para ver esta pagina", 'error')
                              me.e403 = true
                              me.showpage = false
                            } else if (error.response.status == 404) {
                              me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                              me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                            }

                          });

                        }

                      }

                    }).catch(error => {
                      //en caso de que el usuario no se actualizase en keycloak, no se actualizará en la base de datos ni se intentará actualizar la contraseña
                      if (error.response.status==409){
                        let errorMessage = error.response.data;
                        me.$notify(errorMessage, 'error')
                      }else {
                        let errorMessage = error.response.data.usuariosConError[0];
                        if(errorMessage.email){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.email, "error")
                        }
                        else if(errorMessage.telefono){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.telefono, "error")
                        }
                        else if(errorMessage.usuario){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.usuario, "error")
                        }
                        else if(errorMessage.curp){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.curp, "error")
                        }
                        else if(errorMessage.rfc){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.rfc, "error")
                        }
                        else if(errorMessage.newUsername){
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.newUsername, "error")
                        }
                        else{
                          me.$notify('No se creo el usuario en Keycloak:'+ errorMessage.error, "error")
                        }
                      }

                    });

                  })
                  .catch((error) => {
                    console.log("No fue posible obtener la información del usuario",error)
                  })
          },





          




          


          listarLogo(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
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





          //Funcion para listar los usuarios
          async listar() 
          {
            let me = this; 
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            try {
                let usuariosResponse = await this.$controlacceso.get('api/Usuarios/Listar', configuracion);
                me.contador = usuariosResponse.data.length;


                let [distritosResponse, agenciasResponse] = await Promise.all([
                    me.$conf.get('api/Distritoes/Listar', configuracion),
                    me.$conf.get('api/Agencias/Listar', configuracion)
                ]);

                me.usuarios = []
                usuariosResponse.data.map(dd => {
                    let d = distritosResponse.data.filter( e => e.idDistrito == dd.distritoId)            
                    let a = agenciasResponse.data.filter( e => e.idAgencia == dd.agenciaId)            
                    
                    me.usuarios.push({
                        agenciaId: dd.agenciaId,
                        condicion: dd.condicion,
                        contador: dd.contador,
                        direccion: dd.direccion,
                        distritoId: dd.distritoId,
                        dspId: dd.dspId,
                        email: dd.email,
                        idUsuario: dd.idUsuario,
                        moduloServicioId: dd.moduloServicioId,
                        modulonombre: dd.modulonombre,
                        nombre: dd.nombre,
                        nombreAgencia: dd.nombreAgencia,
                        nombrerol: dd.nombrerol,
                        password_hash: dd.password_hash,
                        puesto: dd.puesto,
                        rolId: dd.rolId,
                        telefono: dd.telefono,
                        titular: dd.titular,
                        usuario: dd.usuario,
                        agencia: a[0].nombre,
                        distrito: d[0].nombre,
                        responsableCuenta: dd.responsableCuenta,
                        urlDistrito: dd.urlDistrito,
                        nombreSubDir: dd.subdir
                    })
            });


            } catch (err) {
                if (err.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error');
                } else if (err.response.status == 401) {
                    me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error');
                    me.e401 = true;
                    me.showpage = false;
                } else if (err.response.status == 403) {
                    me.$notify("No está autorizado para ver esta página", 'error');
                    me.e403 = true;
                    me.showpage = false;
                } else if (err.response.status == 404) {
                    me.$notify("El recurso no ha sido encontrado", 'error');
                } else {
                    me.$notify('Error al intentar listar los registros!!!', 'error');
                }
            }
          },


          //Funcion para listar distritos
          listardistritos(){
              let me=this;
              var distritoarray=[]; 
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
              this.$conf.get('api/Distritoes/Listar', configuracion).then(function(response){
                  distritoarray=response.data;
                  distritoarray.map(function(x){me.distritos.push({text: x.nombre,value:x.idDistrito,value2:x.urlDistrito});});
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
                      me.$notify('Error al intentar lisatar los registros!!!','error')   
                  } 
              });
          },


          




          listarDSP(){
            let me=this;
            var dspArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.dsp = []

            var distri ='';

            if (me.distrito.value == undefined)
            {
              distri = me.distrito;
            }
            else{
              distri = me.distrito.value;
              me.iddsp ='';
              me.idagencia ='';
              me.idModuloServicio ='';
              me.agencias = [];
              me.modulos = [];
              me.urlDistrito = me.distrito.value2;
            }

            this.$conf.get('api/DSPs/ListarPorDistritoId/'+ distri, configuracion).then(function(response){
              dspArray=response.data;
              dspArray.map(function(x){me.dsp.push({text: x.nombreSubDir,value:x.idDSP});});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });
          },




          listarAgencia(){ 
                let me=this;
                me.agencias=[];
                var agenciaArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var dsp ='';
                if (me.iddsp.value == undefined)
                {
                  dsp = me.iddsp;
                }
                else{
                    dsp = me.iddsp.value;
                    //Se limpian los posteriores campos
                    me.idagencia ='';
                    me.idModuloServicio ='';
                    //De la misma forma se limpian los items para no poder ser selecionados
                    me.modulos = [];
                }
                this.$conf.get('api/Agencias/ListarPorDirSub/'+ dsp, configuracion).then(function(response){
                    agenciaArray=response.data;
                    agenciaArray.map(function(x){me.agencias.push({text: x.nombre,value:x.idAgencia});});
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
                        me.$notify('Error al intentar lisatar los registros!!!','error')   
                    } 
                });

            },



          listarModulo(){
                let me=this; 
                var modulosArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.modulos = [];
                var agencia='';
                if (me.idagencia.value == undefined)
                {
                  agencia =me.idagencia;
                }
                else
                {
                  agencia = me.idagencia.value;
                  //Se limpian los posteriores campos
                  me.idModuloServicio ='';
                }
                this.$conf.get('api/ModuloServicios/ListarPorAgencia/'+ agencia, configuracion).then(function(response){
                    modulosArray=response.data;
                    modulosArray.map(function(x){me.modulos.push({text: x.nombre,value:x.idModuloServicio});});
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
                        me.$notify('Error al intentar lisatar los registros!!!','error')   
                    } 
                });
            },


          //Funcion para listar roles
            selectroles()
            {
                let me=this;
                var rolesArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$controlacceso.get('api/Rols/Listar', configuracion).then(function(response)
                {
                    rolesArray=response.data;

                    rolesArray.map(function(x){me.roles.push({text: x.nombre,value:x.idrol});});

                }).catch(err => 
                { if (err.response.status==400){
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
          

          //Funcion para listar paneles
          listarPanels(){
            let me=this;
            var panelArray=[]; 

            me.$panel.get('api/PanelControls/Listar').then(function(response)
            {
              panelArray = response.data;
              panelArray.map(function(x){me.panels.push({text:x.nombre, value: x.idPC});})
            }).catch(function(error) 
            {
              console.log(error);
            });
          },



            guardarPaneles(){ 
              let me= this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              //Aqui analizo los paneles que se traian de base de datos y los nuevos que se estan poniendo o quitando
              const idsAnteriores = new Set(me.panelesAnteriores.map(p => p.value));
              const idsActuales = new Set(me.panel.map(p => p.value));

              //Con estas funciones filtro los que no conciden con el arreglo anterior y el nuevo
              const nuevos = me.panel.filter(p => !idsAnteriores.has(p.value));
              const eliminados = me.panelesAnteriores.filter(p => !idsActuales.has(p.value));

              //Aqui coloco un arreglo de los nombre de los modulos que cambiaron
              const nombresNuevos = nuevos.map(p => p.text);
              const nombresEliminados = eliminados.map(p => p.text);

              //Con estos condicionales concateno en texto que modulos de quitaron y cuales se agregaron
              if (nombresNuevos.length > 0)
              {
                  me.descripcionMovimiento += `\n- Se agregaron los módulos: ${nombresNuevos.join(', ')}`;
              }
              if (nombresEliminados.length > 0)
              {
                  me.descripcionMovimiento += `\n- Se eliminaron los módulos: ${nombresEliminados.join(', ')}`;
              }
              //En caso de que la descripcion de movimientos sea vacio le aviso que no modifico nada y termino el proceso
              if (me.descripcionMovimiento == '')
              {
                  me.$notify('Considiera que no se le edito nada al usuario','success') 
                  me.close();
              }
              //En caso de si haber movimientos procedo a arreglarlo de forma local
              if (me.descripcionMovimiento != '')
              {
                  me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ me.idUsuario, configuracion).then(function(response)
                  {
                      let promesas = [];
                      //Meto el recorrido en una variable de promesa para corroborar que la edicion local funciono
                      for (var i = 0; i < me.panel.length; i++) 
                      {
                          let promesa = me.$controlacceso.post('api/PanelUsuarios/Crear', {
                              'usuarioId': me.idUsuario,
                              'panelControlId': me.panel[i].value,
                          }, configuracion);

                          promesas.push(promesa);
                      }
                      //En caso de todo estar bien procedo a la clonacion del usuario
                      Promise.all(promesas).then(function (responses) 
                      {
                          me.clonacionUsuarios(me.idUsuario,me.usuario,"Edicion de modulos",null);
                      })
                      .catch(function (error) 
                      {
                          me.$notify('Error al intentar guardar los modulos!!!', 'error')
                      });
              
                  }).catch(err => 
                  { 
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
                          me.$notify('Error al intentar lisatar los registros!!!','error')   
                      } 
                  });
              }
            },








            
            editItem (item) {
                this.idUsuario=item.idUsuario;
                this.idrol=item.rolId;
                this.nombre=item.nombre;
                this.puesto=item.puesto; 
                this.responsableCuenta=item.responsableCuenta;
                this.distrito = item.distritoId;
                this.iddsp =item.dspId;
                this.idagencia =item.agenciaId,
                this.idModuloServicio=item.moduloServicioId;
                this.distritoActual = item.distritoId;
                this.nombreModulo= item.modulonombre;
                this.nombreAgencia= item.nombreAgencia;
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.email=item.email;
                this.usuario= item.usuario;
                this.password=item.password_hash;
                this.passwordAnt=item.password_hash;
                this.editedIndex=1;

                this.ModuloServicioIdAnterior  = item.moduloServicioId;

                this.listarDSP();
                this.listarAgencia();
                this.listarModulo();
                this.panelesPorUsuario(item.idUsuario);

                this.dialog = true

                //Seccion para armar el dialogo de descripcion de la edicion
                this.nombreAnt = item.nombre;
                this.responsableAnt = item.responsableCuenta;
                this.puestoAnt = item.puesto;
                this.direcionAnt = item.direccion;
                //Distrito
                this.distritoIdAnt = item.distritoId;
                this.distritoAnt = item.distrito;
                this.urlDistrito = item.urlDistrito;
                //Subdireccion
                this.subdirIdAnt = item.dspId;
                this.subdirAnt = item.nombreSubDir;
                //Agencia
                this.agenciaIdAnt = item.agenciaId;
                this.agenciaAnt = item.nombreAgencia;
                //Modulo
                this.moduloIdAnt = item.moduloServicioId;
                this.moduloAnt = item.modulonombre;
                //Rol
                this.rolAnt = item.nombrerol;
                this.rolIdAnt = item.rolId;
                //Datos generales
                this.emailAnt = item.email;
                this.telefonoAnt = item.telefono;
                this.usuarioAnt = item.usuario;
            },




            close () {
                this.dialog = false;
                this.addPanel = false;
                this.limpiar();
            },




            agregar(){
                this.dialog=true;
            },



            limpiar(){
                this.id="";
                this.idrol="";
                this.nombre="";
                this.idModuloServicio="";
                this.puesto="";
                this.distrito = ""
                this.direccion="";
                this.telefono="";
                this.email="";
                this.usuario="";
                this.password="";
                this.passwordAnt="";
                this.panel=[];
                this.iddsp ="";
                this.idagencia ="",
                this.idModuloServicio="";
                this.actPassword=false;
                this.editedIndex=-1;
                this.distritoActual=''
                this.distritoEstaba = '';
                this.distritoFallo = [];
                this.ModuloServicioIdAnterior = '';

                //Limpiar variables de dialogo
                this.nombreAnt='';
                this.responsableAnt='';
                this.puestoAnt='';
                this.direcionAnt='';
                this.distritoAnt='';
                this.subdirAnt='';
                this.agenciaAnt='';
                this.moduloAnt='';
                this.rolAnt='';
                this.rolIdAnt='';
                this.emailAnt='';
                this.telefonoAnt='';
                this.usuarioAnt='';
                this.distritoIdAnt='';
                this.subdirIdAnt='';
                this.agenciaIdAnt='';
                this.moduloIdAnt='';
                this.responsableCuenta='';
                this.urlDistrito = '';

                this.descripcionMovimiento = '';
                this.panelesAnteriores = [];
                this.datosImpresion = [];
                this.oficio = '';
                this.contrasena = '';
                this.indicaPass = false;
                this.qrCode =  null;
            },






            guardar () {
                let me=this;
                this.$validator.validateAll("dialogoUsuario").then((result) => 
                {
                    if (result) 
                    { 
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};

                        //Arreglo los valores de modulo para evitar enviar datos indefinidos en apis
                        var modulo='';
                        if (me.idModuloServicio.value == undefined)
                        {
                            modulo =me.idModuloServicio;
                        }
                        else
                        {
                            modulo =me.idModuloServicio.value;
                        }

                        //En caso de editar usuario
                        if (this.editedIndex > -1) 
                        { 
                            //Aqui analizo los paneles que se traian de base de datos y los nuevos que se estan poniendo o quitando
                            const idsAnteriores = new Set(me.panelesAnteriores.map(p => p.value));
                            const idsActuales = new Set(me.panel.map(p => p.value));

                            //Con estas funciones filtro los que no conciden con el arreglo anterior y el nuevo
                            const nuevos = me.panel.filter(p => !idsAnteriores.has(p.value));
                            const eliminados = me.panelesAnteriores.filter(p => !idsActuales.has(p.value));

                            //Aqui coloco un arreglo de los nombre de los modulos que cambiaron
                            const nombresNuevos = nuevos.map(p => p.text);
                            const nombresEliminados = eliminados.map(p => p.text);

                            
                            //Armar descripcion del la edicion
                            me.descripcionMovimiento = 
                                (me.nombreAnt != me.nombre ? "\n- Se edito el nombre usuario de " + me.nombreAnt + " por " + me.nombre : "") + 
                                (me.responsableAnt != me.responsableCuenta ? "\n- Se edito responsable de la cuenta de " + me.responsableAnt + " por " + me.responsableCuenta : "") + 
                                (me.puestoAnt != me.puesto ? "\n- Se edito el puesto de " + me.puestoAnt + " por " + me.puesto : "") + 
                                (me.direcionAnt != me.direccion ? "\n- Se edito la direccion de " + me.direcionAnt + " por " + me.direccion : "") + 
                                (me.distritoIdAnt != me.distrito ? "\n- Se edito el distrito de " + me.distritoAnt + " por " + me.distrito.text : "") + 
                                (me.subdirIdAnt != me.iddsp ? "\n- Se edito la subdirecion de " + me.subdirAnt + " por " + me.iddsp.text : "") + 
                                (me.agenciaIdAnt != me.idagencia ? "\n- Se edito la agencia de " + me.agenciaAnt + " por " + me.idagencia.text : "") + 
                                (me.moduloIdAnt != modulo ? "\n- Se edito el modulo de " + me.moduloAnt + " por " + me.idModuloServicio.text : "") + 
                                (me.rolIdAnt != me.idrol ? "\n- Se edito el rol de " + me.rolAnt + " por " + me.idrol.text : "") + 
                                (me.emailAnt != me.email ? "\n- Se edito el email de " + me.emailAnt + " por " + me.email : "") + 
                                (me.telefonoAnt != me.telefono ? "\n- Se edito el telefono de " + me.telefonoAnt + " por " + me.telefono : "") + 
                                (me.usuarioAnt != me.usuario ? "\n- Se edito el usuario de " + me.usuarioAnt + " por " + me.usuario : "") + 
                                (me.passwordAnt != me.password ? "\n- Se cambio la contraseña" : "") +
                                (nombresNuevos.length > 0 ? `\n- Se agregaron los módulos: ${nombresNuevos.join(', ')}` : "") + 
                                (nombresEliminados.length > 0 ? `\n- Se eliminaron los módulos: ${nombresEliminados.join(', ')}` : "");

                            //Se edita la contraseña o no                                
                            if (me.password!=me.passwordAnt)
                            {
                                me.actPassword=true;
                                //Se obtiene la fecha actual, se genera el QR del pdf y se obtiene los modulos del usuario
                                var fechaSys = moment()
                                me.generarQR("Reimpresion de responsiva",me.usuario,me.responsableCuenta,fechaSys,me.idUsuario);
                                
                            }
                            //indica si se genero la contaseña desde sistema
                            if(me.indicaPass == true)
                            {
                                me.$alert("GUARDA LA CONTRASEÑA","La contraseña de la cuenta es: " + me.password);
                            }

                            //Api para actualizar el usuario
                            me.$controlacceso.put('api/Usuarios/Actualizar',
                            {
                                'idusuario':me.idUsuario,
                                'rolId':(me.idrol.value == undefined ? me.idrol : me.idrol.value),
                                'moduloservicioId': modulo, 
                                'puesto': me.puesto, 
                                'nombre':me.nombre,
                                'responsableCuenta':me.responsableCuenta,
                                'direccion':me.direccion,
                                'telefono': me.telefono,
                                'email':me.email,
                                'condicion':me.condicion, 
                                'usuario': me.usuario,
                                'password':me.password,
                                'act_password':me.actPassword 

                            }, configuracion).then(function(response)
                            {                                
                                //En caso de ser la descripcion vacia quiere decir que no edito nada, por lo que no es necesaria clonar
                                if(me.descripcionMovimiento  == '')
                                {
                                    me.close();
                                    me.$notify('Considiera que no se le edito nada al usuario','success') 
                                    me.listar();
                                }
                                //En caso de si detectar un cambio se procede a la clonacion en todos los distritos
                                else
                                {
                                    //Se comienza eliminando todos los registros para posterior generar nuevos
                                    me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ me.idUsuario, configuracion).then(function(response)
                                    {
                                        let promesas = [];
                                        //Meto el recorrido en una variable de promesa para corroborar que la edicion local funciono
                                        for (var i = 0; i < me.panel.length; i++) 
                                        {
                                            let promesa = me.$controlacceso.post('api/PanelUsuarios/Crear', {
                                                'usuarioId': me.idUsuario,
                                                'panelControlId': me.panel[i].value,
                                            }, configuracion);

                                            promesas.push(promesa);
                                        }
                                        //En caso de todo estar bien procedo a la clonacion del usuario
                                        Promise.all(promesas).then(function (responses) 
                                        {
                                            //Solo en el cambio de contraseña se genera la responsiva
                                            if (me.password!=me.passwordAnt)
                                            {
                                                me.guardarResponsiva(me.idUsuario,me.usuario,"Edicion de usuario");
                                            }
                                            else
                                            {
                                                //En caso de no haber cambio de contraseña pasa directamente a la clonacion
                                                me.clonacionUsuarios(me.idUsuario,me.usuario,"Edicion de usuario",null);
                                            }
                                        })
                                        .catch(function (error) 
                                        {
                                            me.$notify('Error al intentar guardar los modulos!!!', 'error')
                                        });
                                
                                    }).catch(err => 
                                    { 
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
                                            me.$notify('Error al intentar lisatar los registros!!!','error')   
                                        } 
                                    });

                                    
                                    
                                }

                            }).catch(error => 
                            {  
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
                                    me.$notify('Error al intentar actualizar la informacion!!!','error')   
                                } 
                            
                            });
                        //En caso de ser un usuario nuevo
                        } else 
                        { 
                            //Se obtiene la fecha actual, se genera el QR del pdf y se obtiene los modulos del usuario
                            var fechaSys = moment()
                            me.generarQR("Reimpresion de responsiva",me.usuario,me.responsableCuenta,fechaSys,me.idUsuario);

                            //indica si se genero la contaseña desde sistema
                            if(me.indicaPass == true)
                            {
                                alert("La contraseña de la cuenta es (GUARDALA): " + me.password);
                            }
                            
                            //Se crea de forma estatica la descripcion de usuario nuevo
                            me.descripcionMovimiento = "Se creo el usuario " + me.nombre;
                            //Api para crear usuario
                            me.$controlacceso.post('api/Usuarios/Crear',
                            {
                            'rolId':me.idrol.value,
                            'moduloservicioId': modulo, 
                            'puesto': me.puesto, 
                            'nombre':me.nombre,
                            'responsableCuenta':me.responsableCuenta,
                            'direccion':me.direccion,
                            'telefono': me.telefono,
                            'email':me.email,
                            'condicion':me.condicion, 
                            'usuario': me.usuario,
                            'password':me.password
                            }, configuracion).then(function(response)
                            {
                                var usuarioNew = response.data.usuarioid;
                                //Se comienza eliminando todos los registros para posterior generar nuevos
                                me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ usuarioNew, configuracion).then(function(response)
                                {
                                    let promesas = [];
                                    //Meto el recorrido en una variable de promesa para corroborar que la edicion local funciono
                                    for (var i = 0; i < me.panel.length; i++) 
                                    {
                                        let promesa = me.$controlacceso.post('api/PanelUsuarios/Crear', {
                                            'usuarioId': usuarioNew,
                                            'panelControlId': me.panel[i].value,
                                        }, configuracion);

                                        promesas.push(promesa);
                                    }
                                    //En caso de todo estar bien procedo a la clonacion del usuario
                                    Promise.all(promesas).then(function (responses) 
                                    {
                                        //Se procede a las clonaciones en todos lo distritos
                                        me.guardarResponsiva(usuarioNew,me.usuario,"Creacion de usuario");
                                        
                                    })
                                    .catch(function (error) 
                                    {
                                        me.$notify('Error al intentar guardar los modulos!!!', 'error')
                                    });
                            
                                }).catch(err => 
                                { 
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
                                        me.$notify('Error al intentar lisatar los registros!!!','error')   
                                    } 
                                });

                            }).catch(err => 
                            {  
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






            //Funcion para la clonacion de usuarios en todos los distritos, dicha funcion recibe el id de usuario, el usuario y el movimiento que se hace
            async clonacionUsuarios(idUsuario,usuario,movimiento,rutaResponsiva)
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                //Activo el modal que me dice en que distrito se esta clonando el usuario
                me.cargando = true;

                //Recorro los elementos del arreglo del conjunto
                for(var i  = 0 ;i < me.distritos.length ; i++)
                {
                    //Aqui asigno valor del distrito que estoy clonando para mostrarlo en el modal
                    me.distritoEnProceso = me.distritos[i].text;
                    //Se hace el recorrido de la clonacion en cada distrito
                    try 
                    {
                        const response = await me.$controlacceso.post('api/Usuarios/ClonarUsuarioCA',
                        {
                            'idusuario':idUsuario,
                            'idDistrito':me.distritos[i].value,

                        }, configuracion)

                        //En caso de que la api funcione
                        if(response.status == 200)
                        {
                        }
                    } catch (err) 
                    {
                        //En caso de fallar una clonacion guardo en un arreglo los distritos que hayan fallado, junto con su valor de texto
                        me.distritoFallo.push({distrito : me.distritos[i].value, distritoNombre : me.distritos[i].text  });
                    }
                }
                //Si el arreglo de fallas es vacio quiere decir que todo funciono correctamente
                if(me.distritoFallo.length == 0)
                {
                    alert("La clonación de usuario funciono correctamente en TODOS los distritos");
                    //Llamo a la funcion para guardar el movimiento en la bitacora d usuario
                    me.crearBitacoraUsuario(idUsuario,usuario,me.descripcionMovimiento,"",me.distritoFallo,movimiento,true,rutaResponsiva);
                }
                //En caso de encontrar mas de un distrito fallido, muestro el mensaje del distrito que fallo
                else
                {
                    //Recorro los elementos de los distritos fallados para guardarlo en texto y mostrarlo en un alert
                    const listaTexto = me.distritoFallo.map(d => `- ${d.distritoNombre}`).join('\n');
                    alert("La clonacion fallo en: \n" + listaTexto +"\nCorrobora la conexión con el distrito o que exista el ModuloServicio." + "\nReintentalo en la seccion de Fallas de clonacion");
                    //Llamo a la funcion para guardar el movimiento en la bitacora d usuario
                    me.crearBitacoraUsuario(idUsuario,usuario,me.descripcionMovimiento,listaTexto,me.distritoFallo,movimiento,false,rutaResponsiva);
                }

                //Desabilito el modal que me dice en que distrito se esta clonando el usuario
                me.cargando = false;
                //proceso a cerrar el modal, limpiar las variables y volver a listar los usuarios
                me.close();
                me.$notify('La información se guardo correctamente !!!','success') 
                me.listar();  
            },







            //Funcion para crear, editar y desactivar los movimeintos de las bitacoras de usuarios
            //Esta funcion recibe el id de usuario, el usuario, la descripcion de los movimientos, la lista en texto de los distritos que fallaron,
            //El arreglo de los distritos que fallaron, que tipo de de movimiento se hizo y el estatus de si la clonacion fue exitosa o fallo
            crearBitacoraUsuario(idUsuario,usuario,descripcionMovimiento,listaTexto,distritoFallo,movimiento,status,rutaResponsiva)
            {
                let me=this;

                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Api para crear el movimiento del usuario, hay un operador ternario para en caso de ser nuevo no hay modulo anterior, se pondra el primero registrado
                me.$controlacceso.post('api/Usuarios/CrearBitacoraUsuario',
                {
                    'UsuarioId':idUsuario,
                    'Usuario': usuario, 
                    'DescripcionMovimiento': descripcionMovimiento,
                    'ModuloServicioIdAnterior':me.ModuloServicioIdAnterior != '' ? me.ModuloServicioIdAnterior : me.idModuloServicio.value,
                    'DistritoFallo':listaTexto,
                    'ArregloDistritoFallo':JSON.stringify(distritoFallo),
                    'Proceso':movimiento,
                    'Status':status, 
                    'DistritoHaceMovimiento': me.u_distrito,
                    'DirSubHaceMovimiento':me.u_dirSubPro,
                    'AgenciaHaceMovimiento':me.u_agencia,
                    'ModuloHaceMovimiento':me.u_modulo,
                    'ModuloServicioIdHaceMovimiento':me.u_idmoduloservicio,
                    'UsuarioIdHaceMovimiento':me.u_idusuario,
                    'ResponsableCuentaHaceMovimiento':me.u_responsablecuenta,
                    'RutaResponsiva':rutaResponsiva,

                }, configuracion).then(function(response)
                {
                    me.$notify('La información se guardo correctamente !!!','success');
                    
                }).catch(err => 
                {  
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
            },








          //Funcion para ver el movimiento de los usuarios, dicha funcion recibe los valores del usuario seleccionado
          verHistorial(item)
          {
              let me=this;  

              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              //Limpio el arreglo para este limpia la variable
              me.historialUsuario = [];
              me.$controlacceso.get('api/Usuarios/ListarHistorialUsuario/' + item.idUsuario, configuracion).then(function(response)
              {
                  //Guardo el resultado de la consulta y activo el modal para ver el movimiento
                  me.historialUsuario=response.data;
                  me.modalhistorial = true;

              }).catch(err => 
              { 
                  if (err.response.status==400)
                  {
                      me.$notify("No es un usuario válido", 'error')
                  } 
                  else if (err.response.status==401){
                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                      me.e401 = true,
                      me.showpage= false
                  } 
                  else if (err.response.status==403){ 
                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                      me.e403= true
                      me.showpage= false 
                  } 
                  else if (err.response.status==404){
                      me.$notify("El recuso no ha sido encontrado", 'error')
                  }
                  else{
                      me.$notify('Error al intentar listar los registros!!!','error')   
                  } 
              });
          },






          agregarpanel(item)
          {
            let me= this;
            me.panelesPorUsuario(item.idUsuario);
            //Se asignan en variables locales los datos del usuario para visualizar 
            this.distritoActual = item.distritoId
            this.idUsuario=item.idUsuario;
            this.idrol=item.rolId;
            this.nombre=item.nombre;
            this.puesto=item.puesto;
            this.idModuloServicio=item.moduloServicioId;
            this.nombreModulo= item.modulonombre;
            this.nombreAgencia= item.nombreAgencia;
            this.direccion=item.direccion;
            this.telefono=item.telefono;
            this.email=item.email;
            this.usuario= item.usuario;
            this.password=item.password_hash;
            this.passwordAnt=item.password_hash;
            this.editedIndex=1; 
            this.panel=[];
            this.panelesAnteriores = [];
            //Se activa  el modal para ver los paneles
            me.addPanel=true;
          },










          panelesPorUsuario(idUsuario)
          {
              let me = this;

              //Api para listar los paneles
              console.log(this.$store.state.token)
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              var panelArray=[]; 

              me.$controlacceso.get('api/PanelUsuarios/ListarAsignados/' + idUsuario, configuracion).then(function(response)
              { 
                  panelArray = response.data;
                  panelArray.map(function(x){me.panel.push({text:x.nombrePanel, value: x.panelControlId}); });

                  //Se le asigna los valores que ya se tenian registrado previmente
                  me.panelesAnteriores = me.panel;

              }).catch(err => 
              { 
                  if (err.response.status==400)
                  {
                      me.$notify("No es un usuario válido", 'error')
                  } 
                  else if (err.response.status==401){
                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                      me.e401 = true,
                      me.showpage= false
                  } 
                  else if (err.response.status==403){ 
                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                      me.e403= true
                      me.showpage= false 
                  } 
                  else if (err.response.status==404){
                      me.$notify("El recuso no ha sido encontrado", 'error')
                  }
                  else{
                      me.$notify('Error al intentar listar los registros!!!','error')   
                  } 
              });
          },







          activarDesactivarMostrar(accion,item)
          {
            //Se asignan en variables locales los datos del usuario para la correctan insercion en la bitacora 
            this.distritoActual = item.distritoId
            this.idUsuario=item.idUsuario;
            this.idrol=item.rolId;
            this.nombre=item.nombre;
            this.puesto=item.puesto;
            this.idModuloServicio=item.moduloServicioId;
            this.nombreModulo= item.modulonombre;
            this.nombreAgencia= item.nombreAgencia;
            this.direccion=item.direccion;
            this.telefono=item.telefono;
            this.email=item.email;
            this.usuario= item.usuario;
            this.password=item.password_hash;
            this.passwordAnt=item.password_hash;
            this.editedIndex=1;
            //Al momento de terminar el proceso las variables se limpian 

            this.adModal=1;

            this.adNombre=item.nombre;
            this.adId=item.idUsuario;  

            //Condicionales para monstrar mensaje correcto
            if (accion==1)
            {
              this.adAccion=1;
            }
            else if (accion==2)
            {
              this.adAccion=2;
            }
            else
            {
              this.adModal=0;
            }
          },









          activar()
          {
              let me=this;

              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              //Creo de manera fija la descripcion de activacion
              me.descripcionMovimiento = "Se activo el usuario " + me.usuario;

              me.$controlacceso.put('api/Usuarios/Activar/'+ me.adId,{},configuracion).then(function(response)
              {
                  me.adModal=0;
                  me.adAccion=0;
                  me.adNombre="";
                  me.adId="";
                  //Inicio el proceso de clonacion
                  me.clonacionUsuarios(me.idUsuario,me.usuario,"Activación de usuario",null);
                  me.listar();  
                  
              }).catch(err => 
              {  
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







          desactivar()
          {
              let me=this;

              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              //Creo de manera fija la descripcion de desactivacion
              me.descripcionMovimiento = "Se desactivo el usuario " + me.usuario;

              me.$controlacceso.put('api/Usuarios/Desactivar/'+this.adId,{},configuracion).then(function(response)
              {
                  me.adModal=0;
                  me.adAccion=0;
                  me.adNombre="";
                  me.adId="";
                  //Inicio el proceso de clonacion
                  me.clonacionUsuarios(me.idUsuario,me.usuario,"Desactivación de usuario",null);
                  me.listar();  

              }).catch(err => 
              {  
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







          imprimirResponsiva()
            {

                let paneles = '';
                for (var i = 0; i < this.panel.length; i++) {
                    // Condición para excluir 'Unidad Mixta' si el rol no es 'AMPO-AMP Mixto'
                    if (this.datosImpresion.nombrerol !== 'AMPO-AMP Mixto' && this.panel[i].text === 'Unidad Mixta') 
                    {
                        continue;
                    }

                    paneles += this.panel[i].text;

                    // Agrega coma solo si no es el último elemento válido
                    let nextIndex = i + 1;
                    while (
                        nextIndex < this.panel.length &&
                        this.datosImpresion.nombrerol !== 'AMPO-AMP Mixto' &&
                        this.panel[nextIndex].text === 'Unidad Mixta'
                    ) {
                        nextIndex++;
                    }

                    if (nextIndex < this.panel.length) {
                        paneles += ', ';
                    }
                }


                // VARIABLES
                //***************************************************************************** */
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var fecha = dia + " de " + mes  + " del " + año;
                //***************************************************************************** */
                let me = this;
                const dd = 
                {
                    pageSize: 'LETTER',
                    pageOrientation: 'portrait',
                    pageMargins: [85, 80, 72, 60],

                    footer: function (currentPage, pageCount) 
                    {
                    const footerContent = 
                    [
                        {
                            image: me.qrCode,
                            width: 80, // Ajusta el ancho según tu diseño
                            height: 80, // Ajusta la altura según tu diseño
                            absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño

                        }

                    ];

                    return footerContent;
                    },
                    
                    header: function(currentPage, pageCount, pageSize) 
                    {
                        return [
                            { 
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                            },               
                        ]
                    },
            
                    content: 
                    [   
                        {
                            text:
                            this.u_distrito+", Hidalgo a " + fecha + "\n\n",                        
                            style: 'Fecha',
                            alignment: 'right', 
                        },    
                        {
                            text:  "RESPONSIVA DE USUARIO Y CONTRASEÑA DEL SISTEMA CENTENARIO",
                            style: 'TituloP'
                        },  
                        {
                            text: "\nOficio de solicitud: " + this.oficio +"\n\n",
                            style: "DePara",
                        },               
                        {
                            style: "table",
                            table: {
                            headerRows: 1,
                            widths: [150,270],
                            heights: [15,10,10,10,10,10,10,10],
                            body: 
                            [
                                [
                                    { text: "1.	Nombre de Usuario responsable: ", style: "TextoOpciones", fillColor: '#990033'},
                                    { text: this.responsableCuenta, style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "2.	Cargo: ", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: this.puesto, style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "3.	Distrito", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: (this.distritoIdAnt != this.distrito ? this.distrito.text : this.distritoAnt), style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "4.	Adscripción", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: "Subdirección: " + (this.subdirIdAnt != this.iddsp ? this.iddsp.text : this.subdirAnt) + 
                                            "\nAgencia: " +(this.agenciaIdAnt != this.idagencia ? this.idagencia.text : this.agenciaAnt), style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "5.	Liga de Acceso", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: this.urlDistrito, style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "6.	Módulo", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: paneles, style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "7.	Usuario", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: this.usuario, style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                [
                                    { text: "8.	Contraseña:", style: "TextoOpciones", fillColor: '#990033' },
                                    { text: this.password , style: "Texto", fillColor: '#E6BCC5' }
                                ],
                                
                            ],
                            },
                            layout: {
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 1 : 1;
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 1 : 1;
                            },
                            hLineColor: function (i, node) {
                                return i === 0 || i === node.table.body.length
                                ? "black"
                                : "black";
                            },
                            vLineColor: function (i, node) {
                                return i === 0 || i === node.table.widths.length
                                ? "black"
                                : "black";
                            },
                                // Alinea la tabla al centro del documento
                            },    
                            margin: [10, 0, 100, 10]   
                        },
                        { 
                            text: 'Lineamientos:', 
                            bold: true, 
                            style: "Texto", 
                            margin: [0, 0, 0, 10] },
                        {
                            ul: [
                                'La clave de acceso es de carácter personal e intransferible.',
                                'En caso de rotación de personal, el usuario responsable de la clave tiene la obligación de hacer del conocimiento de la Dirección del Sistema Centenario y Tecnologías de la Información y Comunicación para los ajustes correspondientes a su cuenta.',
                                'No utilizar la clave de acceso con otros fines que no sean los de cumplir con las funciones asignadas, donde el usuario será responsable total del buen manejo de la misma.',
                                'En caso de necesitar soporte técnico deberá de comunicarse al teléfono (771) 7179000 ext. 9134.'
                            ],
                            style: "Texto", margin: [0, 0, 0, 10]
                        },
                        {
                            text:
                                'Lo anterior, sujetándose a lo previsto en los artículos 7 de la Ley General de Responsabilidades Administrativas, fracción II; artículo 44, fracción V y VI de la Ley Orgánica del Ministerio Público del Estado de Hidalgo, que establece como causa de responsabilidad administrativa el distraer de su objeto, para uso propio o ajeno, el equipo o elementos materiales de la institución o los bienes bajo su custodia y realizar o encubrir conductas que atenten contra la autonomía del Ministerio Público, tales como aceptar o ejercer consignas, presiones, encargos, comisiones o cualquier otra acción que genere o implique subordinación indebida respecto de alguna persona o autoridad.',
                            style: "Texto",margin: [0, 0, 0, 10]
                        },
                        {
                            style: "Texto",text: 'Leído lo anterior y no habiendo nada más que constar, firman los interesados.\n\n'
                        },
                        {
                            style: "centeredTable",
                            table: {
                            headerRows: 1,
                            colSpan: 3,
                            widths: ["*", "*"],
                            body: 
                            [
                                [
                                    {
                                        text: "ENTREGA:\n\n\n",
                                        style: "centeredTable",
                                    },
                                    {
                                        text: "RECIBE\n\n\n",
                                        style: "centeredTable",
                                    },
                                ],
                                [   {
                                        text: "_________________________________________________"+
                                        "\nL. I. ABEL CADENA GÓMEZ\nDIRECTOR DEL SISTEMA CENTENARIO Y TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIÓN",
                                        style: "centeredTable",
                                    },
                                    {
                                        text: "_________________________________________________"+
                                        "\n"+ this.responsableCuenta + "\n" + this.puesto,
                                        style: "centeredTable"
                                    },
                                ],
                            ],
                            },
                            layout: {
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 0 : 0;
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 0 : 0;
                            },
                            hLineColor: function (i, node) {
                                return i === 0 || i === node.table.body.length
                                ? "white"
                                : "gray";
                            },
                            vLineColor: function (i, node) {
                                return i === 0 || i === node.table.widths.length
                                ? "white"
                                : "gray";
                            },
                            },       
                        }
                                        
                    ],
                    styles: 
                    {
                        Fecha:{
                            fontSize: 9,
                        },
                        Nooficio:{
                            fontSize: 8,
                            bold:true
                        },
                        DePara:{
                            fontSize: 10,
                            bold:true  
                        },
                        PiePagina:{
                            fontSize: 7,
                            color: 'white'
                        },
                        TextoOpciones:{
                            fontSize: 10,
                            color: 'white',
                        },
                        Texto:{
                            fontSize: 10,
                            alignment:'justify'
                        },
                        TextoN:{
                            fontSize: 10,
                            alignment:'justify',
                            bold:true 
                        },
                        Titulo:{
                            fontSize: 12,
                            bold:true 
                        },
                        TituloP:{
                            fontSize: 15,
                            bold:true ,
                            alignment:'center'
                        },
                        centeredTable: {
                            alignment: 'center', 
                            fontSize: 10,
                        },
                    }
                };
                return dd;

            },







            //Funcion para lanzar el pdf en una ventana emergente una vez creada
            guardarResponsiva(idUsuario,usuario,proceso) 
            {
                let me = this;
                var dd = me.imprimirResponsiva();

                return new Promise((resolve, reject) => 
                {
                    pdfMake.createPdf(dd).getBlob(async (blob) => 
                    {
                        let formData = new FormData();
                        formData.append("file", blob, "documento.pdf"); // 'documento.pdf' es el nombre del archivo

                        let header = { Authorization: "Bearer " + this.$store.state.token };
                        let configuracion = {
                            headers: { ...header, "Content-Type": "multipart/form-data" },
                        };
                        
                        me.GUID = me.generateUUID();

                        let url ="api/Usuarios/GuardarRsponsiva/" + idUsuario +"/"+ me.GUID;

                        try 
                        {
                            // Espera a que el axios.post termine
                            const response = await me.$controlacceso.post(url, formData, configuracion);

                            var rutaResponsiva = response.data.ruta;
                            me.clonacionUsuarios(idUsuario,usuario,proceso,rutaResponsiva);

                            var doc = pdfMake.createPdf(dd);
                            doc.open(); // Para abrir en una ventana emergente

                            resolve(); // Resuelve la promesa cuando todo termina correctamente

                        } catch (err) 
                        {
                            me.$notify('Error al intentar guardar la responsiva!!!','error')   
                            reject(err); // Rechaza la promesa si ocurre un error
                        }
                    });
                });
            },








            reimprimirResponsiva(item)
            {

              var win = window.open(item.rutaResponsiva, '_blank')
              // Cambiar el foco al nuevo tab (punto opcional)
              win.focus();
                
            },




            generateUUID: function () 
            {
                // Public Domain/MIT
                var d = new Date().getTime();
                if (
                    typeof performance !== "undefined" &&
                    typeof performance.now === "function"
                ) {
                    d += performance.now(); //use high-precision timer if available
                }
                var newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                    /[xy]/g,
                    function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
                    }
                );

                return newGuid;
            },





            obtenermes: function (mes) 
            {
                if (mes == 0) return "Enero";
                if (mes == 1) return "Febrero";
                if (mes == 2) return "Marzo";
                if (mes == 3) return "Abril";
                if (mes == 4) return "Mayo";
                if (mes == 5) return "Junio";
                if (mes == 6) return "Julio";
                if (mes == 7) return "Agosto";
                if (mes == 8) return "Septiembre";
                if (mes == 9) return "Octubre";
                if (mes == 10) return "Noviembre";
                if (mes == 11) return "Diciembre";
            },





            //Funcion para la generacion de contraseñas dinamicas
            generarContrasenia()
            {
                this.password = '';
                this.contrasena = '';
                const longitud = 7; // Constante de longitud de contraseña
                const caracteres = 'AMPOIlCatAmpMixta0123456789@#$%&*_';    //Caracteres establecidos

                //Recorrido para la creacion de contraseña
                for (let i = 0; i < longitud; i++) {
                    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                    this.contrasena += caracteres[indiceAleatorio];
                }
                //Coloca el valor de la contraseña en el componente indicado
                this.password = this.contrasena;
                //Establezco una etiqueta para mostrar dicha contraseña generada
                this.indicaPass = true;

                this.$notify('Contraseña generada, al guardar se te dira la contraseña generada','success');
            },





            async generarQR(tipodo,usuario,nombrefirma,fechadoc,id) 
            {
                
                let me=this; 

                var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
                var dia = moment(date).format("DD");
                var mes = moment(date).format("MMMM");
                var año = moment(date).format("YYYY");
                var fecha = dia + " de " + mes + " del " + año;

                
                try {
                    me.qrCode = await generarQRCodeBase64(tipodo,usuario,nombrefirma,fecha,id);
                } catch (err) {
                    console.error('Error:', err);
                }
            }


        }        
    }
</script>
<style>
.espaciado{
  padding: 30px !important; 
}
.dialog-top-center {
  align-self: flex-start !important;
  margin-top: 100px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>