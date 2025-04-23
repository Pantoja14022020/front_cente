<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >No ejercicio de la acción penal</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                     <v-flex xs12 sm6 md3>
                        <v-text-field class="font-weight-regular"
                            v-model="nuc" disabled  prepend-icon="folder"
                            filled
                        ></v-text-field>
                       </v-flex>
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                                        <v-icon dark>close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cerrar carpeta</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="additem()" fab dark small color="success">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar registro</span>
                        </v-tooltip>
            
            
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="noejercicio"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.uUsuario }}</td> 
                    <td>{{ props.item.uModulo }}</td>
                    <td>{{ props.item.fechaSys.substring(8,10) +" de "+ obtenermes(props.item.fechaSys.substring(5,7)-1)+" del "+props.item.fechaSys.substring(0,4)+", "+props.item.fechaSys.substring(11,19)}}</td>
                    <td class="justify-center layout px-0"> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color="warning" 
                                        @click="cargardatos(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Imprimir No ejercicio de la acción penal.</span>
                            </v-tooltip>    
                    </td>      
 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                </template>
                
        </v-data-table>

        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
                <v-toolbar dark color="primary">
                    
                    <v-toolbar-title>Registro de No ejercicio de la acción penal.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="generarpdf()">Vista previa</v-btn>
                        <v-btn icon   @click="modalAdd = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                
                </v-toolbar> 
                    <v-card-text>
                        <v-form ref="form" >  
                            <br>
                            <br>

                            <v-stepper v-model="step" non-linear vertical>
                                <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('número de oficio')]">
                                    Captura de datos
                                </v-stepper-step>
                                <v-stepper-content step="1">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap>


                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-text-field 
                                                    name="número de oficio" 
                                                    label="*Número de oficio:" 
                                                    v-model="numoficio"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('número de oficio')">                                          
                                                </v-text-field> 
                                            </v-flex>


                                            <v-flex  class="espaciado" xs12 sm12 md12 lg12>                       
                                                <v-card elevation="0" >
                                                    <v-card-title ><h3>Estudio que se realizó a la carpeta de investigación</h3></v-card-title>
                                                </v-card>
                                                <v-checkbox v-model="op1" :label="`Facultad de abstenerse para investigar: 131, fracción XIII y 253 del Código Nacional de Procedimientos Penales.`"></v-checkbox>
                                                <v-checkbox v-model="op2" :label="`No ejercicio de la acción penal, por prescripción de querella: 122 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales.`"></v-checkbox>
                                                <v-checkbox v-model="op3" :label="`No ejercicio de la acción penal por prescripción para ejercer acción penal: 121 y 123 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales.`"></v-checkbox>
                                                <v-checkbox v-model="op4" :label="`No ejercicio de la acción penal por que se actualice alguna causa de sobreseimiento prevista en el artículo 327 del Código Nacional de Procedimientos Penales: 131 fracción XIII, 255, 327 y 485 fracción VII del Código Nacional de Procedimientos Penales.`"></v-checkbox>
                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                </v-stepper-content>
                                <v-stepper-step :complete="step > 2" step="2" editable :rules="[() => !errors.has('delito') && !errors.has('articulos de sanción del delito')]">
                                    Antecedentes.
                                </v-stepper-step>
                                <v-stepper-content step="2">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap>
                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-autocomplete name="delito" 
                                                    :items="delitos"
                                                    v-model="delito" 
                                                    v-validate="'required'" 
                                                    label="*Delitos:"
                                                    :error-messages="errors.collect('delito')">
                                                </v-autocomplete>
                                            </v-flex>

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-text-field 
                                                    name="articulos de sanción del delito" 
                                                    label="*Articulos de sanción del delito:" 
                                                    v-model="articulossd"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('articulos de sanción del delito')">                                          
                                                </v-text-field> 
                                            </v-flex>

                                        </v-layout>
                                    </v-container>

                                </v-stepper-content>

                                <v-stepper-step :complete="step > 3" step="3"  editable :rules="[() => !errors.has('articulos dispuestos por el legislador') && !errors.has('fecha a partir de la cual debe computarse la querella') && !errors.has('fecha límite para interposición de la querella') && !errors.has('fecha de interposición de la querella ante el ministerio público')]">
                                    Análisis del requisito de perseguibilidad. 
                                </v-stepper-step>
                                <v-stepper-content step="3">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap>

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>  

                                                <v-card elevation="0" >
                                                    <v-card-title ><h3>¿ EL DELITO ES DE OFICIO O POR QUERELLA ?</h3></v-card-title>
                                                </v-card>

                                                <v-radio-group v-model="oficioquerella" :mandatory="false">                                                                      
                                                    <v-radio label="OFICIO" value="1"></v-radio>
                                                    <v-radio label="QUERELLA" value="2"></v-radio>
                                                </v-radio-group>
                                                
                                            </v-flex>                               

                                            <v-flex v-if="oficioquerella == 2"  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-text-field                                                   
                                                    name="articulos dispuestos por el legislador" 
                                                    label="*Articulos dispuestos por el legislador:" 
                                                    v-model="articulolegislador"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('articulos dispuestos por el legislador')">                                          
                                                </v-text-field> 
                                            </v-flex>
                                                
                                            <v-flex  v-if="oficioquerella == 2"  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-radio-group v-model="querellainop" :mandatory="false">                                                                      
                                                    <v-radio label="LA QUERELLA FUE INTERPUESTA OPORTUNAMENTE" value="1"></v-radio>
                                                    <v-radio label="LA 	QUERELLA PRESCRIBIÓ" value="2"></v-radio>
                                                </v-radio-group>
                                            </v-flex>

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    v-if="querellainop == 1 &&  oficioquerella == 2"
                                                    ref="menu1"
                                                    v-model="menu1"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechaquerellacomputar"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha a partir de la cual debe computarse la querella'
                                                        :value="fechaqc"
                                                        label="*Fecha a partir de la cual debe computarse la querella:"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha a partir de la cual debe computarse la querella')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechaquerellacomputar" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    v-if="querellainop == 2 &&  oficioquerella == 2"
                                                    ref="menu2"
                                                    v-model="menu2"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechalimiteIquerell"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha límite para interposición de la querella'
                                                        :value="fechaliq"
                                                        label="*Fecha límite para interposición de la querella :"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha límite para interposición de la querella')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechalimiteIquerell" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>


                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    v-if="querellainop == 2 &&  oficioquerella == 2"
                                                    ref="menu3"
                                                    v-model="menu3"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechainterposicionqamp"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha de interposición de la querella ante el ministerio público'
                                                        :value="fechaiqmp"
                                                        label="*Fecha de interposición de la querella ante el ministerio público:"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha de interposición de la querella ante el ministerio público')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechainterposicionqamp" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                        </v-layout>
                                    </v-container>
                                </v-stepper-content>

                                <v-stepper-step :complete="step > 4" step="4" editable :rules="[() => !errors.has('límite de punibilidad mínimo') && !errors.has('límite de punibilidad máximo')&& !errors.has('clasificación del delito')&& !errors.has('fecha para comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal')&& !errors.has('fecha a partir de la cual debe efectuarse la operación aritmética')&& !errors.has('tipo de acto de investigación')&& !errors.has('años')&& !errors.has('meses')&& !errors.has('días')&& !errors.has('fecha de último acto de investigación')&& !errors.has('plazo para poder ejercer acción penal oportunamente')&& !errors.has('fecha en que ministerio público emite la resolución de consulta')]">
                                    Estudio del sentido de la presente resolución. 
                                </v-stepper-step>
                                <v-stepper-content step="4">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap>

                                            <v-flex  class="espaciado" xs12 sm12 md12 lg12>  

                                                <v-card elevation="0" >
                                                    <v-card-title ><h3>Estudio del sentido de la presente resolución.</h3></v-card-title>
                                                </v-card>

                                                <v-radio-group v-model="estudiospr" :mandatory="false">                                                                      
                                                    <v-radio label="PRESCRIPCIÓN PARA EJERCER LA ACCIÓN PENAL" value="1"></v-radio>
                                                    <v-radio label="EXCEPCIÓN DE LA PRESCRIPCIÓN PARA EJERCER LA ACCIÓN PENAL POR QUE HA TRANSCURRIDO LA MITAD DEL PLAZO PARA LA PRESCRIPCIÓN, (JURISPRUDENCIA):" value="2"></v-radio>
                                                </v-radio-group>
                                                
                                            </v-flex> 

                                            <v-flex v-if="estudiospr == 1"  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-text-field                                                    
                                                    name="límite de punibilidad mínimo" 
                                                    label="*Límite de punibilidad mínimo:" 
                                                    v-model="limitepminimo"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('límite de punibilidad mínimo')">                                          
                                                </v-text-field> 
                                            </v-flex>


                                            <v-flex v-if="estudiospr == 1"  class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-text-field 
                                                    name="límite de punibilidad máximo" 
                                                    label="*Límite de punibilidad máximo:" 
                                                    v-model="limitepmaximo"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('límite de punibilidad máximo')">                                          
                                                </v-text-field> 
                                            </v-flex>

                                            <v-flex  v-if="estudiospr == 1" class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-switch
                                                    color="success"
                                                    v-model="prisionmulta"
                                                    :label="`Tipo de pena alternativa : ${textopm}`"
                                                ></v-switch>                          
                                            </v-flex>

                                            <v-flex  v-if="estudiospr == 1" class="espaciado" xs12 sm12 md6 lg6>    
                                                <v-autocomplete name="clasificación del delito" 
                                                    :items="tipodelitos"
                                                    v-model="tipodelito" 
                                                    v-validate="'required'" 
                                                    label="*Clasificación del delito:"
                                                    :error-messages="errors.collect('clasificación del delito')">
                                                </v-autocomplete>
                                            </v-flex>

                                            <v-flex v-if="estudiospr == 1"  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    ref="menu4"
                                                    v-model="menu4"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechacionpenal"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha para comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal'
                                                        :value="fechaap"
                                                        label="*Fecha para comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal:"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha para comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechacionpenal" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                            <v-flex  v-if="estudiospr == 1" class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    ref="menu5"
                                                    v-model="menu5"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechaoperaciona"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha a partir de la cual debe efectuarse la operación aritmética'
                                                        :value="fechaoa"
                                                        label="*Fecha a partir de la cual debe efectuarse la operación aritmética:"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha a partir de la cual debe efectuarse la operación aritmética')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechaoperaciona" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu5 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                            <v-flex v-if="estudiospr == 1" class="espaciado" xs12 sm12 md12 lg12 >                      
                                                <v-card elevation="0"  >
                                                    <v-card-title ><h3>Precisar el tipo de acto de investigación, ejemplo: entrevista a   XXXXX, o bien el dictamen pericial emitido el XXX  signado por XXXX en materia de XXXX</h3></v-card-title>
                                                        <v-divider ></v-divider>
                                                    <v-card-text>
                                                            <v-form  > 
                                                            <vue-editor  
                                                                name="tipo de acto de investigación"
                                                                v-model="actoinvestigacion"                                        
                                                                v-validate = "'required'"
                                                                data-vv-scope="agregar"
                                                                outline  height=350px;
                                                                style="max-height: 310px; overflow-y: scroll"
                                                                :editorToolbar="customToolbar" 
                                                                :error-messages="errors.collect('tipo de acto de investigación')">
                                                            </vue-editor>
                                                        </v-form>
                                                    </v-card-text>  
                                                </v-card> 
                                            </v-flex>

                                            <v-flex class="espaciado" xs12 sm12 md12 lg12 >                      
                                                <v-card elevation="0">
                                                    <v-card-title ><h3>Tiempo transcurrido entre la fecha del último acto de investigación, y la fecha en que el ministerio público emitió su resolución de consulta</h3></v-card-title>
                                                        <v-divider ></v-divider>
                                                    <v-card-text>
                                                            <v-form  > 
                                                                <v-container grid-list-md text-xs-center>
                                                                    <v-layout row wrap>
                                                                        <v-flex  class="espaciado" xs4 sm4 md4 lg4>    
                                                                            <v-text-field 
                                                                                name="años" 
                                                                                label="*Años:" 
                                                                                v-model="anostr"
                                                                                v-validate="'required'"
                                                                                :error-messages="errors.collect('años')">                                          
                                                                            </v-text-field> 
                                                                        </v-flex>
                                                                        <v-flex  class="espaciado" xs4 sm4 md4 lg4>    
                                                                            <v-text-field 
                                                                                name="meses" 
                                                                                label="*Meses:" 
                                                                                v-model="mesestr"
                                                                                v-validate="'required'"
                                                                                :error-messages="errors.collect('meses')">                                          
                                                                            </v-text-field> 
                                                                        </v-flex>
                                                                        <v-flex  class="espaciado" xs4 sm4 md4 lg4>    
                                                                            <v-text-field 
                                                                                name="días" 
                                                                                label="*Días:" 
                                                                                v-model="diastr"
                                                                                v-validate="'required'"
                                                                                :error-messages="errors.collect('días')">                                          
                                                                            </v-text-field> 
                                                                        </v-flex>
                                                                    </v-layout>
                                                                </v-container>
                                                            </v-form>
                                                    </v-card-text>  
                                                </v-card> 
                                            </v-flex>

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    ref="menu6"
                                                    v-model="menu6"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechaultimoa"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha de último acto de investigación'
                                                        :value="fechua"
                                                        label="*Fecha de último acto de investigación:"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha de último acto de investigación')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechaultimoa" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu6 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>  

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    ref="menu7"
                                                    v-model="menu7"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="plazoaccionpo"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='plazo para poder ejercer acción penal oportunamente'
                                                        :value="plazoapo"
                                                        label="*Plazo para poder ejercer acción penal oportunamente :"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('plazo para poder ejercer acción penal oportunamente')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="plazoaccionpo" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu7 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>


                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-menu
                                                    ref="menu8"
                                                    v-model="menu8"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechaministerioperc"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        name='fecha en que ministerio público emite la resolución de consulta'
                                                        :value="fechamperc"
                                                        label="*Fecha en que ministerio público emite la resolución de consulta :"
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"
                                                        v-validate="'required'"                                   
                                                        :error-messages="errors.collect('fecha en que ministerio público emite la resolución de consulta')">
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker v-model="fechaministerioperc" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu8 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>
                                            </v-flex>  

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-switch
                                                    color="success"
                                                    v-model="art123"
                                                    :label="`Articulo 123?, solo aplica para la prescripción regla general- media aritmética : ${textosino123}`"
                                                ></v-switch>                          
                                            </v-flex> 

                                        </v-layout>
                                    </v-container>
                                </v-stepper-content>
                                <v-stepper-step :complete="step > 5" step="5" editable :rules="[() => !errors.has('número de firmas') && !errors.has('fecha de otorgamiento del perdón')&& !errors.has('razonar cómo se reparó el daño')&& !errors.has('fecha de inicio de tratamiento psicoterapéutico reeducativo')&& !errors.has('fecha de terminación de tratamiento psicoterapéutico reeducativo')]">
                                    Puntos. 
                                </v-stepper-step>
                                <v-stepper-content step="5">

                                            <v-stepper v-model="step2" non-linear vertical>
                                                <v-stepper-step :complete="step2 > 1" step="PO" editable>
                                                    PERDÓN DEL OFENDIDO.
                                                </v-stepper-step>
                                                <v-stepper-content step="PO">
                                                    <v-container grid-list-md text-xs-center>
                                                        <v-layout row wrap>
                                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-checkbox v-model="perdonofendido" :label="`PERDÓN DEL OFENDIDO.`"></v-checkbox>
                                                            </v-flex>

                                                            <v-flex v-if="perdonofendido"  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-text-field 
                                                                    name="número de firmas" 
                                                                    label="*Número de firmas:" 
                                                                    v-model="nofirmas"
                                                                    v-validate="'required'"
                                                                    @change="creard3()"
                                                                    :error-messages="errors.collect('número de firmas')">                                          
                                                                </v-text-field> 
                                                            </v-flex>

                                                            <v-flex v-if="perdonofendido"  class="espaciado" xs12 sm12 md12 lg12>
                                                                <div >
                                                                    <v-layout id =firmas wrap justify-space-between>
                                                                                                
                                                                    </v-layout> 
                                                                </div>
                                                            </v-flex>


                                                            <v-flex  v-if="perdonofendido"  class="espaciado" xs12 sm12 md6 lg6> 
                                                                <v-menu
                                                                    ref="menu9"
                                                                    v-model="menu9"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="fechaperdonofe"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                >
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name='fecha de otorgamiento del perdón'
                                                                        :value="fechapo"
                                                                        label="*Fecha de otorgamiento del perdón :"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha de otorgamiento del perdón')">
                                                                    ></v-text-field>
                                                                    </template>
                                                                        <v-date-picker v-model="fechaperdonofe" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menu9 = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                        </v-date-picker>
                                                                </v-menu>
                                                            </v-flex>  

                                                            <v-flex  v-if="perdonofendido" class="espaciado" xs12 sm12 md6 lg6> 
                                                                <v-switch
                                                                    color="success"
                                                                    v-model="violenciammog"
                                                                    :label="`Se trato de violencia a mujeres, menores y otros grupos vulnerables? ${textosinovm}`"
                                                                ></v-switch>                          
                                                            </v-flex>

                                                            <v-flex v-if="perdonofendido && violenciammog " class="espaciado" xs12 sm12 md12 lg12 >                      
                                                                <v-card elevation="0"  >
                                                                    <v-card-title ><h3>Razonar cómo se reparó el daño</h3></v-card-title>
                                                                        <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                            <v-form  > 
                                                                            <vue-editor  
                                                                                name="razonar cómo se reparó el daño"
                                                                                v-model="rrepaciondano"                                        
                                                                                v-validate = "'required'"
                                                                                data-vv-scope="agregar"
                                                                                outline  height=350px;
                                                                                style="max-height: 310px; overflow-y: scroll"
                                                                                :editorToolbar="customToolbar" 
                                                                                :error-messages="errors.collect('razonar cómo se reparó el daño')">
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>  
                                                                </v-card> 
                                                            </v-flex>

                                                            <v-flex  v-if="perdonofendido && violenciammog"  class="espaciado" xs12 sm12 md6 lg6> 
                                                                <v-menu
                                                                    ref="menu10"
                                                                    v-model="menu10"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="fechaItratamiento"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                >
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name='fecha de inicio de tratamiento psicoterapéutico reeducativo'
                                                                        :value="fechait"
                                                                        label="*Fecha de inicio de tratamiento psicoterapéutico reeducativo :"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha de inicio de tratamiento psicoterapéutico reeducativo')">
                                                                    ></v-text-field>
                                                                    </template>
                                                                        <v-date-picker v-model="fechaItratamiento" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menu10 = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                        </v-date-picker>
                                                                </v-menu>
                                                            </v-flex>  

                                                            <v-flex  v-if="perdonofendido && violenciammog"  class="espaciado" xs12 sm12 md6 lg6> 
                                                                <v-menu
                                                                    ref="menu11"
                                                                    v-model="menu11"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="fechaTtratamiento"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                >
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name='fecha de terminación de tratamiento psicoterapéutico reeducativo'
                                                                        :value="fechatt"
                                                                        label="*Fecha de terminación de tratamiento psicoterapéutico reeducativo :"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha de terminación de tratamiento psicoterapéutico reeducativo')">
                                                                    ></v-text-field>
                                                                    </template>
                                                                        <v-date-picker v-model="fechaTtratamiento" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menu11 = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                        </v-date-picker>
                                                                </v-menu>
                                                            </v-flex>  
                                                        </v-layout>
                                                    </v-container>
                                                </v-stepper-content>
                                                <v-stepper-step :complete="step2 > 2" step="ED" editable :rules="[() => !errors.has('hipótesis consistente en') && !errors.has('razonared')]">
                                                    EXCLUYENTE DEL DELITO.
                                                </v-stepper-step>
                                                <v-stepper-content step="ED">
                                                    <v-container grid-list-md text-xs-center>
                                                        <v-layout row wrap>
                                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-checkbox v-model="excluyentedelito" :label="`EXCLUYENTE DEL DELITO.`"></v-checkbox>
                                                            </v-flex> 

                                                            <v-flex v-if="excluyentedelito"  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-text-field 
                                                                    name="hipótesis consistente en" 
                                                                    label="*Hipótesis consistente en:" 
                                                                    v-model="hipotesised"
                                                                    v-validate="'required'"
                                                                    :error-messages="errors.collect('hipótesis consistente en')">                                          
                                                                </v-text-field> 
                                                            </v-flex>

                                                            <v-flex v-if="excluyentedelito" class="espaciado" xs12 sm12 md12 lg12 >                      
                                                                <v-card elevation="0"  >
                                                                    <v-card-title ><h3>Razonar</h3></v-card-title>
                                                                        <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                            <v-form  > 
                                                                            <vue-editor  
                                                                                name="razonared"
                                                                                v-model="razonared"                                        
                                                                                v-validate = "'required'"
                                                                                data-vv-scope="agregar"
                                                                                outline  height=350px;
                                                                                style="max-height: 310px; overflow-y: scroll"
                                                                                :editorToolbar="customToolbar" 
                                                                                :error-messages="errors.collect('razonared')">
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>  
                                                                </v-card> 
                                                            </v-flex>

                                                        </v-layout>
                                                    </v-container>
                                                </v-stepper-content>
                                                <v-stepper-step :complete="step2 > 3" step="HN" editable :rules="[() => !errors.has('se analizaron los elementos del tipo penal') && !errors.has('razonarncd')]">
                                                    EL HECHO COMETIDO NO CONSTITUYE DELITO.
                                                </v-stepper-step>
                                                <v-stepper-content step="HN">
                                                    <v-container grid-list-md text-xs-center>
                                                        <v-layout row wrap>
                                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-checkbox v-model="noconstituyedelito" :label="`EL HECHO COMETIDO NO CONSTITUYE DELITO.`"></v-checkbox>
                                                            </v-flex> 

                                                            <v-flex v-if="noconstituyedelito"  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-text-field 
                                                                    name="se analizaron los elementos del tipo penal" 
                                                                    label="*Se analizaron los elementos del tipo penal:" 
                                                                    v-model="elementostp"
                                                                    v-validate="'required'"
                                                                    :error-messages="errors.collect('se analizaron los elementos del tipo penal')">                                          
                                                                </v-text-field> 
                                                            </v-flex>

                                                            <v-flex v-if="noconstituyedelito" class="espaciado" xs12 sm12 md12 lg12 >                      
                                                                <v-card elevation="0"  >
                                                                    <v-card-title ><h3>Razonar</h3></v-card-title>
                                                                        <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                            <v-form  > 
                                                                            <vue-editor  
                                                                                name="razonarncd"
                                                                                v-model="razonarncd"                                        
                                                                                v-validate = "'required'"
                                                                                data-vv-scope="agregar"
                                                                                outline  height=350px;
                                                                                style="max-height: 310px; overflow-y: scroll"
                                                                                :editorToolbar="customToolbar" 
                                                                                :error-messages="errors.collect('razonarncd')">
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>  
                                                                </v-card> 
                                                            </v-flex>

                                                        </v-layout>
                                                    </v-container>
                                                </v-stepper-content>
                                                
                                                <v-stepper-step :complete="step2 > 4" step="ER" editable :rules="[() => !errors.has('existencia de la causa de inculpabilidad') && !errors.has('razonarerp')]">
                                                    EL IMPUTADO ÉSTE EXENTO DE RESPONSABILIDAD PENAL.
                                                </v-stepper-step>
                                                <v-stepper-content step="ER">
                                                    <v-container grid-list-md text-xs-center>
                                                        <v-layout row wrap>
                                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-checkbox v-model="exentoresponsabilidad" :label="`EL IMPUTADO ÉSTE EXENTO DE RESPONSABILIDAD PENAL.`"></v-checkbox>
                                                            </v-flex> 

                                                            <v-flex v-if="exentoresponsabilidad"  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-text-field 
                                                                    name="existencia de la causa de inculpabilidad" 
                                                                    label="*Existencia de la causa de inculpabilidad:" 
                                                                    v-model="causaincumpalbilidad"
                                                                    v-validate="'required'"
                                                                    :error-messages="errors.collect('existencia de la causa de inculpabilidad')">                                          
                                                                </v-text-field> 
                                                            </v-flex>

                                                            <v-flex v-if="exentoresponsabilidad" class="espaciado" xs12 sm12 md12 lg12 >                      
                                                                <v-card elevation="0"  >
                                                                    <v-card-title ><h3>Razonar</h3></v-card-title>
                                                                        <v-divider ></v-divider>
                                                                    <v-card-text>
                                                                            <v-form  > 
                                                                            <vue-editor  
                                                                                name="razonarerp"
                                                                                v-model="razonarerp"                                        
                                                                                v-validate = "'required'"
                                                                                data-vv-scope="agregar"
                                                                                outline  height=350px;
                                                                                style="max-height: 310px; overflow-y: scroll"
                                                                                :editorToolbar="customToolbar" 
                                                                                :error-messages="errors.collect('razonarerp')">
                                                                            </vue-editor>
                                                                        </v-form>
                                                                    </v-card-text>  
                                                                </v-card> 
                                                            </v-flex>

                                                            
                                                        </v-layout>
                                                    </v-container>
                                                </v-stepper-content>

                                                <v-stepper-step :complete="step2 > 5" step="IF" editable :rules="[() => !errors.has('imputado') && !errors.has('fecha de fallecimiento del imputado')]">
                                                    EL IMPUTADO YA FALLECIÓ.
                                                </v-stepper-step>
                                                <v-stepper-content step="IF">
                                                    <v-container grid-list-md text-xs-center>
                                                        <v-layout row wrap>
                                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-checkbox v-model="imputadofallecio" :label="`EL IMPUTADO YA FALLECIÓ.`"></v-checkbox>
                                                            </v-flex> 

    
                                                            <v-flex  v-if="imputadofallecio" class="espaciado" xs12 sm12 md6 lg6>
                                                                <v-autocomplete name="imputado" 
                                                                    :items="imputados"
                                                                    v-model="imputado" 
                                                                    v-validate="'required'" 
                                                                    label="*Imputado:"
                                                                    :error-messages="errors.collect('imputado')">
                                                                </v-autocomplete>
                                                            </v-flex>

                                                            <v-flex  v-if="imputadofallecio"  class="espaciado" xs12 sm12 md6 lg6> 
                                                                <v-menu
                                                                    ref="menu12"
                                                                    v-model="menu12"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="fechafallecimientoi"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="290px"
                                                                >
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name='fecha de fallecimiento del imputado'
                                                                        :value="fechaif"
                                                                        label="*Fecha de fallecimiento del imputado :"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha de fallecimiento del imputado')">
                                                                    ></v-text-field>
                                                                    </template>
                                                                        <v-date-picker v-model="fechafallecimientoi" no-title scrollable>
                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="menu12 = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                        </v-date-picker>
                                                                </v-menu>
                                                            </v-flex>  

                                                        </v-layout>
                                                    </v-container>
                                                </v-stepper-content>
                                         
                                            </v-stepper>
                                </v-stepper-content>
                                        
                            </v-stepper>                        
                        </v-form>
                    </v-card-text>                   
            </v-card>
        </v-dialog>        

        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click.native="guardar()">Guardar Incompetencia</v-btn>
                <v-btn icon   @click="modaldocumento = false">
                <v-icon>close</v-icon>
                </v-btn>

                </v-toolbar-items>
            </v-toolbar>
                <v-card-text>
                     <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                </v-card-text>
            </v-card>
            
        </v-dialog>

            
    </v-flex>
    
