<template>
   <v-layout align-start>
    <v-navigation-drawer v-model="this.drawer" app  class="primary"  >
            <div class="text-xl-center text-md-center text-xs-center my-4">
                <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
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
                <td><v-icon  small  class="mr-2" color="success">bookmark</v-icon>{{ props.item.nombrerol }}</td>
                <td>{{ props.item.puesto }}</td>
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
                    <v-icon 
                        class="mr-2" color="warning"
                        @click="agregarpanel(props.item)"
                        >
                        view_module
                    </v-icon>
                    <v-icon
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
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


                <v-container grid-list-md text-xs-center>

                    <v-layout row wrap>
                    
                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 


                            <v-text-field 
                                name="nombre" 
                                label="Nombre:"
                                v-model="nombre" 
                                v-validate="'required'"
                                :error-messages="errors.collect('nombre')">
                            </v-text-field>

                            <v-text-field
                                name="dirección" 
                                label="Dirección:"
                                v-model="direccion" 
                                v-validate="'required'"
                                :error-messages="errors.collect('dirección')">
                            </v-text-field>

                            <v-autocomplete 
                                name="direccion subprocuradurria" 
                                label="Direccion subprocuradurria:"
                                v-model="iddsp"
                                :items="dsp" 
                                return-object
                                v-validate="'required'"
                                v-on:change="listarAgencia()"  
                                :error-messages="errors.collect('direccion subprocuradurria')">
                            </v-autocomplete> 

                            <v-autocomplete 
                                name="modulo"
                                label="Modulo:"
                                v-model="idModuloServicio"
                                :items="modulos" 
                                v-validate="'required'"
                                :error-messages="errors.collect('modulo')" >
                            </v-autocomplete>

                            <v-text-field 
                                name="telefono" 
                                label="Telefono:"
                                v-model="telefono" 
                                v-validate="'required'"
                                :error-messages="errors.collect('telefono')">
                            </v-text-field>

                            <v-text-field 
                                name="usuario" 
                                label="Usuario:"
                                v-model="usuario" 
                                v-validate="'required'"
                                :error-messages="errors.collect('usuario')">
                            </v-text-field>

                        </v-flex>

                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 

                            <v-text-field 
                                name="puesto" 
                                label="Puesto:"
                                v-model="puesto" 
                                v-validate="'required'"
                                :error-messages="errors.collect('puesto')">
                            </v-text-field> 

                            <v-autocomplete
                                name="distrito"
                                label="Distrito:"
                                v-model="distrito"
                                :items="distritos"
                                v-on:change="listarDSP()"  
                                v-validate="'required'"
                                :error-messages="errors.collect('distrito')">
                            </v-autocomplete>

                            <v-autocomplete 
                                name="agencia"
                                label="Agencia:"
                                v-model="idagencia"
                                :items="agencias"
                                return-object
                                v-validate="'required'"
                                v-on:change="listarModulo()"   
                                :error-messages="errors.collect('agencia')">
                            </v-autocomplete> 

                            <v-autocomplete 
                                name="rol"
                                label="Rol:"
                                v-model="idrol"
                                :items="roles" 
                                v-validate="'required'"
                                :error-messages="errors.collect('rol')" >
                            </v-autocomplete> 

                            <v-text-field
                                name="email" 
                                label="Email:"
                                v-model="email" 
                                v-validate="'required'"
                                :error-messages="errors.collect('email')">
                            </v-text-field>

                            <v-text-field 
                                name="password"
                                label="Password:"
                                type="password" 
                                v-model="password" 
                                v-validate="'required'"
                                :error-messages="errors.collect('password')">
                            </v-text-field>

                        </v-flex>
                    
                    </v-layout>
                </v-container> 
            
            </v-card>
        </v-dialog>
        <v-dialog v-model="adModal" max-width="400px">
            <v-card>
                <v-card-title class="subheading thin" v-if="adAccion==1"><v-icon>security</v-icon>¿Activar Item?</v-card-title>
                <v-card-title class="subheading thin" v-if="adAccion==2"><v-icon>security</v-icon>¿Desactivar Item?</v-card-title>
                <v-card-text>
                    Estás a punto de 
                    <span v-if="adAccion==1">Activar </span>
                    <span v-if="adAccion==2">Desactivar </span>
                    el usuario con  el nombre: {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="activarDesactivarCerrar">
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
        <v-dialog v-model="addPanel" max-width="1000px">
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
                            
                                
                                <div px-5><v-select
                                            v-model="panel"
                                            :items="panels" 
                                            multiple
                                            label="Modulos"
                                            chips
                                            hint="Modulos asignados"
                                            persistent-hint
                                        ></v-select> 
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
    </v-layout> 
    
</template>

<script>
    import n401 from '../../components/control_acceso/401.vue'
    import n403 from '../../components/control_acceso/403.vue'
    import axios from 'axios'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';
   
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
                u_iddistrito:'',
                u_distrito:'',
                e401:false, 
                e403:false,
                showpage:true,  

                show: true,
                dense:true,
                usuarios:[],                
                dialog: false,
                headers: [
                    
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Rol', value: 'nombrerol' },
                    { text: 'Puesto', value: 'puesto' },
                    { text: 'Usuario', value: 'usuario'},
                    { text: 'Distrito', value: 'distrito'},
                    { text: 'Agencia', value: 'agencia'},
                    { text: 'Modulo', value: 'modulonombre'},  
                    { text: 'Estado', value: 'condicion'}, 
                    { text: 'Opciones', value: 'opciones'},                
                ],
                search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 10
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

                usuario:'',
                usuarioAnt:'',
                password:'',
                actPassword:false,
                passwordAnt:'',

                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: '', 
                
                addPanel:false,
                panel:[],
                panels:[],
                distritoActual:'',
                idDistritoPach:'7f662ec1-6705-406e-bcd0-f56ade7bcae2',
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
            dialog (val) {
            val || this.close()
            },
            usuarioAnt(val) {
              console.log("usuario anterior",val)
            },
            usuario(val){
              console.log("usuario campotexto",val)
            }
        },

        created () {

            this.u_iddistrito=this.$store.state.usuario.iddistrito;
            this.u_distrito=this.$store.state.usuario.distrito; 
        
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
        },

        methods:{
            //generar los tokens para las peticiones de keycloak
            async generateTokenPassword(){
              try {
                const data = new URLSearchParams();
                data.append('grant_type', 'password');
                data.append('client_id', 'admin-cli');
                data.append('password', 'admin');
                data.append('username', 'alessandro2204@outlook.com');
                data.append('realm', 'procu');

                const response = await this.$controlacceso.post(
                    'api/Usuarios/GetTokenKeyCloakWithGrantTypePassword',
                    data,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded',}}
                );

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
            //métodos para crear al usuario en keycloak
            async createKeycloakUser(configuracion){
              //generar el token para crear el usuario
                //let token = await this.generateUserToken()
                //el usuario se crea sin contraseña por lo que hay que realizar otra petición para actualizarla
                let passwordToken = await this.generateTokenPassword();
                let token = "";
                //let passwordToken = ""
                let me = this
                //el email en keycloak se considera como el usuario, deben de tener datos todos los campos, de lo contrario existirán errores
                const data = [{
                  username: me.usuario,
                  email: me.email,
                  CURP: "TAPD010720HHGLNNA4",
                  rfc: "TOHA020422B50",
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
                    this.$keycloakUser.post('realms/procu/keycloak-user-api/users/CreateUsers', data, {
                      headers: {
                        'Content-Type': 'application/json',
                        //usamos el token de usuario
                        'Authorization': 'Bearer '+token
                      }
                    }).then( (response) => {
                      //si la creación en keycloak es exitosa procedemos a crear la contraseña para el usuario creado
                      let passwordData = {
                        type: "password",
                        value: me.password,
                        temporary: false
                      }

                      //Si la respuesta es un error se muestran los detalles - usuario duplicado, telefono, nombre etc.
                      if (response.data.usuariosConError &&
                          response.data.usuariosConError.length > 0 &&
                          response.data.usuariosConError[0].error &&
                          response.data.usuariosConError[0].error.trim() !== ''){
                        me.$notify("Error "+response.data.usuariosConError[0].error,'error')
                      }
                      else {
                        //obtenemos el ID del usuario recién creado en keycloak
                        this.createdKeycloakUserId = response.data["Lista de usuarios creados"]
                        console.log("keycloak-id: "+this.createdKeycloakUserId)
                        me.$keycloakUser.put('https://login-admin.pgjhidalgo.gob.mx/admin/realms/procu/users/'+this.createdKeycloakUserId[0]+'/reset-password', passwordData,{
                          headers: {
                            'Content-Type': 'application/json',
                            //usamos el token del password
                            'Authorization': 'Bearer '+passwordToken
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

                          //en caso de que exista un error en la creación de la contraseña, el usuario existirá en keycloak pero no en la base de centenario
                        }).catch((error) => {me.$notify("Contraseña no actualizada", 'error')})



                      }

                    }).catch(error => {
                      //en caso de que el usuario no se crease en keycloak, no se creara en la base de datos ni se intentará actualizar la contraseña
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
            //el usuario se actualiza sin contraseña por lo que hay que realizar otra petición para actualizarla
            let passwordToken = await this.generateTokenPassword();
            //let passwordToken = ""
            let me = this
            //el email en keycloak se considera como el usuario, deben de tener datos todos los campos, de lo contrario existirán errores
            const data = [{
              username: me.usuarioAnt,
              newUsername: me.usuario,
              email: me.email,
              CURP: "TOHA020422HHGLRLA8",
              firstName: me.nombre,
              lastName: "",
              segundoApellido: "",
              telefono: me.telefono,
              Calle: me.direccion,
              Numero: me.direccion,
              Estado: me.direccion,
              Municipio: me.direccion,
              Colonia: me.direccion,
              PreferenciaContacto: "SMS",
              cp: me.direccion,
              rfc: "TOHA020422B54",
              type_persona: "Fisica"
            }]
            //reemplazar por el API de actualización de usuario
            this.$keycloakUser.put('realms/procu/keycloak-user-api/users/UpdateUsers', data, {
              headers: {
                'Content-Type': 'application/json',
              }
            }).then( (response) => {
              console.log("Respuesta de Keycloak:", response);

              //si la creación en keycloak es exitosa procedemos a crear la contraseña para el usuario actualizado
              let passwordData = {
                type: "password",
                value: me.password,
                temporary: false
              }

              //es necesario el id del keycloak user para actualizar la contraseña
              //colocar el api para obtener el user id de keycloak
              if (me.password!=me.passwordAnt) {
                me.$notify("No es posible actualizar la contraseña")
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
                        console.log(response)
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
                    } else {
                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                    }

                  });
                }
                else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {
                  console.log('todos diferentes')
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
                    console.log(response)
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
                        console.log(response)
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
                      } else {
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

                /*    console.log("password change")
                    this.$keycloakUser.put('https://login-admin.pgjhidalgo.gob.mx/admin/realms/procu/users/' + this.createdKeycloakUserId[0] + '/reset-password', passwordData, {
                      headers: {
                        'Content-Type': 'application/json',
                        //usamos el token del password
                        'Authorization': 'Bearer ' + passwordToken
                      }
                    }).then((response) => {
                      //si la contraseña es agregada exitosamente se procede a crear al usuario en la base de centenario
                      me.$notify("Usuario actualizado exitosamente en Keycloak - Cambio de contraseña")

                      //Código para actualizar base de datos local
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
                              console.log(response)
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
                          } else {
                            me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                          }

                        });
                      }
                      else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {
                        console.log('todos diferentes')
                        this.$controlacceso.put('api/Usuarios/Actualizar', {
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
                          console.log(response)
                          this.$controlacceso.post('api/Usuarios/ClonarUsuario', {
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
                            this.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                              'UsuarioId': me.idUsuario,
                              'idDistritoD': me.distrito,
                              'caso': 3,
                            }, configuracion).then(function (response) {
                              console.log(response)
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
                            } else {
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


                      //en caso de que exista un error en la creación de la contraseña, el usuario existirá en keycloak pero no en la base de centenario
                    }).catch((error) => {
                      me.$notify("Contraseña no actualizada", 'error')
                    })
                 */
              }
              else{
              //es necesario el id del keycloak user para actualizar la contraseña
                me.$notify("Usuario actualizado exitosamente en Keycloak")
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
                        console.log(response)
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
                    } else {
                      me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                    }

                  });
                }
                else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {
                  console.log('todos diferentes')
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
                    console.log(response)
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
                        console.log(response)
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
                      } else {
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
              }

            });

          },

            async listar() {
                let me = this; 
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                try {
                    let usuariosResponse = await this.$controlacceso.get('api/Usuarios/Listar', configuracion);
                    me.contador = usuariosResponse.data.length;
                    console.log(me.contador);

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
                            distrito: d[0].nombre
                        })
                });

                    console.log(me.usuarios);
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
            listardistritos(){
                
                let me=this;
                var distritoarray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Distritoes/Listar', configuracion).then(function(response){
                    distritoarray=response.data;
                    distritoarray.map(function(x){
                        me.distritos.push({text: x.nombre,value:x.idDistrito});
                        
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
                this.$conf.get('api/DSPs/ListarPorDistritoId/'+ me.distrito, configuracion).then(function(response){
                    dspArray=response.data;
                    dspArray.map(function(x){
                        me.dsp.push({text: x.nombreSubDir,value:x.idDSP});
                        
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
                debugger
                var dsp ='';
                if (me.iddsp.value == undefined)
                {
                    dsp = me.iddsp;
                }
                else{
                    dsp = me.iddsp.value;
                }
                this.$conf.get('api/Agencias/ListarPorDirSub/'+ dsp, configuracion).then(function(response){
                    agenciaArray=response.data;
                    agenciaArray.map(function(x){
                        me.agencias.push({text: x.nombre,value:x.idAgencia});
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
                debugger
                var agencia='';
                if (me.idagencia.value == undefined)
                {
                    agencia =me.idagencia;
                }
                else
                {
                    agencia =me.idagencia.value;
                }
                this.$conf.get('api/ModuloServicios/ListarPorAgencia/'+ agencia, configuracion).then(function(response){
                    modulosArray=response.data;
                    modulosArray.map(function(x){
                        me.modulos.push({text: x.nombre,value:x.idModuloServicio});
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
                        me.$notify('Error al intentar lisatar los registros!!!','error')   
                    } 
                });
            },
            listarPanels(){
                let me=this;
                var panelArray=[]; 
                me.$panel.get('api/PanelControls/Listar').then(function(response){ 
                    panelArray = response.data;
                    panelArray.map(function(x){
                        me.panels.push({text:x.nombre, value: x.idPC});
                    })
                }).catch(function(error){
                    console.log(error);
                });
            },
            listarAsignados(){
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var panelArray=[]; 
                me.$controlacceso.get('api/PanelUsuarios/ListarAsignados/' + me.idUsuario, configuracion).then(function(response){ 
                 
                    panelArray = response.data;
                    panelArray.map(function(x){
                        me.panel.push({text:x.nombrePanel, value: x.panelControlId });
                    })
                }).catch(function(error){
                 
                    console.log(error);
                });
            },           
            guardarPaneles(){ 
                let me= this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                console.log(me.distritoActual)
                console.log(me.idDistritoPach)
                console.log(me.panel)
                console.log(me.idUsuario)

                if(me.distritoActual === me.idDistritoPach)
                {
                    me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ me.idUsuario, configuracion).then(function(response){
                        if(me.panel.length==0)
                        {
                            me.addPanel=false;
                            me.limpiar();
                        }
                          debugger
                          for(var i=0;i<me.panel.length;i++){ 
                            
                                me.$controlacceso.post('api/PanelUsuarios/Crear',{
                                    'usuarioId':me.idUsuario, 
                                    'panelControlId': me.panel[i],  
                                }, configuracion).then(function(response){  
                                       me.addPanel=false;
                                       me.limpiar();
                                }).catch(function(error){ 
                                        if (err.response.status==400){
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (err.response.status==401){
                                            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
                                            me.e401 = true,
                                            me.showpage= false
                                        } else if (err.response.status==403){ 
                                            me.$notify("No esta autorizado para ver esta página", 'error')
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
                            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recurso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
                }
                else{
                    console.log('aqui')
                    me.$controlacceso.delete('api/PanelUsuarios/Eliminar/'+ me.idUsuario, configuracion).then(function(response)
                    {
                        if(me.panel.length==0)
                        {
                            // me.addPanel=false;
                            // me.limpiar();
                        }
                          debugger
                          for(var i=0;i<me.panel.length;i++){
                            console.log('aqui')
                                me.$controlacceso.post('api/PanelUsuarios/Crear',{
                                    'usuarioId':me.idUsuario, 
                                    'panelControlId': me.panel[i],  
                                }, configuracion).then(function(response){  
                                }).catch(function(error){ 
                                        if (err.response.status==400){
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (err.response.status==401){
                                            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
                                            me.e401 = true,
                                            me.showpage= false
                                        } else if (err.response.status==403){ 
                                            me.$notify("No esta autorizado para ver esta página", 'error')
                                            me.e403= true
                                            me.showpage= false 
                                        } else if (err.response.status==404){
                                            me.$notify("El recurso no ha sido encontrado", 'error')
                                        } else if (err.response.status==504){
                                            me.$notify("El servidor esta tardando demasiado en responder", "warning")
                                        }
                                        else{
                                            me.$notify('Error al intentar listar los registros!!!','error')
                                        }   
                                    
                                }); 
                            }

                            for(var i=0;i<me.panel.length;i++)
                            { 

                                    me.$controlacceso.post('api/PanelUsuarios/ClonarSoloPanel',{
                                        'UsuarioId':me.idUsuario,
                                        'idDistrito':me.distritoActual,
                                        'panelControlId': me.panel[i],
                                    },configuracion).then(function(response){
                                        me.addPanel=false;
                                        me.limpiar();
                                    }).catch(error => {
                                        if (error.response.status==400){
                                        me.$notify("No es un usuario válido", 'error')
                                    } else if (error.response.status==401){
                                        me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
                                        me.e401 = true,
                                        me.showpage= false
                                    } else if (error.response.status==403){ 
                                        me.$notify("No esta autorizado para ver esta página", 'error')
                                        me.e403= true
                                        me.showpage= false 
                                    } else if (error.response.status==404){
                                        me.$notify("El recurso no ha sido encontrado", 'error')
                                    } else if (error.response.status==504){
                                          me.$notify("El servidor esta tardando demasiado en responder", 'warning')
                                    }else{
                                          me.$notify('Error al intentar actualizar la información!!!','error')
                                    } 
                                
                                    });
                            }
                         
                    }).catch(err => {
                         if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){ 
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false 
                        } else if (err.response.status==404){
                            me.$notify("El recurso no ha sido encontrado", 'error')
                        } else if (err.response.status==504){
                           me.$notify("El servidor esta tardando demasiado en responder",'warning')
                         }
                         else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        } 
                    }).finally(()=>{


                    })
                }
            },
            selectroles(){
                let me=this;
                var rolesArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$controlacceso.get('api/Rols/Listar', configuracion).then(function(response){
                    rolesArray=response.data;
                    rolesArray.map(function(x){
                        me.roles.push({text: x.nombre,value:x.idrol});
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
            editItem (item) {
                debugger
                console.log(item)
                this.idUsuario=item.idUsuario;
                this.idrol=item.rolId;
                this.nombre=item.nombre;
                this.puesto=item.puesto; 
               
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
                this.usuarioAnt = item.usuario;
                this.password=item.password_hash;
                this.passwordAnt=item.password_hash;
                this.editedIndex=1;
                this.listarDSP();
                this.listarAgencia();
                this.listarModulo();
                this.dialog = true
                console.log(this.idUsuario)
                console.log(this.direccion)
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            agregar(){
                this.dialog=true;
            },
            limpiar(){
                this.keycloakUserToken='',
                this.keycloakPasswordToken='',
                this.createdKeycloakUserId=[],
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
            },
            guardar () {
                this.$validator.validate().then(async result => {
                    debugger
                    if (result) {
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        if (this.editedIndex > -1) {
                            let me=this;

                            //si el hash del campo contraseña es igual al hash de la contraseña actual
                            if (me.password!=me.passwordAnt){
                                //contraseña actualizada sera verdadero
                                me.actPassword=true;
                            }
                            //Eliminar y reemplazar por la función updateKeycloakUser() cuando la api de actualización este lista
                            await me.updateKeycloakUser(configuracion)
                      /*    if (me.distritoActual == me.idDistritoPach && me.distrito == me.idDistritoPach) {
                            console.log('son en el mismo distrito')
                            this.$controlacceso.put('api/Usuarios/Actualizar', {
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

                            this.$controlacceso.put('api/Usuarios/Actualizar', {
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

                              this.$controlacceso.post('api/Usuarios/ClonarUsuario', {
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

                                this.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                  'UsuarioId': me.idUsuario,
                                  'idDistrito': me.me.distrito,
                                  'caso': 2,
                                }, configuracion).then(function (response) {
                                  console.log(response)
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
                              } else {
                                me.$notify('Error al intentar actualizar la informacion!!!', 'error')
                              }

                            });
                          }
                          else if ((me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)) {
                            console.log('todos diferentes')
                            this.$controlacceso.put('api/Usuarios/Actualizar', {
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
                              console.log(response)
                              this.$controlacceso.post('api/Usuarios/ClonarUsuario', {
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
                                this.$controlacceso.post('api/PanelUsuarios/ClonarPanel', {
                                  'UsuarioId': me.idUsuario,
                                  'idDistritoD': me.distrito,
                                  'caso': 3,
                                }, configuracion).then(function (response) {
                                  console.log(response)
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
                                } else {
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
*/
                          //fin Eliminar
                        }
                        else {
                            let me=this;
                            await me.createKeycloakUser(configuracion)
                        }
                    }
                })
            },
            agregarpanel(item){ 
                console.log(item)
                this.distritoActual = item.distritoId
                console.log(this.distritoActual)
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
                this.addPanel=true;
                this.panel=[];
                this.listarAsignados();
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item.idUsuario;                
                if (accion==1){
                    this.adAccion=1;
                }
                else if (accion==2){
                    this.adAccion=2;
                }
                else{
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
            activar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$controlacceso.put('api/Usuarios/Activar/'+ me.adId,{},configuracion).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
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
            desactivar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$controlacceso.put('api/Usuarios/Desactivar/'+this.adId,{},configuracion).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
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
        }        
    }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>