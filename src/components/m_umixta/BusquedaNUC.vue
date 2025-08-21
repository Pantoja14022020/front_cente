<template>  
    <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Busqueda de NUC en el Sistema Centenario</v-toolbar-title>
                
                <v-divider class="mx-2" inset vertical></v-divider>

                <v-badge v-model="show" color="cyan" right>
                    <v-icon large color="grey lighten-1"> policy</v-icon>
                </v-badge>

                 <!-- Seleccion del distrito donde se hara la busqueda mas especifica de la NUC -->
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn class="mx-2" slot="activator" v-on="on" @click="dialogo = true" color="success">
                        Opciones
                        </v-btn>
                    </template>
                    <span>Busqueda más especifica de una carpeta</span>
                </v-tooltip>
                <v-spacer></v-spacer>

                <!-- Boton para el limpiado de los componentes y hacer otra busqueda -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2"
                        slot="activator"
                        v-on="on"
                        @click="LimpiarFiltros()"
                        fab
                        dark
                        small
                        color="success"
                        >
                        <v-icon dark>backspace</v-icon>
                        </v-btn>
                    </template>
                    <span>Limpiar busqueda</span>
                </v-tooltip>
            </v-toolbar>

            <!-- Se crea un espacio sonde colocar los componentes para conformar la NUC -->
            <v-card flat color="white" grid-list-md text-md-right fluid fill-height >
                <v-layout row d-flex>
                    <v-card elevation="0">
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>

                                <v-flex class="espaciado" xs3 sm3 md3 lg3> 
                                    <v-autocomplete 
                                        label="*Distrito de carpeta:" 
                                        name="distrito"     
                                        v-model="cveDistrito"
                                        :items="distritos" 
                                        prepend-icon="public" 
                                        v-validate="'required'"
                                        return-object
                                        v-on:change="updateNuc()" 
                                        :error-messages="errors.collect('distrito')"
                                    />
                                </v-flex>

                                <v-flex class="espaciado" xs2 sm2 md2 lg2> 
                                    <v-autocomplete 
                                        label="*Año de carpeta:" 
                                        name="anocarpeta"     
                                        v-model="yearcarpeta"
                                        :items="yearList"
                                        :rules="[val => !!val || 'El año es obligatorio']"
                                        v-on:change="updateNuc()" 
                                        :error-messages="errors.collect('anocarpeta').length ? 'El campo Año de carpeta es obligatorio' : ''"
                                    />
                                </v-flex>

                                <v-flex class="espaciado" xs3 sm3 md3 lg3> 
                                    <v-text-field 
                                        name="num"
                                        v-model="numcarpeta" 
                                        v-validate="'required'"
                                        label="*Número de carpeta:"
                                        prepend-icon = "tag"
                                        @change="consultadenuc = false"
                                        counter
                                        v-on:change="updateNuc()" 
                                        maxlength="5"
                                        :rules="[val => /^[0-9]*$/.test(val) || 'Solo se permiten números']"
                                        :error-messages="errors.collect('NUC')" 
                                    /> 
                                </v-flex>

                                <v-flex class="espaciado" xs3 sm3 md3 lg3> 
                                    <v-text-field 
                                        name="NUC"
                                        label="*NUC"
                                        v-model="nuc" 
                                        v-validate="'required'"
                                        readonly
                                        disabled
                                        prepend-icon="folder"
                                        @change="consultadenuc = false"
                                        :error-messages="errors.collect('NUC')" 
                                    /> 
                                </v-flex>
                                <v-flex class="espaciado" xs1 sm1 md1 lg1> 
                                    <v-tooltip bottom v-if="cveDistrito !=''  && yearcarpeta !='' && numcarpeta !='' && distrito == '' && dialogo == false">
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                            class="mx-2"
                                            slot="activator"
                                            v-on="on"
                                            @click="BuscarNUC()"
                                            fab
                                            dark
                                            small
                                            color="success"
                                            >
                                            <v-icon>search</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Buscar NUC</span>
                                    </v-tooltip>
                                </v-flex>
                            </v-layout>
                        </v-container>                 
                    </v-card>
                </v-layout>
            </v-card>

            <!-- Resultados de la busqueda -->
            <v-data-table :headers="headers" :items="resultadoNUC" :search="search"  :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination"  class="elevation-1" >
                <template slot="items" class="white" slot-scope="props">

                    <td>{{ props.item.nucg }}</td>

                    <td>{{ props.item.racg }}</td>

                    <td>{{ props.item.distritoActual }}</td>
                    
                    <td>{{ props.item.subdireccionActual }}</td>

                    <td>{{ props.item.agenciaActual }}</td>

                    <td>{{ props.item.moduloActual }}</td>

                </template>
            </v-data-table>
             <v-dialog v-model="dialogo" max-width="500px">
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">search</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Opciones de busqueda</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12>
                                        <v-autocomplete
                                            class="text-xs-center"
                                            label="Selecciona el distrito donde deseas buscar la NUC" 
                                            name="distritoB" 
                                            :items="distritos"
                                            v-model="distrito"
                                            return-object
                                            :error-messages="errors.collect('distritoB').length ? 'El campo distrito es obligatorio' : ''">
                                        </v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn @click.native="dialogo = false">Cerrar</v-btn>
                                <v-btn @click.native="buscarNUCfiltro" class="success">Buscar</v-btn>
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
        import moment from 'moment'
        import 'moment/locale/es';
        import alertify from 'alertifyjs';
        import { VueEditor } from "vue2-editor";
        import n401 from './401.vue'
        import n403 from './403.vue'
        import { error } from 'util';
        import UmixtaNavDrawer from './umixtaNavDrawer.vue';
    
        export default 
        {
            components: 
            {      
                "vue2-editor": VueEditor,
                n401,
                n403,
                UmixtaNavDrawer
            },
            data: () => 
            ({
                alert:false,
                showpage:true,
                e401:false,
                e403:false,
                
                //-------Logos-----------------------------------------/
                logo1:'',
                logo2:'',
                today:'',
                modulo:'',
                pospuestoswitch:false,    
                //*************** */
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
        
                    { text: 'NUC', value: 'nuc', sortable: true  }, 
                    { text: 'RAC', value: 'rac', sortable: true  },
                    { text: 'Distrito actual', value: 'distrito', sortable: true  },             
                    { text: 'Subdireccion actual', value: 'subdireccion' }, 
                    { text: 'Agencia actual', value: 'agencia' }, 
                    { text: 'Modulo actual', value: 'modulo' }, 
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
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
                show: true,
                distritos:[],
                yearList:[],
                cveDistrito: '',
                distrito:'',
                yearcarpeta:'',
                numcarpeta: '',
                nuc: '',
                resultadoNUC:[],
                dialogo: false,

            }),
           
        created () 
        {
            let me = this 
                    
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

            //*********************************************** */
            me.listarDistritos();
            me.getYears();

            
        },
        computed: 
        {


        },
        watch: 
        {
            
        },
        methods:
        { 
            //Funcion para listar los distritos
            listarDistritos()
            {
                var distritoarray = [];
                let me = this;
                let header = { Authorization: "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                this.$notify("Recuerda que todos los campos son obligatorios, llenalos","success");

                me.$conf.get("api/Distritoes/Listar", configuracion).then(function (response) 
                {
                    distritoarray = response.data;
                    distritoarray.map(function (x) {
                        me.distritos.push({ text: x.nombre, value: x.idDistrito, value2: x.clave });
                    });
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
                        me.$notify("No esta autorizado para ver esta página", "error");
                        me.e403 = true;
                        me.showpage = false;
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", "error");
                    } else {
                        me.$notify("Error al intentar listar los registros", "error");
                    }
                });
            },
            //Funcion para obtener una lista de años para su posterior seleccion
            getYears() 
            {
                let me = this;
                const currentYear = new Date().getFullYear();
                const startYear = 2014; // Año inicial, ajustable

                me.yearList = [];
                for (let i = currentYear; i >= startYear; i--) {
                    me.yearList.push(i.toString());
                }
            },
            //Funcion para construir correctamente la nuc
            updateNuc()
            {
                var nocarpeta = this.numcarpeta.length < 5? this.numcarpeta.padStart(5, '0'): this.numcarpeta; 
                this.nuc = this.cveDistrito.value2 + '-' + this.yearcarpeta + '-' + nocarpeta;
            },
            //Funcion para el limpiado de componentes
            LimpiarFiltros()
            {
                let me = this;

                me.distrito = '';
                me.cveDistrito = '';
                me.yearcarpeta = '';
                me.numcarpeta = '';
                me.nuc = '';
                me.resultadoNUC = [];
            },

            //Funcion para la busqueda de la nuc junto con el id de didtrito dopnde se hara la busqueda
            BuscarNUC()
            {
                let header = { Authorization: "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                let me = this;

                this.$validator.validate().then((result) => {
                    if (result) 
                    {
                        this.$cat.get("api/Nucs/BuscarNucGnrl/" + me.nuc + "/" + me.cveDistrito.value, configuracion).then(function (response) 
                        {                            
                            //Cuando no hay algo
                            if(response.data && response.data.length > 0)
                            {
                                me.resultadoNUC = response.data;
                                me.distrito = '';
                            }
                            //Cuando no hay nada
                            else
                            {
                                alert("No existe registro de este Numero Unico de Caso en " + me.distrito.text);
                            }
                        //En caso de quie la api falle de da por entendido que es error de conexion, da el siguiente mensaje y limpia los componentes
                        }).catch((err) => 
                        {
                            alert("Hay problemas de conexion de " + me.u_distrito + " a " + me.distrito.text + ". Reportalo a la Direccion de TICs de la Procuraduria");  
                            me.LimpiarFiltros();
                        });
                    }
                    else
                    {
                        this.$notify("Todos los canpos son obligatorios, llenalos","error");
                    }
                });
            },


            buscarNUCfiltro()
            {
                let header = { Authorization: "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                let me = this;

                this.$validator.validate().then((result) => {
                    if (result) 
                    {
                        this.$cat.get("api/Nucs/BuscarNuc/" + me.nuc + "/" + me.distrito.value, configuracion).then(function (response) 
                        {                            
                            //Cuando no hay algo
                            if(response.data && response.data.length > 0)
                            {
                                me.resultadoNUC = response.data;
                                me.distrito = '';
                            }
                            //Cuando no hay nada
                            else
                            {
                                alert("No existe registro de este Numero Unico de Caso en " + me.distrito.text);
                            }
                        //En caso de quie la api falle de da por entendido que es error de conexion, da el siguiente mensaje y limpia los componentes
                        }).catch((err) => 
                        {
                            alert("Hay problemas de conexion de " + me.u_distrito + " a " + me.distrito.text + ". Reportalo a la Direccion de TICs de la Procuraduria");  
                            me.LimpiarFiltros();
                        });
                        me.dialogo = false;
                    }
                    else
                    {
                        this.$notify("Todos los canpos son obligatorios, llenalos","error");
                    }
                });
            }
        
        } 
    }
    </script>
    <style>

    </style>