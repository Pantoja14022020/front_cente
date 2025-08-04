<template>
    <v-layout align-start>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Dirección o Subprocuraduria.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                    <v-spacer />
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details />
                    <v-spacer />
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="dialog=true" class="mx-2" v-on="on" fab dark small color="primary">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </template>
                        <span>Agregar Registro</span>
                    </v-tooltip>
                    <v-dialog v-model="dialog" max-width="600px">
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                                </v-avatar> 
                            <v-toolbar-title class="subheading">{{ formTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer> 
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete name="distrito"
                                                      label="Distrito" 
                                                      v-model="distritoId"
                                                      :items="distritos"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('distrito')" >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="clave" 
                                                          label="Clave:"
                                                          v-model="clave" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('clave')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete name="nombre" 
                                                          label="Nombre de la subprocuraduria"
                                                          :items ="nombreSubs"
                                                          v-model="nombreSub" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="nombre" 
                                                          label="Nombre de la  dirección"
                                                          v-model="nombreDir" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                        </v-flex>                                    
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="responsable" 
                                                          label="Responsable"
                                                          v-model="responsable" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('responsable')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                              <v-text-field name="telefono" 
                                                          label="Telefono"
                                                          v-model="telefono" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('telefono')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-select name="tipo"
                                                      label="Tipo" 
                                                      v-model="tipo"
                                                      :items="tipos"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('tipo')" >
                                            </v-select>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-switch v-model="statusInicioCarpeta"   label="¿Inicia carpeta?:" color="success"  hide-details></v-switch>
                                        </v-flex>                                    
                                
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="close" >Cancelar</v-btn>
                                    <v-btn @click.native="guardar" class="success" >Guardar</v-btn>
                                </v-card-actions>
                            </v-form>
                        
                        </v-card-text> 
                        </v-card> 
                    </v-dialog>
                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="dsps"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                   
                    <td>{{ props.item.nombreDistrito }}</td>  
                    <td>{{ props.item.clave }}</td>
                    <td>{{ props.item.nombreSubDir }}</td> 
                    <td>{{ props.item.responsable }}</td> 
                    <td>{{ props.item.telefono }}</td>               
                     <td> 
                        <div v-if="props.item.statusInicioCarpeta">
                            <span class="blue--text">Si</span>
                        </div>
                        <div v-else>
                            <span class="red--text">No</span>
                        </div>
                    </td> 
                    <td>{{ props.item.tipo }}</td>
                    <td>
                        <div v-if="props.item.statusDSP">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0"> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="editItem(props.item)"
                                        >
                                       edit
                                    </v-icon> 
                                </template>
                                <span>Editar registro</span>
                            </v-tooltip>    

                            <v-tooltip bottom  v-if="props.item.statusDSP" >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="activarDesactivarDSP(props.item)"
                                        >
                                        block
                                    </v-icon> 
                                </template>
                                <span>Desactivar Dirección</span>
                            </v-tooltip>

                            <v-tooltip bottom  v-if="!props.item.statusDSP" >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="activarDesactivarDSP(props.item)"
                                        >
                                        closed_caption
                                    </v-icon> 
                                </template>
                                <span>Activar Dirección</span>
                            </v-tooltip>
                    </td>  
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

            <!-- Modal para activar, desactivar ModuloServicio -->
            <v-dialog v-model="modalActDesDSP" max-width="400px">
                        <v-card>
                            <v-card-title class="subheading thin" v-if="!this.statusDSP"><v-icon>security</v-icon>¿Activar Dirección o Subprocuraduria?</v-card-title>
                            <v-card-title class="subheading thin" v-if="this.statusDSP"><v-icon>security</v-icon>¿Desactivar Dirección o Subprocuraduria?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="!this.statusDSP">Activar </span>
                                <span v-if="this.statusDSP">Desactivar </span>
                                la Dirección o Subprocuraduria con  el nombre: <b>{{ dspNombre }}</b>
                                de la agencia: <b>{{ distritoNombre }}</b>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn   @click="modalClose()">
                                    Cancelar
                                </v-btn>
                                <v-btn v-if="!this.statusDSP" color="success"   @click="actdesDSP()">
                                    Activar
                                </v-btn>
                                <v-btn v-if="this.statusDSP" color="success"   @click="actdesDSP()">
                                    Desactivar
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                    <v-dialog   v-model="bloqueo" max-width="600px" persistent></v-dialog>

        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'  
    import VeeValidate from 'vee-validate' 
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import NavDrawer from './ConfiguracionNavDrawer.vue'

    export default {
        components: {      
            n401,
            n403,
          NavDrawer,
        },
        data(){
            return {      
                  

                dialog: false,
                headers: [
                    { text: 'Distrito', value: 'nombreDistrito' },
                    { text: 'Clave', value: 'clave'},
                    { text: 'Dirección o Subprocuraduria', value: 'nombreSubDir' }, 
                    { text: 'Responsable', value: 'direccion',  },
                    { text: 'Teléfono', value: 'telefono',  },    
                    { text: 'Status de inicio de carpeta', value: 'statusInicioCarpeta',  },  
                    { text: 'Tipo', value: 'tipo'},  
                    { text: 'Estado', value: 'estado'}, 
                    { text: 'Opciones', value: 'opciones', sortable: false } 
                           
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },
                editedIndex: -1, 

                dsps:[],
               
                idDSP:'',
                clave:'',
                nombreDir: '',  
                nombreSubs: [
                    {text:"Subprocuraduría Oriente", value: "Subprocuraduría Oriente"},
                    {text:"Subprocuraduría Poniente", value: "Subprocuraduría Poniente"},
                    {text:"Subprocuraduría de Delitos de Género, Desaparición de Personas e Impacto Social", value:"Subprocuraduría de Delitos de Género, Desaparición de Personas e Impacto Social"},
                    {text: "Sin Asignacion", value: "Sin asignación"}
                ],
                nombreSub: '',
                responsable:'',
                telefono:'',
                statusInicioCarpeta:false, 
                tipos:[
                    {text:'SP',value:'SP'},
                    {text:'PI',value:'PI'},
                    {text:'Otra',value:'Otra'}
                ],
                tipo:'',
                distritos:[], 
                distritoId: '',
                showpage:true,
                e401:false,
                e403:false,
                modalActDesDSP: false,
                dspNombre: '',
                distritoNombre: '',
                statusDSP: '',
                idDSP: '',
                DistritoCxn: [],
                proceso: '',
                bloqueo: false
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva dirección  o subprocuradura' : 'Actualizar dirección o subprocuraduria'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.listarDistritos()

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
            listar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/DSPs/Listar',configuracion).then(function(response){
                    me.dsps=response.data;
                    me.bloqueo = false;
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
            listarDistritos(){
                let me=this;
                var distritosArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    distritosArray=response.data;
                    distritosArray.map(function(x){
                        me.distritos.push({text: x.nombre,value:x.idDistrito});
                    });
                    me.DistritoCxn = me.distritos;
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
                this.idDSP= item.idDSP; 
                this.clave= item.clave; 
                this.nombreDir=item.nombreSubDir;  
                this.nombreSub=item.nombreSub; 
                this.responsable=item.responsable;
                this.telefono=item.telefono;
                this.statusInicioCarpeta=item.statusInicioCarpeta;   
                this.distritoId=item.distritoId;
                this.tipo = item.tipo;
                this.statusDSP = item.statusDSP;
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idDSP=""; 
                this.distritoId="";
                this.clave="";
                this.responsable="";
                this.telefono="";
                this.statusInicioCarpeta=false;                 
                this.editedIndex=-1;
                this.nombreDir = ""
                this.nombreSub = ""
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) { 
                        this.bloqueo = true;
                        if (this.editedIndex > -1) {
                            //Código para editar 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.put('api/DSPs/Actualizar',{
                                'idDSP':me.idDSP, 
                                'distritoId': me.distritoId,
                                'clave': me.clave,
                                'nombreSubDir': me.nombreDir, 
                                'NombreSub': me.nombreSub,
                                'responsable': me.responsable,
                                'telefono': me.telefono, 
                                'statusInicioCarpeta': me.statusInicioCarpeta,
                                'tipo' : me.tipo
                            },configuracion).then(async function(response){
                                let newDSP = response.data.id;
                                await me.clonacionDSP(newDSP);
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!','success')  
                                me.listar();
                                me.limpiar();     
                                }).catch(err => { 
                                    me.$notify(`Error al actualizar distrito en Pachuca`, 'error');
                                });
                        } else {
                            //Código para guardar
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.post('api/DSPs/Crear',{
                                'distritoId': me.distritoId,
                                'clave': me.clave,
                                'nombreSubDir': me.nombreDir, 
                                'NombreSub': me.nombreSub,
                                'responsable': me.responsable,
                                'telefono': me.telefono, 
                                'statusInicioCarpeta': me.statusInicioCarpeta,
                                'tipo': me.tipo
                            },configuracion).then(function(response){
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
                        }
                    }  
                })
            },  
            activarDesactivarDSP(item){

                this.modalActDesDSP = true;
                this.dspNombre = item.nombreSubDir;
                this.distritoNombre = item.nombreDistrito;
                this.statusDSP = item.statusDSP;
                this.idDSP = item.idDSP;
            },
            modalClose(){
                this.modalActDesDSP = false;
            },
            async actdesDSP(){
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.bloqueo = true;
               if (me.statusDSP) {
                    me.editedIndex = -2;
                    await this.$conf.put('api/DSPs/DesactivarDSP/'+me.idDSP,{},configuracion).then(async function(response){
                        await me.actdesDSPxDis(); 
                        me.$notify(`Se Desactivo DSP en Pachuca`, 'success');                     
                    }).catch(err => {  
                        me.$notify(`Error al Desactivar DSP en Pachuca ${err.message}`, 'error');
                    });
                }
                else
                {

                    me.editedIndex = -3;
                    await  this.$conf.put('api/DSPs/ActivarDSP/'+this.idDSP,{},configuracion).then(async function(response){
                            await me.actdesDSPxDis();
                            me.$notify(`Se Activo DSP en Pachuca`, 'success');                     
                        }).catch(err => {  
                            me.$notify(`Error al Activar DSP en Pachuca ${err.message}`, 'error');
                        });
                }

            },
            async clonacionDSP(newDSP){
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                for (let i = 0; i < me.DistritoCxn.length; i++) { 
                    var idErrorG = me.DistritoCxn[i]; 
                    try{
                       const response = await this.$conf.post('api/DSPs/ClonarDSPs',{ 
                                'idDSP':newDSP, 
                                'distritoId': me.distritoId,
                                'clave': me.clave,
                                'nombreSubDir': me.nombreDir, 
                                'NombreSub': me.nombreSub,
                                'responsable': me.responsable,
                                'telefono': me.telefono, 
                                'statusInicioCarpeta': me.statusInicioCarpeta,
                                'tipo' : me.tipo,
                                'statusDSP': me.statusDSP,
                                'distritoCnx': me.DistritoCxn[i].value
                            },configuracion);

                            if(response.status == 200){
                                var ActR = true;
                                await me.guardarErrorReplic(idErrorG,newDSP, ActR)
                            }
                    } catch(error) {
                        me.$notify(`Error al guardar DSP en: ${me.DistritoCxn[i].text}`, 'error');          
                        var ActR = false;
                        await me.guardarErrorReplic(idErrorG,newDSP, ActR)
                    }             
                }    
            },
            async actdesDSPxDis(){
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    let newDSP = me.idDSP;

                    for (let i = 0; i < me.DistritoCxn.length; i++) { 
                    var idErrorG = me.DistritoCxn[i]; 
                    try{
                        const response = await this.$conf.put('api/DSPs/ActDesDSPxDis/'+me.idDSP+'/'+ me.DistritoCxn[i].value,{},configuracion);

                        if(response.status == 200){
                            var ActR = true;
                            await me.guardarErrorReplic(idErrorG,newDSP, ActR)
                        }
                    }
                    catch(error){
                        me.$notify(`Error al Actualizar Status de DSP en: ${me.DistritoCxn[i].text}`, 'error');          
                        var ActR = false;
                        await me.guardarErrorReplic(idErrorG,newDSP, ActR)
                    }
                }      
            },
            async guardarErrorReplic(idErrorG,newDSP, ActR){
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                const procesos = {
                     '1': 'Actualizar',
                    '-1': 'Guardar',
                    '-2': 'Desactivar DSP',
                    '-3': 'Activar DSP',
                };
                me.proceso = procesos[me.editedIndex];
                
                try{
                   const response =  await this.$conf.post('api/ErroresReplicacion/RegistrarError',{
                        'registroErrorId': newDSP,
                        'distritoId': idErrorG.value,
                        'nombreDistrito': idErrorG.text,
                        'modulo': "DSP",
                        'proceso': me.proceso,
                        'status': true,
                        'ActualizaRegistro': ActR
                    }, configuracion);

                    if(response.status == 201){
                         me.$notify(response.data.mensaje, 'warning');
                    }
                }
                catch(error){
                    me.$notify("No se pudo crear o actualizar el registro del error.", 'error');
                }
               
            }
        }        
    }
</script>