</v-layout> 
</template>

 
<script> 
    
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor"; 
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util';
  import * as d3 from 'd3';
  

  export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        dialogoeditor: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        test:'',
        control:false,
        fechahorasuhecho:'',
        numerooficio:'',
        fechaquerellacomputar:'',
        fechaqc:'',
        menu1:false,
        fechalimiteIquerell:'',
        fechaliq:'',
        menu2:false,
        fechainterposicionqamp:'',
        fechaiqmp:'',
        menu3:false,
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        noejercicio:[],
        direccionhecho:'',
        op1:false,
        op2:false,
        op3:false,
        op4:false,
        texto:'',
        texto2:'',
        comilla:'"',
        personan:'',
        delitos:[],
        delito:'',
        articulossd:'',
        oficioquerella:'1',
        articulolegislador:'',
        querellainop:'1',
        texto3:'',
        estudiospr:'1',
        limitepminimo:'',
        limitepmaximo:'',
        prisionmulta:false,
        tipodelitos:[
            {text:"Instantáneo",value: "Instantáneo"},
            {text:"Continuo",value: "Continuo"},
            {text:"Continuado",value: "Continuado"},
        ],
        tipodelito:'',
        fechacionpenal:'',
        fechaap:'',
        menu4:false,
        fechaoperaciona:'',
        fechaoa:'',
        menu5:false,
        actoinvestigacion:'',
        anostr:'',
        mesestr:'',
        diastr:'',
        fechaultimoa:'',
        fechua:'',
        menu6:false,
        plazoaccionpo:'',
        plazoapo:'',
        menu7:false,
        fechaministerioperc:'',
        fechamperc:'',
        menu8:false,
        texto4:'',
        art123:false,
        step:1,
        perdonofendido:false,
        excluyentedelito:false,
        noconstituyedelito:false,
        exentoresponsabilidad:false,
        imputadofallecio:false,
        nofirmas:'',
        fechaperdonofe:'',
        fechapo:'',
        menu9:false,
        violenciammog:false,
        rrepaciondano:'',
        fechaItratamiento:'',
        fechait:'',
        menu10:false,
        fechaTtratamiento:'',
        fechatt:'',
        menu11:false,
        hipotesised:'',
        razonared:'',
        step2:1,
        elementostp:'',
        razonarncd:'',
        causaincumpalbilidad:'',
        razonarerp:'',
        imputados:[],
        imputado:'',
        fechafallecimientoi:'',
        fechaif:'',
        menu12:false,
        numoficio:'',
        texto5:'',
        //***********************
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
        //*************** */
         headers: [

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Módulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha', value: 'Fecha', sortable: true  },
            { text: 'Opciones', value: 'opciones', sortable: false },
                                            
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        
        //********************************/
        

        rac:'',
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
        
    }),
       
    created () {
        let me = this 
            me.rHechoId =  me.$store.state.rhechoid;
            me.rAtencionId = me.$store.state.ratencionid
            me.nuc = me.$store.state.nuc;
           
        if (me.rHechoId== null)
        {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                function(){ 

                        me.$router.push('./umixta-carpetas')
                })
        }
        else{
                me.$notify('Carpeta abierta correctamente !!!','success')
                

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
                me.listarLogo();
                me.listar();
                me.listarrHecho();
                me.listardireccionhecho();
                me.obtenernombre1ravictima();
                me.listardelitos();
                me.listarimputados();
        }
      
      
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
    computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva Notificacíon' : 'Editar Notificacíon'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },
            textopm(){
                if(!this.prisionmulta)
                return 'Prisión'; else return 'Multa';
            },
            textosino123(){
                if(this.art123)
                return 'Si'; else return 'No';
            },
            textosinovm(){
                if(this.violenciammog)
                return 'Si'; else return 'No';
            }
    },
    watch: {
        
    },
    
    methods:{ 

        additem(){
            this.limpiar()
            this.modalAdd =true
        },  
        cargardatos(item){
            this.numoficio = item.numeroOficio
            this.op1 = item.op1
            this.op2 = item.op2
            this.op3 = item.op3
            this.op4 = item.op4
            this.delito = item.delito
            this.articulossd = item.articulosCp
            if(item.oficioQuerella)this.oficioquerella = '1'
            else oficioquerella = '2'
            this.articulolegislador = item.articuloLegislador
            this.fechaquerellacomputar = item.tFechaQuerella
            if(item.tipoQuerella) this.querellainop = '1'
            else this.querellainop = '2'
            this.fechalimiteIquerell = item.fFechaLimiteQI
            this.fechainterposicionqamp = item.fFechaInterposicionMp
            if(item.tipoPrescipcion) this.estudiospr = '1'
            else this.estudiospr = '2'
            this.limitepminimo = item.punibilidadMinimo
            this.limitepmaximo = item.punibilidadMaximo
            this.prisionmulta = item.tipopena
            this.tipodelito = item.ttipodelito
            this.fechacionpenal = item.tAccionPenalFecha
            this.fechaoperaciona = item.tOperacionAritmeticaFecha
            this.actoinvestigacion = item.tUltimoActoInvestigacion
            this.diastr = item.diasTranscurridos
            this.mesestr = item.mesesTranscurridos
            this.anostr = item.anosTranscurridos
            this.fechaultimoa = item.fechaUltimoActo
            this.plazoaccionpo = item.fechaEjercerAcion
            this.fechaministerioperc = item.fechaResolucionconsulta
            this.art123 = item.art123
            this.perdonofendido = item.perdonOfendido
            this.nofirmas = item.poNumeroFirmas
            this.texto5 = item.poNombreFirmas
            this.fechaperdonofe = item.poFechaPerdon
            this.violenciammog = item.poViolenciaMuMeOG
            this.rrepaciondano = item.povReparacionDaño
            this.fechaItratamiento = item.povfiTratamiento
            this.fechaTtratamiento = item.povffTratamiento
            this.excluyentedelito = item.excluyenteDelito
            this.hipotesised = item.edHipotesis
            this.razonared = item.edRazonar
            this.noconstituyedelito = item.noConstituyeDelito
            this.elementostp = item.ncdElementospenal
            this.razonarncd = item.ncdRazonar
            this.exentoresponsabilidad = item.exentoResponsabilidadPenal
            this.causaincumpalbilidad = item.erpCausaInculpabilidad
            this.razonarerp = item.erpRazonar
            this.imputadofallecio = item.imputadoFallecio
            this.imputado = item.ifImputadoNombre
            this.fechafallecimientoi = item.ifFechaFallecimiento
            this.imprimirpdf();
        },
        imprimirpdf(){
            let me = this;
            me.texto = '<p>En la ciudad de '+me.u_distrito+', Hidalgo; a</p>'+me.generarfecha()+' se <strong>resuelve</strong>:'+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Visto el estado procedimental que tienen las constancias de la carpeta de investigación al rubro citada, se procede a emitir la resolución que se estima pertinente conforme al Código Nacional de Procedimientos Penales, el Código Penal para el Estado de Hidalgo, la Ley Orgánica del Ministerio Público del Estado de Hidalgo y su Reglamento y:&nbsp;</p>"
                    
                    me.texto2 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>PRIMERO. Competencia. </strong>El ministerio público que emite esta resolución, es competente para resolver sobre el destino de la presente carpeta de investigación, en virtud de que los hechos ocurrieron en "+me.direccionhecho+", y nos encontramos ante hechos que fueron denunciados y que permiten identificar que corresponde conocer de ellos a esta Procuraduría General de Justicia.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Lo anterior con fundamento en los artículos 14, 16 y 21 de la Constitución Política de los Estados Unidos Mexicanos; 1º, 5º -fracción III- y 7 de la Ley Orgánica del Ministerio Público en el estado de Hidalgo; 1º de su Reglamento; así como</p>"

                    if(me.op1)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Facultad de abstenerse para investigar: 131, fracción XIII y 253 del Código Nacional de Procedimientos Penales.</P>"

                    if(me.op2)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal, por prescripción de querella: 122 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales. </p>"

                    if(me.op3)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal por prescripción para ejercer acción penal: 121 y 123 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"

                    if(me.op4)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal por que se actualice alguna causa de sobreseimiento prevista en el artículo 327 del Código Nacional de Procedimientos Penales: 131 fracción XIII, 255, 327 y 485 fracción VII del Código Nacional de Procedimientos Penales.</p>"

                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>SEGUNDO. Antecedentes</strong>. De la presente carpeta de investigación se desprende que:&nbsp;</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>a)</strong> Se inició la carpeta de investigación el pasado </p>"+ me.fechaINUC.substring(8,10) +" de "+ me.obtenermes( me.fechaINUC.substring(5,7)-1)+" del "+ me.fechaINUC.substring(0,4)+"<p>, con motivo de la comparecencia de </p>"+ me.personan+
                    "<p>quien hizo del conocimiento del ministerio público hechos que estimaba constitutivos del delito de </p>"+ me.delito + "<p> ,y sancionado por el Código Penal en sus artículos </p> "+me.articulossd+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                    me.texto2 += "<p><strong>TERCERO. Análisis del requisito de perseguibilidad. </strong>El delito que se desprende de la carpeta de investigación, es el de </p>"+me.delito+"<p>, mismo que está previsto y sancionado en los artículos </p>"+me.articulossd+"<p> del Código Penal para el estado de Hidalgo, que son del siguiente tenor:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                    if(me.oficioquerella == 1)
                        me.texto2 +="<p>Ahora bien, el citado ilícito es perseguible de manera oficiosa, que es la regla general prevista por el legislador, salvo cuando expresamente hace distinción al respecto, sin embargo, apreciándose que no fue el caso para ese ilícito, debe tenerse en cuenta que es perseguible con independencia de la persona que haya hecho del conocimiento del ministerio público los hechos, lo cual ocurrió el pasado </p>"+ me.fechahorasuhecho.substring(8,10) +" de "+ me.obtenermes( me.fechahorasuhecho.substring(5,7)-1)+" del "+ me.fechahorasuhecho.substring(0,4)
                        else
                        me.texto2 +="<p>Ahora bien, el citado ilícito es perseguible por querella de parte ofendida, al así haberlo dispuesto el legislador en el artículo </p>"+ me.articulolegislador + "<p> de la codificación sustantiva de la materia; por ende, es de estudio preferente el requisito de procedibilidad.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>En el entendido que ello debe examinarse desde dos componentes:</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>a) La legitimación de quien haya formulado la querella.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>b) La oportunidad con que se haya planteado, para lo cual debemos atender el artículo 122 del Código Penal para el Estado de Hidalgo.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.oficioquerella == 2 && me.querellainop == 1)
                        me.texto2 += "<p>Requisito que está debidamente satisfecho, pues quien se dice persona agraviada fue</p>"+ me.personan+';y, de los registros que integran la carpeta de investigación se desprende que la fecha a partir de la cual debe computarse la querella es el '+me.fechaqc +'<p>, y la petición hecha al ministerio público para  que se investigaran los hechos fue el día </p>'+me.fechaINUC.substring(8,10) +" de "+ me.obtenermes( me.fechaINUC.substring(5,7)-1)+" del "+ me.fechaINUC.substring(0,4)
                    if(me.oficioquerella == 2 && me.querellainop == 2){
                        me.texto2 +=
                        "<p>El referido dispositivo legal establece que para poder tener por satisfecho ese requisito de perseguibilidad, debe haber sido planteado por quien haya resentido la afectación o la puesta en peligro del bien jurídicamente tutelado; y, que además la querella debe haberse formulado dentro del plazo legalmente establecido: un año a partir de que se tuvo conocimiento del hecho, y tres años independientemente de esa circunstancia.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Al caso es aplicable la tesis emitida por el Segundo Tribunal Colegiado en Materia Penal del Primer Circuito, registrada en la Novena Época con el número 169243, de rubro <strong>“PRESCRIPCIÓN DE LA ACCION PENAL, TRATÁNDOSE DE DELITOS QUE SE PERSIGUEN POR QUERELLA O ACTO EQUIVALENTE.”.</strong></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>Por ende, en el caso es evidente que la querella no fue interpuesta oportunamente, según la tabla que en seguida se inserta, porque el hecho delictivo ocurrió el </p>"+me.fechahorasuhecho.substring(8,10) +" de "+ me.obtenermes( me.fechahorasuhecho.substring(5,7)-1)+" del "+ me.fechahorasuhecho.substring(0,4)+"<p>, y la propia parte agraviada de nombre </p>"+me.personan+"<p> emite entrevista en la que se advierte que para el día en que se querelló ya había identificado que era sujeto pasivo del ilícito, por lo cual se torna evidente que al momento en que comparece ante el ministerio público para formular su querella e incoar el procedimiento penal, su derecho de acceder a la justicia mediante el esclarecimiento de los hechos, había precluido.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                        me.texto3 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>Así las cosas, se advierte que, quien se afirma ser la parte agraviada, lleva el nombre de </p>"+me.personan+"<p> y, de los registros de la carpeta de investigación se revela que la querella fue extemporáneamente promovida pues su fecha límite era el </p>"+ me.fechalimiteIquerell.substring(8,10) +" de "+me.obtenermes( me.fechalimiteIquerell.substring(5,7)-1)+" del "+ me.fechalimiteIquerell.substring(0,4)+"<p>), lo que significa que ya había prescrito, da lugar a una causa de extinción de acción penal, y por ende, se actualiza una de las causales de sobreseimiento que extinguen el ejercicio de la acción penal dentro de la presente carpeta de investigación; lo cual hace innecesario entrar al estudio de los datos de prueba que conforman la misma pues a nada llevaría, ante la imposibilidad de tener por oportunamente satisfecho un presupuesto procesal de primer orden.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    }

                    if(me.oficioquerella != 2 && me.querellainop != 2)
                    me.texto3 = ''

                    me.texto3 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>CUARTO. Estudio del sentido de la presente resolución.</strong></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.estudiospr == 1)
                    me.texto3 += "<p>Como ha quedado precisado en párrafos que anteceden, según la transcripción del ilícito por el que se ha seguido la presente carpeta de investigación, sus límites de punibilidad son:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>-      Mínimo: </strong></p>"+me.limitepminimo+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>-      Máximo: </strong></p>"+me.limitepmaximo+   
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Ahora bien, conforme al artículo 12 del Código Penal en la entidad, sabemos que la clasificación legal de los delitos, por el momento de su comisión, son:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"> </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">1. <strong><u>Instantáneos</u></strong>: cuando en el mismo momento se consumó el hecho delictivo, por lo que a partir de ahí debe comenzarse a hacer el cómputo. </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">2. <strong><u>Continuo o permanente</u></strong>, cuando con una sola conducta se prolongan sus efectos penalmente relevantes en el tiempo; caso en que el cómputo debe comenzar a computarse desde que cesa la conducta.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">3. <strong><u>Continuado</u></strong>, cuando con varias conductas se comete el ilícito y se actualiza momento a momento; en estos supuestos, el cómputo debe comenzar a partir del último acto u omisión penalmente relevante. </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En el entendido que cuando la pena prevista por el legislador es solamente económica, la prescripción es de <strong>un año</strong>, como podrían ser por ejemplo el daño en la propiedad culposo previsto en la correlación del artículo 99 –segundo párrafo- y 221 del Código Penal para el estado de Hidalgo; y, cuando el ilícito merece pena alternativa </p>"+me.textopm+"<p> ), se sigue la misma regla: un año para la prescripción.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><u>REGLA GENERAL PARA LA PRESCRIPCIÓN:</u> Si el delito que nos ocupa no encuadra en el párrafo que antecede, la prescripción para ejercer acción penal es el término <strong>medio aritmético</strong>, mismo que se obtiene de sumar la pena máxima a la mínima, y dividir su resultado a la mitad; en el entendido que la prescripción no puede ser menor a <strong>dos años</strong> en ningún caso.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De suerte que, se puede identificar que, el delito que nos ocupa, es </p>"+ me.tipodelito+"<p> ; lo cual significa que la fecha a partir de la que debe comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal, es el </p>"+me.fechacionpenal.substring(8,10) +" de "+ me.obtenermes( me.fechacionpenal.substring(5,7)-1)+" del "+ me.fechacionpenal.substring(0,4)+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Se toma en consideración que para el cómputo de la prescripción, se tendrá en cuenta el último acto de investigación que se llevó a cabo en la presente carpeta de investigación, el cual consistió en </p>"+me.actoinvestigacion+"<p> por ende, la fecha a partir de la cual debe efectuarse la operación aritmética es el día </p>"+me.fechaoperaciona.substring(8,10) +" de "+ me.obtenermes( me.fechaoperaciona.substring(5,7)-1)+" del "+ me.fechaoperaciona.substring(0,4)+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Resultando de aplicación la tesis de la Novena Época, sostenida por el Segundo Tribunal Colegiado en Materia Penal del Primer Circuito, consultable bajo el número de registro 183456, de rubro <strong>“PRESCRIPCIÓN. ACTUACIONES QUE NO LA INTERRUMPEN.”</strong> </p>"
                    else
                    me.texto3 += "<p>En este contexto, como ha quedado precisado en líneas anteriores, la prescripción implica un impedimento a la pretensión punitiva y potestad de ejecutar las penas y medidas de seguridad, y para que se actualice basta el simple transcurso del tiempo. De manera que, para que opere la prescripción de la acción penal, debe atenderse a la naturaleza del delito con sus modalidades y al término medio aritmético de la pena privativa de la libertad que señale la ley para el delito de que se trate, sin que en ningún caso sea menor de dos años, ahora bien, la regla general para interrumpir la prescripción es que se practiquen actuaciones por la autoridad ministerial, en investigación del delito y del delincuente; sin embargo, a fin de no caer en el supuesto de que un delito se convierta en imprescriptible, dicha regla admite un excepción, la cual consiste en que, una vez que haya transcurrido la mitad del plazo para la prescripción atento a la naturaleza del delito, las actuaciones que se realicen en investigación del delito y del delincuente, ya no la interrumpen, por tanto, sigue corriendo el término para que opere la prescripción de la pretensión punitiva, esto es, no sólo para la persecución del delito y delincuente por el órgano ministerial, sino también para que el Juez imponga la pena correspondiente, pues incluso, la prescripción debe declararse oficiosamente, ya sea por el agente del Ministerio Público, o por la autoridad judicial que conozca del caso.</p>"+
                    "<p>Lo anterior, se sustenta jurisprudencia <strong>I.6o.P. J/4 (10a.), Registro: 2017018, de rubro: “PRESCRIPCIÓN DE LA ACCIÓN PENAL. UNA VEZ QUE TRANSCURRE LA MITAD DEL PLAZO PARA QUE OPERE, LAS ACTUACIONES QUE SE REALICEN EN INVESTIGACIÓN DEL DELITO Y DEL DELINCUENTE NO LA INTERRUMPEN (LEGISLACIÓN APLICABLE PARA LA CIUDAD DE MÉXICO).</strong></p>"+ 
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>La figura de la prescripción implica un impedimento a la pretensión punitiva y potestad de ejecutar las penas y medidas de seguridad, y para que se actualice basta el simple transcurso del tiempo. De manera que, para que opere la prescripción de la acción penal, debe atenderse a la naturaleza del delito con sus modalidades y al término medio aritmético de la pena privativa de la libertad que señale la ley para el delito de que se trate, sin que en ningún caso sea menor de tres años. Ahora bien, la regla general para interrumpir la prescripción es que se practiquen actuaciones por la autoridad ministerial, en investigación del delito y del delincuente; sin embargo, esa regla admite la excepción prevista en el artículo 111 del Código Penal para el Distrito Federal –hoy Ciudad de México– (abrogado) de similar redacción al 115 del actual, según la cual, una vez que haya transcurrido la mitad del plazo necesario para la prescripción, atento a la naturaleza del delito, las actuaciones que se realicen en investigación del delito y del delincuente, ya no la interrumpen; por tanto, sigue corriendo el término para que opere la prescripción de la pretensión punitiva del Estado, esto es, no sólo para la persecución del delito y delincuente por el órgano ministerial, sino también para que el Juez imponga la pena correspondiente, pues incluso, la prescripción debe declararse oficiosamente, ya sea por el agente del Ministerio Público, o por la autoridad judicial que conozca del caso.”</p>"

                    me.texto3 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En tal virtud, entre la fecha del último acto de investigación, y la fecha en que el ministerio público emitió su resolución de consulta, han transcurrido </p>"+me.añostr+"<p> años con </p>"+me.mesestr+"<p> meses y </p>"+me.diastr+"<p> días.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De lo que resulta claro que ha precluido para la institución del ministerio público la facultad de ejercer acción penal, como se aprecia en la tabla que se inserta a continuación: </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    me.texto4="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.art123)
                    me.texto4 += "<p>En consecuencia, ha prescrito la facultad de ejercer acción penal, y ésta se encuentra extinta de conformidad con los artículos 109, fracción IX, 121 y 123 del Código Penal para el estado de Hidalgo, en relación con los diversos 255 y 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"
                    else
                    me.texto4 += "<p>En consecuencia, ha prescrito la facultad de ejercer acción penal, y ésta se encuentra extinta de conformidad con los artículos 109, fracción IX, 121 del Código Penal para el estado de Hidalgo, en relación con los diversos 255 y 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"

                    if(me.perdonofendido)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Cabe precisar que resulta innecesario entrar al estudio del tipo penal que se atribuye, el grado de ejecución del hecho, la forma de intervención y la naturaleza de la conducta, en virtud de que se actualiza una causa de extinción de acción penal prevista en los artículos 109 –fracción IV-, 114 y 115 del Código Penal para el estado de Hidalgo así como los artículos  327, fracción VI y 485 fracción IV, del Código Nacional de Procedimientos Penales.</p>"+
                    "<p>Es así ya que hemos justificado que el delito de </p>"+me.delito+"<p> es perseguible por querella de parte ofendida, lo que significa que la parte agraviada tiene la facultad de decidir si se debe o no continuar con el ejercicio de la acción penal.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este asunto la víctima u ofendido resulta ser </p>"+me.personan+"<p>, por ser quien resintió o se le puso el peligro el bien jurídicamente tutelado.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De ahí que sea solamente esa persona quien puede evitar continuar este procedimiento; y así se materializa ya que el día </p>"+me.fechaperdonofe.substring(8,10) +" de "+ me.obtenermes( me.fechaperdonofe.substring(5,7)-1)+" del año "+ me.fechaperdonofe.substring(0,4)+"<p>, compareció ante la institución del ministerio público y expresamente manifestó que otorgaba el perdón a la parte quien pueda resultar responsable.</p>"

                    if(me.violenciammog && me.perdonofendido)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    me.rrepaciondano+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Del </p>"+me.fechaItratamiento.substring(8,10) +" de "+ me.obtenermes( me.fechaItratamiento.substring(5,7)-1)+" del año "+ me.fechaItratamiento.substring(0,4)+"<p> a </p>"+me.fechaTtratamiento.substring(8,10) +" de "+ me.obtenermes( me.fechaTtratamiento.substring(5,7)-1)+" del año "+ me.fechaTtratamiento.substring(0,4)+ "<p> se acredita que se sometió a tratamiento psicoterapéutico reeducativo que prevé el artículo 9 –fracción V- de la Ley de Acceso de las Mujeres a una Vida Libre de Violencia en el estado de Hidalgo)</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Así, al ser el perdón del ofendido una figura que en forma lisa y llana extingue la acción penal, se estima que tal hipótesis se actualiza en la presente carpeta de investigación.</p>"

                    if(me.excluyentedelito)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, pese a que los antecedentes de investigación que se han señalado, permitirían al ministerio público justificar en qué momento se ha cometido ese hecho y existe la probabilidad de que el imputado lo haya cometido o participado en su comisión, sin embargo, se actualiza la excluyente de delito </p>"+me.delito+ "<p> en lo que no se centrará el presente estudio ya que esta resolución no tiene por objeto ejercer acción penal, sino explicar el motivo por el que no ha lugar a ello.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este contexto, el artículo 25 del Código Penal en la entidad, así como el artículo 405 del Código Nacional de Procedimientos Penales, establecen diversos supuestos por los cuales se actualiza una causa de atipicidad, causa de justificación o causa de inculpabilidad.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En el caso concreto, se actualiza –(de entre ellas)- la hipótesis consistente en "+me.hipotesised + "<p>, ya que </p>"+ me.razonared+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En razón de lo anterior, no es posible ejercer acción penal dentro de la presente carpeta de investigación, mediante una forma de conducir al imputado a proceso, en términos del artículo 141 del Código Nacional de Procedimientos Penales, lo antepuesto con fundamento en lo dispuesto por los artículos 255 en relación con el diverso numeral 327 fracción II del Código Nacional de Procedimientos Penales.</p>"

                    if(me.noconstituyedelito)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, pese a que los medios de convicción que se han señalado, permiten acreditar que existen datos de prueba que establezcan que se ha cometido un hecho y la probabilidad en la comisión o participación del imputado, esto es, la probabilidad del hecho, no siendo necesario acreditar los elementos objetivos, normativos y subjetivos, sino que, de conformidad con el artículo 19 de la Constitución Política de los Estados Unidos Mexicanos, es innecesario el análisis de todos los elementos constitutivos del tipo del delito imputado, sino únicamente deben analizarse los elementos objetivos (núcleo) relativos al hecho integrante del delito y respecto de los elementos subjetivos, su estudio debe ser en el grado de probable.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    '<p><strong>“AUTO DE VINCULACIÓN A PROCESO. PARA SATISFACER EL REQUISITO RELATIVO A QUE LA LEY SEÑALE EL HECHO IMPUTADO COMO DELITO, BASTA CON QUE EL JUEZ ENCUADRE LA CONDUCTA A LA NORMA PENAL, DE MANERA QUE PERMITA IDENTIFICAR LAS RAZONES QUE LO LLEVAN A DETERMINAR EL TIPO PENAL APLICABLE (NUEVO SISTEMA DE JUSTICIA PENAL). </strong>Del artículo 19, párrafo primero, de la Constitución Federal, reformado mediante Decreto publicado en el Diario Oficial de la Federación, el 18 de junio de 2008, se desprende que para dictar un auto de vinculación a proceso es necesario colmar determinados requisitos de forma y fondo. En cuanto a estos últimos es necesario que: <strong>1) existan datos que establezcan que se ha cometido un hecho, 2) la ley señale como delito a ese hecho y 3) exista la probabilidad de que el indiciado lo cometió o participó en su comisión</strong>. Ahora, el texto constitucional contiene los lineamientos que marcan la transición de un sistema de justicia penal mixto hacia otro de corte acusatorio, adversarial y oral, como lo revela la sustitución, en los requisitos aludidos, de las expresiones "comprobar" por "establecer" y "cuerpo del delito" por <strong>"hecho que la ley señala como delito"</strong>, las cuales denotan un cambio de paradigma en la forma de administrar justicia en materia penal, pues acorde con las razones que el propio Poder Constituyente registró en el proceso legislativo, con la segunda expresión ya no se requiere de "pruebas" ni se exige "comprobar" que ocurrió un hecho ilícito, con lo cual se evita que en el plazo constitucional se adelante el juicio, esto es, ya no es permisible que en la etapa preliminar de la investigación se configuren pruebas por el Ministerio Público, por sí y ante sí -como sucede en el sistema mixto-, con lo cual se elimina el procedimiento unilateral de obtención de elementos probatorios y, consecuentemente, se fortalece el juicio, única etapa procesal en la que, con igualdad de condiciones, se realiza la producción probatoria de las partes y se demuestran los hechos objeto del proceso. De ahí que con la segunda expresión la norma constitucional ya no exija que el objeto de prueba recaiga sobre el denominado "cuerpo del delito", entendido como la acreditación de los elementos objetivos, normativos y/o subjetivos de la descripción típica del delito correspondiente, dado que ese ejercicio, identificado como juicio de tipicidad, sólo es exigible para el dictado de una sentencia, pues es en esa etapa donde el juez decide si el delito quedó o no acreditado. En ese sentido, para dictar un auto de vinculación a proceso y establecer que se ha cometido un hecho que la ley señala como delito, basta con que el juez encuadre la conducta a la norma penal, que permita identificar, independientemente de la metodología que adopte, el tipo penal aplicable. Este nivel de exigencia es acorde con los efectos que genera dicha resolución, los cuales se traducen en la continuación de la investigación, en su fase judicializada, es decir, a partir de la cual interviene el juez para controlar las actuaciones que pudieran derivar en la afectación de un derecho fundamental. Además, a diferencia del sistema tradicional, su emisión no condiciona la clasificación jurídica del delito, porque este elemento será determinado en el escrito de acusación, a partir de toda la información que derive de la investigación, no sólo de la fase inicial, sino también de la complementaria, ni equivale a un adelanto del juicio, porque los antecedentes de investigación y elementos de convicción que sirvieron para fundarlo, por regla general, no deben considerarse para el dictado de la sentencia, salvo las excepciones establecidas en la ley.”</p>'+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este contexto, a continuación se analizaran los elementos del tipo penal </p>"+me.elementostp+"<p> consistentes en </p>"+me.razonarncd+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En consecuencia, no es posible ejercer acción penal dentro de la presente carpeta de investigación, lo anterior con fundamento en lo dispuesto por los artículos 255 en relación con el diverso numeral 327 fracciones II del Código Nacional de Procedimientos Penales. </p>"

                    if(me.exentoresponsabilidad)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, del análisis de la presente carpeta de investigación, se advierte que, si bien, se acredita que existen datos de prueba que pudieran establecer que se ha cometido un hecho que la ley señala como delito, también lo es que, se advierte la existencia de la causa de inculpabilidad </p>"+me.causaincumpalbilidad+"<p>, prevista en el artículo 25 apartado C del Código Penal para el Estado de Hidalgo, toda vez que de los datos de prueba que obran dentro de la presente carpeta, se desprende que </p>"+me.razonarerp+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Por lo anterior, no es posible ejercer acción penal, dentro de la presente carpeta de investigación, conforme lo dispuesto por los artículos 255 en relación con el diverso numeral 327, fracción IV del Código Nacional de Procedimientos Penales, con relación al artículo 25 apartado C de la Ley Penal Sustantiva para el Estado de Hidalgo. </p>"

                    if(me.imputadofallecio)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, del análisis de la presente carpeta de investigación, se advierte que, si bien, se acredita que existen datos de prueba que pudieran establecer que se ha cometido el hecho, así como la probabilidad de que el imputado lo haya cometido o participado en su comisión, también se advierte que, el imputado ha fallecido, toda vez que obra en la carpeta de investigación el acta de defunción del imputado </p>"+ me.imputado+ "<p>, documento que permite  identificar que según dicha acta, la persona imputada falleció el </p>"+me.fechafallecimientoi.substring(8,10) +" de "+ me.obtenermes( me.fechafallecimientoi.substring(5,7)-1)+" del año "+ me.fechafallecimientoi.substring(0,4)+"<p>, lo que significa que a nada llevaría solicitar al órgano jurisdiccional, una orden de aprehensión o de comparecencia, ya que sería imposible su cumplimiento; por lo que, de conformidad con lo dispuesto en el artículo 109 del Código Penal para el estado de Hidalgo, así como del diverso artículo 255 con relación al diverso 327 fracción IX y 485 fracción II del Código Nacional de Procedimientos Penales, se extingue la acción penal dentro de la presente carpeta de investigación."


                    me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia);
                    me.modaldocumento = false;

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
        generarfecha(){
            var fecha;
            fecha = moment().format('DD') + " del mes de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
        },
        listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};  
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
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
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./umixta-carpetas')
        },

        listar(){
             let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/NoEjerciciosApenal/ListarporRHecho/'+ me.rHechoId,configuracion).then(function(response){
                    me.noejercicio=response.data;
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
        listarrHecho(){
               
            let me=this;   
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){

                
                me.agenciaid = response.data.agenciaid                 
                me.rBreve = response.data.rBreve
                me.idNuc = response.data.nucId
                me.mediodenuncia = response.data.mediodenuncia
                me.fechahorasuhecho = response.data.fechaHoraSuceso
                me.fechaINUC = response.data.fechaElevaNuc


                me.informacionagencia();
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
        informacionagencia(){
                 let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                    me.agenciainfo=response.data;
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
        listardireccionhecho(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$cat.get('api/DireccionDelitoes/ListarPoridHecho/'+me.rHechoId,configuracion).then(function(response){
                me.direccionhecho = response.data.municipio+", "+response.data.estado
            }).catch(err => { 
                                    
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
        obtenernombre1ravictima(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$cat.get('api/RAPs/ListarIidyPInicio/'+me.rAtencionId,configuracion).then(function(response){
                me.personan = response.data.nombre+ " "+ response.data.apellidoPaterno+ " "+ response.data.apellidoMaterno                                   
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
        listarimputados(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0
            var personasArray=[];
            
                this.$cat.get('api/RAPs/ListarTodosImp/'+ me.rAtencionId,configuracion).then(function(response){
                        //console.log(response.data)
                        personasArray=response.data;                                      
                        personasArray.map(function(x){
                            me.imputados.push({text: x.nombreCompleto,value:x.nombreCompleto});                 
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
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitosArray=[];
            this.$cat.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                delitosArray=response.data;
                delitosArray.map(function(x){
                me.delitos.push({text: x.nombreDelito,value: x.nombreDelito});
                    
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
        limpiar(){
            this.numoficio = ""
            this.op1 = false
            this.op2 = false
            this.op3 = false
            this.op4 = false
            this.delito = ""
            this.articulossd = ""
            this.oficioquerella = '1'
            this.articulolegislador = ""
            this.fechaquerellacomputar = ""
            this.querellainop = '1'
            this.fechalimiteIquerell = ""
            this.fechainterposicionqamp = ""
            this.estudiospr = '1'
            this.limitepminimo = ""
            this.limitepmaximo = ""
            this.prisionmulta = false
            this.tipodelito = ""
            this.fechacionpenal = ""
            this.fechaoperaciona = ""
            this.actoinvestigacion = ""
            this.diastr = ""
            this.mesestr = ""
            this.anostr = ""
            this.fechaultimoa = ""
            this.plazoaccionpo = ""
            this.fechaministerioperc = ""
            this.art123 = false
            this.perdonofendido = false
            this.nofirmas = ""
            this.texto5 = ""
            this.fechaperdonofe = ""
            this.violenciammog = false
            this.rrepaciondano = ""
            this.fechaItratamiento = ""
            this.fechaTtratamiento = ""
            this.excluyentedelito = false
            this.hipotesised = ""
            this.razonared = ""
            this.noconstituyedelito = false
            this.elementostp = ""
            this.razonarncd = ""
            this.exentoresponsabilidad = false
            this.causaincumpalbilidad = ""
            this.razonarerp = ""
            this.imputadofallecio = false
            this.imputado = ""
            this.fechafallecimientoi = ""
            this.fechaqc = ""
            this.fechaliq= ""
            this.fechaiqmp= ""
            this.fechaap= ""
            this.fechaoa= ""
            this.fechua= ""
            this.plazoapo= ""
            this.fechamperc= ""
            this.fechapo= ""
            this.fechait= ""
            this.fechatt= ""
            this.fechaif= ""

        },
        creard3(){
            let me = this;
            me.eliminard3();

            for(var i = 0;i<me.nofirmas;i++){
            
            d3.select('#firmas') //Selecciona la <div> con el id grafficas
                .append('div')      // Le agrega a la div previamente seleccionada una nueva <div>
                .attr('class','espaciado flex xs6 sm6 md6 lg6')   //A la nueva div creada le agrega el attributo de v-flex
                .attr('id','firmag') // e igual le agrega su id con el nombre de Graficasg 
                .append('div')  //Agrega una nueva division dentro de graficasg
                .attr('id','z'+i)  //le asigna un id llamado z y un numero en base al contador            
                

                 d3.select('#z'+i)     //se selecciona el canvas previamente creado             
                .append('div')   //le agrega un botton, el de imprimir 
                .attr('class','v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light') 
                .append('div')  //agrega una divsion al boton
                .attr('class','v-input__control') 
                .attr('id','a'+i) 
                .append('div')             
                .attr('class','v-input__slot')  
                .append('div')             
                .attr('class','v-text-field__slot') 
                .attr('id','pr'+i)
                .append('label')             
                .attr('aria-hidden','true')     
                .attr('class','v-label v-label--active theme--light primary--text')                 
                .attr('style','left: 0px; right: auto; position: absolute;') 
                .text('Persona a firmar '+(i+1)+":")
                
                d3.select('#pr'+i) 
                .append('input')            
                .attr('id','inpt'+i)
                .attr('aria-label','Persona a firmar:') 
                .attr('name','persona a firmar:') 
                .attr('type','text') 

                /*
                d3.select('#a'+i) 
                .append('div')             
                .attr('class','v-text-field__details') 
                .append('div')             
                .attr('class','v-messages theme--light error--text') 
                .append('div')             
                .attr('class','v-messages__wrapper') 
                .append('div')             
                .attr('class','v-messages__message') 
                .text('El campo número de firmas es obligatorio.') 
                */
            }
        }, 
        eliminard3(){
            d3.selectAll('#firmag') 
            .remove() //elemina todos los div del html que tengan el id Graficasg
        },      
        generarpdf(){
            let me = this;
            me.$validator.validate().then(result => {
                if (result) {
                    me.texto = '<p>En la ciudad de '+me.u_distrito+', Hidalgo; a</p>'+me.generarfecha()+' se <strong>resuelve</strong>:'+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Visto el estado procedimental que tienen las constancias de la carpeta de investigación al rubro citada, se procede a emitir la resolución que se estima pertinente conforme al Código Nacional de Procedimientos Penales, el Código Penal para el Estado de Hidalgo, la Ley Orgánica del Ministerio Público del Estado de Hidalgo y su Reglamento y:&nbsp;</p>"
                    
                    me.texto2 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>PRIMERO. Competencia. </strong>El ministerio público que emite esta resolución, es competente para resolver sobre el destino de la presente carpeta de investigación, en virtud de que los hechos ocurrieron en "+me.direccionhecho+", y nos encontramos ante hechos que fueron denunciados y que permiten identificar que corresponde conocer de ellos a esta Procuraduría General de Justicia.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Lo anterior con fundamento en los artículos 14, 16 y 21 de la Constitución Política de los Estados Unidos Mexicanos; 1º, 5º -fracción III- y 7 de la Ley Orgánica del Ministerio Público en el estado de Hidalgo; 1º de su Reglamento; así como</p>"

                    if(me.op1)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Facultad de abstenerse para investigar: 131, fracción XIII y 253 del Código Nacional de Procedimientos Penales.</P>"

                    if(me.op2)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal, por prescripción de querella: 122 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales. </p>"

                    if(me.op3)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal por prescripción para ejercer acción penal: 121 y 123 del Código Penal para el estado de Hidalgo; 131, fracción XIII, 255 en concomitancia con el artículo 327 fracción VI y, 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"

                    if(me.op4)
                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>No ejercicio de la acción penal por que se actualice alguna causa de sobreseimiento prevista en el artículo 327 del Código Nacional de Procedimientos Penales: 131 fracción XIII, 255, 327 y 485 fracción VII del Código Nacional de Procedimientos Penales.</p>"

                    me.texto2 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><strong>SEGUNDO. Antecedentes</strong>. De la presente carpeta de investigación se desprende que:&nbsp;</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>a)</strong> Se inició la carpeta de investigación el pasado </p>"+ me.fechaINUC.substring(8,10) +" de "+ me.obtenermes( me.fechaINUC.substring(5,7)-1)+" del "+ me.fechaINUC.substring(0,4)+"<p>, con motivo de la comparecencia de </p>"+ me.personan+
                    "<p>quien hizo del conocimiento del ministerio público hechos que estimaba constitutivos del delito de </p>"+ me.delito + "<p> ,y sancionado por el Código Penal en sus artículos </p> "+me.articulossd+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                    me.texto2 += "<p><strong>TERCERO. Análisis del requisito de perseguibilidad. </strong>El delito que se desprende de la carpeta de investigación, es el de </p>"+me.delito+"<p>, mismo que está previsto y sancionado en los artículos </p>"+me.articulossd+"<p> del Código Penal para el estado de Hidalgo, que son del siguiente tenor:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                    if(me.oficioquerella == 1)
                        me.texto2 +="<p>Ahora bien, el citado ilícito es perseguible de manera oficiosa, que es la regla general prevista por el legislador, salvo cuando expresamente hace distinción al respecto, sin embargo, apreciándose que no fue el caso para ese ilícito, debe tenerse en cuenta que es perseguible con independencia de la persona que haya hecho del conocimiento del ministerio público los hechos, lo cual ocurrió el pasado </p>"+ me.fechahorasuhecho.substring(8,10) +" de "+ me.obtenermes( me.fechahorasuhecho.substring(5,7)-1)+" del "+ me.fechahorasuhecho.substring(0,4)
                        else
                        me.texto2 +="<p>Ahora bien, el citado ilícito es perseguible por querella de parte ofendida, al así haberlo dispuesto el legislador en el artículo </p>"+ me.articulolegislador + "<p> de la codificación sustantiva de la materia; por ende, es de estudio preferente el requisito de procedibilidad.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>En el entendido que ello debe examinarse desde dos componentes:</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>a) La legitimación de quien haya formulado la querella.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>b) La oportunidad con que se haya planteado, para lo cual debemos atender el artículo 122 del Código Penal para el Estado de Hidalgo.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.oficioquerella == 2 && me.querellainop == 1)
                        me.texto2 += "<p>Requisito que está debidamente satisfecho, pues quien se dice persona agraviada fue</p>"+ me.personan+';y, de los registros que integran la carpeta de investigación se desprende que la fecha a partir de la cual debe computarse la querella es el '+me.fechaqc +'<p>, y la petición hecha al ministerio público para  que se investigaran los hechos fue el día </p>'+me.fechaINUC.substring(8,10) +" de "+ me.obtenermes( me.fechaINUC.substring(5,7)-1)+" del "+ me.fechaINUC.substring(0,4)
                    if(me.oficioquerella == 2 && me.querellainop == 2){
                        me.texto2 +=
                        "<p>El referido dispositivo legal establece que para poder tener por satisfecho ese requisito de perseguibilidad, debe haber sido planteado por quien haya resentido la afectación o la puesta en peligro del bien jurídicamente tutelado; y, que además la querella debe haberse formulado dentro del plazo legalmente establecido: un año a partir de que se tuvo conocimiento del hecho, y tres años independientemente de esa circunstancia.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Al caso es aplicable la tesis emitida por el Segundo Tribunal Colegiado en Materia Penal del Primer Circuito, registrada en la Novena Época con el número 169243, de rubro <strong>“PRESCRIPCIÓN DE LA ACCION PENAL, TRATÁNDOSE DE DELITOS QUE SE PERSIGUEN POR QUERELLA O ACTO EQUIVALENTE.”.</strong></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>Por ende, en el caso es evidente que la querella no fue interpuesta oportunamente, según la tabla que en seguida se inserta, porque el hecho delictivo ocurrió el </p>"+me.fechahorasuhecho.substring(8,10) +" de "+ me.obtenermes( me.fechahorasuhecho.substring(5,7)-1)+" del "+ me.fechahorasuhecho.substring(0,4)+"<p>, y la propia parte agraviada de nombre </p>"+me.personan+"<p> emite entrevista en la que se advierte que para el día en que se querelló ya había identificado que era sujeto pasivo del ilícito, por lo cual se torna evidente que al momento en que comparece ante el ministerio público para formular su querella e incoar el procedimiento penal, su derecho de acceder a la justicia mediante el esclarecimiento de los hechos, había precluido.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>";

                        me.texto3 = "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p>Así las cosas, se advierte que, quien se afirma ser la parte agraviada, lleva el nombre de </p>"+me.personan+"<p> y, de los registros de la carpeta de investigación se revela que la querella fue extemporáneamente promovida pues su fecha límite era el </p>"+ me.fechalimiteIquerell.substring(8,10) +" de "+me.obtenermes( me.fechalimiteIquerell.substring(5,7)-1)+" del "+ me.fechalimiteIquerell.substring(0,4)+"<p>), lo que significa que ya había prescrito, da lugar a una causa de extinción de acción penal, y por ende, se actualiza una de las causales de sobreseimiento que extinguen el ejercicio de la acción penal dentro de la presente carpeta de investigación; lo cual hace innecesario entrar al estudio de los datos de prueba que conforman la misma pues a nada llevaría, ante la imposibilidad de tener por oportunamente satisfecho un presupuesto procesal de primer orden.</p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    }

                    if(me.oficioquerella != 2 && me.querellainop != 2)
                    me.texto3 = ''

                    me.texto3 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>CUARTO. Estudio del sentido de la presente resolución.</strong></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.estudiospr == 1)
                    me.texto3 += "<p>Como ha quedado precisado en párrafos que anteceden, según la transcripción del ilícito por el que se ha seguido la presente carpeta de investigación, sus límites de punibilidad son:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>-      Mínimo: </strong></p>"+me.limitepminimo+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p><strong>-      Máximo: </strong></p>"+me.limitepmaximo+   
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">Ahora bien, conforme al artículo 12 del Código Penal en la entidad, sabemos que la clasificación legal de los delitos, por el momento de su comisión, son:</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"> </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">1. <strong><u>Instantáneos</u></strong>: cuando en el mismo momento se consumó el hecho delictivo, por lo que a partir de ahí debe comenzarse a hacer el cómputo. </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">2. <strong><u>Continuo o permanente</u></strong>, cuando con una sola conducta se prolongan sus efectos penalmente relevantes en el tiempo; caso en que el cómputo debe comenzar a computarse desde que cesa la conducta.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+">3. <strong><u>Continuado</u></strong>, cuando con varias conductas se comete el ilícito y se actualiza momento a momento; en estos supuestos, el cómputo debe comenzar a partir del último acto u omisión penalmente relevante. </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En el entendido que cuando la pena prevista por el legislador es solamente económica, la prescripción es de <strong>un año</strong>, como podrían ser por ejemplo el daño en la propiedad culposo previsto en la correlación del artículo 99 –segundo párrafo- y 221 del Código Penal para el estado de Hidalgo; y, cuando el ilícito merece pena alternativa </p>"+me.textopm+"<p> ), se sigue la misma regla: un año para la prescripción.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><u>REGLA GENERAL PARA LA PRESCRIPCIÓN:</u> Si el delito que nos ocupa no encuadra en el párrafo que antecede, la prescripción para ejercer acción penal es el término <strong>medio aritmético</strong>, mismo que se obtiene de sumar la pena máxima a la mínima, y dividir su resultado a la mitad; en el entendido que la prescripción no puede ser menor a <strong>dos años</strong> en ningún caso.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De suerte que, se puede identificar que, el delito que nos ocupa, es </p>"+ me.tipodelito+"<p> ; lo cual significa que la fecha a partir de la que debe comenzar a computarse el plazo para la prescripción del ejercicio de la acción penal, es el </p>"+me.fechacionpenal.substring(8,10) +" de "+ me.obtenermes( me.fechacionpenal.substring(5,7)-1)+" del "+ me.fechacionpenal.substring(0,4)+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Se toma en consideración que para el cómputo de la prescripción, se tendrá en cuenta el último acto de investigación que se llevó a cabo en la presente carpeta de investigación, el cual consistió en </p>"+me.actoinvestigacion+"<p> por ende, la fecha a partir de la cual debe efectuarse la operación aritmética es el día </p>"+me.fechaoperaciona.substring(8,10) +" de "+ me.obtenermes( me.fechaoperaciona.substring(5,7)-1)+" del "+ me.fechaoperaciona.substring(0,4)+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Resultando de aplicación la tesis de la Novena Época, sostenida por el Segundo Tribunal Colegiado en Materia Penal del Primer Circuito, consultable bajo el número de registro 183456, de rubro <strong>“PRESCRIPCIÓN. ACTUACIONES QUE NO LA INTERRUMPEN.”</strong> </p>"
                    else
                    me.texto3 += "<p>En este contexto, como ha quedado precisado en líneas anteriores, la prescripción implica un impedimento a la pretensión punitiva y potestad de ejecutar las penas y medidas de seguridad, y para que se actualice basta el simple transcurso del tiempo. De manera que, para que opere la prescripción de la acción penal, debe atenderse a la naturaleza del delito con sus modalidades y al término medio aritmético de la pena privativa de la libertad que señale la ley para el delito de que se trate, sin que en ningún caso sea menor de dos años, ahora bien, la regla general para interrumpir la prescripción es que se practiquen actuaciones por la autoridad ministerial, en investigación del delito y del delincuente; sin embargo, a fin de no caer en el supuesto de que un delito se convierta en imprescriptible, dicha regla admite un excepción, la cual consiste en que, una vez que haya transcurrido la mitad del plazo para la prescripción atento a la naturaleza del delito, las actuaciones que se realicen en investigación del delito y del delincuente, ya no la interrumpen, por tanto, sigue corriendo el término para que opere la prescripción de la pretensión punitiva, esto es, no sólo para la persecución del delito y delincuente por el órgano ministerial, sino también para que el Juez imponga la pena correspondiente, pues incluso, la prescripción debe declararse oficiosamente, ya sea por el agente del Ministerio Público, o por la autoridad judicial que conozca del caso.</p>"+
                    "<p>Lo anterior, se sustenta jurisprudencia <strong>I.6o.P. J/4 (10a.), Registro: 2017018, de rubro: “PRESCRIPCIÓN DE LA ACCIÓN PENAL. UNA VEZ QUE TRANSCURRE LA MITAD DEL PLAZO PARA QUE OPERE, LAS ACTUACIONES QUE SE REALICEN EN INVESTIGACIÓN DEL DELITO Y DEL DELINCUENTE NO LA INTERRUMPEN (LEGISLACIÓN APLICABLE PARA LA CIUDAD DE MÉXICO).</strong></p>"+ 
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>La figura de la prescripción implica un impedimento a la pretensión punitiva y potestad de ejecutar las penas y medidas de seguridad, y para que se actualice basta el simple transcurso del tiempo. De manera que, para que opere la prescripción de la acción penal, debe atenderse a la naturaleza del delito con sus modalidades y al término medio aritmético de la pena privativa de la libertad que señale la ley para el delito de que se trate, sin que en ningún caso sea menor de tres años. Ahora bien, la regla general para interrumpir la prescripción es que se practiquen actuaciones por la autoridad ministerial, en investigación del delito y del delincuente; sin embargo, esa regla admite la excepción prevista en el artículo 111 del Código Penal para el Distrito Federal –hoy Ciudad de México– (abrogado) de similar redacción al 115 del actual, según la cual, una vez que haya transcurrido la mitad del plazo necesario para la prescripción, atento a la naturaleza del delito, las actuaciones que se realicen en investigación del delito y del delincuente, ya no la interrumpen; por tanto, sigue corriendo el término para que opere la prescripción de la pretensión punitiva del Estado, esto es, no sólo para la persecución del delito y delincuente por el órgano ministerial, sino también para que el Juez imponga la pena correspondiente, pues incluso, la prescripción debe declararse oficiosamente, ya sea por el agente del Ministerio Público, o por la autoridad judicial que conozca del caso.”</p>"

                    me.texto3 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En tal virtud, entre la fecha del último acto de investigación, y la fecha en que el ministerio público emitió su resolución de consulta, han transcurrido </p>"+me.añostr+"<p> años con </p>"+me.mesestr+"<p> meses y </p>"+me.diastr+"<p> días.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De lo que resulta claro que ha precluido para la institución del ministerio público la facultad de ejercer acción penal, como se aprecia en la tabla que se inserta a continuación: </p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    me.texto4="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                    if(me.art123)
                    me.texto4 += "<p>En consecuencia, ha prescrito la facultad de ejercer acción penal, y ésta se encuentra extinta de conformidad con los artículos 109, fracción IX, 121 y 123 del Código Penal para el estado de Hidalgo, en relación con los diversos 255 y 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"
                    else
                    me.texto4 += "<p>En consecuencia, ha prescrito la facultad de ejercer acción penal, y ésta se encuentra extinta de conformidad con los artículos 109, fracción IX, 121 del Código Penal para el estado de Hidalgo, en relación con los diversos 255 y 485 fracción VII, del Código Nacional de Procedimientos Penales.</p>"

                    if(me.perdonofendido)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Cabe precisar que resulta innecesario entrar al estudio del tipo penal que se atribuye, el grado de ejecución del hecho, la forma de intervención y la naturaleza de la conducta, en virtud de que se actualiza una causa de extinción de acción penal prevista en los artículos 109 –fracción IV-, 114 y 115 del Código Penal para el estado de Hidalgo así como los artículos  327, fracción VI y 485 fracción IV, del Código Nacional de Procedimientos Penales.</p>"+
                    "<p>Es así ya que hemos justificado que el delito de </p>"+me.delito+"<p> es perseguible por querella de parte ofendida, lo que significa que la parte agraviada tiene la facultad de decidir si se debe o no continuar con el ejercicio de la acción penal.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este asunto la víctima u ofendido resulta ser </p>"+me.personan+"<p>, por ser quien resintió o se le puso el peligro el bien jurídicamente tutelado.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>De ahí que sea solamente esa persona quien puede evitar continuar este procedimiento; y así se materializa ya que el día </p>"+me.fechaperdonofe.substring(8,10) +" de "+ me.obtenermes( me.fechaperdonofe.substring(5,7)-1)+" del año "+ me.fechaperdonofe.substring(0,4)+"<p>, compareció ante la institución del ministerio público y expresamente manifestó que otorgaba el perdón a la parte quien pueda resultar responsable.</p>"

                    if(me.violenciammog && me.perdonofendido)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    me.rrepaciondano+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Del </p>"+me.fechaItratamiento.substring(8,10) +" de "+ me.obtenermes( me.fechaItratamiento.substring(5,7)-1)+" del año "+ me.fechaItratamiento.substring(0,4)+"<p> a </p>"+me.fechaTtratamiento.substring(8,10) +" de "+ me.obtenermes( me.fechaTtratamiento.substring(5,7)-1)+" del año "+ me.fechaTtratamiento.substring(0,4)+ "<p> se acredita que se sometió a tratamiento psicoterapéutico reeducativo que prevé el artículo 9 –fracción V- de la Ley de Acceso de las Mujeres a una Vida Libre de Violencia en el estado de Hidalgo)</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Así, al ser el perdón del ofendido una figura que en forma lisa y llana extingue la acción penal, se estima que tal hipótesis se actualiza en la presente carpeta de investigación.</p>"

                    if(me.excluyentedelito)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, pese a que los antecedentes de investigación que se han señalado, permitirían al ministerio público justificar en qué momento se ha cometido ese hecho y existe la probabilidad de que el imputado lo haya cometido o participado en su comisión, sin embargo, se actualiza la excluyente de delito </p>"+me.delito+ "<p> en lo que no se centrará el presente estudio ya que esta resolución no tiene por objeto ejercer acción penal, sino explicar el motivo por el que no ha lugar a ello.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este contexto, el artículo 25 del Código Penal en la entidad, así como el artículo 405 del Código Nacional de Procedimientos Penales, establecen diversos supuestos por los cuales se actualiza una causa de atipicidad, causa de justificación o causa de inculpabilidad.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En el caso concreto, se actualiza –(de entre ellas)- la hipótesis consistente en "+me.hipotesised + "<p>, ya que </p>"+ me.razonared+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En razón de lo anterior, no es posible ejercer acción penal dentro de la presente carpeta de investigación, mediante una forma de conducir al imputado a proceso, en términos del artículo 141 del Código Nacional de Procedimientos Penales, lo antepuesto con fundamento en lo dispuesto por los artículos 255 en relación con el diverso numeral 327 fracción II del Código Nacional de Procedimientos Penales.</p>"

                    if(me.noconstituyedelito)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, pese a que los medios de convicción que se han señalado, permiten acreditar que existen datos de prueba que establezcan que se ha cometido un hecho y la probabilidad en la comisión o participación del imputado, esto es, la probabilidad del hecho, no siendo necesario acreditar los elementos objetivos, normativos y subjetivos, sino que, de conformidad con el artículo 19 de la Constitución Política de los Estados Unidos Mexicanos, es innecesario el análisis de todos los elementos constitutivos del tipo del delito imputado, sino únicamente deben analizarse los elementos objetivos (núcleo) relativos al hecho integrante del delito y respecto de los elementos subjetivos, su estudio debe ser en el grado de probable.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    '<p><strong>“AUTO DE VINCULACIÓN A PROCESO. PARA SATISFACER EL REQUISITO RELATIVO A QUE LA LEY SEÑALE EL HECHO IMPUTADO COMO DELITO, BASTA CON QUE EL JUEZ ENCUADRE LA CONDUCTA A LA NORMA PENAL, DE MANERA QUE PERMITA IDENTIFICAR LAS RAZONES QUE LO LLEVAN A DETERMINAR EL TIPO PENAL APLICABLE (NUEVO SISTEMA DE JUSTICIA PENAL). </strong>Del artículo 19, párrafo primero, de la Constitución Federal, reformado mediante Decreto publicado en el Diario Oficial de la Federación, el 18 de junio de 2008, se desprende que para dictar un auto de vinculación a proceso es necesario colmar determinados requisitos de forma y fondo. En cuanto a estos últimos es necesario que: <strong>1) existan datos que establezcan que se ha cometido un hecho, 2) la ley señale como delito a ese hecho y 3) exista la probabilidad de que el indiciado lo cometió o participó en su comisión</strong>. Ahora, el texto constitucional contiene los lineamientos que marcan la transición de un sistema de justicia penal mixto hacia otro de corte acusatorio, adversarial y oral, como lo revela la sustitución, en los requisitos aludidos, de las expresiones "comprobar" por "establecer" y "cuerpo del delito" por <strong>"hecho que la ley señala como delito"</strong>, las cuales denotan un cambio de paradigma en la forma de administrar justicia en materia penal, pues acorde con las razones que el propio Poder Constituyente registró en el proceso legislativo, con la segunda expresión ya no se requiere de "pruebas" ni se exige "comprobar" que ocurrió un hecho ilícito, con lo cual se evita que en el plazo constitucional se adelante el juicio, esto es, ya no es permisible que en la etapa preliminar de la investigación se configuren pruebas por el Ministerio Público, por sí y ante sí -como sucede en el sistema mixto-, con lo cual se elimina el procedimiento unilateral de obtención de elementos probatorios y, consecuentemente, se fortalece el juicio, única etapa procesal en la que, con igualdad de condiciones, se realiza la producción probatoria de las partes y se demuestran los hechos objeto del proceso. De ahí que con la segunda expresión la norma constitucional ya no exija que el objeto de prueba recaiga sobre el denominado "cuerpo del delito", entendido como la acreditación de los elementos objetivos, normativos y/o subjetivos de la descripción típica del delito correspondiente, dado que ese ejercicio, identificado como juicio de tipicidad, sólo es exigible para el dictado de una sentencia, pues es en esa etapa donde el juez decide si el delito quedó o no acreditado. En ese sentido, para dictar un auto de vinculación a proceso y establecer que se ha cometido un hecho que la ley señala como delito, basta con que el juez encuadre la conducta a la norma penal, que permita identificar, independientemente de la metodología que adopte, el tipo penal aplicable. Este nivel de exigencia es acorde con los efectos que genera dicha resolución, los cuales se traducen en la continuación de la investigación, en su fase judicializada, es decir, a partir de la cual interviene el juez para controlar las actuaciones que pudieran derivar en la afectación de un derecho fundamental. Además, a diferencia del sistema tradicional, su emisión no condiciona la clasificación jurídica del delito, porque este elemento será determinado en el escrito de acusación, a partir de toda la información que derive de la investigación, no sólo de la fase inicial, sino también de la complementaria, ni equivale a un adelanto del juicio, porque los antecedentes de investigación y elementos de convicción que sirvieron para fundarlo, por regla general, no deben considerarse para el dictado de la sentencia, salvo las excepciones establecidas en la ley.”</p>'+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En este contexto, a continuación se analizaran los elementos del tipo penal </p>"+me.elementostp+"<p> consistentes en </p>"+me.razonarncd+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>En consecuencia, no es posible ejercer acción penal dentro de la presente carpeta de investigación, lo anterior con fundamento en lo dispuesto por los artículos 255 en relación con el diverso numeral 327 fracciones II del Código Nacional de Procedimientos Penales. </p>"

                    if(me.exentoresponsabilidad)
                    me.texto4 +="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, del análisis de la presente carpeta de investigación, se advierte que, si bien, se acredita que existen datos de prueba que pudieran establecer que se ha cometido un hecho que la ley señala como delito, también lo es que, se advierte la existencia de la causa de inculpabilidad </p>"+me.causaincumpalbilidad+"<p>, prevista en el artículo 25 apartado C del Código Penal para el Estado de Hidalgo, toda vez que de los datos de prueba que obran dentro de la presente carpeta, se desprende que </p>"+me.razonarerp+"<p>.</p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Por lo anterior, no es posible ejercer acción penal, dentro de la presente carpeta de investigación, conforme lo dispuesto por los artículos 255 en relación con el diverso numeral 327, fracción IV del Código Nacional de Procedimientos Penales, con relación al artículo 25 apartado C de la Ley Penal Sustantiva para el Estado de Hidalgo. </p>"

                    if(me.imputadofallecio)
                    me.texto4 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                    "<p>Ahora bien, del análisis de la presente carpeta de investigación, se advierte que, si bien, se acredita que existen datos de prueba que pudieran establecer que se ha cometido el hecho, así como la probabilidad de que el imputado lo haya cometido o participado en su comisión, también se advierte que, el imputado ha fallecido, toda vez que obra en la carpeta de investigación el acta de defunción del imputado </p>"+ me.imputado+ "<p>, documento que permite  identificar que según dicha acta, la persona imputada falleció el </p>"+me.fechafallecimientoi.substring(8,10) +" de "+ me.obtenermes( me.fechafallecimientoi.substring(5,7)-1)+" del año "+ me.fechafallecimientoi.substring(0,4)+"<p>, lo que significa que a nada llevaría solicitar al órgano jurisdiccional, una orden de aprehensión o de comparecencia, ya que sería imposible su cumplimiento; por lo que, de conformidad con lo dispuesto en el artículo 109 del Código Penal para el estado de Hidalgo, así como del diverso artículo 255 con relación al diverso 327 fracción IX y 485 fracción II del Código Nacional de Procedimientos Penales, se extingue la acción penal dentro de la presente carpeta de investigación."

                    if(me.perdonofendido){
                        me.texto5 = ""
                        me.texto5 += "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>" 
                
                        for(var i = 0; i<me.nofirmas ; i++){
                            me.texto5 += "_______________________________________"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            document.getElementById('inpt'+[i]).value+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"                           
                        }

                    }

                    me.downloadPdf(me.u_nombre,me.u_puesto,me.u_agencia); 
                }
            })
        },    
        fechainif(){
            if(this.menu1){
                this.generarfecha2();
            this.$refs.menu1.save(this.fechaquerellacomputar);
            } 
            if(this.menu2){
                this.generarfecha2();
            this.$refs.menu2.save(this.fechalimiteIquerell);
            } 
            if(this.menu3){
                this.generarfecha2();
            this.$refs.menu3.save(this.fechainterposicionqamp);
            } 
            if(this.menu4){
                this.generarfecha2();
            this.$refs.menu4.save(this.fechacionpenal);
            } 
            if(this.menu5){
                this.generarfecha2();
            this.$refs.menu5.save(this.fechaoperaciona);
            } 
            if(this.menu6){
                this.generarfecha2();
            this.$refs.menu6.save(this.fechaultimoa);
            }
            if(this.menu7){
                this.generarfecha2();
            this.$refs.menu7.save(this.plazoaccionpo);
            }    
            if(this.menu8){
                this.generarfecha2();
            this.$refs.menu8.save(this.fechaministerioperc);
            } 
            if(this.menu9){
                this.generarfecha2();
            this.$refs.menu9.save(this.fechaperdonofe);
            }
            if(this.menu10){
                this.generarfecha2();
            this.$refs.menu10.save(this.fechaItratamiento);
            }
            if(this.menu11){
                this.generarfecha2();
            this.$refs.menu11.save(this.fechaTtratamiento);
            }  
            if(this.menu12){
                this.generarfecha2();
            this.$refs.menu12.save(this.fechafallecimientoi);
            }           
        },
        generarfecha2(){           
            if(this.menu1) 
            this.fechaqc =this.fechaquerellacomputar.substring(8,10) +" de "+ this.obtenermes(this.fechaquerellacomputar.substring(5,7)-1)+
            " del "+ this.fechaquerellacomputar.substring(0,4);   
            if(this.menu2) 
            this.fechaliq =this.fechalimiteIquerell.substring(8,10) +" de "+ this.obtenermes(this.fechalimiteIquerell.substring(5,7)-1)+
            " del "+ this.fechalimiteIquerell.substring(0,4);   
            if(this.menu3) 
            this.fechaiqmp =this.fechainterposicionqamp.substring(8,10) +" de "+ this.obtenermes(this.fechainterposicionqamp.substring(5,7)-1)+
            " del "+ this.fechainterposicionqamp.substring(0,4);   
            if(this.menu4) 
            this.fechaap =this.fechacionpenal.substring(8,10) +" de "+ this.obtenermes(this.fechacionpenal.substring(5,7)-1)+
            " del "+ this.fechacionpenal.substring(0,4); 
            if(this.menu5) 
            this.fechaoa =this.fechaoperaciona.substring(8,10) +" de "+ this.obtenermes(this.fechaoperaciona.substring(5,7)-1)+
            " del "+ this.fechaoperaciona.substring(0,4); 
            if(this.menu6) 
            this.fechua =this.fechaultimoa.substring(8,10) +" de "+ this.obtenermes(this.fechaultimoa.substring(5,7)-1)+
            " del "+ this.fechaultimoa.substring(0,4);
            if(this.menu7) 
            this.plazoapo =this.plazoaccionpo.substring(8,10) +" de "+ this.obtenermes(this.plazoaccionpo.substring(5,7)-1)+
            " del "+ this.plazoaccionpo.substring(0,4); 
            if(this.menu8) 
            this.fechamperc =this.fechaministerioperc.substring(8,10) +" de "+ this.obtenermes(this.fechaministerioperc.substring(5,7)-1)+
            " del "+ this.fechaministerioperc.substring(0,4); 
            if(this.menu9) 
            this.fechapo =this.fechaperdonofe.substring(8,10) +" de "+ this.obtenermes(this.fechaperdonofe.substring(5,7)-1)+
            " del "+ this.fechaperdonofe.substring(0,4); 
            if(this.menu10) 
            this.fechait =this.fechaItratamiento.substring(8,10) +" de "+ this.obtenermes(this.fechaItratamiento.substring(5,7)-1)+
            " del "+ this.fechaItratamiento.substring(0,4); 
            if(this.menu11) 
            this.fechatt =this.fechaTtratamiento.substring(8,10) +" de "+ this.obtenermes(this.fechaTtratamiento.substring(5,7)-1)+
            " del "+ this.fechaTtratamiento.substring(0,4); 
            if(this.menu12) 
            this.fechaif =this.fechafallecimientoi.substring(8,10) +" de "+ this.obtenermes(this.fechafallecimientoi.substring(5,7)-1)+
            " del "+ this.fechafallecimientoi.substring(0,4);
        },       
        guardar(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$validator.validate().then(result => {
            if (result) { 
                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información ',           
                function(){

                    var oficioquerella;
                    if(me.oficioquerella== 1)oficioquerella = true;
                    else oficioquerella = false;

                    var tipoquerella;
                    if(me.querellainop == 1) tipoquerella = true
                    else tipoquerella = false

                    var tipoprescripcion ;
                    if(me.estudiospr == 1) tipoprescripcion = true;
                    else tipoprescripcion = false;

                    var nombrefirmas ='';

                    for(var i =0;i<me.nofirmas;i++){
                        nombrefirmas += document.getElementById('inpt'+[i]).value
                        if(i!= me.nofirmas -1)
                        nombrefirmas +="*"
                    }

                    if(me.perdonofendido == false)
                        me.nofirmas = 0
                    
                    if(me.fechaquerellacomputar == '') me.fechaquerellacomputar = "0001-01-01"
                    if(me.fechalimiteIquerell == '') me.fechalimiteIquerell= "0001-01-01"
                    if(me.fechainterposicionqamp == '') me.fechainterposicionqamp= "0001-01-01"
                    if(me.fechacionpenal == '') me.fechacionpenal= "0001-01-01"
                    if(me.fechaoperaciona   == '') me.fechaoperaciona = "0001-01-01"              
                    if(me.fechaultimoa  == '') me.fechaultimoa= "0001-01-01"             
                    if(me.plazoaccionpo   == '') me.plazoaccionpo= "0001-01-01"
                    if(me.fechaministerioperc  == '') me.fechaministerioperc= "0001-01-01"             
                    if(me.fechaperdonofe   == '') me.fechaperdonofe= "0001-01-01"           
                    if(me.fechaItratamiento == '') me.fechaItratamiento= "0001-01-01"             
                    if(me.fechaTtratamiento == '') me.fechaTtratamiento= "0001-01-01"
                    if(me.fechafallecimientoi == '') me.fechafallecimientoi= "0001-01-01"
                    
                
                    this.$cat.post('api/NoEjerciciosApenal/Crear',{
                    'rHechoId': me.rHechoId, 
                    'Op1': me.op1, 
                    'Op2': me.op2, 
                    'Op3': me.op3, 
                    'Op4': me.op4, 
                    'FechaEntrevista': me.fechaINUC, 
                    'FechaHecho': me.fechahorasuhecho, 
                    'Delito': me.delito, 
                    'Denunciante': me.personan, 
                    'ArticulosCp': me.articulossd, 
                    'OficioQuerella': oficioquerella, 
                    'ArticuloLegislador': me.articulolegislador, 
                    'TipoQuerella': tipoquerella, 
                    'TFechaQuerella': me.fechaquerellacomputar, 
                    'FFechaLimiteQI': me.fechalimiteIquerell, 
                    'FFechaInterposicionMp': me.fechainterposicionqamp, 
                    'TipoPrescripcion': tipoprescripcion, 
                    'PunibilidadMinimo': me.limitepminimo, 
                    'PunibilidadMaximo': me.limitepmaximo,                   
                    'Tipopena': me.prisionmulta, 
                    'Ttipodelito': me.tipodelito, 
                    'TAccionPenalFecha': me.fechacionpenal, 
                    'TUltimoActoInvestigacion': me.actoinvestigacion, 
                    'TOperacionAritmeticaFecha': me.fechaoperaciona,  
                    'DiasTranscurridos': me.diastr, 
                    'MesesTranscurridos': me.mesestr, 
                    'AnosTranscurridos': me.anostr, 
                    'FechaUltimoActo': me.fechaultimoa, 
                    'FechaEjercerAcion': me.plazoaccionpo, 
                    'FechaResolucionconsulta': me.fechaministerioperc, 
                    'Art123': me.art123, 
                    'PerdonOfendido': me.perdonofendido, 
                    'PONumeroFirmas': me.nofirmas, 
                    'PONombreFirmas': me.texto5, 
                    'POFechaPerdon': me.fechaperdonofe, 
                    'POViolenciaMuMeOG': me.violenciammog, 
                    'POVReparacionDaño': me.rrepaciondano, 
                    'POVFITratamiento': me.fechaItratamiento, 
                    'POVFFTratamiento': me.fechaTtratamiento, 
                    'ExcluyenteDelito': me.excluyentedelito, 
                    'EDHipotesis': me.hipotesised, 
                    'EDRazonar': me.razonared, 
                    'NoConstituyeDelito': me.noconstituyedelito, 
                    'NCDElementospenal': me.elementostp, 
                    'NCDRazonar': me.razonarncd, 
                    'ExentoResponsabilidadPenal': me.exentoresponsabilidad, 
                    'ERPCausaInculpabilidad': me.causaincumpalbilidad, 
                    'ERPRazonar': me.razonarerp, 
                    'ImputadoFallecio': me.imputadofallecio, 
                    'IFImputadoNombre': me.imputado, 
                    'IFFechaFallecimiento': me.fechafallecimientoi, 
                    'NumeroOficio': me.numoficio, 
                    'UDistrito': me.u_distrito, 
                    'USubproc': me.u_dirSubPro, 
                    'UAgencia': me.u_agencia, 
                    'UUsuario': me.u_nombre, 
                    'UPuesto': me.u_puesto, 
                    'UModulo': me.u_modulo, 
                    
                },configuracion).then(function(response){  
                    this.$cat.put('api/Nucs/Actualizar',{
                        'idNuc': me.idNuc,
                        'statusNUC': "No ejercicio de la acción penal",  
                    },configuracion).then(function(response){  
                        me.$notify('La información se actualizo correctamente !!!','success')  

                        this.$cat.post('api/Historialcarpeta/Crear',{

                            'RHechoId': me.rHechoId,
                            'Detalle': "No ejercicio de la acción penal",
                            'UDistrito' : me.u_distrito,  
                            'USubproc': me.u_dirSubPro,
                            'UAgencia': me.u_agencia,
                            'Usuario': me.u_nombre,
                            'UPuesto': me.u_puesto,
                            'UModulo': me.u_modulo

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
                    me.$notify('La información se guardo correctamente !!!','success')  
                    me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia);
                    me.modalAdd=false;
                    me.modaldocumento= false;      
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
                },
                    function(){
                        alertify.warning('Verifica la información')
                    }
                    ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

            }
            
        }) 

        
          
        },  
        mostrarpdf(nombre,puesto,agencia){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }


            var dd = me.downloadPdf(nombre,puesto,agencia);
            var doc = pdfMake.createPdf(dd);
            me.modaldocumento=true;    
            
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf(nombre,puesto,agencia) {

            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
var u_subProc= this.u_subproc;
            var nuc = this.nuc;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.texto
            );
            var html2 =htmlToPdfmake(
                this.texto2
            );
            var html3 =htmlToPdfmake(
                this.texto3
            );
            var html4 =htmlToPdfmake(
                this.texto4
            );
            var html5 =htmlToPdfmake(
                this.texto5
            );
            var f1 =htmlToPdfmake(
                "<strong>Fecha de los hechos</strong>"
            );
            var f2 =htmlToPdfmake(
                "<strong>Fecha límite para interposición de la querella </strong>"
            );
            var f3 =htmlToPdfmake(
                "<strong>Fecha de interposición de la querella ante el ministerio público </strong>"
            );
            var f4 =htmlToPdfmake(
                "<strong>Fecha de último acto de investigación</strong>"
            );
            var f5 =htmlToPdfmake(
                "<strong>Plazo para poder ejercer acción penal oportunamente </strong>"
            );
            var f6 =htmlToPdfmake(
                "<strong>Fecha en que ministerio público emite la resolución de consulta </strong>"
            );
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfo["direccion"];
            var agenciainfotel = this.agenciainfo["telefono"];

            //***************************************************************************** */
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                             { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                style: 'PiePagina', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition: {x: 0, y: 30},  
                            },
			            ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                         
                        return [
                            { 
                                image: logo1,
                                width: 150, 
                                absolutePosition: {x: 75, y: 30},
                                
                            },
                            //{ 
                            //    image: logo2,
                            //    width: 50,  
                            //    absolutePosition: {x: 495, y: 30},
                            //},
                                                    
                        ]
                 
                },
              
                content: [
                    {
                        text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:"Número Único de Caso: "+ nuc,                 
                        style: 'Titulo', 
                        alignment: 'right',
                        margin: [0, 40, 72, 0],
                        absolutePosition: {x: 85, y: 150},                                 
                    },    
                    {
                        text:'Número de oficio: ' +this.numerooficio+ "\n\n\n\n\n\n\n\n" ,                        
                        style: 'Nooficio',
                        alignment: 'right', 
                    },
                    {                     
                        text: 'D E T E R M I N A C I Ó N\n\n\n\n',
                        alignment: 'center',
                        style: 'Titulo',
                    }, 
                    {
                        text: html,                        
                        style: 'Texto',
                    },
                    {                     
                        text:'\n\n'+ 'C O N S I D E R A N D O'+'\n\n',
                        alignment: 'center',
                        style: 'SubTitulo',
                    },
                    {
                        text: html2 ,                        
                        style: 'Texto',
                    },   
                    this.oficioquerella == 2 && this.querellainop == 2 ? {
                        
                        style: 'table',                      
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', '*'], 
                            body: [
                                  [{style:'Texto',text:f1},{style:'Texto',text:f2},{style:'Texto',text:f3}] ,
                                  [{style:'Texto',text:this.fechahorasuhecho.substring(8,10) +" de "+this.obtenermes( this.fechahorasuhecho.substring(5,7)-1)+" del "+ this.fechahorasuhecho.substring(0,4) },{style:'Texto',text: this.fechalimiteIquerell.substring(8,10) +" de "+this.obtenermes( this.fechalimiteIquerell.substring(5,7)-1)+" del "+ this.fechalimiteIquerell.substring(0,4)},{style:'Texto',text: this.fechainterposicionqamp.substring(8,10) +" de "+this.obtenermes( this.fechainterposicionqamp.substring(5,7)-1)+" del "+ this.fechainterposicionqamp.substring(0,4) }],        
                                ]
                        },
                        layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                }, 
                        }
                        
                    }: "" , 
                    {
                        text: html3 ,                        
                        style: 'Texto',
                    },   
                    {                      
                        style: 'table',                      
                        table: {
                            headerRows: 1,
                            widths: ['*', '*', '*'], 
                            body: [
                                  [{style:'Texto',text:f4},{style:'Texto',text:f5},{style:'Texto',text:f6}] ,
                                  [{style:'Texto',text:this.fechaultimoa.substring(8,10) +" de "+this.obtenermes( this.fechaultimoa.substring(5,7)-1)+" del "+ this.fechaultimoa.substring(0,4) }, {style:'Texto',text:this.plazoaccionpo.substring(8,10) +" de "+this.obtenermes( this.plazoaccionpo.substring(5,7)-1)+" del "+ this.plazoaccionpo.substring(0,4)},{style:'Texto',text: this.fechaministerioperc.substring(8,10) +" de "+this.obtenermes( this.fechaministerioperc.substring(5,7)-1)+" del "+ this.fechaministerioperc.substring(0,4) }],        
                                ]
                        },
                        layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                }, 
                        }
                        
                    },    
                    {
                        text: html4 ,                        
                        style: 'Texto',
                    },     
                    {
                        text: html5 ,                        
                        style: 'Textob',
                        alignment :'center',
                    },         
                               
                    
                ],
             
                
                styles: {
                    
                    Adscripcion:{
                        fontSize: 10,
                        bold:true
                    },
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
                    DeParaCargo:{
                        fontSize: 9,
                        bold:true 
                    },
                    PiePagina:{
                        fontSize: 7,
                        color: 'white'
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Textob:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true ,
                        alignment:'center'
                    },
                    SubTitulo:{
                        fontSize: 11,
                        bold:true 
                    },
                   
                }
	
        }
           

           
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdf');
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modaldocumento=true;
            return dd;
              
           
        },
        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
