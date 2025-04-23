 <template>
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
            <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Reasignación (RACs).</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>


                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="carpetas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.rac }}</td>  
                    <td>{{ props.item.distritoInicial }}</td> 
                    <td>{{ props.item.dirSubProcuInicial }}</td>  
                    <td>{{ props.item.agenciaInicial}}</td>
                    <td>{{ props.item.modulos}}</td>
                    <td>{{ props.item.u_Nombre }}</td>  
                    <td class="justify-center layout px-0">

                        <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon  class="mr-2"   v-on="on" @click="dialogomodulosver(props.item)">
                                    autorenew
                                    </v-icon>
                                </template>
                                <span>Reasignar</span>
                        </v-tooltip>

                    </td>

                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

            <v-dialog  v-model="dialogoaceptar"  max-width="700px" >

                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">update</v-icon>
                        </v-avatar>
                        
                        <v-toolbar-title class="subheading">Reasignar modulo</v-toolbar-title>
                        <v-spacer></v-spacer>                  
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form"  >
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>

                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12>

                                        <v-autocomplete 
                                            name="modulo"   
                                            :items="modulos"
                                            v-model="modulo"
                                            return-object 
                                            v-validate="'required'" 
                                            data-vv-scope="Aceptar"
                                            label="*Modulo:"
                                            :error-messages="errors.collect('modulo')">
                                        </v-autocomplete>                                    
                                            
                                    </v-flex>    

                                </v-layout>
                            </v-container>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogoaceptar=false" >Cerrar</v-btn>      
                                <v-btn color="success" @click.native="reasignar" >Guardar</v-btn>                              
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
                //----------------------------------------------------
                dialog: false,
                headers: [
                    
                    { text: 'RAC', value: 'rac', sortable: false },    
                    { text: 'Distrito', value: 'distritoInicial' },
                    { text: 'Dirección o Subprocuraduria', value: 'dirSubProcu' },
                    { text: 'Agencia', value: 'agenciaInicial' }, 
                    { text: 'Modulo', value: 'modulos' }, 
                    { text: 'Atendido por', value: 'atendidopor'},  
                    { text: 'Opciones', value: 'asignacion', sortable: false },

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
                modulos:[],
                modulo:"",
                dialogoaceptar:false,
             
           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {           
            this.listar();
            this.listarmodulos(); 
        },
        methods:{
            listar(){
                
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RHechoes/ListarPorAgenciaRACS/' + me.u_idagencia,configuracion).then(function(response){
                    console.log(response.data)
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
        listarmodulos(){ 

            var moduloarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/ModuloServicios/ListarPorAgencia/'+me.u_idagencia,configuracion).then(function(response){

                moduloarray = response.data;
                moduloarray.map(function(x){
                    me.modulos.push({text: x.nombre,value: x.idModuloServicio , value2: x.agenciaId});
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
        reasignar(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validate().then(result => {
                if (result) {             
                    this.$cat.put('api/RHechoes/ActualizarModuloyAgencia',{

                        'IdRHecho': me.idrhecho,
                        'moduloServicioId': me.modulo.value,   
                        'agenciaId': me.modulo.value2 

                    },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')                          
                        me.dialogoaceptar = false      
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        } 
                    });              
    
                }
            
            }) 

        },
            
        dialogomodulosver(item){

            this.limpiar();
            this.idrhecho = item.rHechoId
            this.dialogoaceptar = true
        },
 
        limpiar(){
           
            
            this.modulo = ""
        },
           
        }        
    }
</script>
