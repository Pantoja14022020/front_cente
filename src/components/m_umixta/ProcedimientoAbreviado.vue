 <template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Procedimiento abreviado</v-toolbar-title>
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
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar registro</span>
                        </v-tooltip> 
            
                    
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="oficios"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.uUsuario}}</td>   
                    <td>{{ props.item.uModulo}}</td>                  
                    <td>{{ props.item.fechaSys.substring(8,10) +" de "+ obtenermes(props.item.fechaSys.substring(5,7)-1)+" del "+props.item.fechaSys.substring(0,4)+", "+props.item.fechaSys.substring(11,19)}}</td>      
                    <td>{{ props.item.imputado}}</td>
                    <td>{{ props.item.delito}}</td>       
                    <td class="justify-center layout px-0">      
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color="warning" 
                                        @click="imprimirdoc(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Imprimir</span>
                            </v-tooltip>    
                    </td>       
                    
                </template>
                <template slot="no-data">
                <v-btn color="primary"  >Resetear</v-btn>
                </template>
                
        </v-data-table>


        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>Procedimiento abreviado.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
            
                <v-btn   @click ="generarpdf()" color="success" >Vista previa</v-btn>
                
                
                <v-btn icon   @click="modalAdd = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-flex mx-5>
                   <v-card-text>
                       <v-form >  
                       <br>
                       <br>
                       
                        
                        <v-container grid-list-md  >
                            <v-layout row wrap>
                    
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>   

                                    <v-text-field 
                                        name="causa penal" 
                                        label="*Causa penal:" 
                                        v-model="causapenal"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('causa penal')">                                          
                                    </v-text-field>  

                                    <v-text-field 
                                        name="número de oficio" 
                                        label="*Número de oficio:" 
                                        v-model="numerooficio"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('número de oficio')">                                          
                                    </v-text-field>  

                                    <v-text-field 
                                        name="titular de Subprocuraduría" 
                                        label="*Titular de Subprocuraduría:" 
                                        v-model="titularsub"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('titular de Subprocuraduría')">                                          
                                    </v-text-field>    

                                    <v-text-field 
                                        name="requiere asistencia consular(imputado)" 
                                        label="*Requiere asistencia consular(imputado):" 
                                        v-model="asistenciaconsular"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('requiere asistencia consular(imputado)')">                                          
                                    </v-text-field>  

                                </v-flex>

                                <v-flex  class="espaciado" xs12 sm12 md6 lg6>   

                                    <v-autocomplete name="delito" 
                                        :items="delitos"
                                        v-model="delito" 
                                        v-validate="'required'" 
                                        label="*Delitos:"
                                        return-object
                                        :error-messages="errors.collect('delito')">
                                    </v-autocomplete>

                                    <v-autocomplete name="imputado" 
                                        :items="imputados"
                                        v-model="imputado" 
                                        v-validate="'required'" 
                                        label="*Imputado:"
                                        return-object
                                        @change="listardpimputado"
                                        :error-messages="errors.collect('imputado')">
                                    </v-autocomplete>

                                    <v-autocomplete name="región" 
                                        :items="regiones"
                                        v-model="region" 
                                        v-validate="'required'" 
                                        label="*Región:"
                                        return-object
                                        :error-messages="errors.collect('región')">
                                    </v-autocomplete>

                                </v-flex>

                                <v-flex  class="espaciado" xs12 sm12 md12 lg12> 

                                    <v-stepper v-model="step" non-linear vertical>
                                        <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('vinc') && !errors.has('tiempo')&& !errors.has('modo')&& !errors.has('lugar')]">
                                            III. Relación de los hechos base de la acusación:
                                        </v-stepper-step>
                                        <v-stepper-content step="1">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >                      
                                                        <v-card elevation="0"  >
                                                            <v-card-title ><h3>(DEBE SALIR DE LA TEORÍA DEL CASO Y VINCULACIÓN A PROCESO).</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="vinc"
                                                                        v-model="baseacusacion"                                        
                                                                        v-validate = "'required'"
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('vinc')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card> 
                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6 >

                                                        <v-text-field 
                                                            name="tiempo" 
                                                            label="*Tiempo:" 
                                                            v-model="tiempo3"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('tiempo')">                                          
                                                        </v-text-field> 

                                                        <v-text-field 
                                                            name="modo" 
                                                            label="*Modo:" 
                                                            v-model="modo3"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('modo')">                                          
                                                        </v-text-field> 

                                                    </v-flex> 

                                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6 >
                                                        
                                                        <v-text-field 
                                                            name="lugar" 
                                                            label="*Lugar:" 
                                                            v-model="lugar3"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('lugar')">                                          
                                                        </v-text-field> 

                                                    </v-flex>     

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 2" step="2" editable :rules="[() => !errors.has('termino medio aritmético')]">
                                            V. Límites de punibilidad:
                                        </v-stepper-step>
                                        <v-stepper-content step="2">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex  class="espaciado" xs12 sm12 md2 lg2 >
                                                        <v-checkbox v-model="prision5" :label="`Prisión :`"></v-checkbox>
                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md5 lg5>

                                                        <v-text-field 
                                                            name="de(años)" 
                                                            label="*De(años):" 
                                                            v-model="deanos5"
                                                            v-if="prision5"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('de(años)')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md5 lg5 >

                                                        <v-text-field 
                                                            name="a(años)" 
                                                            label="*A(años):" 
                                                            v-model="aanos5"
                                                            v-if="prision5"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('a(años)')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md2 lg2 >
                                                        <v-checkbox v-model="multa5" :label="`Multa :`"></v-checkbox>
                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md5 lg5>

                                                        <v-text-field 
                                                            name="de(unidades de medida y actualización)" 
                                                            label="*De(unidades de medida y actualización):" 
                                                            v-model="demulta5"
                                                            v-if="multa5"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('de(unidades de medida y actualización)')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md5 lg5 >

                                                        <v-text-field 
                                                            name="a(unidades de medida y actualización)" 
                                                            label="*A(unidades de medida y actualización):" 
                                                            v-model="amulta5"
                                                            v-if="multa5"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('a(unidades de medida y actualización)')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6 >

                                                         <v-autocomplete name="termino medio aritmético" 
                                                            :items="medioaritmeticos"
                                                            v-model="medioaritmetico" 
                                                            v-validate="'required'" 
                                                            label="*Termino medio aritmético:"
                                                            return-object
                                                            :error-messages="errors.collect('termino medio aritmético')">
                                                        </v-autocomplete>

                                                    </v-flex>


                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>
                                        
                                        <v-stepper-step :complete="step > 3" step="3" editable :rules="[() => !errors.has('articulo16')]">
                                            VI.- Tipo de autoría o participación:
                                        </v-stepper-step>
                                        <v-stepper-content step="3">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >

                                                        <v-card elevation="0"  >
                                                            <v-card-title ><h3>(Elegir entre el artículo 16 CPH).</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="articulo16"
                                                                        v-model="articulo16"                                        
                                                                        v-validate = "'required'"
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('articulo16')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card> 

                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 4" step="4" editable :rules="[() => !errors.has('del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud)')]">
                                            VII.- Preceptos legales aplicables:
                                        </v-stepper-step>
                                        <v-stepper-content step="4">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >

                                                        <v-text-field 
                                                            name="del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud)" 
                                                            label="*Del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud):" 
                                                            v-model="codigopenal7"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud)')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 5" step="5" editable :rules="[() => !errors.has('registro de antecedentes penales del acusado')]">
                                            VIII.- Registro de antecedentes penales del acusado:
                                        </v-stepper-step>
                                        <v-stepper-content step="5">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >

                                                        <v-autocomplete name="registro de antecedentes penales del acusado" 
                                                            :items="antecedentespenales"
                                                            v-model="antecedentepenal" 
                                                            v-validate="'required'" 
                                                            label="*Registro de antecedentes penales del acusado:"
                                                            return-object
                                                            :error-messages="errors.collect('registro de antecedentes penales del acusado')">
                                                        </v-autocomplete>

                                                    </v-flex>    

                                                    <v-flex  v-if="antecedentepenal.value"  xs12 sm12 md12 lg12 >

                                                        <v-text-field 
                                                            name="rendido por el Director General de Prevención y Reinserción Social, con número" 
                                                            label="*Rendido por el Director General de Prevención y Reinserción Social, con número:" 
                                                            v-model="numerodgprs8"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('rendido por el Director General de Prevención y Reinserción Social, con número')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  v-if="antecedentepenal.value" class="espaciado2" xs12 sm12 md6 lg6 >

                                                        <v-menu
                                                            ref="menu1"
                                                            v-model="menu1"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="fechadgprs"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                        name='fecha prevención y Reinserción Social'
                                                                        :value="fechadgprs2"
                                                                        label="*Fecha prevención y Reinserción Social:"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha prevención y Reinserción Social')">
                                                            ></v-text-field>
                                                            </template>
                                                                <v-date-picker v-model="fechadgprs" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                </v-date-picker>
                                                        </v-menu>

                                                    </v-flex>

                                                    <v-flex v-if="antecedentepenal.value"  class="espaciado2" xs12 sm12 md6 lg6 >

                                                        <v-text-field 
                                                            name="comunica que" 
                                                            label="*Comunica que:" 
                                                            v-model="comunicadgprs8"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('comunica que')">                                          
                                                        </v-text-field>

                                                    </v-flex>


                                                    <v-flex  v-if="antecedentepenal.value" class="espaciado" xs12 sm12 md6 lg6 >

                                                        <v-text-field 
                                                            name="rendido por el Director del Centro de Reinserción Social de" 
                                                            label="*Rendido por el Director del Centro de Reinserción Social de:" 
                                                            v-model="dedcrs8"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('rendido por el Director del Centro de Reinserción Social de')">                                          
                                                        </v-text-field>

                                                        <v-text-field 
                                                            name="con número" 
                                                            label="*Con número:" 
                                                            v-model="numerodcrs8"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('con número')">                                          
                                                        </v-text-field>

                                                    </v-flex>

                                                    <v-flex  v-if="antecedentepenal.value" class="espaciado" xs12 sm12 md6 lg6 >

                                                        <v-menu
                                                            ref="menu2"
                                                            v-model="menu2"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="fechadcrs"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                        name='fecha Reinserción Social'
                                                                        :value="fechadcrs2"
                                                                        label="*Fecha Reinserción Social:"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('fecha Reinserción Social')">
                                                            ></v-text-field>
                                                            </template>
                                                                <v-date-picker v-model="fechadcrs" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                </v-date-picker>
                                                        </v-menu>

                                                        <v-text-field 
                                                            name="comunica que" 
                                                            label="*Comunica que:" 
                                                            v-model="comunicadcrs8"
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('comunica que')">                                          
                                                        </v-text-field>

                                                    </v-flex>


                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 6" step="6" editable :rules="[() => !errors.has('')]">
                                            IX.- Pena que se solicita
                                        </v-stepper-step>
                                        <v-stepper-content step="6">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex   class="espaciado3" xs12 sm12 md4 lg4 >
                                                        <v-checkbox v-model="opcion1PS9" :label="`Prisión `"></v-checkbox>                                                                                                                                                              
                                                    </v-flex>       

                                                    <v-flex   class="espaciado3" xs12 sm12 md8 lg8 >
                                                        <v-text-field 
                                                            name="prision de" 
                                                            label="*Prision de:" 
                                                            v-model="prision9"
                                                            v-validate="'required'"
                                                            v-if="opcion1PS9"
                                                            :error-messages="errors.collect('prision de')">                                          
                                                        </v-text-field>
                                                    </v-flex>           

                                                    <v-flex   class="espaciado3" xs12 sm12 md4 lg4 >
                                                        <v-checkbox v-model="opcion2PS9" :label="`Multa `"></v-checkbox>
                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md4 lg4 >
                                                        <v-text-field 
                                                            name="multa de" 
                                                            label="*Multa de:" 
                                                            v-model="multa9"
                                                            v-validate="'required'"
                                                            v-if="opcion2PS9"
                                                            :error-messages="errors.collect('multa de')">                                          
                                                        </v-text-field>
                                                    </v-flex>     

                                                    <v-flex   class="espaciado3" xs12 sm12 md4 lg4 >     
                                                        <v-text-field 
                                                            name="cantidad de $" 
                                                            label="*Cantidad de $:" 
                                                            v-model="cantidad9"
                                                            v-validate="'required'"
                                                            v-if="opcion2PS9"
                                                            :error-messages="errors.collect('cantidad de $')">                                          
                                                        </v-text-field>
                                                    </v-flex> 

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >     
                                                        <v-text-field 
                                                            name="tomándose en consideración que la unidad vigente al momento de los hechos era de $" 
                                                            label="*Tomándose en consideración que la unidad vigente al momento de los hechos era de $:" 
                                                            v-model="cantidadhechos9"
                                                            v-validate="'required'"
                                                            v-if="opcion2PS9"
                                                            :error-messages="errors.collect('tomándose en consideración que la unidad vigente al momento de los hechos era de $')">                                          
                                                        </v-text-field>
                                                    </v-flex>           

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion3PS9" :label="`Amonestación `"></v-checkbox>
                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion4PS9" :label="`Suspensión de derechos civiles y políticos por el tiempo que permanezca la persona imputada compurgando su pena privada de libertad, acorde con el artículo 38 de la Constitución Federal`"></v-checkbox>
                                                    </v-flex> 

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion5PS9" :label="`Tratamiento psicoterapéutico reeducativo (sólo es para casos de actos violentos en contra de grupos vulnerables)`"></v-checkbox>
                                                    </v-flex>    

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >     
                                                        <v-text-field 
                                                            name="durante" 
                                                            label="*Durante:" 
                                                            v-model="durante9"
                                                            v-validate="'required'"
                                                            v-if="opcion5PS9"
                                                            :error-messages="errors.collect('durante')">                                          
                                                        </v-text-field>
                                                    </v-flex>   

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion6PS9" :label="`Suspensión de ejercer cargos públicos (sólo es cuando el imputado cometió el ilícito en carácter de servidor público)`"></v-checkbox>
                                                    </v-flex> 

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >     
                                                        <v-text-field 
                                                            name="por el periodo de" 
                                                            label="*Por el periodo de:" 
                                                            v-model="periodo9"
                                                            v-validate="'required'"
                                                            v-if="opcion6PS9"
                                                            :error-messages="errors.collect('por el periodo de')">                                          
                                                        </v-text-field>
                                                    </v-flex>   
                

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 7" step="7" editable :rules="[() => !errors.has('')]">
                                            X.- Razón por la cual se pretende plantear el procedimiento abreviado:
                                        </v-stepper-step>
                                        <v-stepper-content step="7">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion1PA10" :label="`Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento el hecho delictivo,porque:`"></v-checkbox>
                                                    </v-flex> 

                                                    <v-flex v-if="opcion1PA10" class="espaciado3" xs12 sm12 md12 lg12 >

                                                        <v-card elevation="0"  >
                                                            <v-card-title ><h3>(EXPLICAR) ó (PONER “NA” cuando no es este el supuesto).</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="ex1"
                                                                        v-model="explicacionop10"                                        
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('ex1')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card> 

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion2PA10" :label="`Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento el hecho delictivo,porque:`"></v-checkbox>
                                                    </v-flex> 

                                                    <v-flex v-if="opcion2PA10" class="espaciado3" xs12 sm12 md12 lg12 >

                                                        <v-card elevation="0"  >
                                                            <v-card-title ><h3>(EXPLICAR) ó (PONER “NA” cuando no es este el supuesto).</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="ex2"
                                                                        v-model="explicacionop2"                                        
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('ex2')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card> 

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion3PA10" :label="`Se pretende no re victimizar a la víctima ante la necesidad de relatar y revivir nuevamente el acontecimiento del que fue objeto, ante un Tribunal de Enjuiciamiento, pues:`"></v-checkbox>
                                                    </v-flex> 


                                                    <v-flex  v-if="opcion3PA10" class="espaciado3" xs12 sm12 md12 lg12 >   
                                                        <v-checkbox v-model="opcion4PA10" :label="`Se trata de un delito de naturaleza sexual que le conllevaría regresión traumática.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion5PA10" :label="`La comisión del delito implicó violencia para la víctima, de tal suerte que le produjo un trauma emocional que se encuentra en vía de superar mediante tratamiento, y someterla a interrogatorio le podría contraer afectación emocional.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion6PA10" :label="`La víctima es menor de edad, y existe opinión de una persona experta en psicología que ha recomendado no someterla a revivir el momento.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion7PA10" :label="`Los testigos no están actualmente localizables.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion8PA10" :label="`La víctima no está localizable y es un testigo fundamental para sostener la teoría del caso.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion9PA10" :label="`Los testigos están renuentes a acudir ante un tribunal de enjuiciamiento para rendir su testimonio.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion10PA10" :label="`La víctima se niega a acudir ante un tribunal de enjuiciamiento para rendir su testimonio.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion11PA10" :label="`Ha sido propuesto o solicitado por el acusado y/o su defensa.`"></v-checkbox>   
                                                        <v-checkbox v-model="opcion12PA10" :label="`Se pretende plantear como política criminal que nos evite riesgo de que el tribunal de enjuiciamiento pueda absolver, o bien despresurizar las cargas de los asuntos que van a juicio.`"></v-checkbox>                                         
                                                        <v-checkbox v-model="opcion13PA10" :label="`Otro:`"></v-checkbox>  
                                                        <v-text-field 
                                                            name="otro" 
                                                            label="*Otro:" 
                                                            v-model="otro10"
                                                            v-validate="'required'"
                                                            v-if="opcion13PA10"
                                                            :error-messages="errors.collect('otro')">                                          
                                                        </v-text-field>
                                                    

                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 8" step="8" editable :rules="[() => !errors.has('')]">
                                            XI.- Información relativa a la reparación el daño:
                                        </v-stepper-step>
                                        <v-stepper-content step="8">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 > 

                                                        <v-checkbox v-model="opcion1RD" :label="`Medidas de restitución previstas por el artículo 61 de la Ley General de Víctimas, se busca devolver a la víctima la situación anterior al hecho victimizante; por lo que el imputado deberá:`"></v-checkbox>  
                                                        <v-card v-if="opcion1RD" elevation="0"  >
                                                            <v-card-title ><h3>Medidas de restitución previstas por el artículo 61 de la Ley General de Víctimas.</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="me1"
                                                                        v-model="medidas111"                                        
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('me1')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card> 
                                                        <v-checkbox v-model="opcion2RD" :label="`Medidas de rehabilitación previstas por el artículo 62 de la Ley General de Víctimas, se busca facilitar a la parte agraviada hacer frente a los efectos sufridos por el hecho delictivo, ante lo cual el imputado:`"></v-checkbox>  
                                                        <v-card v-if="opcion2RD" elevation="0"  >
                                                            <v-card-title ><h3>Medidas de rehabilitación previstas por el artículo 62 de la Ley General de Víctimas.</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="me2"
                                                                        v-model="medidas211"                                        
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('me2')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card>                                                       

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 > 
                                                        <v-checkbox v-model="opcion3RD" :label="`Medidas de compensación establecidas en el artículo 64 de la Ley General de Víctimas, que se estiman proporcionales y apropiadas según la gravedad del hecho, considerando el caso en particular; por lo cual, lo económicamente valuable que debe compensarse a la víctima es::`"></v-checkbox>                                                         
                                                    </v-flex>
                                                    
                                                    <v-flex v-if="opcion3RD"  class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-checkbox  v-model="opcion4RD" :label="`Gastos erogados por daño a su integridad: $`"></v-checkbox>
                                                    </v-flex>
                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-text-field 
                                                            name="gastos" 
                                                            label="*Gastos:" 
                                                            v-model="gastos11"
                                                            v-validate="'required'"
                                                            v-if="opcion3RD"
                                                            :error-messages="errors.collect('gastos')">                                          
                                                        </v-text-field>
                                                    </v-flex>

                                                    <v-flex  v-if="opcion3RD"  class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-checkbox v-model="opcion5RD" :label="`Gastos cuantificados por las ganancias lícitas que dejó de percibir, a consecuencia del delito:: $`"></v-checkbox>
                                                    </v-flex>
                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-text-field 
                                                            name="gastos cuantificados" 
                                                            label="*Gastos cuantificados:" 
                                                            v-model="gastoscuantificados11"
                                                            v-validate="'required'"
                                                            v-if="opcion3RD"
                                                            :error-messages="errors.collect('gastos cuantificados')">                                          
                                                        </v-text-field>
                                                    </v-flex>

                                                    <v-flex  v-if="opcion3RD"  class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-checkbox v-model="opcion6RD" :label="`Gastos de asesor jurídico que tuvo que contratar durante el procedimiento: $`"></v-checkbox>
                                                    </v-flex>
                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-text-field 
                                                            name="gastos de asesor jurídico" 
                                                            label="*Gastos de asesor jurídico:" 
                                                            v-model="gastosjuridico11"
                                                            v-validate="'required'"
                                                            v-if="opcion3RD"
                                                            :error-messages="errors.collect('gastos de asesor jurídico')">                                          
                                                        </v-text-field>
                                                    </v-flex>

                                                    <v-flex v-if="opcion3RD"  class="espaciado3" xs12 sm12 md6 lg6 > 
                                                        <v-checkbox v-model="opcion7RD" :label="`Gastos por transporte para trasladarse a las diligencias del procedimiento, y gastos de alojamiento.`"></v-checkbox>
                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 > 
                                                        <v-checkbox v-model="opcion8RD" :label="`Medidas de satisfacción exigibles conforme al artículo 73, fracción IV, de la Ley General de Víctimas: en audiencia ante el órgano jurisdiccional ofrecerá a la parte agraviada una disculpa, en la cual aceptará su responsabilidad en el hecho delictivo, con lo que se permite que la víctima conozca la verdad.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion9RD" :label="`Medida de no repetición establecida en el artículo 75 de la Ley General de Víctimas, en que el imputado asumirá un compromiso de no volver a cometer un delito.`"></v-checkbox>
                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 9" step="9" editable :rules="[() => !errors.has('postura de la víctima acerca del alcance del procedimiento abreviado fecha') && !errors.has('hora explicación al imputado acerca del alcance del procedimiento abreviado')]">
                                            XII.- Explicación al imputado acerca del alcance del procedimiento abreviado:
                                        </v-stepper-step>
                                        <v-stepper-content step="9">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 

                                                        <v-menu
                                                            ref="menu3"
                                                            v-model="menu3"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="fechapvapa12"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                        name='postura de la víctima acerca del alcance del procedimiento abreviado fecha'
                                                                        :value="fechapvapa122"
                                                                        label="*Postura de la víctima acerca del alcance del procedimiento abreviado fecha:"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('postura de la víctima acerca del alcance del procedimiento abreviado fecha')">
                                                            ></v-text-field>
                                                            </template>
                                                                <v-date-picker v-model="fechapvapa12" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                </v-date-picker>
                                                        </v-menu>

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 

                                                        <v-menu
                                                            ref="menu4"
                                                            v-model="menu4"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            :return-value.sync="hora12"
                                                            transition="scale-transition"
                                                            offset-y
                                                            max-width="290px"
                                                            min-width="290px"
                                                            >
                                                            <template v-slot:activator="{ on }">
                                                                <v-text-field
                                                                    name= 'hora explicación al imputado acerca del alcance del procedimiento abreviado'
                                                                    v-model="hora12"
                                                                    label="*Hora explicación al imputado acerca del alcance del procedimiento abreviado:"
                                                                    prepend-icon="access_time"
                                                                    readonly
                                                                    v-on="on"
                                                                    v-validate="'required'"                                   
                                                                    :error-messages="errors.collect('Hora explicación al imputado acerca del alcance del procedimiento abreviado')">
                                                                ></v-text-field>
                                                            </template>
                                                            <v-time-picker
                                                                v-model="hora12"
                                                                full-width
                                                            ></v-time-picker>
                                                            <v-card>
                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn text color="primary" @click="$refs.menu4.save(hora12)">OK</v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-menu>

                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                        <v-stepper-step :complete="step > 10" step="10" editable :rules="[() => !errors.has('postura de la víctima acerca del procedimiento abreviado fecha') && !errors.has('hora explicación al imputado acerca del procedimiento abreviado')]">
                                            XIII.- Postura de la víctima acerca del procedimiento abreviado:
                                        </v-stepper-step>
                                        <v-stepper-content step="10">
                                            <v-container grid-list-md text-xs-center>
                                                <v-layout row wrap>

                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 

                                                        <v-menu
                                                            ref="menu5"
                                                            v-model="menu5"
                                                            :close-on-content-click="false"
                                                            :return-value.sync="fechapvapa13"
                                                            transition="scale-transition"
                                                            offset-y
                                                            min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                        name='postura de la víctima acerca del procedimiento abreviado fecha'
                                                                        :value="fechapvapa132"
                                                                        label="*Postura de la víctima acerca del procedimiento abreviado fecha:"
                                                                        prepend-icon="event"
                                                                        clearable 
                                                                        readonly
                                                                        v-on="on"
                                                                        v-validate="'required'"                                   
                                                                        :error-messages="errors.collect('postura de la víctima acerca del procedimiento abreviado fecha')">
                                                            ></v-text-field>
                                                            </template>
                                                                <v-date-picker v-model="fechapvapa13" no-title scrollable>
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu5 = false">Cancel</v-btn>
                                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                                </v-date-picker>
                                                        </v-menu>

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md6 lg6 > 

                                                        <v-menu
                                                            ref="menu6"
                                                            v-model="menu6"
                                                            :close-on-content-click="false"
                                                            :nudge-right="40"
                                                            :return-value.sync="hora13"
                                                            transition="scale-transition"
                                                            offset-y
                                                            max-width="290px"
                                                            min-width="290px"
                                                            >
                                                            <template v-slot:activator="{ on }">
                                                                <v-text-field
                                                                    name= 'hora explicación al imputado acerca del procedimiento abreviado'
                                                                    v-model="hora13"
                                                                    label="*Hora explicación al imputado acerca del procedimiento abreviado:"
                                                                    prepend-icon="access_time"
                                                                    readonly
                                                                    v-on="on"
                                                                    v-validate="'required'"                                   
                                                                    :error-messages="errors.collect('Hora explicación al imputado acerca del procedimiento abreviado')">
                                                                ></v-text-field>
                                                            </template>
                                                            <v-time-picker
                                                                v-model="hora13"
                                                                full-width
                                                            ></v-time-picker>
                                                            <v-card>
                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn text color="primary" @click="$refs.menu6.save(hora13)">OK</v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-menu>

                                                    </v-flex>

                                                    <v-flex   class="espaciado3" xs12 sm12 md12 lg12 > 
                                                        <v-checkbox v-model="opcion1PVAPA" :label="`No tiene oposición en su aplicación.`"></v-checkbox>
                                                        <v-checkbox v-model="opcion2PVAPA" :label="`Tiene oposición en su aplicación, porque:`"></v-checkbox>
                                                        <v-card v-if="opcion2PVAPA" elevation="0"  >
                                                            <v-card-title ><h3>Por que de la oposición</h3></v-card-title>
                                                                <v-divider ></v-divider>
                                                            <v-card-text>
                                                                    <v-form  > 
                                                                    <vue-editor  
                                                                        name="pq13"
                                                                        v-model="porque13"                                        
                                                                        outline  height=350px;
                                                                        style="max-height: 310px; overflow-y: scroll"
                                                                        :editorToolbar="customToolbar" 
                                                                        :error-messages="errors.collect('pq13')">
                                                                    </vue-editor>
                                                                </v-form>
                                                            </v-card-text>  
                                                        </v-card>    
                                                    </v-flex>

                                                </v-layout>
                                            </v-container>
                                        </v-stepper-content>

                                    </v-stepper>
                                </v-flex>

                            </v-layout>
                        </v-container>
                        

                       </v-form>
                  </v-card-text>
                  
      
           
            </v-flex>
            </v-card>
        </v-dialog>




        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click.native="guardar()">Guardar oficio</v-btn>
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
  

  export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        texto:'',
        oficios:[],
        fechas:'',
        numerooficio:'',
        delitos:[],
        delito:'',
        causapenal:'',
        imputados:[],
        imputado:'',
        titularsub:'',
        regiones:[
            {text:"Procedimientos penales región oriente",value:"Procedimientos penales región oriente"},
            {text:"Procedimientos penales región poniente",value:"Procedimientos penales región poniente"},
        ],
        region:'',
        comilla:'"',
        direccionparticularimputado:'',
        texto2:'',
        texto3:'',
        publico:'',
        particular:'',
        asistenciaconsular:'',
        step:0,
        baseacusacion:'',
        tiempo3:'',
        modo3:'',
        lugar3:'',
        prision5:false,
        multa5:false,
        deanos5:'',
        aanos5:'',
        demulta5:'',
        amulta5:'',
        mayor5:false,
        menor5:false,
        medioaritmeticos:[
            {text:"Mayor a 5 años de prisión.",value:true},
            {text:"Menor a 5 años de prisión.",value:false},
        ],
        medioaritmetico:'',
        articulo16:'',
        texto4:'',
        codigopenal7:'',
        texto5:'',
        antecedentespenales:[
            {text:"Si tiene",value:true},
            {text:"No tiene",value:false},
        ],
        antecedentepenal:'',
        fechadgprs:'',
        fechadgprs2:'',
        menu1:false,
        fechadcrs2:'',
        fechadcrs:'',
        menu2:false,
        comunicadcrs8:'',
        numerodcrs8:'',
        numerodcrs8:'',
        numerodgprs8:'',
        comunicadgprs8:'',
        dedcrs8:'',
        opcion1PS9:false,
        opcion2PS9:false,
        opcion3PS9:false,
        opcion4PS9:false,
        opcion5PS9:false,
        opcion6PS9:false,
        prision9:'',
        multa9:'',
        cantidad9:'',
        cantidadhechos9:'',
        durante9:'',
        periodo9:'',
        opcion1PA10:false,
        opcion2PA10:false,
        opcion3PA10:false,
        opcion4PA10:false,
        opcion5PA10:false,
        opcion6PA10:false,
        opcion7PA10:false,
        opcion8PA10:false,
        opcion9PA10:false,
        opcion10PA10:false,
        opcion11PA10:false,
        opcion12PA10:false,
        opcion13PA10:false,
        explicacionop10:'',
        explicacionop2:'',
        otro10:'',
        texto6:'',
        texto7:'',
        opcion1RD:false,
        opcion2RD:false,
        opcion3RD:false,
        opcion4RD:false,
        opcion5RD:false,
        opcion6RD:false,
        opcion7RD:false,
        opcion8RD:false,
        opcion9RD:false,
        medidas111:'',
        medidas211:'',
        gastos11:'',
        gastoscuantificados11:'',
        gastosjuridico11:'',
        menu3:false,
        menu4:false,
        fechapvapa122:'',
        fechapvapa12:'',
        hora12:'',
        hora13:'',
        menu5:false,
        menu6:false,
        fechapvapa132:'',
        fechapvapa13:'',
        opcion1PVAPA:false,
        opcion2PVAPA:false,
        porque13:'',
        delitof :'',
        imputadof:'',
        regionf:'',
        idNuc:'',
        headers: [
            
            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Módulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha de generación', value: 'fechasys' }, 
            { text: 'Imputado',value: 'imputado' }, 
            { text: 'Delito',value: 'delito' }, 
            { text: 'Opciones', value: 'opciones', sortable: false },                              
        ],
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
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
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

    },
    watch: {
        
    },
    methods:{ 
        
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
    listarrHecho(){
            
        let me=this;   
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};  
        this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){

            me.agenciaid = response.data.agenciaid,                 
            me.idNuc = response.data.nucId
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
        me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
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
    listardelitos(){

        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        var delitosArray=[];
        this.$cat.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
            //console.log(response.data)
            delitosArray=response.data;
            delitosArray.map(function(x){
                me.delitos.push({text: x.nombreDelito,value: x.nombreDelito, intension : x.intensionDelito});   
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
                me.imputados.push({text: x.nombreCompleto,value:x.personaId,edad:x.edad,nacimiento:x.fechaNacimiento, medionotificacion:x.medionotificacion,indigena: x.lengua == "" ?"No":"Si"});                 
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
    listardpimputado(){ 

        let me=this;   
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$cat.get('api/RAPs/ListarDP/' +me.imputado.value,configuracion).then(function(response){
            
            me.direccionparticularimputado = response.data.calle + " " +response.data.noint + " " +response.data.noext   + ", " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
            me.rpublico();
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
    rpublico(){ 

        let me=this;   
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$cat.get('api/Representante/RepresentantesActivoPublico/' +me.imputado.value,configuracion).then(function(response){
            
            me.publico = response.data.respuesta
            me.rparticular();
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
    rparticular(){ 

        let me=this;   
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$cat.get('api/Representante/RepresentantesActivoParticular/' +me.imputado.value,configuracion).then(function(response){
            
            me.particular = response.data.respuesta
            
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
    fechainif(){
            if(this.menu1){
                this.generarfecha2();
            this.$refs.menu1.save(this.fechadgprs);
            } 
            if(this.menu2){
                this.generarfecha2();
            this.$refs.menu2.save(this.fechadcrs);
            } 
            if(this.menu3){
                this.generarfecha2();
            this.$refs.menu3.save(this.fechapvapa12);
            }  
            if(this.menu5){
                this.generarfecha2();
            this.$refs.menu5.save(this.fechapvapa13);
            }                  
        },
        generarfecha2(){           
            if(this.menu1) 
            this.fechadgprs2 =this.fechadgprs.substring(8,10) +" de "+ this.obtenermes(this.fechadgprs.substring(5,7)-1)+
            " del "+ this.fechadgprs.substring(0,4);   
            if(this.menu2) 
            this.fechadcrs2 =this.fechadcrs.substring(8,10) +" de "+ this.obtenermes(this.fechadcrs.substring(5,7)-1)+
            " del "+ this.fechadcrs.substring(0,4);  
            if(this.menu3) 
            this.fechapvapa122 =this.fechapvapa12.substring(8,10) +" de "+ this.obtenermes(this.fechapvapa12.substring(5,7)-1)+
            " del "+ this.fechapvapa12.substring(0,4); 
            if(this.menu5) 
            this.fechapvapa132 =this.fechapvapa13.substring(8,10) +" de "+ this.obtenermes(this.fechapvapa13.substring(5,7)-1)+
            " del "+ this.fechapvapa13.substring(0,4); 
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
    generarpdf(){
        this.$validator.validate().then(result => {
                if (result) {
                this.imputadof = this.imputado.text
                this.delitof = this.delito.text
                this.regionf = this.region.text
                this.fechas = this.generarfecha();
                this.texto = this.u_nombre+" , en mi carácter de agente del ministerio público dentro del proceso penal al rubro citado, en términos de los artículos 20 –apartado A, fracción VII- de la Constitución Política de los Estados Unidos Mexicanos; 183 –tercer párrafo-, 185, 201, 202, 203 y 205 del Código Nacional de Procedimientos Penales, se solicita <b>autorización para planteamiento del procedimiento abreviado</b>, bajo el siguiente tenor:"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                this.texto2 = "<b>I. Individualización del acusado y su defensa:</b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Nombre del acusado: " + this.imputado.text +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Edad: " + this.imputado.edad +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Fecha de nacimiento: " + this.imputado.nacimiento +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Autoadscripción indígena: " + this.imputado.indigena  +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Requiere asistencia consular:" + this.asistenciaconsular +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Domicilio particular: " + this.direccionparticularimputado +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Medios para ser notificado: " + this.imputado.medionotificacion +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "       Defensa: " + (this.particular ? "Particular" : ""  )+ (this.particular && this.publico ? " ": "")+  (this.publico  ? "Publicá" :"" )+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                this.texto3 = "<b>II. Identificación de la víctima u ofendido:  </b>"+
                this.imputado.text+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>III. Relación de los hechos base de la acusación: </b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.baseacusacion+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Tiempo: " + this.tiempo3+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Lugar: "+ this.lugar3 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Modo: "+ this.modo3 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>IV. Clasificación jurídica:  </b>"+this.delito.intension+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.delito.text+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>V. Límites de punibilidad:  </b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                (this.prision5 ? "Prisión: De " + this.deanos5 + " años a " + this.aanos5 + " años. "+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"") +
                (this.multa5 ? "Multa: De " + this.demulta5 + " a " + this.amulta5 + " unidades de medida y actualización. "+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"") +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Por lo cual, el término medio aritmético del delito por el cual se debe acusar, es:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.medioaritmetico.text+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>VI.- Tipo de autoría o participación:  </b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.articulo16+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>VII.- Preceptos legales aplicables:  </b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                this.texto4 = "- De la Constitución Federal: artículos 15, 16, 17, 20 y 21."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud): " + this.codigopenal7+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "- Del Código Nacional de Procedimientos Penales: 1, 2, 4 a 12, 16, 20, 183 tercer párrafo, 185, 201, 202, 203 y 205."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

                this.texto5 = "<b>VIII.- Registro de antecedentes penales del acusado:  </b>"+ 
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.antecedentepenal.text +
                (this.antecedentepenal.value?
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Lo anterior con base en los siguientes informes:"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "a).- Rendido por el Director General de Prevención y Reinserción Social, con número "+ this.numerodgprs8 + ", de fecha "+ this.fechadgprs2+ ", mediante el cual comunica que "+ this.comunicadgprs8 +"."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "b).- Rendido por el Director del Centro de Reinserción Social de "+ this.dedcrs8 + ", con número "+this.numerodcrs8+ ", de fecha "+ this.fechadcrs2+ ", mediante el cual comunica que "+ this.comunicadcrs8 +"." : "")+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>IX.- Pena que se solicita</b> para el planteamiento en el procedimiento abreviado:"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                (this.opcion1PS9 ? "Prisión de " + this.prision9 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion2PS9 ? "Multa de " + this.multa9 + " unidades de medida y actualización como multa, los cuales equivalen a la cantidad de $" + this.cantidad9 + " tomándose en consideración que la unidad vigente al momento de los hechos era de $" + this.cantidadhechos9+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PS9 ? "Amonestación" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion4PS9 ? "Suspensión de derechos civiles y políticos por el tiempo que permanezca la persona imputada compurgando su pena privada de libertad, acorde con el artículo 38 de la Constitución Federal." + 
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion5PS9 ? "Tratamiento psicoterapéutico reeducativo (sólo es para casos de actos violentos en contra de grupos vulnerables), durante " + this.durante9 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion6PS9 ? "Suspensión de ejercer cargos públicos por el periodo de" + this.periodo9 + "(sólo es cuando el imputado cometió el ilícito en carácter de servidor público)."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>X.- Razón por la cual se pretende plantear el procedimiento abreviado:</b>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                (this.opcion1PA10 ? "Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento el hecho delictivo, porque:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.explicacionop10+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion2PA10 ? "Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento la responsabilidad penal del acusado, porque::" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.explicacionop2+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 ? "Se pretende no re victimizar a la víctima ante la necesidad de relatar y revivir nuevamente el acontecimiento del que fue objeto, ante un Tribunal de Enjuiciamiento, pues:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")

                this.texto6 =(this.opcion3PA10 && this.opcion4PA10  ? "Se trata de un delito de naturaleza sexual que le conllevaría regresión traumática." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion5PA10  ? "La comisión del delito implicó violencia para la víctima, de tal suerte que le produjo un trauma emocional que se encuentra en vía de superar mediante tratamiento, y someterla a interrogatorio le podría contraer afectación emocional." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion6PA10  ? "La víctima es menor de edad, y existe opinión de una persona experta en psicología que ha recomendado no someterla a revivir el momento." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion7PA10  ? "Los testigos no están actualmente localizables." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion8PA10  ? "La víctima no está localizable y es un testigo fundamental para sostener la teoría del caso." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion9PA10  ? "Los testigos están renuentes a acudir ante un tribunal de enjuiciamiento para rendir su testimonio." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion10PA10  ? "La víctima se niega a acudir ante un tribunal de enjuiciamiento para rendir su testimonio." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion11PA10  ? "Ha sido propuesto o solicitado por el acusado y/o su defensa." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion12PA10  ? "Se pretende plantear como política criminal que nos evite riesgo de que el tribunal de enjuiciamiento pueda absolver, o bien despresurizar las cargas de los asuntos que van a juicio." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion3PA10 && this.opcion13PA10  ? "Otro:" + this.otro10 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"");

                this.texto7 ="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b> XI.- Información relativa a la reparación el daño:</b> En la carpeta de investigación se tiene por acreditada la reparación del daño o bien reparación que pactaron las partes en sede ministerial, de la siguiente manera, en términos del artículo 26 y 27 de la Ley General de Víctimas:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                ( this.opcion1RD  ? "Medidas de restitución previstas por el artículo 61 de la Ley General de Víctimas, se busca devolver a la víctima la situación anterior al hecho victimizante; por lo que el imputado deberá:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.medidas111+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                ( this.opcion2RD  ? "Medidas de rehabilitación previstas por el artículo 62 de la Ley General de Víctimas, se busca facilitar a la parte agraviada hacer frente a los efectos sufridos por el hecho delictivo, ante lo cual el imputado:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                this.medidas211+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                ( this.opcion3RD  ? "Medidas de compensación establecidas en el artículo 64 de la Ley General de Víctimas, que se estiman proporcionales y apropiadas según la gravedad del hecho, considerando el caso en particular; por lo cual, lo económicamente valuable que debe compensarse a la víctima es:" +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                (this.opcion4RD ? "Gastos erogados por daño a su integridad:$ " + this.gastos11+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion5RD ? "Gastos cuantificados por las ganancias lícitas que dejó de percibir, a consecuencia del delito: $ " + this.gastoscuantificados11+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion6RD ? "Gastos de asesor jurídico que tuvo que contratar durante el procedimiento:$ " + this.gastosjuridico11+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion7RD ? "Gastos por transporte para trasladarse a las diligencias del procedimiento, y gastos de alojamiento. " +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":""):"")+
                "Medidas de satisfacción exigibles conforme al artículo 73, fracción IV, de la Ley General de Víctimas: en audiencia ante el órgano jurisdiccional ofrecerá a la parte agraviada una disculpa, en la cual aceptará su responsabilidad en el hecho delictivo, con lo que se permite que la víctima conozca la verdad."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Medida de no repetición establecida en el artículo 75 de la Ley General de Víctimas, en que el imputado asumirá un compromiso de no volver a cometer un delito."+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>XII.- Explicación al imputado acerca del alcance del procedimiento abreviado:</b> En fecha "+this.fechapvapa122+ ", a las "+ this.hora12 + " horas, en presencia de su defensa, se explicó a la persona imputada los alcances del procedimiento abreviado, de lo cual obra el registro en la carpeta de investigación. "+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<b>XIII.- Postura de la víctima acerca del procedimiento abreviado:</b> En fecha "+this.fechapvapa132+ ", a las "+ this.hora13 + " horas, se explicó a la víctima u ofendido la naturaleza y alcance del procedimiento abreviado, quien:"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                (this.opcion1PVAPA ? "No tiene oposición en su aplicación." +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                (this.opcion2PVAPA ? "Tiene oposición en su aplicación, porque: "+ this.porque13 +
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
                "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
                "Por lo cual, solicito a Usted, Subprocurador (a) de "+ this.region.text + ", de la Procuraduría General de Justicia del estado de Hidalgo, la autorización para el planteamiento del procedimiento abreviado."

                this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia); 
                }  
            })  
    },
    imprimirdoc(item){

        this.imputadof = item.imputado
        this.delitof = item.delito
        this.regionf = item.orientePoniente


        this.causapenal = item.causaPenal       
        var delito = item.delito   
        this.titularsub = item.titularOrientePoniente
        var region =  item.orientePoniente
        var imputado =  item.imputado  
        var edadimputado = item.edadImputado   
        var fechanacimientoimputado = item.fechaNImputado  
        var imputadoindigena = item.autoDescripcionIndignenaImputado   
        this.asistenciaconsular = item.asistenciaConsularImputado  
        this.direccionparticularimputado = item.domicilioParticularImputado  
        var medionotificacionimputado = item.domicilioEscucha
        var defensaimputado = item.defensaParticularPublicaImputado
        this.baseacusacion =  item.baseAcusacionRH  
        this.tiempo3 = item.tiempoRH
        this.lugar3 = item.lugarRH    
        this.modo3 =  item.modoRH  
        var intensiondelito = item.dolosoCulposo  
        this.prision5 =  item.prisionLP   
        this.deanos5 =  item.prisionDe   
        this.aanos5 = item.prisionALP    
        this.multa5 = item.multaLP   
        this.demulta5 = item.multaDeLPLP   
        this.amulta5 =  item.multaALP   
        var prisionmayor5 = item.prisionMayor5LP ? "Mayor a 5 años de prisión." : "Menor a 5 años de prisión."
        this.articulo16 =  item.tipoAutoriaParticipacion   
        this.codigopenal7 = item.codigoPenalPL    
        var antecedentos = item.registroAntecedentes       
        this.numerodgprs8 = item.dgNumero
        this.fechadgprs2 = item.dgFecha   
        this.comunicadgprs8 = item.dgComunica   
        this.dedcrs8 = item.dcDe    
        this.fechadcrs2 =  item.dcFecha   
        this.comunicadcrs8 = item.dcComunica    
        this.opcion1PS9 = item.psOpcion1PS    
        this.prision9 = item.prisionOp1PS    
        this.opcion2PS9 = item.psOpcion2PS    
        this.multa9 = item.multaOp2PS    
        this.cantidad9 = item.canditadOp2PS    
        this.cantidadhechos9 = item.cantidadHechosOp2PS    
        this.opcion3PS9 =  item.psOpcion3PS   
        this.opcion4PS9 = item.psOpcion4PS    
        this.opcion5PS9 =  item.psOpcion5PS  
        this.durante9 = item.duranteOp5PS    
        this.opcion6PS9 =  item.psOpcion6PS  
        this.periodo9 = item.periodoOp6PS    
        this.opcion1PA10 =  item.opcion1PPA   
        this.explicacionop10 = item.explicarOP1PPA    
        this.opcion2PA10 = item.opcion2PPA    
        this.explicacionop2 = item.explicarOP2PPA    
        this.opcion3PA10 = item.opcion3PPA    
        this.opcion4PA10 = item.opcion4PPA    
        this.opcion5PA10 = item.opcion5PPA    
        this.opcion6PA10 = item.opcion6PPA    
        this.opcion7PA10 = item.opcion7PPA    
        this.opcion8PA10 = item.opcion8PPA   
        this.opcion9PA10 = item.opcion9PPA    
        this.opcion10PA10 = item.opcion10PPA    
        this.opcion11PA10 = item.opcion11PPA    
        this.opcion12PA10 = item.opcion12PPA    
        this.opcion13PA10 = item.opcion13PPA   
        this.otro10 = item.otroOP13PPA    
        this.opcion1RD = item.opcion1RD    
        this.thisdidas111 = item.texto1RD    
        this.opcion2RD = item.opcion2RD    
        this.thisdidas211 =  item.texto2RD   
        this.opcion3RD = item.opcion3RD    
        this.opcion4RD = item.gastosOp1RD    
        this.gastos11 = item.gastosErogadosOP3RD    
        this.opcion5RD = item.gastosOp2RD    
        this.gastoscuantificados11 = item.gastosCuantificadosOP3RD    
        this.opcion6RD = item.gastosOp3RD  
        this.gastosjuridico11 = item.gastosAsesorJuridicoOP3RD         
        this.opcion7RD = item.gastosOp4RD         
        this.opcion8RD = item.opcion4RD      
        this.opcion9RD = item.opcion5RD      
        
        this.fechapvapa122 =  item.explicacionImputadoFechaHora.substring(8,10) +" de "+ this.obtenermes(item.explicacionImputadoFechaHora.substring(5,7)-1)+" del "+item.explicacionImputadoFechaHora.substring(0,4)
        this.hora12 = item.explicacionImputadoFechaHora.substring(11,16)

        this.fechapvapa132 =  item.posturaVictimaFechaHora.substring(8,10) +" de "+ this.obtenermes(item.posturaVictimaFechaHora.substring(5,7)-1)+" del "+item.posturaVictimaFechaHora.substring(0,4)
        this.hora13 = item.posturaVictimaFechaHora.substring(11,16)
        this.opcion1PVAPA  =  item.opcion1PV     
        this.opcion2PVAPA  =  item.opcion2PV     
        this.porque13 = item.porqueOp2PV      
        this.nuthisrooficio = item.nuthisroOficio  
        this.numerodcrs8 = item.dcNumero
        
        this.texto = item.uUsuario+" , en mi carácter de agente del ministerio público dentro del proceso penal al rubro citado, en términos de los artículos 20 –apartado A, fracción VII- de la Constitución Política de los Estados Unidos Mexicanos; 183 –tercer párrafo-, 185, 201, 202, 203 y 205 del Código Nacional de Procedimientos Penales, se solicita <b>autorización para planteamiento del procedimiento abreviado</b>, bajo el siguiente tenor:"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

        this.texto2 = "<b>I. Individualización del acusado y su defensa:</b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Nombre del acusado: " + imputado +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Edad: " + edadimputado+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Fecha de nacimiento: " + fechanacimientoimputado +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Autoadscripción indígena: " + imputadoindigena  +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Requiere asistencia consular:" + this.asistenciaconsular +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Domicilio particular: " + this.direccionparticularimputado +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Medios para ser notificado: " + medionotificacionimputado +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "       Defensa: " +defensaimputado+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

        this.texto3 = "<b>II. Identificación de la víctima u ofendido:  </b>"+
        imputado+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>III. Relación de los hechos base de la acusación: </b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.baseacusacion+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Tiempo: " + this.tiempo3+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Lugar: "+ this.lugar3 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Modo: "+ this.modo3 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>IV. Clasificación jurídica:  </b>"+intensiondelito+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        delito+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>V. Límites de punibilidad:  </b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (prisionmayor5 ? "Prisión: De " + this.deanos5 + " años a " + this.aanos5 + " años. "+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"") +
        (this.multa5 ? "Multa: De " + this.demulta5 + " a " + this.amulta5 + " unidades de medida y actualización. "+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"") +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Por lo cual, el término medio aritmético del delito por el cual se debe acusar, es:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        prisionmayor5+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>VI.- Tipo de autoría o participación:  </b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.articulo16+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>VII.- Preceptos legales aplicables:  </b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

        this.texto4 = "- De la Constitución Federal: artículos 15, 16, 17, 20 y 21."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Del Código Penal para el estado de Hidalgo (o Ley de Secuestro, o Ley General de Salud): " + this.codigopenal7+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "- Del Código Nacional de Procedimientos Penales: 1, 2, 4 a 12, 16, 20, 183 tercer párrafo, 185, 201, 202, 203 y 205."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"

        this.texto5 = "<b>VIII.- Registro de antecedentes penales del acusado:  </b>"+ 
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (antecedentos ? "Si tiene" : "No tiene") +
        (antecedentos ?
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Lo anterior con base en los siguientes informes:"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "a).- Rendido por el Director General de Prevención y Reinserción Social, con número "+ this.numerodgprs8 + ", de fecha "+ this.fechadgprs2+ ", mediante el cual comunica que "+ this.comunicadgprs8 +"."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "b).- Rendido por el Director del Centro de Reinserción Social de "+ this.dedcrs8 + ", con número "+this.numerodcrs8+ ", de fecha "+ this.fechadcrs2+ ", mediante el cual comunica que "+ this.comunicadcrs8 +".":"")+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>IX.- Pena que se solicita</b> para el planteamiento en el procedimiento abreviado:"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (this.opcion1PS9 ? "Prisión de " + this.prision9 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion2PS9 ? "Multa de " + this.multa9 + " unidades de medida y actualización como multa, los cuales equivalen a la cantidad de $" + this.cantidad9 + " tomándose en consideración que la unidad vigente al momento de los hechos era de $" + this.cantidadhechos9+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PS9 ? "Amonestación" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion4PS9 ? "Suspensión de derechos civiles y políticos por el tiempo que permanezca la persona imputada compurgando su pena privada de libertad, acorde con el artículo 38 de la Constitución Federal." + 
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion5PS9 ? "Tratamiento psicoterapéutico reeducativo (sólo es para casos de actos violentos en contra de grupos vulnerables), durante " + this.durante9 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion6PS9 ? "Suspensión de ejercer cargos públicos por el periodo de" + this.periodo9 + "(sólo es cuando el imputado cometió el ilícito en carácter de servidor público)."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>X.- Razón por la cual se pretende plantear el procedimiento abreviado:</b>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (this.opcion1PA10 ? "Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento el hecho delictivo, porque:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.explicacionop10+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion2PA10 ? "Hay pocas probabilidades de acreditar ante un Tribunal de Enjuiciamiento la responsabilidad penal del acusado, porque::" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.explicacionop2+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 ? "Se pretende no re victimizar a la víctima ante la necesidad de relatar y revivir nuevamente el acontecimiento del que fue objeto, ante un Tribunal de Enjuiciamiento, pues:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")

        this.texto6 =(this.opcion3PA10 && this.opcion4PA10  ? "Se trata de un delito de naturaleza sexual que le conllevaría regresión traumática." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion5PA10  ? "La comisión del delito implicó violencia para la víctima, de tal suerte que le produjo un trauma emocional que se encuentra en vía de superar mediante tratamiento, y someterla a interrogatorio le podría contraer afectación emocional." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion6PA10  ? "La víctima es menor de edad, y existe opinión de una persona experta en psicología que ha recomendado no someterla a revivir el momento." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion7PA10  ? "Los testigos no están actualmente localizables." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion8PA10  ? "La víctima no está localizable y es un testigo fundamental para sostener la teoría del caso." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion9PA10  ? "Los testigos están renuentes a acudir ante un tribunal de enjuiciamiento para rendir su testimonio." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion10PA10  ? "La víctima se niega a acudir ante un tribunal de enjuiciamiento para rendir su testimonio." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion11PA10  ? "Ha sido propuesto o solicitado por el acusado y/o su defensa." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion12PA10  ? "Se pretende plantear como política criminal que nos evite riesgo de que el tribunal de enjuiciamiento pueda absolver, o bien despresurizar las cargas de los asuntos que van a juicio." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion3PA10 && this.opcion13PA10  ? "Otro:" + this.otro10 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"");

        this.texto7 ="<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b> XI.- Información relativa a la reparación el daño:</b> En la carpeta de investigación se tiene por acreditada la reparación del daño o bien reparación que pactaron las partes en sede ministerial, de la siguiente manera, en términos del artículo 26 y 27 de la Ley General de Víctimas:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        ( this.opcion1RD  ? "Medidas de restitución previstas por el artículo 61 de la Ley General de Víctimas, se busca devolver a la víctima la situación anterior al hecho victimizante; por lo que el imputado deberá:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.medidas111+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        ( this.opcion2RD  ? "Medidas de rehabilitación previstas por el artículo 62 de la Ley General de Víctimas, se busca facilitar a la parte agraviada hacer frente a los efectos sufridos por el hecho delictivo, ante lo cual el imputado:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        this.medidas211+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        ( this.opcion3RD  ? "Medidas de compensación establecidas en el artículo 64 de la Ley General de Víctimas, que se estiman proporcionales y apropiadas según la gravedad del hecho, considerando el caso en particular; por lo cual, lo económicamente valuable que debe compensarse a la víctima es:" +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (this.opcion4RD ? "Gastos erogados por daño a su integridad:$ " + this.gastos11+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion5RD ? "Gastos cuantificados por las ganancias lícitas que dejó de percibir, a consecuencia del delito: $ " + this.gastoscuantificados11+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion6RD ? "Gastos de asesor jurídico que tuvo que contratar durante el procedimiento:$ " + this.gastosjuridico11+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion7RD ? "Gastos por transporte para trasladarse a las diligencias del procedimiento, y gastos de alojamiento. " +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":""):"")+
        "Medidas de satisfacción exigibles conforme al artículo 73, fracción IV, de la Ley General de Víctimas: en audiencia ante el órgano jurisdiccional ofrecerá a la parte agraviada una disculpa, en la cual aceptará su responsabilidad en el hecho delictivo, con lo que se permite que la víctima conozca la verdad."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Medida de no repetición establecida en el artículo 75 de la Ley General de Víctimas, en que el imputado asumirá un compromiso de no volver a cometer un delito."+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>XII.- Explicación al imputado acerca del alcance del procedimiento abreviado:</b> En fecha "+this.fechapvapa122+ ", a las "+ this.hora12 + " horas, en presencia de su defensa, se explicó a la persona imputada los alcances del procedimiento abreviado, de lo cual obra el registro en la carpeta de investigación. "+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<b>XIII.- Postura de la víctima acerca del procedimiento abreviado:</b> En fecha "+this.fechapvapa132+ ", a las "+ this.hora13 + " horas, se explicó a la víctima u ofendido la naturaleza y alcance del procedimiento abreviado, quien:"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        (this.opcion1PVAPA ? "No tiene oposición en su aplicación." +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        (this.opcion2PVAPA ? "Tiene oposición en su aplicación, porque: "+ this.porque13 +
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>":"")+
        "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
        "Por lo cual, solicito a Usted, Subprocurador (a) de "+ region+ ", de la Procuraduría General de Justicia del estado de Hidalgo, la autorización para el planteamiento del procedimiento abreviado."



        this.fechas =  item.fechaSys.substring(8,10) +" de "+ this.obtenermes(item.fechaSys.substring(5,7)-1)+" del "+item.fechaSys.substring(0,4)
        this.numerooficio = item.numeroOficio
        this.mostrarpdf(item.uUsuario,item.uPuesto,item.uAgencia);
        this.modaldocumento = false;
    },
    generarfecha(){
        var fecha;
        fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
        return fecha;      
    }, 
    agregar(){
        this.limpiar();           
        this.modalAdd= true;
    },

    close () {
            this.dialog = false;
            this.limpiar();
        },
        
    limpiar(){    
        this.texto = '',
        this.fechas = '',
        this.numerooficio = '',
        this.delito = '',
        this.causapenal = '',
        this.imputado = '',
        this.titularsub = '',
        this.region = '',
        this.comilla = '"',
        this.direccionparticularimputado = '',
        this.texto2 = '',
        this.texto3 = '',
        this.publico = '',
        this.particular = '',
        this.asistenciaconsular = '',
        this.step = 0,
        this.baseacusacion = '',
        this.tiempo3 = '',
        this.modo3 = '',
        this.lugar3 = '',
        this.prision5 = false,
        this.multa5 = false,
        this.deanos5 = '',
        this.aanos5 = '',
        this.demulta5 = '',
        this.amulta5 = '',
        this.mayor5 = false,
        this.menor5 = false,
        this.medioaritmetico = '',
        this.articulo16 = '',
        this.texto4 = '',
        this.codigopenal7 = '',
        this.texto5 = '',
        this.antecedentepenal = '',
        this.fechadgprs = '',
        this.fechadgprs2 = '',
        this.menu1 = false,
        this.fechadcrs2 = '',
        this.fechadcrs = '',
        this.menu2 = false,
        this.comunicadcrs8 = '',
        this.numerodcrs8 = '',
        this.numerodgprs8 = '',
        this.comunicadgprs8 = '',
        this.dedcrs8 = '',
        this.opcion1PS9 = false,
        this.opcion2PS9 = false,
        this.opcion3PS9 = false,
        this.opcion4PS9 = false,
        this.opcion5PS9 = false,
        this.opcion6PS9 = false,
        this.prision9 = '',
        this.multa9 = '',
        this.cantidad9 = '',
        this.cantidadhechos9 = '',
        this.durante9 = '',
        this.periodo9 = '',
        this.opcion1PA10 = false,
        this.opcion2PA10 = false,
        this.opcion3PA10 = false,
        this.opcion4PA10 = false,
        this.opcion5PA10 = false,
        this.opcion6PA10 = false,
        this.opcion7PA10 = false,
        this.opcion8PA10 = false,
        this.opcion9PA10 = false,
        this.opcion10PA10 = false,
        this.opcion11PA10 = false,
        this.opcion12PA10 = false,
        this.opcion13PA10 = false,
        this.explicacionop10 = '',
        this.explicacionop2 = '',
        this.otro10 = '',
        this.texto6 = '',
        this.texto7 = '',
        this.opcion1RD = false,
        this.opcion2RD = false,
        this.opcion3RD = false,
        this.opcion4RD = false,
        this.opcion5RD = false,
        this.opcion6RD = false,
        this.opcion7RD = false,
        this.opcion8RD = false,
        this.opcion9RD = false,
        this.medidas111 = '',
        this.medidas211 = '',
        this.gastos11 = '',
        this.gastoscuantificados11 = '',
        this.gastosjuridico11 = '',
        this.menu3 = false,
        this.menu4 = false,
        this.fechapvapa122 = '',
        this.fechapvapa12 = '',
        this.hora12 = '',
        this.hora13 = '',
        this.menu5 = false,
        this.menu6 = false,
        this.fechapvapa132 = '',
        this.fechapvapa13 = '',
        this.opcion1PVAPA = false,
        this.opcion2PVAPA = false,
        this.porque13 = ''
    },
    listar(){
        let me=this;  
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};  
            this.$cat.get('api/ProcedimientoAbreviados/ListarporRHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response);
                me.oficios=response.data;

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
    guardar(){ 
        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};  
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
            function(){
            
            
                this.$cat.post('api/ProcedimientoAbreviados/Crear',{
                
                'rhechoId': me.rHechoId,
                'CausaPenal': me.causapenal,    
                'Delito': me.delito.text,  
                'TitularOrientePoniente': me.titularsub,  
                'OrientePoniente': me.region.text,  
                'Imputado': me.imputado.text,  
                'EdadImputado': me.imputado.edad,  
                'FechaNImputado': me.imputado.nacimiento,  
                'AutoDescripcionIndignenaImputado': me.imputado.indigena,  
                'AsistenciaConsularImputado': me.asistenciaconsular,  
                'DomicilioParticularImputado': me.direccionparticularimputado,  
                'DomicilioEscucha': me.imputado.medionotificacion,  
                'DefensaParticularPublicaImputado': (me.particular ? "Particular" : ""  )+ (me.particular && me.publico ? " ": "")+  (me.publico  ? "Publicá" :"" ),
                'BaseAcusacionRH': me.baseacusacion,  
                'TiempoRH': me.tiempo3,  
                'LugarRH': me.lugar3,  
                'ModoRH': me.modo3,  
                'DolosoCulposo': me.delito.intension,  
                'PrisionLP': me.prision5,  
                'PrisionDe': me.deanos5,  
                'PrisionALP': me.aanos5,  
                'MultaLP': me.multa5,  
                'MultaDeLPLP': me.demulta5,  
                'MultaALP': me.amulta5,  
                'PrisionMayor5LP': me.medioaritmetico.value,  
                'PrisionMenor5LP': false,  
                'TipoAutoriaParticipacion': me.articulo16,  
                'CodigoPenalPL': me.codigopenal7,  
                'RegistroAntecedentes': me.antecedentepenal.value,  
                'DGNumero': me.numerodgprs8,  
                'DGFecha': me.fechadgprs2,  
                'DGComunica': me.comunicadgprs8,  
                'DCDe': me.dedcrs8,  
                'DCNumero': me.numerodcrs8,  
                'DCFecha': me.fechadcrs2,  
                'DCComunica': me.comunicadcrs8,  
                'PSOpcion1PS': me.opcion1PS9,  
                'PrisionOp1PS': me.prision9,  
                'PSOpcion2PS': me.opcion2PS9,  
                'MultaOp2PS': me.multa9,  
                'CanditadOp2PS': me.cantidad9,  
                'CantidadHechosOp2PS': me.cantidadhechos9,  
                'PSOpcion3PS': me.opcion3PS9,  
                'PSOpcion4PS': me.opcion4PS9,  
                'PSOpcion5PS': me.opcion5PS9,  
                'DuranteOp5PS': me.durante9,  
                'PSOpcion6PS': me.opcion6PS9,  
                'PeriodoOp6PS': me.periodo9,  
                'Opcion1PPA': me.opcion1PA10,  
                'ExplicarOP1PPA': me.explicacionop10,  
                'Opcion2PPA': me.opcion2PA10,  
                'ExplicarOP2PPA': me.explicacionop2,  
                'Opcion3PPA': me.opcion3PA10,  
                'Opcion4PPA': me.opcion4PA10,  
                'Opcion5PPA': me.opcion5PA10,  
                'Opcion6PPA': me.opcion6PA10,  
                'Opcion7PPA': me.opcion7PA10,  
                'Opcion8PPA': me.opcion8PA10,  
                'Opcion9PPA': me.opcion9PA10,  
                'Opcion10PPA': me.opcion10PA10,  
                'Opcion11PPA': me.opcion11PA10,  
                'Opcion12PPA': me.opcion12PA10,  
                'Opcion13PPA': me.opcion13PA10,  
                'OtroOP13PPA': me.otro10,  
                'Opcion1RD': me.opcion1RD,  
                'Texto1RD': me.medidas111,  
                'Opcion2RD': me.opcion2RD,  
                'Texto2RD': me.medidas211,  
                'Opcion3RD': me.opcion3RD,  
                'GastosOp1RD': me.opcion4RD,  
                'GastosErogadosOP3RD': me.gastos11,  
                'GastosOp2RD': me.opcion5RD,  
                'GastosCuantificadosOP3RD': me.gastoscuantificados11,  
                'GastosOp3RD': me.opcion6RD, 
                'GastosAsesorJuridicoOP3RD': me.gastosjuridico11,       
                'GastosOp4RD': me.opcion7RD,       
                'Opcion4RD': me.opcion8RD,    
                'Opcion5RD': me.opcion9RD,    
                'ExplicacionImputadoFechaHora': me.fechapvapa12 + " " + me.hora12,    
                'PosturaVictimaFechaHora': me.fechapvapa13 + " " + me.hora13,    
                'Opcion1PV': me.opcion1PVAPA ,    
                'Opcion2PV': me.opcion2PVAPA ,    
                'PorqueOp2PV': me.porque13,    
                'NumeroOficio': me.numerooficio,       
                'UDistrito': me.u_distrito,
                'USubproc': me.u_dirSubPro,
                'UAgencia': me.u_agencia,
                'UUsuario': me.u_nombre,
                'UPuesto': me.u_puesto,
                'UModulo': me.u_modulo,

            },configuracion).then(function(response){                   
                me.$notify('La información se guardo correctamente !!!','success')  

                this.$cat.put('api/Nucs/Actualizar',{
                    'idNuc': me.idNuc,
                    'statusNUC': "Procedimiento abreviado",  
                },configuracion).then(function(response){  
                    me.$notify('La información se actualizo correctamente !!!','success')  

                    this.$cat.post('api/Historialcarpeta/Crear',{

                        'RHechoId': me.rHechoId,
                        'Detalle': "Procedimiento abreviado",
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



                me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia); 
                me.modalAdd=false;      
                me.modaldocumento = false;
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
            

    },   
    mostrarpdf(nombre,puesto,agencia){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs; 
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
                    pdfMake.vfs = pdfFonts.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
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
            var html6 =htmlToPdfmake(
                this.texto6
            );
            var html7 =htmlToPdfmake(
                this.texto7
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
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
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
                        text:"Causa penal: "+this.causapenal+ "\n\n"+
                        "Delito: "+ this.delitof+ "\n\n"+
                        "Imputado: " + this.imputadof+ "\n\n"+
                        'Número de oficio: ' +this.numerooficio+ '\n\n' ,                        
                        style: 'Nooficio',
                        alignment: 'right', 
                    }, 
                    {
                        text:
                        this.u_distrito+", Hidalgo a "+this.fechas,                        
                        style: 'Fecha',
                        alignment: 'right', 
                    },        
                    {
                        text: "\n\n\n\n\n\n\n\n" +this.titularsub+ ", "+ this.regionf +" de\nla Procuraduría General de Justicia del estado de Hidalgo.\n\n" ,                        
                        style: 'DePara',
                    },                 
                    {
                        text: html ,                        
                        style: 'Texto',
                    },
                    {
                        text: html2 ,                        
                        style: 'Texto',
                        margin: [50, 0, 0, 0] 
                    },
                    {
                        text: html3 ,                        
                        style: 'Texto',
                    },
                    {
                        text: html4 ,                        
                        style: 'Texto',
                        margin: [50, 0, 0, 0] 
                    },
                    {
                        text: html5 ,                        
                        style: 'Texto',
                    },
                    this.opcion3PA10 && this.opcion4PA10 ?
                    {
                        text: html6 ,                        
                        style: 'Texto',
                        margin: [50, 0, 0, 0] 
                    }:"",
                    {
                        text: html7 ,                        
                        style: 'Texto',
                    },
                    {
                        text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: nombre,   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: puesto,   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: agencia,   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
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
.espaciado2{
    padding-left: 30px !important; 
    padding-right: 30px !important;
    padding-bottom: 30px !important;
} 

.espaciado3{
    padding-left: 30px !important; 
    padding-right: 30px !important;
    
} 

</style>
