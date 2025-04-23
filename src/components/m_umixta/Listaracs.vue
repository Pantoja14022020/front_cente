<template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
            <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Lista de registros de atención ciudadana asignados (RACs).</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                            <template v-slot:activator="{ on }"> 
                                <v-btn class="mx-2" slot="activator" v-on="on" @click="dialogo = true"  color="success">
                                    Opciones de busqueda
                                </v-btn>
                            </template>
                            <span>Opciones de busqueda</span>
                    </v-tooltip>

 
                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="carpetas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    <td class="justify-center layout px-0">

                        <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon  class="mr-2" color="warning"  v-on="on" @click="abrircarpeta(props.item)">
                                    folder
                                    </v-icon>
                                </template>
                                <span>Abrir carpeta</span>
                        </v-tooltip>


                     
                        
                    </td>
                    <td>{{ props.item.rac }}</td>  
                    <td>{{ props.item.distritoInicial }}</td> 
                    <td>{{ props.item.dirSubProcuInicial }}</td>  
                    <td>{{ props.item.agenciaInicial}}</td>
                    <td>{{ props.item.u_Nombre }}</td>  
                    <td class="justify-center layout px-0">
                        <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon  class="mr-2"  v-on="on" @click="MostrarNucg(props.item)">
                                    call_made
                                    </v-icon>
                                </template>
                                <span>Elevar a NUC</span>
                        </v-tooltip>
                    </td>

                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

            <v-dialog  v-model="dialogo"  max-width="500px" >

                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">search</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Opciones de busqueda</v-toolbar-title>
                        <v-spacer></v-spacer>                    
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12>
                                        <v-autocomplete 
                                            name="agencia"
                                            :items="agencias"
                                            v-model="agencia"
                                            label="Agencia:"                             
                                            v-if="esDirector || esAdministrador"
                                            @change="listarmodulos"
                                            clearable
                                            :error-messages="errors.collect('agencia')" >
                                        </v-autocomplete>   
                                        <v-autocomplete 
                                            name="modulo"
                                            :items="modulos"
                                            v-model="modulo"
                                            label="Modulo:" 
                                            clearable 
                                            v-if="esDirector || esAdministrador || esCoordinador"
                                            :error-messages="errors.collect('modulo')" >
                                        </v-autocomplete>   
                                        <v-menu
                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechadesde"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='desde'
                                                :value="fechad"
                                                label="*Desde:"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"                                   
                                                :error-messages="errors.collect('desde')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker  locale="es" v-model="fechadesde" no-title scrollable>
                                                <v-spacer></v-spacer>

                                                <v-tooltip bottom >
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon 
                                                            class="mr-2" v-on="on" color="primary" 
                                                            @click="limpiarfechad()"
                                                            >
                                                            delete
                                                        </v-icon> 
                                                    </template>
                                                    <span>Limpiar fecha</span>
                                                </v-tooltip>

                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>
                                        <v-menu
                                            ref="menu2"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechahasta"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='hasta'
                                                :value="fechah"
                                                label="*Hasta:"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"                                   
                                                :error-messages="errors.collect('hasta')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker locale="es" v-model="fechahasta" no-title scrollable>
                                                <v-spacer></v-spacer>

                                                <v-tooltip bottom >
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon 
                                                            class="mr-2" v-on="on" color="primary" 
                                                            @click="limpiarfechah()"
                                                            >
                                                            delete
                                                        </v-icon> 
                                                    </template>
                                                    <span>Limpiar fecha</span>
                                                </v-tooltip>

                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu2=false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>  

                                    </v-flex>          
                                </v-layout>
                            </v-container>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogo = false" >Cerrar</v-btn>
                                <v-btn   @click.native="listarconfiltro" class="success" >Buscar</v-btn>
                                
                            </v-card-actions> 
                        </v-form>
                    
                    </v-card-text> 
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'  
    import VeeValidate from 'vee-validate' 
    import n401 from './401.vue'
    import n403 from './403.vue'
    import alertify from 'alertifyjs';
      import { error } from 'util';
    export default {
        data(){
            return {      
                components: {  
                    n401,
                    n403
                }, 
                showpage:true,
                e401:false,
                e403:false,
                
                //-----CLAIM------------------------------------------
                u_iddistrito:this.$store.state.usuario.iddistrito,
                u_distrito:this.$store.state.usuario.distrito,
                u_dirSubPro:this.$store.state.usuario.dirSubProc,
                u_idagencia:this.$store.state.usuario.idagencia,
                u_agencia:this.$store.state.usuario.agencia,
                u_idmoduloservicio:this.$store.state.usuario.idmoduloservicio,
                u_modulo:this.$store.state.usuario.modulo,
                u_idusuario:this.$store.state.usuario.idusuario,
                u_nombre:this.$store.state.usuario.usuario,
                u_clave:this.$store.state.usuario.clave,
                u_rol:this.$store.state.usuario.rol,
                u_puesto:this.$store.state.usuario.puesto,
                u_subproc:this.$store.state.usuario.subProc, 
                u_iddsp : this.$store.state.usuario.iddsp,
                //----------------------------------------------------
                dialog: false,
                dialogo:false,
                agencias:[],
                agencia:'',
                modulos:[],
                modulo:'',
                agenciaux:'',
                fechadesde:'',
                fechad:'',
                fechahasta:'',
                fechah:'',
                menu1:false,
                menu2:false,
                headers: [
                    { text: 'Abrir rac', value: 'asignacion', sortable: false },
                    { text: 'RAC', value: 'rac', sortable: false },    
                    { text: 'Distrito', value: 'distritoInicial' },
                    { text: 'Dirección o Subprocuraduria', value: 'dirSubProcu' },
                    { text: 'Agencia', value: 'agenciaInicial' }, 
                    { text: 'Atendido por', value: 'atendidopor'},  
                    { text: 'Opciones', value: 'op'}, 
                                                  
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                editedIndex: -1, 
                //----------------------------------------------------
                carpetas:[],
                rHechoId:'',
      
             
           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
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
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () { 
           
            this.$store.state.rac = null;
            this.$store.state.ratencionid2 = null;
            this.$store.state.rhechoid2 = null;
            if(this.esAMPOAMP)this.listar(); 
            if(this.esCoordinador)this.listarmodulos2(); 
            this.listaragencias();
            

            axios.interceptors.request.use( (config)=> {
            // Do something before request is sent 
            this.$store.commit('LOADER',true);
            return config;
            }, (error)=> { 
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject( error);
            });

            // Add a response interceptor
            axios.interceptors.response.use((response)=>{ 
            this.$store.commit('LOADER',false);
            // Do something with response data 
            return response;
            },  (error)=> { 
            // Do something with request error
            this.$store.commit('LOADER',false); 
            return Promise.reject(error);
            });
            
        },
        methods:{
            fechainif(){
                if(this.menu1){
                    this.generarfecha2();
                    this.$refs.menu1.save(this.fechadesde);
                } 
                if(this.menu2){
                    this.generarfecha2();
                    this.$refs.menu2.save(this.fechahasta);
                }            
            },
            generarfecha2(){           
                if(this.menu1) 
                this.fechad =this.fechadesde.substring(8,10) +" de "+ this.obtenermes(this.fechadesde.substring(5,7)-1)+
                " del "+ this.fechadesde.substring(0,4);   
                 if(this.menu2) 
                this.fechah =this.fechahasta.substring(8,10) +" de "+ this.obtenermes(this.fechahasta.substring(5,7)-1)+
                " del "+ this.fechahasta.substring(0,4);   
            },        
            obtenermes: function(mes){
                if(mes==0) return "Enero"
                if(mes==1) return "Febrero"
                if(mes==2) return "Marzo"
                if(mes==3) return "Abril"
                if(mes==4) return "Mayo"
                if(mes==5) return "Junio"
                if(mes==6) return "Julio"
                if(mes==7) return "Agosto"
                if(mes==8) return "Septiembre"
                if(mes==9) return "Octubre"
                if(mes==10) return "Noviembre"
                if(mes==11) return "Diciembre"
            },
            limpiarfechad(){
                this.fechad = ""
                this.fechadesde = ""
                this.menu1 = false
            },
            limpiarfechah(){
                this.fechah = ""
                this.fechahasta = ""
                this.menu2 = false
            },
            listar(){
                
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RHechoes/ListarPorModuloRACS/' + me.u_idmoduloservicio,configuracion).then(function(response){
                    me.carpetas=response.data;
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
            listarconfiltro(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                var agenciaid,moduloid,indicadoragencia,indicadormodulo,fechad,fechah,indicadorFI,indicadorFF,rol

                if(me.agencia == "" || me.agencia == undefined){indicadoragencia = false,agenciaid = '00000000-0000-0000-0000-000000000000'}
                else{
                    indicadoragencia = true
                    agenciaid = me.agencia
                } 

                if(me.modulo == "" || me.modulo == undefined){indicadormodulo = false,moduloid = '00000000-0000-0000-0000-000000000000'}
                else{
                    indicadormodulo = true
                    moduloid = me.modulo
                } 

                if(me.fechad == "" || me.fechad == undefined || me.fechadesde == undefined || me.fechadesde == undefined){indicadorFI = false,fechad = '0001-01-01'}
                else{
                    indicadorFI = true
                    fechad = me.fechadesde
                } 


                if(me.fechah == "" || me.fechah == undefined || me.fechahasta == undefined || me.fechahasta == undefined){indicadorFF = false,fechah = '0001-01-01'}
                else{
                    indicadorFF = true
                    fechah = me.fechahasta
                } 

                if(me.esDirector || me.esAdministrador)rol = "AD"
                else if(me.esCoordinador) rol = "C"
                else rol = "A"

                this.$cat.get('api/RHechoes/ListarPorModuloRACSAdminDirector/' + indicadoragencia + "/" + agenciaid + "/" + indicadormodulo + "/" + moduloid + "/" + indicadorFI + "/" + fechad + "/" + indicadorFF + "/" + fechah + "/" + me.u_iddsp + "/" + me.u_idagencia + "/" + me.u_idmoduloservicio + "/" +  rol ,configuracion).then(function(response){
                    me.dialogo = false
                    me.carpetas = response.data
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
            listaragencias(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var agenciasarray;
                me.$conf.get('api/Agencias/ListarporDSP/'+me.u_iddsp,configuracion).then(function(response){      
                    agenciasarray=response.data;
                    agenciasarray.map(function(x){
                        me.agencias.push({text: x.nombre,value: x.idAgencia});
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
            listarmodulos(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var moduloarray;
                me.modulos = []
                me.modulo = ""
                if( me.agencia != undefined ){

                    me.$conf.get('api/ModuloServicios/ListarPorAgencia/'+me.agencia,configuracion).then(function(response){      
                        moduloarray=response.data;
                        moduloarray.map(function(x){
                            me.modulos.push({text: x.nombre,value: x.idModuloServicio});
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
                
            },
            listarmodulos2(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var moduloarray;
                me.modulos = []
                me.modulo = ""
                if( me.agencia != undefined ){

                    me.$conf.get('api/ModuloServicios/ListarPorAgencia/'+me.u_idagencia,configuracion).then(function(response){      
                        moduloarray=response.data;
                        moduloarray.map(function(x){
                            me.modulos.push({text: x.nombre,value: x.idModuloServicio});
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
                
            },            
            abrircarpeta(item) {   

                this.$store.state.rac= item.rac;  
                this.$store.state.ratencionid2 = item.rAtencionId;
                this.$store.state.rhechoid2 = item.rHechoId ;
                this.$router.push('./informacionrac') 

            },
            MostrarNucg(item){
                let me = this
                let responseData = null; 
                //var responseData;
                this.$cat.post('api/Nucs/MostrarNUCG', {
                distritoId: this.u_iddistrito,
                agenciaId: this.u_idagencia
            }, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                }
            })
            .then(response => {
                responseData =response.data;
                
                me.$confirm('Esperando confirmación', 'La carpeta será denominada con el siguiente número de NUC:  '+responseData+'   Estas seguro de  que deseas elevar el RAC a NUC.  Una vez realizada esta accion no prodra realizar cambios  ', function(){

                me.elevarnuc(item);

                }, 

function(){
    alertify.warning('Verifica la información')
}
).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                
            })
            .catch(err => {
                if (err.response.status == 400) {
                    this.$notify("No es un usuario válido", 'error');
                } else if (err.response.status == 401) {
                    this.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error');
                    this.e401 = true;
                    this.showpage = false;
                } else if (err.response.status == 403) {
                    this.$notify("No está autorizado para ver esta página", 'error');
                    this.e403 = true;
                    this.showpage = false;
                } else if (err.response.status == 404) {
                    this.$notify("El recurso no ha sido encontrado", 'error');
                } else {
                    this.$notify('Error al intentar listar los registros!!!', 'error');
                } 
            });

      }, 
       elevarnuc(item) {
    let me = this;
    let header = { "Authorization": "Bearer " + this.$store.state.token };
    let configuracion = { headers: header };

    //DETALLES DE LA ELEVACION DE RAC A NUC
    var detalleRN = 'Se elevo de RAC a NUC'
    var detalleRNE = 'Elevacion a NUC'

    this.$cat.post('api/Nucs/GenerarNuc', {
        'distritoId': me.u_iddistrito,
        'agenciaId': me.u_idagencia,
    }, configuracion).then(function (response) {

        this.$cat.put('api/RHechoes/ActualizarNUC', {
            'idrhecho': item.rHechoId,
            'ratencionid': item.rAtencionId,
            'nucid': response.data.idnuc,
        }, configuracion).then(function (response) {
            
            me.$notify('La información se guardó correctamente!!!', 'success');

            this.$cat.post('api/Historialcarpeta/Crear',{

                'RHechoId': item.rHechoId,
                'Detalle':  detalleRN,
                'Modulo': me.u_modulo,
                'Agencia':me.u_agencia,
                'DetalleEtapa': detalleRNE,
                'UDistrito' : me.u_distrito,
                'USubproc': me.u_dirSubPro,
                'UAgencia': me.u_agencia,
                'Usuario': me.u_nombre,
                'UPuesto': me.u_puesto,
                'UModulo': me.u_modulo

                },configuracion).then(function(response){

                me.$notify('La información se guardo correctamente !!!','success')
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
                    me.$notify('Error al intentar crear el  registro!!!','error')
                }
                });
        }).catch(err => {
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
                me.$notify('Error al intentar actualizar el registro!!!', 'error');
            }
        });

    }).catch(err => {
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
            me.$notify('Error al intentar crear el registro!!!', 'error');
        }
    });
},

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.rHechoId2=""; 
                
                this.editedIndex=-1;
            },
           
        }        
    }
</script>
