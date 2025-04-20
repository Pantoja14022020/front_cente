<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Media filiación.</v-toolbar-title
        >
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        />
        <v-spacer />
        <v-flex xs12 sm6 md3>
          <v-text-field
            class="font-weight-regular"
            v-model="nuc"
            disabled
            prepend-icon="folder"
            filled
          ></v-text-field>
        </v-flex>
        <v-btn
          class="mx-2"
          @click="cerrarcarpeta"
          fab
          dark
          small
          color="primary"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="listaimputados"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.nombreImputado }}</td>
          <td>{{ formatearfechahora(props.item.fechaSys) }}</td>
          <td>{{ props.item.distrito }}</td>
          <td>{{ props.item.agencia }}</td>
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.puesto }}</td>

          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="editItem(props.item)">
                  edit
                </v-icon>
              </template>
              <span>Actualizar información</span>
            </v-tooltip>
            <v-tooltip bottom v-if="props.item.impD">
              <template v-slot:activator="{ on }">
                <v-icon
                  color="warning"
                  class="mr-2"
                  v-on="on"
                  @click="imprimirItem(props.item)"
                >
                  print
                </v-icon>
              </template>
              <span>Imprimir media filiación</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="loadarchive(props.item)">
                  publish
                </v-icon>
              </template>
              <span>Subir Archivo</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  @click="consultararchivo(props.item)"
                >
                  pageview
                </v-icon>
              </template>
              <span>Consultar Archivos</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listaMediaAfiliacion()">Resetear</v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="modalAdd"
              fullscreen
              hide-overlay
              persistent
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn color="success" text @click.native="mostrarpdf_MediaAfiliacion()"
                      >Vista Previa</v-btn
                    >
                  </v-toolbar-items>
                  <v-btn icon @click="close()">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-divider></v-divider>

                <v-card elevation="0" class="mb-5" height="auto">
                  <v-form ref="form" data-vv-scope="crear" v-model="formValid">
                    <v-container grid-list-sm>
                      <v-layout wrap justify-space-between>
                        <v-flex class="espaciado2" xs12 sm12 md12 lg12>
                          <v-container grid-list-sm>
                            <v-layout wrap justify-space-between>
                              <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                <v-select
                                  name="grupo sanguineo"
                                  :items="gruposanguineos"
                                  v-model="gruposanguineo"
                                  label="Grupo sanguineo:"                                  
                                  data-vv-scope="crear"
                                  @change="()=>{delete error.sangre}"
                                  :error="error.sangre ? true : false">
                                </v-select>
                                <p v-if="error.sangre" style="color:red" class="mb-0">{{ error.sangre }}</p>
                                <v-select
                                  name="tipo de frente"
                                  :items="tipofrente"
                                  v-model="v_tfrente"
                                  label="Tipo de frente:"
                                  data-vv-scope="crear"
                                  @change="()=>{delete error.frente}"
                                  :error="error.frente ? true : false">
                                </v-select>
                                <p v-if="error.frente" style="color:red" class="mb-0">{{ error.frente }}</p>
                                <v-select
                                  name="lateralidad"
                                  :items="lateralidades"
                                  v-model="lateralidade"
                                  label="Lateralidad:"
                                  data-vv-scope="crear"
                                  @change="()=>{delete error.lateralidad}"
                                  :error="error.lateralidad ? true : false">
                                </v-select>
                                <p v-if="error.lateralidad" style="color:red" class="mb-0">{{ error.lateralidad }}</p>
                              </v-flex>

                              <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                <v-text-field
                                  label="Estatura:"
                                  name="estatura"
                                  v-model="estatura"
                                  data-vv-scope="crear"
                                  type="text"
                                  class="no-arrows"
                                  suffix="m"
                                  @keypress="validarSoloNumero"
                                  @change="()=>{delete error.estatura}"
                                  :error="error.estatura ? true : false">
                                </v-text-field>
                                <p v-if="error.estatura" style="color:red" class="mb-0">{{ error.estatura }}</p>
                                <v-select
                                  name="tipo de complexion"
                                  :items="complexiontipo"
                                  v-model="complexion"
                                  label="Complexión:"
                                  data-vv-scope="crear"
                                  @change="()=>{delete error.complexion}"
                                  :error="error.complexion ? true : false"
                                >
                                </v-select>
                                <p v-if="error.complexion" style="color:red" class="mb-0">{{ error.complexion }}</p>
                                <v-select
                                  name="tez"
                                  :items="Tez"
                                  v-model="tez"
                                  label="Tez:"
                                  data-vv-scope="crear"
                                   @change="()=>{delete error.tez}"
                                  :error="error.tez ? true : false"
                                >
                                </v-select>
                                <p v-if="error.tez" style="color:red" class="mb-0">{{ error.tez }}</p>
                              </v-flex>
                              <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                <v-text-field
                                  label="Peso:"
                                  name="tipo de peso"
                                  v-model="peso"
                                  data-vv-scope="crear"
                                  type="number"
                                  class="no-arrows"
                                  suffix="kg"
                                  :min="0"
                                  @keypress="validarSoloNumero"
                                  @change="()=>{delete error.peso}"
                                  :error="error.peso ? true : false"
                                >
                                </v-text-field>
                                <p v-if="error.peso" style="color:red" class="mb-0">{{ error.peso }}</p>
                                <v-select
                                  name="Forma de cara"
                                  :items="formacaras"
                                  v-model="formacara"
                                  label="Forma de la cara:"
                                  data-vv-scope="crear"
                                  @change="()=>{delete error.formacara}"
                                  :error="error.formacara ? true : false"
                                  >
                                </v-select>
                                <p v-if="error.formacara" style="color:red" class="mb-0">{{ error.formacara }}</p>
                                <v-select
                                name="pomulo"
                                :items="pomulos"
                                v-model="pomulo"
                                label="Pomulo:"
                                data-vv-scope="crear"
                                @change="()=>{delete error.pomulos}"
                                :error="error.pomulos ? true : false"
                                >
                              </v-select>
                              <p v-if="error.pomulos" style="color:red" class="mb-0">{{ error.pomulos }}</p>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-flex>

                        <v-flex class="espaciado4" xs3 sm3 md3 lg3>
                          <v-menu ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Cabello</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Cabello</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="longitud de cabello"
                                          :items="largocabellos"
                                          v-model="largocabello"
                                          label="Longitud de cabello:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.largocabello}"
                                          :error="error.largocabello ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.largocabello" style="color:red" class="mb-0">{{ error.largocabello }}</p>
                                        <v-select
                                          name="calvicie"
                                          :items="calvicies"
                                          v-model="calvicie"
                                          label="Calvicie:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.calvicie}"
                                          :error="error.calvicie ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.calvicie" style="color:red" class="mb-0">{{ error.calvicie }}</p>
                                      </v-flex>
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="tipo de cabello"
                                          :items="tipocabellos"
                                          v-model="tipocabello"
                                          label="Tipo de cabello:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tipocabello}"
                                          :error="error.tipocabello ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.tipocabello" style="color:red" class="mb-0">{{ error.tipocabello }}</p>
                                        <v-select
                                          name="tratamientos químicos de cabello"
                                          :items="tratamientoquimicos"
                                          v-model="tratamientoquimico"
                                          label="Tratamientos químicos de cabello:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tratamientoquimico}"
                                          :error="error.tratamientoquimico ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.tratamientoquimico" style="color:red" class="mb-0">{{ error.tratamientoquimico }}</p>
                                      </v-flex>

                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="color de cabello"
                                          :items="colorcabellos"
                                          v-model="colocabello"
                                          label="Color de cabello:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.colocabello}"
                                          :error="error.colocabello ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.colocabello" style="color:red" class="mb-0">{{ error.colocabello }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu1 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <v-menu v-model="menu5"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Nariz</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Nariz</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="altura de nariz"
                                          :items="alturanarices"
                                          v-model="alturanariz"
                                          label="Altura de nariz:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.alturanariz}"
                                          :error="error.alturanariz ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.alturanariz" style="color:red" class="mb-0">{{ error.alturanariz }}</p>
                                      </v-flex>

                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="dorso de nariz"
                                          :items="dorsonarices"
                                          v-model="dorsonariz"
                                          label="Dorso de nariz:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.dorsonariz}"
                                          :error="error.dorsonariz ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.dorsonariz" style="color:red" class="mb-0">{{ error.dorsonariz }}</p>
                                      </v-flex>

                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="punta de nariz"
                                          :items="puntasnariz"
                                          v-model="puntanariz"
                                          label="Punta de nariz:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.puntanariz}"
                                          :error="error.puntanariz ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.puntanariz" style="color:red" class="mb-0">{{ error.puntanariz }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu5 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <div v-if="(PDesaSelect || PersDSelect) && (clasificacionPersonaSelect === 'Victima directa' || ClasPerSelect === 'Victima directa')">
                            <v-menu v-model="menu9L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="500px">
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">LUNARES</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Lunares Caracteristicos</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text>
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Lunares"
                                            :items="lunares"
                                            v-model="radioLunares"
                                            label="Lunares:"
                                            data-vv-scope=""
                                            @change="()=>{delete error.radioLunares;updateMenu9L()}"
                                            :error="error.radioLunares ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioLunares" style="color:red" class="mb-0">{{ error.radioLunares }}</p>
                                      </div>
                                      <div class="col" v-if="radioLunares === 'Si tiene'">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-text-field v-model="CyULunares" label="Color y ubicación"  @change="()=>{delete error.CyULunares}":error="error.CyULunares ? true : false"></v-text-field>
                                        </div>
                                        <p v-if="error.CyULunares" style="color:red" class="mb-0">{{ error.CyULunares }}</p>
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu9L = false" color="primary"
                                      >Cerrar</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>

                            <v-menu v-model="menu13L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="500px" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">UÑAS</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Estado de las uñas manos</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text>
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Unas"
                                            :items="unas"
                                            v-model="radioUñas"
                                            label="Uñas:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioUñas;updateMenu13L()}"
                                            :error="error.radioUñas ? true : false"
                                            >
                                          </v-select>
                                         </div>
                                        <p v-if="error.radioUñas" style="color:red" class="mb-0">{{ error.radioUñas }}</p>
                                      </div>
                                      <div class="col" v-if="radioUñas && radioUñas.includes('No Saludable')">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select 
                                            :items="unasNoSaludables" 
                                            label="No saludable(Puede seleccionar uno o varios)" 
                                            multiple chips deletable-chips 
                                            v-model="NoSaludables" 
                                            @change="()=>{delete error.NoSaludables}"
                                            :error="error.NoSaludables ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.NoSaludables" style="color:red" class="mb-0">{{ error.NoSaludables }}</p>
                                      </div>
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <!-- <v-switch label="Uñas postizas" color="success" v-model="unasPostizas"></v-switch> -->
                                          <v-select
                                            name="Unas postizas"
                                            :items="unaPostiza"
                                            v-model="unasPostizas"
                                            label="Uñas Postizas:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.unasPostizas}"
                                            :error="error.unasPostizas ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.unasPostizas" style="color:red" class="mb-0">{{ error.unasPostizas }}</p>
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu13L = false" color="primary"
                                      >Cerrar</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>
                          </div>
                        </v-flex>

                        <v-flex class="espaciado4" xs3 sm3 md3 lg3>
                          <v-menu v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Orejas</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Orejas</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="tamaño de orejas"
                                          :items="tamanoorejas"
                                          v-model="tamanooreja"
                                          label="Tamaño de orejas:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tamanooreja}"
                                          :error="error.tamanooreja ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.tamanooreja" style="color:red" class="mb-0">{{ error.tamanooreja }}</p>
                                        <!-- <v-select
                                          name="Aretes"
                                          :items="Aretes"
                                          v-model="aretesOrejas"
                                          label="Aretes:"
                                          @change="()=>{delete error.aretesOrejas}"
                                          :error="error.aretesOrejas ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.aretesOrejas" style="color:red" class="mb-0">{{ error.aretesOrejas }}</p> -->
                                      </v-flex>
                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="adherencia orejas"
                                          :items="aderenciarorejas"
                                          v-model="aderenciaroreja"
                                          label="Adherencia orejas:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.aderenciaroreja}"
                                          :error="error.aderenciaroreja ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.aderenciaroreja" style="color:red" class="mb-0">{{ error.aderenciaroreja }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu2 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <v-menu v-model="menu6"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Menton</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Menton</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="forma de menton"
                                          :items="formamenton"
                                          v-model="v_fmenton"
                                          label="Forma de mentón:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.v_fmenton}"
                                          :error="error.v_fmenton ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.v_fmenton" style="color:red" class="mb-0">{{ error.v_fmenton }}</p>
                                      </v-flex>

                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="tipo de menton"
                                          :items="tipomentons"
                                          v-model="tipomenton"
                                          label="Tipo de menton:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tipomenton}"
                                          :error="error.tipomenton ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.tipomenton" style="color:red" class="mb-0">{{ error.tipomenton }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu6 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <div v-if="(PDesaSelect || PersDSelect) && (clasificacionPersonaSelect === 'Victima directa' || ClasPerSelect === 'Victima directa')">
                            <v-menu v-model="menu10L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-overflow
                              min-width="500px"
                              ref="menuR10" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">CICATRICES</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Cicatrices</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text max-heigth="500px">
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                          name="Cicatrices"
                                          :items="cicatrices"
                                          v-model="radioCicatrices"
                                          label="Cicatrices:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.radioCicatrices;updateMenu10()}"
                                          :error="error.radioCicatrices ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioCicatrices" style="color:red" class="mb-0">{{ error.radioCicatrices }}</p>
                                      </div>
                                      <div class="col" v-if="radioCicatrices === 'Si tiene'">
                                        <v-select
                                          name="Tipo de Cicatrices"
                                          :items="TCicatrices"
                                          v-model="TCicatriz"
                                          label="Tipo de Cicatrices(Puedes elegir uno o varios):"
                                          chips deletable-chips multiple
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.TCicatriz;updateMenu10()}"
                                          :error="error.TCicatriz ? true : false"
                                          >
                                        </v-select>
                                        <p v-if="error.TCicatriz" style="color:red" class="mb-0">{{ error.TCicatriz }}</p>
                                        <v-text-field v-if="TCicatriz && TCicatriz.includes('Traumaticas')" label="Traumática (Color y ubicación)" v-model="CyUTraumatica"@change="()=>{delete error.CyUTraumatica}" :error="error.CyUTraumatica ? true : false"></v-text-field>
                                        <p v-if="error.CyUTraumatica" style="color:red" class="mb-0">{{ error.CyUTraumatica }}</p>
                                        <v-select 
                                          v-if="TCicatriz && TCicatriz.includes('Quirúrgicas')" 
                                          v-model="tipoCQuirurgicas" 
                                          :items="cicatricesQuirurgicas" 
                                          multiple chips deletable-chips 
                                          label='Tipo Quirúrgicas(Puede seleecionar uno o varios)'
                                          @change="()=>{delete error.tipoCQuirurgicas;updateMenu10(); !tipoCQuirurgicas.includes('Operación') ? delete error.operacionMyU : '';!tipoCQuirurgicas.includes('Cesárea') ? delete error.orientacionCesarea : '';!tipoCQuirurgicas.includes('Cesárea') ? delete error.numerodeCesarea : '';updateMenu10}"
                                          :error="error.tipoCQuirurgicas ? true : false">
                                        </v-select>
                                        <p v-if="error.tipoCQuirurgicas" style="color:red" class="mb-0">{{ error.tipoCQuirurgicas }}</p>
                                        <v-text-field v-if="tipoCQuirurgicas && tipoCQuirurgicas.includes('Operación') && TCicatriz.includes('Quirúrgicas')" label="Operación (Motivo y ubicación)"  v-model="operacionMyU" @input="()=>{delete error.operacionMyU}" :error="error.operacionMyU ? true : false"></v-text-field>
                                        <p v-if="error.operacionMyU" style="color:red" class="mb-0">{{ error.operacionMyU }}</p>
                                        <v-select 
                                          v-if="tipoCQuirurgicas && tipoCQuirurgicas.includes('Cesárea')" 
                                          v-model="orientacionCesarea"
                                          :items="comboOrientacionCesarea"
                                          label="Orientación Cesárea"
                                          @change="()=>{delete error.orientacionCesarea;updateMenu10}"
                                          :error="error.orientacionCesarea ? true : false">
                                        </v-select>
                                        <p v-if="error.orientacionCesarea" style="color:red" class="mb-0">{{ error.orientacionCesarea }}</p>
                                        <v-text-field v-if="tipoCQuirurgicas && tipoCQuirurgicas.includes('Cesárea')" @input="()=>{delete error.numerodeCesarea}" :error="error.numerodeCesarea ? true : false" label="Cesárea (Número de partos)" type="number" :min="0" :max="15" v-model="numerodeCesarea"></v-text-field>
                                      </div>
                                      <p v-if="error.numerodeCesarea" style="color:red" class="mb-0">{{ error.numerodeCesarea }}</p>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu10L = false" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>

                            <v-menu v-model="menu14L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              ref="menuR14"
                              min-width="500px" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">DEFORMIDADES</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Deformidades</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text>
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Deformidades"
                                            :items="deformidades"
                                            v-model="radioDeformidades"
                                            label="Deformidades:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioDeformidades;updateMenu14L()}"
                                            :error="error.radioDeformidades ? true : false"
                                            >
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioDeformidades" style="color:red" class="mb-0">{{ error.radioDeformidades }}</p>
                                      </div>
                                      <div class="col" v-if="radioDeformidades && radioDeformidades.includes('Si tiene')">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Tipo de deformidades"
                                            :items="tipoDeformidades"
                                            v-model="tipoDeformidad"
                                            label="Tipo de Deformidad:"
                                            chips multiple deletable-chips
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.tipoDeformidad;updateMenu14L()}"
                                            :error="error.tipoDeformidad ? true : false"
                                            >
                                          </v-select>
                                        </div>
                                        <p v-if="error.tipoDeformidad" style="color:red" class="mb-0">{{ error.tipoDeformidad }}</p>
                                      </div>
                                      <div class="col" v-if="(tipoDeformidad && tipoDeformidad.includes('Congénitas')) && (radioDeformidades && radioDeformidades.includes('Si tiene'))">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-text-field label='Ubicación en cuerpo(Congénitas):' v-model="ubicacionCongenitas" @input="()=>{delete error.ubicacionCongenitas}" :error="error.ubicacionCongenitas ? true : false"></v-text-field>
                                        </div>
                                        <p v-if="error.ubicacionCongenitas" style="color:red" class="mb-0">{{ error.ubicacionCongenitas }}</p>
                                      </div>
                                      <div class="col" v-if="(tipoDeformidad && tipoDeformidad.includes('Adquiridas')) && (radioDeformidades && radioDeformidades.includes('Si tiene'))">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-text-field label='Ubicación en cuerpo(Adquiridas):' v-model="ubicacionAdquiridas" @input="()=>{delete error.ubicacionAdquiridas}" :error="error.ubicacionAdquiridas ? true : false"></v-text-field>
                                        </div>
                                        <p v-if="error.ubicacionAdquiridas" style="color:red" class="mb-0">{{ error.ubicacionAdquiridas }}</p>
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu14L = false" color="primary"
                                      >Cerrar</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>
                          </div>
                        </v-flex>

                        <v-flex class="espaciado4" xs3 sm3 md3 lg3>
                          <v-menu v-model="menu3"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Ojos</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Ojos</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="tamaño de ojo"
                                          :items="tipoojos"
                                          v-model="tipoojo"
                                          label="Tamaño de ojos:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tipoojo}"
                                          :error="error.tipoojo ? true : false">
                                        </v-select>
                                        <p v-if="error.tipoojo" style="color:red" class="mb-0">{{ error.tipoojo }}</p>
                                        <v-select
                                          name="pupilentes"
                                          :items="pupilente"
                                          v-model="pupilentes"
                                          label="Pupilentes:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.pupilentes}"
                                          :error="error.pupilentes ? true : false">
                                        </v-select>
                                        <p v-if="error.pupilentes" style="color:red" class="mb-0">{{ error.pupilentes }}</p>
                                      </v-flex>
                                      
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="Color de ojos"
                                          :items="Colorojos"
                                          v-model="colorojo"
                                          label="Color de ojos:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.colorojo}"
                                          :error="error.colorojo ? true : false">
                                        >
                                        </v-select>
                                        <p v-if="error.colorojo" style="color:red" class="mb-0">{{ error.colorojo }}</p>
                                        <v-select
                                          name="Tipo de ojos"
                                          :items="tipoOjos2"
                                          v-model="tipoOjo2"
                                          label="Tipo de ojos:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.colorojo}"
                                          :error="error.colorojo ? true : false">
                                        >
                                        </v-select>
                                        <p v-if="error.colorojo" style="color:red" class="mb-0">{{ error.colorojo }}</p>
                                      </v-flex>
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="forma de ojo"
                                          :items="formaojos"
                                          v-model="formaojo"
                                          label="Forma de ojo:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.formaojo}"
                                          :error="error.formaojo ? true : false">
                                        >
                                        </v-select>
                                        <p v-if="error.formaojo" style="color:red" class="mb-0">{{ error.formaojo }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu3 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <v-menu v-model="menu7"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Boca</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Boca</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="tamaño de boca"
                                          :items="tamañoboca"
                                          v-model="v_tboca"
                                          label="Tamaño de boca:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.v_tboca}"
                                          :error="error.v_tboca ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.v_tboca" style="color:red" class="mb-0">{{ error.v_tboca }}</p>
                                      </v-flex>

                                      <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                        <v-select
                                          name="grosor de labios"
                                          :items="grosorlabios"
                                          v-model="v_glabios"
                                          label="Grosor de labios:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.v_glabios}"
                                          :error="error.v_glabios ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.v_glabios" style="color:red" class="mb-0">{{ error.v_glabios }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu7 = false" color="primary"
                                    >Cerrar</v-btn
                                  >
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <div v-if="(PDesaSelect || PersDSelect) && (clasificacionPersonaSelect === 'Victima directa' || ClasPerSelect === 'Victima directa')">
                            <v-menu v-model="menu11L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-overflow
                              min-width="500px"
                              ref="menu" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">TATUAJES</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Tatuajes</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text max-heigth="500px">
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Tatuajes"
                                            :items="tatuajes"
                                            v-model="radioTatuajes"
                                            label="Tatuajes:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioTatuajes; updateMenu11L()}"
                                            :error="error.radioTatuajes ? true : false"
                                            >
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioTatuajes" style="color:red" class="mb-0">{{ error.radioTatuajes }}</p>
                                      </div>
                                      <div class="col" v-if="radioTatuajes === 'Si tiene'">
                                        <v-text-field  label="Número de tatuajes:" type="number" :min="0" v-model="NumeroTatuajes "@input="()=>{delete error.NumeroTatuajes}" :error="error.NumeroTatuajes ? true : false"></v-text-field>
                                        <p v-if="error.NumeroTatuajes" style="color:red" class="mb-0">{{ error.NumeroTatuajes }}</p>
                                        <v-text-field  label="Descripción(Forma, ubicación, color):" v-model="DescripcionTatuajes" @input="()=>{delete error.DescripcionTatuajes}" :error="error.DescripcionTatuajes ? true : false"></v-text-field>
                                        <p v-if="error.DescripcionTatuajes" style="color:red" class="mb-0">{{ error.DescripcionTatuajes }}</p>
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu11L = false" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>

                            <v-menu v-model="menu15L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-x
                              left
                              offset-y
                              top
                              min-width="800px"
                              max-heigth="400px"
                              ref="menuR15" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">CAVIDAD ORAL</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Cavidad Oral</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                  <v-card-text max-heigth="500px">
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-column justify-content-center align-items-center">
                                          <v-select
                                          v-model="selectProtesis"
                                          :items="itemsProtesis"
                                          label="Prótesis"
                                          @change="()=>{delete error.selectProtesis;updateMenu15()}"
                                          :error="error.selectProtesis ? true : false"
                                          ></v-select>
                                        </div>
                                        <p v-if="error.selectProtesis" style="color:red" class="mb-0">{{ error.selectProtesis }}</p>
                                          <div class="d-flex flex-column justify-content-center align-items-center">
                                          <v-select
                                            v-if="selectProtesis && selectProtesis.includes('Si tiene')"
                                            v-model="selectSiProtesis"
                                            :items="itemsSiProtesis"
                                            label="Orientación de Prótesis"
                                            @change="()=>{delete error.selectSiProtesis}"
                                            :error="error.selectSiProtesis ? true : false"
                                          ></v-select>
                                        </div>
                                        <p v-if="error.selectSiProtesis" style="color:red" class="mb-0">{{ error.selectSiProtesis }}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                          <h3 class="text-lg-center text-md-center">¿Conoce alguna característica de la dentadura?</h3>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center align-items-center">
                                          <v-select
                                            name="Caracteristicas dentales"
                                            :items="cDentales"
                                            v-model="radioCaracteristicaDental"
                                            label="Caracteristicas dentales:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioCaracteristicaDental;updateMenu15()}"
                                            :error="error.radioCaracteristicaDental ? true : false"
                                            >
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioCaracteristicaDental" style="color:red" class="mb-0">{{ error.radioCaracteristicaDental }}</p>
                                        <div class="container-fluid" v-if="radioCaracteristicaDental === 'Si tiene'">
                                          <div class="d-flex">
                                            <div class="" style="min-width:400px;">
                                                <svg viewBox="0 0 250 301" xmlns="http://www.w3.org/2000/svg" >
                                                <g v-for="tooth in dentadura" :key="tooth.id" @click="selectTooth(tooth)">
                                                  <path
                                                    :d="tooth.path"
                                                    :class="{ selected: tooth.selected, tooth_e: error.arrayTooth}"                                                    
                                                    class="tooth"                                                    
                                                  />
                                                </g>
                                              </svg>
                                            </div>
                                            <p v-if="error.arrayTooth" style="color:red" class="mb-0">{{ error.arrayTooth }}</p>
                                            <div class="" style="max-width: 1000px; ">
                                              <v-layout class="" row wrap v-if="selectedTeeth.length" style="overflow-y: scroll; max-height: 500px;">                                      
                                                <div class="col-2 mx-2" v-for="(tooth) in selectedTeeth" :key="tooth.id">
                                                  <v-select 
                                                    v-model="tooth.condition" 
                                                    :items="situacionDental" 
                                                    :label="tooth.name"
                                                    @change="()=>{blabla(tooth.id, tooth.condition); error.dientes ? (error.dientes.length > 0 ? delete error.dientes[tooth.id] : delete error.dientes) : ''}"
                                                    :error="error.dientes && error.dientes[tooth.id] ? true : false"
                                                    >
                                                  </v-select>
                                                  <p v-if="error.dientes" style="color:red" class="mb-0">{{ error.dientes[tooth.id] }}</p>
                                                </div>
                                              </v-layout>
                                            </div>
                                          </div> 
                                        </div>
                                  
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu15L = false" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>
                          </div>
                        </v-flex>

                        <v-flex class="espaciado4" xs3 sm3 md3 lg3>
                          <v-menu v-model="menu4"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="800px">
                            <template v-slot:activator="{ on }">
                              <v-btn color="success" v-on="on">Cejas</v-btn>
                            </template>

                            <v-flex xs12 sm12 md12 lg12>
                              <v-card shaped class="mx-auto">
                                <v-toolbar color="primary" dark>
                                  <v-icon>info</v-icon>

                                  <v-toolbar-title>Cejas</v-toolbar-title>

                                  <v-spacer></v-spacer>
                                </v-toolbar>

                                <v-card-text>
                                  <v-container grid-list-sm>
                                    <v-layout wrap justify-space-between>
                                      <!-- tamaño ceja -->
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="tamaño de ceja"
                                          :items="tamanocejas"
                                          v-model="tamanoceja"
                                          label="Tamaño de ceja:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.tamanoceja}"
                                          :error="error.tamanoceja ? true : false"  
                                        >
                                        </v-select>
                                        <p v-if="error.tamanoceja" style="color:red" class="mb-0">{{ error.tamanoceja }}</p>
                                      </v-flex>
                                      <!-- forma ceja -->
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="Forma de Cejas"
                                          :items="formacejas"
                                          v-model="formaceja"
                                          label="Forma de Cejas:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.formaceja}"
                                          :error="error.formaceja ? true : false">
                                        </v-select>
                                      </v-flex>
                                      <!-- implantación -->
                                      <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                        <v-select
                                          name="implantación ceja"
                                          :items="implantacioncejas"
                                          v-model="implantacionceja"
                                          label="Implantación ceja:"
                                          data-vv-scope="crear"
                                          @change="()=>{delete error.implantacionceja}"
                                          :error="error.implantacionceja ? true : false"
                                        >
                                        </v-select>
                                        <p v-if="error.implantacionceja" style="color:red" class="mb-0">{{ error.implantacionceja }}</p>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn @click="menu4 = false" color="primary">Cerrar</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-flex>
                          </v-menu>

                          <v-menu v-model="menu8"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="1280px"
                                  v-if="PDesaSelect===false || PersDSelect ===false"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-btn color="success" v-on="on"
                                      >Señas particulares</v-btn
                                    >
                                  </template>

                                  <v-flex xs12 sm12 md12 lg12>
                                    <v-card shaped class="mx-auto">
                                      <v-toolbar color="primary" dark>
                                        <v-icon>info</v-icon>

                                        <v-toolbar-title>Señas particulares</v-toolbar-title>

                                        <v-spacer></v-spacer>
                                      </v-toolbar>

                                      <v-card-text>
                                        <v-container grid-list-sm>
                                          <v-layout wrap justify-space-between>
                                            <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                              <v-switch
                                                color="success"
                                                v-model="cicatriz"
                                                :label="`Cicatriz: ${textosino}`">
                                              </v-switch>

                                              <v-text-field
                                                v-if="cicatriz"
                                                name="localización y descripción cicatriz (tipo/ forma/tamaño):"
                                                label="Localización y descripción cicatriz (tipo/ forma/tamaño):"
                                                v-model="textocicatriz"
                                                data-vv-scope="crear">
                                              </v-text-field>
                                            </v-flex>
                                            <v-flex class="espaciado2" xs12 sm6 md6 lg6>
                                              <v-switch
                                                color="success"
                                                v-model="tatuaje"
                                                :label="`Tatuajes: ${textosino2}`">
                                              </v-switch>
                                              <v-text-field
                                                v-if="tatuaje"
                                                name="localización y descripción tatuajes (tipo/ forma/tamaño):"
                                                label="Localización y descripción tatuajes (tipo/ forma/tamaño):"
                                                v-model="textotatuaje"
                                                data-vv-scope="crear">
                                              </v-text-field>
                                            </v-flex>
                                            <v-flex class="espaciado2" xs12 sm12 md12 lg12>
                                              <v-text-field
                                                name="Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades,perforaciones, manchas, bigote, barba, fracturas, prótesis etc.):"
                                                label="Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades,perforaciones, manchas, bigote, barba, fracturas, prótesis etc.)"
                                                v-model="otrascarac"
                                                data-vv-scope="crear">
                                              </v-text-field>
                                            </v-flex>
                                            <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                              <v-select
                                                name="Tamaño dental"
                                                :items="tamanodentals"
                                                v-model="tamanodental"
                                                label="Tamaño dental:"
                                                data-vv-scope="crear">
                                              </v-select>
                                            </v-flex>
                                            <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                              <v-select
                                                name="Tratamiento dental"
                                                :items="tratamientodentals"
                                                v-model="tratamientodental"
                                                label="Tratamiento dental:"
                                                data-vv-scope="crear">
                                              </v-select>
                                            </v-flex>
                                            <v-flex class="espaciado2" xs12 sm6 md4 lg4>
                                              <v-text-field
                                                v-if="tratamientodental == 'Otro'"
                                                name="Otro"
                                                label="Otro(tratamiento dental):"
                                                v-model="otrotratamiento"
                                                data-vv-scope="crear">
                                              </v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12 lg12>
                                              <v-container grid-list-sm>
                                                <v-layout wrap justify-space-between>
                                                  <v-flex class="espaciado3" xs12 sm6 md4 lg4>
                                                    <v-switch
                                                      color="success"
                                                      v-model="dentaduracompleta"
                                                      :label="`Dentadura completa: ${textosino3}`"
                                                    ></v-switch>
                                                  </v-flex>

                                                  <v-flex
                                                    class="espaciado3"
                                                    xs12
                                                    sm6
                                                    md4
                                                    lg4
                                                  >
                                                    <v-text-field
                                                      v-if="!dentaduracompleta"
                                                      name="Dientes ausentes"
                                                      label="Dientes ausentes:"
                                                      v-model="dientesausentes"
                                                      data-vv-scope="crear"
                                                    >
                                                    </v-text-field>
                                                  </v-flex>

                                                  <v-flex
                                                    class="espaciado3"
                                                    xs12
                                                    sm6
                                                    md4
                                                    lg4
                                                  >
                                                    <v-select
                                                      name="Tipo de dentadura"
                                                      v-if="!dentaduracompleta"
                                                      :items="tipodentaduras"
                                                      v-model="tipodentadura"
                                                      label="Tipo de dentadura:"
                                                      data-vv-scope="crear"
                                                    >
                                                    </v-select>
                                                  </v-flex>
                                                </v-layout>
                                              </v-container>
                                            </v-flex>
                                          </v-layout>
                                        </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="menu8 = false" color="primary"
                                          >Cerrar</v-btn
                                        >
                                      </v-card-actions>
                                    </v-card>
                                  </v-flex>
                          </v-menu>
                          <div v-if="(PDesaSelect || PersDSelect) && (clasificacionPersonaSelect === 'Victima directa' || ClasPerSelect === 'Victima directa')">
                            <v-menu v-model="menu8L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              min-width="500px" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">MANCHAS</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Manchas</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text>
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select 
                                            v-model="radioManchas"
                                            name="manchas"
                                            :items="manchas"
                                            label="Manchas:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioManchas;updateMenu8L()}"
                                            :error="error.radioManchas ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioManchas" style="color:red">{{ error.radioManchas }}</p>
                                      </div>
                                      <div class="col" v-if="radioManchas === 'Si tiene'">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            v-model="tipoMancha"
                                            name="tipo de Manchas"
                                            :items="tipoManchas"
                                            label="Tipo de Manchas:"
                                            chips multiple deletable-chips
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.tipoMancha;updateMenu8L()}"
                                            :error="error.tipoMancha ? true : false">
                                          </v-select>
                                        </div>
                                        <p v-if="error.tipoMancha" style="color:red">{{ error.tipoMancha }}</p>
                                      </div>
                                      <div class="col" v-if="tipoMancha && tipoMancha.includes('Otra') && radioManchas === 'Si tiene'">
                                        <div class="d-flex justify-content-between">
                                          <v-text-field label="Otra(Color y ubicación)" v-model="ManchaOtra" @change="()=>{delete error.ManchaOtra}" :error="error.ManchaOtra ? true : false">></v-text-field>
                                        </div>
                                        <p v-if="error.ManchaOtra" style="color:red">{{ error.ManchaOtra }}</p>
                                      </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu8L = false" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>

                            <v-menu v-model="menu12L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-overflow
                              min-width="500px"
                              ref="menu" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">PIERCING</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Piercing</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>

                                  <v-card-text max-heigth="500px">
                                    <div class="row" min-width="500px">
                                      <div class="col">
                                        <div class="d-flex flex-row justify-content-center align-items-center">
                                          <v-select
                                            name="Piercing"
                                            :items="piercings"
                                            v-model="radioPiercing"
                                            label="Piercing:"
                                            data-vv-scope="crear"
                                            @change="()=>{delete error.radioPiercing;updateMenu12L()}"
                                            :error="error.radioPiercing ? true : false"
                                            >
                                          </v-select>
                                        </div>
                                        <p v-if="error.radioPiercing" style="color:red" class="mb-0">{{ error.radioPiercing }}</p>
                                      </div>
                                      <div class="col" v-if="radioPiercing === 'Si tiene'">
                                          <v-text-field  label="Número de piercing:" type="number" :min="0" v-model="NumeroPiercing" @input="()=>{delete error.NumeroPiercing}" :error="error.NumeroPiercing ? true : false"></v-text-field>
                                          <p v-if="error.NumeroPiercing" style="color:red" class="mb-0">{{ error.NumeroPiercing }}</p>
                                          <v-text-field  label="Descripción(Forma, ubicación, color):" v-model="DescripcionPiercing" @input="()=>{delete error.DescripcionPiercing}" :error="error.DescripcionPiercing ? true : false""></v-text-field>
                                          <p v-if="error.DescripcionPiercing" style="color:red" class="mb-0">{{ error.DescripcionPiercing }}</p>
                                        </div>
                                    </div>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="menu12L = false" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>

                            <v-menu v-model="menu16L"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-overflow
                              min-width="800px"
                              ref="menuR16" >
                              <template v-slot:activator="{ on }">
                                <v-btn color="success" v-on="on">INFORMACIÓN MEDICA</v-btn>
                              </template>

                              <v-flex xs12 sm12 md12 lg12>
                                <v-card shaped class="mx-auto">
                                  <v-toolbar color="primary" dark>
                                    <v-icon>info</v-icon>

                                    <v-toolbar-title>Información Medica</v-toolbar-title>

                                    <v-spacer></v-spacer>
                                  </v-toolbar>
                                  <v-card-text min-heigth="500px">
                                    
                                      <v-layout row>
                                        <!-- TRAUMATISMOS -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                name="Traumatismos"
                                                label="Traumatismos" 
                                                v-model="switchTraumatismos" 
                                                :items="traumatismos"
                                                data-vv-scope="crear"
                                                @change="updateMenu16()" 
                                                :error="error.switchTraumatismos ? true : false">
                                              </v-select>
                                              <p v-if="error.switchTraumatismos" style="color:red" class="mb-0">{{ error.switchTraumatismos }}</p>
                                              <v-flex>
                                                <v-select
                                                  name="Tipo de traumatismos"
                                                  v-if="switchTraumatismos === 'Si tiene'"
                                                  :items="Ttraumatismos"
                                                  v-model="Ttraumatismo"
                                                  label="Tipo de Traumatismos:"
                                                  chips deletable-chips multiple
                                                  data-vv-scope="crear"
                                                  @change="()=>{updateMenu16()}"
                                                  :error="error.Ttraumatismo ? true : false">
                                                </v-select>
                                                <p v-if="error.Ttraumatismo" style="color:red" class="mb-0">{{ error.Ttraumatismo }}</p>
                                                <v-text-field 
                                                  v-if="Ttraumatismo && Ttraumatismo.includes('Fracturas') && switchTraumatismos === 'Si tiene'" 
                                                  label="Ubicación Fractura" 
                                                  v-model="UbiFractura"
                                                  @input="()=>{delete error.Ubifractura}"
                                                  :error="error.Ubifractura ? true : false">
                                                </v-text-field>
                                                <p v-if="error.Ubifractura" style="color:red" class="mb-0">{{ error.Ubifractura }}</p>
                                                <v-select 
                                                  v-if="Ttraumatismo && Ttraumatismo.includes('Lesiones') && switchTraumatismos === 'Si tiene'" 
                                                  :items="tipoLesiones" 
                                                  chips deletable-chips multiple 
                                                  label="Tipo de Lesiones(Puede seleccionar uno o varios)" 
                                                  @change="()=>{updateMenu16();delete error.comboTipoLesiones;!comboTipoLesiones.includes('Mordedura') ? delete error.mordedura : ''}" 
                                                  v-model="comboTipoLesiones"
                                                  :error="error.comboTipoLesiones ? true : false">
                                                </v-select>
                                                <p v-if="error.comboTipoLesiones" style="color:red" class="mb-0">{{ error.comboTipoLesiones }}</p>
                                                <v-text-field 
                                                  v-if="comboTipoLesiones && comboTipoLesiones.includes('Mordedura') && switchTraumatismos === 'Si tiene'" 
                                                  label="Mordedura causada por" 
                                                  v-model="mordedura"
                                                  @input="()=>{delete error.mordedura}"
                                                  :error="error.mordedura ? true : false">
                                                </v-text-field>
                                                <p v-if="error.mordedura" style="color:red" class="mb-0">{{ error.mordedura }}</p>
                                                <v-text-field 
                                                  v-if="comboTipoLesiones && comboTipoLesiones.includes('Otra') && switchTraumatismos === 'Si tiene'" 
                                                  label="Otra" 
                                                  v-model="OtraLesion"
                                                  @input="()=>{delete error.OtraLesion}"
                                                  :error="error.OtraLesion ? true : false">
                                                </v-text-field>
                                                <p v-if="error.OtraLesion" style="color:red" class="mb-0">{{ error.OtraLesion }}</p>
                                                <v-text-field 
                                                  v-if="Ttraumatismo && Ttraumatismo.includes('Lesiones') && switchTraumatismos === 'Si tiene'" 
                                                  label="Ubicación Lesiones" 
                                                  v-model="UbiLesiones"
                                                  @input="()=>{delete error.UbiLesiones}"
                                                  :error="error.UbiLesiones ? true : false">
                                                </v-text-field>
                                                <p v-if="error.UbiLesiones" style="color:red" class="mb-0">{{ error.UbiLesiones }}</p>
                                              </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                          <!-- FACULTADES MENTALES -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                @change="()=>{delete this.error.switchFacultadesMentales;updateMenu16()}" 
                                                label="¿Padece de Facultades Mentales?" 
                                                v-model="switchFacultadesMentales" 
                                                :items="FacMen"
                                                :error="error.switchFacultadesMentales ? true : false">
                                              </v-select>
                                              <p v-if="error.switchFacultadesMentales" style="color:red" class="mb-0">{{ error.switchFacultadesMentales }}</p>
                                              <v-flex>
                                                <v-select 
                                                v-if="switchFacultadesMentales === 'Si'" 
                                                :items="tipoRetraso"
                                                label="Tipo de retraso mental" 
                                                v-model="TRetraso"
                                                @change="()=>{delete error.TRetraso}"
                                                :error="error.TRetraso ? true : false">     
                                              </v-select>
                                              <p v-if="error.TRetraso" style="color:red" class="mb-0">{{ error.TRetraso }}</p>
                                              </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                          <!-- ENFERMEDADES CRONICAS -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                label="Enfermedades Cronicas" 
                                                v-model="switchEnfermedadesCronicas" 
                                                @change="()=>{delete error.switchEnfermedadesCronicas;updateMenu16()}" 
                                                :items="ECronicas"
                                                :error="error.switchEnfermedadesCronicas ? true : false">
                                              </v-select>
                                              <p v-if="error.switchEnfermedadesCronicas" style="color:red" class="mb-0">{{ error.switchEnfermedadesCronicas }}</p>
                                              <v-flex>
                                                <v-text-field 
                                                  label="Tipo de Efermedad" 
                                                  v-model="tipoEnfermedad" 
                                                  v-if="switchEnfermedadesCronicas === 'Si tiene'"
                                                  @input="()=>{delete error.tipoEnfermedad}"
                                                  :error="error.tipoEnfermedad ? true : false">
                                                </v-text-field>
                                                <p v-if="error.tipoEnfermedad" style="color:red" class="mb-0">{{ error.tipoEnfermedad }}</p>
                                                <v-text-field 
                                                  label="Tiempo de Diagnostico" 
                                                  v-model="tiempoDiagnostico" 
                                                  v-if="switchEnfermedadesCronicas === 'Si tiene'"
                                                  @input="()=>{delete error.tiempoDiagnostico}"
                                                  :error="error.tiempoDiagnostico ? true : false">
                                                </v-text-field>
                                                <p v-if="error.tiempoDiagnostico" style="color:red" class="mb-0">{{ error.tiempoDiagnostico }}</p>
                                                <v-select
                                                  name="Tratamiento"
                                                  :items="Tratamientos"
                                                  v-if="switchEnfermedadesCronicas === 'Si tiene'"
                                                  v-model="switchTratamiento"
                                                  label="Tratamiento Efermedades Crónicas:"
                                                  data-vv-scope="crear"
                                                  @change="()=>{delete error.switchTratamiento;updateMenu16()}"
                                                  :error="error.switchTratamiento ? true : false">
                                                </v-select>
                                                <p v-if="error.switchTratamiento" style="color:red" class="mb-0">{{ error.switchTratamiento }}</p>
                                                <v-text-field 
                                                  label="Medicamento" 
                                                  v-model="medicamentoCronicas" 
                                                  v-if="switchEnfermedadesCronicas === 'Si tiene' && switchTratamiento === 'Si tiene'"
                                                  @input="()=>{delete error.medicamentoCronicas}"
                                                  :error="error.medicamentoCronicas ? true : false">
                                                </v-text-field>
                                                <p v-if="error.medicamentoCronicas" style="color:red" class="mb-0">{{ error.medicamentoCronicas }}</p>
                                                <v-text-field 
                                                  label="Periocidad" 
                                                  v-model="periocidadCronicas" 
                                                  v-if="switchEnfermedadesCronicas === 'Si tiene' && switchTratamiento === 'Si tiene'"
                                                  @input="()=>{delete error.periocidadCronicas}"
                                                  :error="error.periocidadCronicas ? true : false">
                                                </v-text-field>
                                                <p v-if="error.periocidadCronicas" style="color:red" class="mb-0">{{ error.periocidadCronicas }}</p>
                                              </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                          <!-- ALERGIAS -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                label="Alergias" 
                                                v-model="switchAlergias" 
                                                :items="Alergias" 
                                                @change="()=>{delete error.switchAlergias;updateMenu16()}"
                                                :error="error.switchAlergias ? true : false">
                                              </v-select>
                                              <p v-if="error.switchAlergias" style="color:red" class="mb-0">{{ error.switchAlergias }}</p>
                                              <v-flex>
                                                <v-select
                                                  name="Tratamiento alergias"
                                                  :items="TAlergias"
                                                  v-model="switchTratamientoAlergia"
                                                  label="Tratamiento de Alergias:"
                                                  data-vv-scope="crear"
                                                  v-if="switchAlergias === 'Si tiene'"
                                                  @change="()=>{delete error.switchTratamientoAlergia;updateMenu16()}"
                                                  :error="error.switchTratamientoAlergia ? true : false"
                                                  >
                                                </v-select>
                                                <p v-if="error.switchTratamientoAlergia" style="color:red" class="mb-0">{{ error.switchTratamientoAlergia }}</p>
                                                <v-text-field 
                                                  label="Medicamento" 
                                                  v-model="medicamentoAlergias" 
                                                  v-if="switchAlergias === 'Si tiene' && switchTratamientoAlergia === 'Si tiene'"
                                                  @input="()=>{delete error.medicamentoAlergias}"
                                                  :error="error.medicamentoAlergias ? true : false">
                                                </v-text-field>
                                                <p v-if="error.medicamentoAlergias" style="color:red" class="mb-0">{{ error.medicamentoAlergias }}</p>
                                                <v-text-field 
                                                label="Periocidad" 
                                                v-model="periocidadAlergias" 
                                                v-if="switchAlergias === 'Si tiene' && switchTratamientoAlergia === 'Si tiene'"
                                                @input="()=>{delete error.periocidadAlergias}"
                                                :error="error.periocidadAlergias ? true : false">
                                              </v-text-field>
                                              <p v-if="error.periocidadAlergias" style="color:red" class="mb-0">{{ error.periocidadAlergias }}</p>
                                            </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                          <!-- LENTES -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                label="Lentes" 
                                                v-model="switchLentes" 
                                                :items="Lentes" 
                                                @change="()=>{delete error.switchLentes;updateMenu16()}"
                                                :error="error.switchLentes ? true : false">
                                              </v-select>
                                              <p v-if="error.switchLentes" style="color:red" class="mb-0">{{ error.switchLentes }}</p>
                                              <v-flex>
                                                <v-select
                                                  name="Tipo de lentes"
                                                  :items="TipoLentes"
                                                  v-model="radioLentes"
                                                  label="Tipo de lentes:"
                                                  data-vv-scope="crear"
                                                  @change="()=>{delete error.radioLentes}"
                                                  :error="error.radioLentes ? true : false"
                                                  v-if="switchLentes==='Si tiene'">
                                                </v-select>
                                                <p v-if="error.radioLentes" style="color:red" class="mb-0">{{ error.radioLentes }}</p>
                                                <v-text-field 
                                                  label="Graduación" 
                                                  v-model="lentesGraduacion" 
                                                  v-if="switchLentes === 'Si tiene'"
                                                  @input="()=>{delete error.lentesGraduacion}"
                                                  :error="error.lentesGraduacion ? true : false">
                                                </v-text-field>
                                                <p v-if="error.lentesGraduacion" style="color:red" class="mb-0">{{ error.lentesGraduacion }}</p>
                                              </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                          <!-- APARATOS AUDITIVOS -->
                                          <v-flex xs2>
                                            <v-card-text>
                                              <v-select 
                                                label="Aparatos Auditivos" 
                                                v-model="switchAparatosAuditivos" 
                                                :items="AAuditivos"
                                                @change="()=>{delete error.switchAparatosAuditivos;updateMenu16()}"
                                                :error="error.switchAparatosAuditivos ? true : false">
                                              </v-select>
                                              <p v-if="error.switchAparatosAuditivos" style="color:red" class="mb-0">{{ error.switchAparatosAuditivos }}</p>
                                              <!-- <v-switch color="success" label="Aparatos Auditivos" v-model="switchAparatosAuditivos" key="m6"></v-switch> -->
                                              <v-flex>
                                                <v-select 
                                                  v-if="switchAparatosAuditivos === 'Si tiene'" 
                                                  label="Oido:" 
                                                  v-model="oidos" 
                                                  :items="Oido"
                                                  @change="()=>{delete error.oidos}"
                                                  :error="error.oidos ? true : false">
                                                </v-select>
                                                <p v-if="error.oidos" style="color:red" class="mb-0">{{ error.oidos }}</p>
                                              </v-flex>
                                            </v-card-text>
                                          </v-flex>
                                      </v-layout>

                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="closeM16()" color="primary">Cerrar</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-flex>
                            </v-menu>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card>
              </v-card>
      </v-dialog>

      <v-dialog v-model="modalPersonaSelect" max-width="700px" @input="onDialogClose">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar  size="30">
                            <v-icon class="grey lighten-2">person</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Selecciona la persona a registrar</v-toolbar-title>
                        <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
              <v-form ref="form" >
                  <v-container grid-list-md text-xs-center>
                      <v-layout wrap>
                        <v-flex  xs12 md12 lg12>
                          <v-autocomplete name="DesaparecidoSiNo"
                              :items="NormalDesaparecido"
                              v-model="desaparecioSiNo"
                              label="* ¿Qué tipo de Media Filiación deseas crear? :"
                              @change="listarPersonas()"
                              :error-messages="errors.collect('DesaparecidoSiNo')">
                          </v-autocomplete>
                          <v-select
                              v-if="desaparecioSiNo>0"
                              name="Persona"
                              :items="personas"
                              v-model="personaSelect"
                              return-object
                              label="Persona:"
                              >
                          </v-select>
                        </v-flex>
                      </v-layout>
                  </v-container>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn  @click.native="cerrarModalPersonaSelect" >Cerrar</v-btn>
                      <v-btn v-if="desaparecioSiNo>0 && personaSelect.value" color="success"  @click.native="abrirMediaAfiliacion" >Crear</v-btn>
                  </v-card-actions>
              </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modaldocumento"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="editedIndex == -1"
                color="success"
                text
                @click.native="guardar()"
              >
                Guardar e imprimir
              </v-btn>
              <v-btn
                v-if="editedIndex == 1"
                color="success"
                text
                @click.native="actualizar()"
              >
                Actualizar e imprimir
              </v-btn>
              <v-btn icon @click="modaldocumento = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe
              id="iframepdf"
              type="application/pdf"
              width="100%"
              height="835"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogarchivo" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">Subir archivo</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogodocs">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-card>
                      <v-container fluid grid-list-md>
                        <v-layout row wrap>
                          <v-flex class="text-md-center">
                            <img
                              :src="imageUrl"
                              height="250px"
                              v-if="imageUrl"
                            />
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-text-field
                      name="imagen"
                      label="Selecciona la imagen del documento de identificacion"
                      @click="pickFile"
                      v-model="imageName"
                      prepend-icon="attach_file"
                      data-vv-scope="dialogodocs"
                      :error-messages="errors.collect('dialogodocs.imagen')"
                    ></v-text-field>

                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />

                    <v-autocomplete
                      name="tipo de archivo"
                      :items="tiposdocumentos"
                      v-model="tiposdocumento"
                      return-object
                      data-vv-scope="dialogodocs"
                      label="Tipo de archivo:"
                      :error-messages="
                        errors.collect('dialogodocs.tipo de archivo')
                      "
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="descripcíon de documento"
                      label="Descripcíon del documento"
                      v-model="descripciondocumento"
                      data-vv-scope="dialogodocs"
                      :error-messages="
                        errors.collect('dialogodocs.descripcíon de documento')
                      "
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click.native="dialogarchivo = false">Cancelar</v-btn>
                <v-btn @click="guardarArchivo()" class="success">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogpictures" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">assignment</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading"
              >Lista de archivos</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogodetalle">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-data-table
                      :headers="headersar"
                      :items="archivos"
                      :search="searchar"
                      :rows-per-page-items="rowsPerPageItems"
                      :pagination.sync="pagination"
                    >
                      <template slot="items" class="white" slot-scope="props">
                        <td class="text-center">{{ props.item.tipoDocumento }}</td>
                        <td class="text-center">{{ props.item.descripcionDocumento }}</td>
                        <td class="justify-center layout px-0">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                class="mr-2"
                                v-on="on"
                                @click="verimagen(props.item)"
                              >
                                visibility
                              </v-icon>
                            </template>
                            <span>Ver Imagen</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="dialogpictures = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogimagen" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">assignment</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card auto-grow elevation="0">
                      <v-card-text>
                        <v-list three-line>
                          <p class="text-lg-center font-weight-bold">
                            <a>Información detallada del Documento.</a>
                          </p>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">subject</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-4 font-weight-bold">
                                  <a>Descripción:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ descrip }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">assignment</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Tipo de documento:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ tipo }}</a>
                                </p>
                              </v-list-tile-sub-title>
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
                <v-btn @click.native="dialogimagen = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
import { WebCam } from "vue-web-cam";
import n401 from './401.vue';
import n403 from './403.vue';
import { error } from "util";
import alertify from "alertifyjs";
import moment from "moment";
import "moment/locale/es";

//Imports para la generacion de QR
import QRCode from "qrcode";
import { addAbortSignal } from "stream";
import { generarQRCodeBase64 } from './crearQR';

var assert, curp, persona;
assert = require("assert");
curp = require("curp.js");

export default {
  components: {
    "vue-web-cam": WebCam,
    n401,
    n403,
  },
  data: () => ({

    error: {nah: 'nah'},

    showpage: true,
    e401: false,
    e403: false,
    alert: false,
    modalAdd: 0,
    modalAddLarge:0,
    modalPersonaSelect:0,
    radioLunares:'',
    radioManchas:'',
    radioCicatrices:'',
    radioTatuajes:'',
    radioPiercing:'',
    radioUñas:'',
    radioDeformidades:'',
    radioCongenitas:'',
    radioAdquiridas:'',
    formValid: false,
    radioCaracteristicaDental:'',
    radioLesiones:'',
    switchTraumatismos:'',
    switchFacultadesMentales:'',
    switchEnfermedadesCronicas:'',
    switchAlergias:'',
    switchLentes:'',
    switchAparatosAuditivos:'',
    switchTratamiento:'',
    comboTipoLesiones:[],
    periocidadCronicas:'',
    medicamentoCronicas:'',
    switchTratamientoAlergia:'',
    radioLentes:'',
    lentesGraduacion:'',
    oidos:'',
    personaSelect:[],
    otraCicatriz:'',
    ManchaOtra:'',
    Nicotina:'',
    CyULunares:'',
    CyUTraumatica:'',
    numerodeCesarea: 0,
    operacionMyU:'',
    NumeroTatuajes:0,
    DescripcionTatuajes:'',
    NumeroPiercing:0,
    DescripcionPiercing:'',
    NoSaludables:[],
    unasPostizas:'',
    ubicacionCongenitas:'',
    ubicacionAdquiridas:'',
    UbiFractura:'',
    UbiLesiones:'',
    mordedura:'',
    OtraLesion:'',
    TRetraso:'',
    medicamentoAlergias:'',
    periocidadAlergias:'',
    aretesOrejas:'',
    cicatricesQuirurgicas:["Operación","Cesárea"],
    itemsProtesis: ['Si tiene', 'No tiene', 'Se desconoce'],
    itemsSiProtesis:['Inferior','Superior'],
    traumatismos:["Si tiene", "No tiene", "Se desconoce"],
    FacMen:["Si", "No", "Se desconoce"],
    ECronicas:["Si tiene", "No tiene", "Se desconoce"],
    Alergias:["Si tiene", "No tiene", "Se desconoce"],
    Lentes:["Si tiene", "No tiene", "Se desconoce"],
    AAuditivos:["Si tiene", "No tiene", "Se desconoce"],
    Aretes:["Si tiene", "No tiene", "Se desconoce"],
    pupilente:["Si tiene", "No tiene", "Se desconoce"],
    manchas:["Si tiene", "No tiene", "Se desconoce"],
    lunares:["Si tiene", "No tiene", "Se desconoce"],
    cicatrices:["Si tiene", "No tiene", "Se desconoce"],
    traumaticas:["Si tiene", "No tiene", "Se desconoce"],
    quirurgicas:["Si tiene", "No tiene", "Se desconoce"],
    tatuajes:["Si tiene", "No tiene", "Se desconoce"],
    piercings:["Si tiene", "No tiene", "Se desconoce"],
    unaPostiza:["Si tiene", "No tiene", "Se desconoce"],
    deformidades:["Si tiene", "No tiene", "Se desconoce"],
    cDentales:["Si tiene", "No tiene", "Se desconoce"],
    Tratamientos:["Si tiene", "No tiene", "Se desconoce"],
    TAlergias:["Si tiene", "No tiene", "Se desconoce"],
    unas:["Saludable", "No Saludable", "Se Desconoce"],
    Oido:["Derecho", "Izquierdo", "Ambos"],
    tipoManchas:["Nicotina", "Otra"],
    TipoLentes:["Contacto", "Armazon"],
    tipoDeformidades:["Congénitas","Adquiridas"],
    Ttraumatismos:["Fracturas", "Lesiones"],
    TCicatrices:["Traumaticas", "Quirúrgicas"],
    TCicatriz:[],
    Ttraumatismo:[],
    tipoDeformidad:[],
    tipoMancha:[],
    dentadura:[
      //Dientes inferiores
        { id: 0, path: 'm 13.729706,172.30627 c -1.674354,0.97417 -3.318269,2.5572 -4.3837711,4.62733 -1.0655025,2.07014 -1.5525766,4.62728 -1.8874498,6.91052 -0.3348732,2.28323 -0.5175261,4.29241 -0.334863,6.02766 0.1826632,1.73526 0.7306202,3.19648 1.9483517,4.32287 1.2177312,1.1264 3.1051462,1.9179 5.6319312,2.25277 2.526785,0.33486 5.692774,0.21309 8.98063,-0.21311 3.287857,-0.42621 6.697383,-1.15682 8.950162,-1.88746 2.252778,-0.73063 3.348695,-1.46124 3.83578,-2.61809 0.487084,-1.15684 0.365316,-2.73983 0.395761,-4.32287 0.03045,-1.58305 0.213098,-3.16604 0.395756,-4.44465 0.182658,-1.2786 0.365312,-2.25275 -1.2e-5,-3.59225 -0.365324,-1.33951 -1.278588,-3.04427 -2.465871,-4.32288 -1.187283,-1.2786 -2.648508,-2.13098 -4.475098,-2.80073 -1.826591,-0.66975 -4.018429,-1.15682 -5.99723,-1.40037 -1.9788,-0.24354 -3.744447,-0.24354 -5.479704,-0.0609 -1.735256,0.18266 -3.440019,0.54797 -5.114373,1.52214 z', info: '',selected: false, name:'Tercer Molar Inferior Izquierdo' ,condition:''},
        { id: 1, path: 'm 24.567342,197.96955 c -3.013837,0.39576 -5.753689,1.12639 -7.641152,1.91791 -1.887464,0.79152 -2.922498,1.6439 -3.592245,2.49631 -0.669746,0.85241 -0.974167,1.70479 -0.913278,2.92252 0.06089,1.21772 0.487083,2.80072 0.669738,4.14022 0.182656,1.33949 0.121771,2.43541 0.152215,3.59225 0.03044,1.15683 0.152214,2.37452 0.334873,3.65313 0.182659,1.27861 0.426197,2.61807 0.974176,3.7749 0.547979,1.15684 1.40036,2.13099 2.496315,2.61807 1.095954,0.48709 2.435411,0.48709 3.988011,0.39576 1.552601,-0.0913 3.318248,-0.27398 6.575676,-1.00462 3.257427,-0.73064 8.006409,-2.00921 10.715826,-3.25738 2.709418,-1.24817 3.379142,-2.46585 3.7749,-3.50092 0.395759,-1.03506 0.517529,-1.88745 0.395753,-2.7703 -0.121777,-0.88285 -0.48708,-1.79611 -0.852397,-2.83118 -0.365317,-1.03506 -0.730625,-2.19187 -0.882838,-3.40959 -0.152213,-1.21773 -0.09133,-2.4963 -0.365319,-3.56181 -0.273991,-1.0655 -0.882834,-1.91788 -1.978792,-2.83117 -1.095957,-0.9133 -2.678951,-1.88745 -5.114409,-2.34409 -2.435458,-0.45665 -5.723215,-0.39576 -8.737053,-1e-5 z', info: '', selected: false, name:'Segundo Molar Inferior Izquierdo',condition:''},
        { id: 2, path: 'm 29.042436,222.47601 c -3.471608,0.59866 -6.633601,2.79831 -8.402215,5.84502 -0.945624,1.62898 -1.504102,3.48881 -1.555066,5.37168 -0.05096,1.88287 0.412178,3.78465 1.372409,5.40507 1.485731,2.50721 4.111126,4.23493 6.940961,4.93174 4.013026,0.98816 8.358719,-0.0164 11.872692,-2.19188 2.27659,-1.40944 4.284053,-3.33673 5.478987,-5.73288 1.194934,-2.39615 1.513487,-5.28602 0.548687,-7.78373 -0.625603,-1.61958 -1.76164,-3.02023 -3.148337,-4.06498 -1.386696,-1.04475 -3.017012,-1.74278 -4.705906,-2.14535 -2.762286,-0.65843 -5.707496,-0.53038 -8.402212,0.36531 z', info: '', selected: false, name:'Primer Molar Inferior Izquierdo' ,condition:''},
        { id: 3, path: 'm 35.800739,243.6642 c -2.238024,0.19515 -4.346661,1.53062 -5.479706,3.47048 -0.688829,1.17933 -1.024085,2.55455 -1.006773,3.9202 0.01731,1.36565 0.381892,2.71963 1.006773,3.93405 1.241023,2.41186 3.450779,4.20502 5.845018,5.4797 1.288664,0.68608 2.658736,1.2462 4.09793,1.4913 1.439194,0.24511 2.955189,0.16258 4.304285,-0.39536 1.55759,-0.64417 2.815649,-1.89076 3.693959,-3.32937 0.878311,-1.43862 1.403114,-3.066 1.785744,-4.70753 0.316835,-1.35926 0.542353,-2.75413 0.45516,-4.14711 -0.08719,-1.39297 -0.505639,-2.79273 -1.368444,-3.88979 -0.738801,-0.93939 -1.774157,-1.61967 -2.889364,-2.04931 -1.115208,-0.42964 -2.31064,-0.61935 -3.503625,-0.69054 -2.343589,-0.13986 -4.713314,0.17195 -6.940957,0.91328 z', info: '', selected: false, name:'Segundo Premolar Inferior Izquierdo' ,condition:''},
        { id: 4, path: 'm 48.221402,260.28598 c -1.037047,0.64606 -2.024053,1.45782 -2.557195,2.55719 -0.383063,0.7899 -0.507888,1.68022 -0.547971,2.55719 -0.115009,2.51622 0.471691,5.12848 2.009225,7.12362 1.000134,1.2978 2.381361,2.29796 3.925973,2.84451 1.544613,0.54655 3.247076,0.63773 4.841554,0.26066 1.999272,-0.4728 3.810855,-1.68592 5.027037,-3.34168 1.216183,-1.65576 1.831271,-3.7392 1.731265,-5.79118 -0.0743,-1.52442 -0.537935,-3.03232 -1.360591,-4.31786 -0.822656,-1.28553 -2.005363,-2.34316 -3.388487,-2.9884 -1.534248,-0.71574 -3.28585,-0.91383 -4.962829,-0.68157 -1.676979,0.23227 -3.281025,0.88233 -4.717981,1.77752z', info: '', selected: false, name:'Primer Premolar Inferior Izquierdo' ,condition:''},
        { id: 5, path: 'm 73.469304,265.29028 c -1.097839,0.0861 -2.992155,0.818 -5.252447,2.34639 -2.260291,1.52839 -4.88644,3.85318 -6.608554,5.5753 -1.722115,1.72212 -2.540099,2.84147 -2.776883,3.87475 -0.236784,1.03328 0.107625,1.9804 1.85129,3.29352 1.743666,1.31313 4.886445,2.99215 7.060611,3.72404 2.174167,0.73189 3.379619,0.51663 4.21915,-0.0646 0.839531,-0.58122 1.313097,-1.52835 1.786682,-4.54209 0.473585,-3.01374 0.947154,-8.09384 1.033255,-10.91379 0.0861,-2.81996 -0.215264,-3.37964 -1.313104,-3.29353 z', info: '', selected: false, name:'Colmillo Inferior Izquierdo' ,condition:''},
        { id: 6, path: 'm 85.911517,270.88712 c -0.667316,-0.30137 -1.442265,-0.30137 -3.358135,1.87283 -1.91587,2.1742 -4.972549,6.52244 -6.694656,9.25629 -1.722106,2.73384 -2.109575,3.85319 -2.066521,4.73578 0.04306,0.88258 0.516627,1.52837 1.420743,2.21722 0.904117,0.68885 2.238726,1.42073 3.745584,1.91583 1.506859,0.49511 3.185878,0.75342 4.735786,0.71036 1.549909,-0.043 2.970622,-0.38746 3.810149,-1.35616 0.839528,-0.9687 1.097839,-2.56163 0.990203,-4.34833 -0.107636,-1.7867 -0.581207,-3.76708 -0.774943,-6.04889 -0.193735,-2.28181 -0.107631,-4.86493 -0.344427,-6.45788 -0.236796,-1.59296 -0.796467,-2.19568 -1.463783,-2.49705 z', info: '', selected: false, name:'Incisivo Lateral Inferior Izquierdo' ,condition:''},
        { id: 7, path: 'm 98.633563,276.16107 c -0.774949,0.0215 -1.592947,0.32289 -2.389426,0.96869 -0.796478,0.6458 -1.571413,1.636 -2.303316,2.79843 -0.731902,1.16244 -1.420735,2.49705 -1.91584,3.85321 -0.495106,1.35617 -0.796466,2.73382 -0.968677,4.04693 -0.172211,1.31312 -0.215262,2.56164 0.215276,3.57338 0.430537,1.01174 1.334628,1.78667 2.733854,2.19567 1.399225,0.409 3.293501,0.45205 4.843409,0.32289 1.549907,-0.12915 2.755357,-0.43051 3.573367,-0.92563 0.818,-0.49512 1.24851,-1.18394 1.35614,-2.2818 0.10763,-1.09786 -0.10763,-2.60467 -0.34442,-4.499 -0.23679,-1.89434 -0.4951,-4.17608 -0.92564,-5.83362 -0.43053,-1.65753 -1.03326,-2.69078 -1.70058,-3.33657 -0.66732,-0.64579 -1.399198,-0.90411 -2.174147,-0.88258 z', info: '', selected: false, name:'Incisivo Central Inferior Izquierdo' ,condition:''},
        { id: 8, path: 'm 109.43978,275.83818 c -0.77495,0.21526 -1.50683,0.77494 -2.00195,1.76516 -0.49511,0.99023 -0.75342,2.41094 -1.09785,3.98238 -0.34443,1.57144 -0.77494,3.29351 -1.05479,4.84342 -0.27984,1.54992 -0.40899,2.92755 -0.30136,4.06846 0.10764,1.14091 0.45205,2.04499 1.44228,2.64773 0.99023,0.60275 2.62619,0.90411 4.24068,0.96869 1.61449,0.0646 3.20741,-0.10763 4.47747,-0.66733 1.27006,-0.55969 2.21719,-1.50683 2.6262,-2.60468 0.409,-1.09786 0.27984,-2.34635 -0.0215,-3.96085 -0.30138,-1.6145 -0.77494,-3.59488 -1.7867,-5.48922 -1.01176,-1.89433 -2.56161,-3.7025 -3.74556,-4.67119 -1.18396,-0.96868 -2.00195,-1.09783 -2.77689,-0.88257 z', info: '', selected: false, name:'Incisivo Central Inferior Derecho' ,condition:''},
        { id: 9, path: 'm 122.57083,270.8656 c -0.51664,0.45206 -1.03326,1.3131 -1.24853,2.3679 -0.21526,1.0548 -0.12916,2.30332 -0.17221,3.68102 -0.0431,1.37769 -0.21526,2.88449 -0.43052,4.08998 -0.21527,1.20548 -0.47358,2.10956 -0.55969,3.3581 -0.0861,1.24854 0,2.84147 0.2368,4.06848 0.23679,1.227 0.62425,2.08803 1.42074,2.69078 0.79649,0.60274 2.00193,0.94716 3.48726,0.92563 1.48534,-0.0215 3.25047,-0.40899 4.75732,-1.05479 1.50686,-0.6458 2.75535,-1.54989 3.63794,-2.38942 0.88258,-0.83954 1.3992,-1.61448 1.42072,-2.49706 0.0215,-0.88259 -0.45205,-1.87279 -0.86105,-2.62621 -0.409,-0.75343 -0.75341,-1.27003 -1.91586,-2.99218 -1.16245,-1.72215 -3.14282,-4.64965 -4.36982,-6.41482 -1.22701,-1.76517 -1.70058,-2.36789 -2.21722,-2.79841 -0.51664,-0.43053 -1.0763,-0.68884 -1.61446,-0.79648 -0.53817,-0.10763 -1.05479,-0.0646 -1.57142,0.38748 z', info: '', selected: false, name:'Incisivo Lateral Inferior Derecho' ,condition:''},
        { id: 10, path: 'm 134.4103,267.14155 c -0.21526,2.71231 -0.0861,8.05083 0.25832,11.3659 0.34443,3.31507 0.90409,4.60661 1.72211,5.38157 0.81801,0.77495 1.89431,1.03326 3.1859,0.83951 1.29159,-0.19374 2.79841,-0.83951 4.28374,-1.59294 1.48532,-0.75343 2.94909,-1.61447 4.04693,-2.454 1.09785,-0.83954 1.82973,-1.65752 2.06652,-2.56164 0.23679,-0.90412 -0.0215,-1.89429 -0.51663,-2.73383 -0.49512,-0.83953 -1.227,-1.52836 -3.07829,-3.0998 -1.8513,-1.57145 -4.82188,-4.0254 -6.78077,-5.51072 -1.9589,-1.48532 -2.90605,-2.00195 -3.65947,-2.21721 -0.75342,-0.21526 -1.3131,-0.12916 -1.52836,2.58316 z', info: '', selected: false, name:'Colmillo Inferior Derecho' ,condition:''},
        { id: 11, path: 'm 153.3104,258.10049 c -1.54989,0.34442 -3.3581,1.37769 -4.64969,2.69081 -1.29158,1.31312 -2.06652,2.90604 -2.30331,4.56358 -0.23679,1.65754 0.0646,3.3796 0.75344,4.80036 0.68885,1.42076 1.76514,2.54008 2.79841,3.40115 1.03328,0.86106 2.02348,1.46379 3.25049,1.87279 1.22701,0.409 2.69077,0.62426 4.02541,0.21526 1.33464,-0.40901 2.5401,-1.44225 3.46574,-2.3679 0.92564,-0.92564 1.57142,-1.74363 2.08805,-2.62622 0.51664,-0.88259 0.90409,-1.82971 0.96867,-3.12131 0.0646,-1.29161 -0.19373,-2.92756 -0.94717,-4.24068 -0.75343,-1.31312 -2.00193,-2.30331 -2.97062,-3.05673 -0.96869,-0.75343 -1.65752,-1.27005 -2.64775,-1.70058 -0.99022,-0.43053 -2.28177,-0.77495 -3.83167,-0.43053 z', info: '', selected: false, name:'Primer Premolar Inferior Derecho' ,condition:''},
        { id: 12, path: 'm 159.48845,246.08881 c -0.62426,0.99021 -1.01174,2.15263 -1.11936,3.57338 -0.10763,1.42076 0.0646,3.09978 0.23679,4.52053 0.17221,1.42075 0.34442,2.58314 0.88259,3.63794 0.53816,1.0548 1.44225,2.00194 2.45399,2.64773 1.01175,0.6458 2.1311,0.99021 3.5088,1.227 1.3777,0.23679 3.01367,0.36594 4.54205,0.0861 1.52838,-0.27985 2.94909,-0.96868 4.15458,-1.89432 1.20548,-0.92565 2.19567,-2.08804 3.01367,-3.37964 0.81801,-1.29159 1.46379,-2.7123 1.89432,-4.00389 0.43053,-1.29159 0.64579,-2.45399 0.45204,-3.48726 -0.19374,-1.03327 -0.79647,-1.93736 -1.52837,-2.73384 -0.7319,-0.79648 -1.59294,-1.48531 -2.49705,-2.045 -0.90412,-0.55968 -1.85126,-0.9902 -2.7769,-1.27005 -0.92564,-0.27984 -1.82973,-0.40899 -2.79842,-0.47357 -0.96869,-0.0646 -2.00194,-0.0646 -3.03521,-0.10763 -1.03327,-0.0431 -2.06652,-0.12916 -2.90605,0.043 -0.83953,0.17222 -1.48531,0.60274 -2.23874,1.22701 -0.75343,0.62427 -1.61446,1.44225 -2.23873,2.43246 z', info: '', selected: false, name:'Segundo Premolar Inferior Derecho' ,condition:''},
        { id: 13, path: 'm 167.64692,223.91671 c -1.37768,1.03326 -2.36789,2.66926 -2.9491,3.96085 -0.58121,1.29159 -0.75342,2.23873 -0.73189,3.72407 0.0215,1.48533 0.23679,3.50876 0.86106,5.05867 0.62427,1.5499 1.65752,2.6262 2.81995,3.50878 1.16243,0.88259 2.45399,1.57142 3.70253,2.10958 1.24853,0.53816 2.45398,0.92563 3.7671,1.33463 1.31312,0.409 2.73383,0.83952 4.4129,0.77494 1.67907,-0.0646 3.6164,-0.62426 4.99409,-1.44227 1.3777,-0.81801 2.19568,-1.8943 2.90605,-3.09979 0.71038,-1.20549 1.3131,-2.54009 1.61447,-4.09 0.30137,-1.54992 0.30137,-3.31504 -0.2368,-4.908 -0.53817,-1.59296 -1.61446,-3.01367 -2.77689,-4.1761 -1.16244,-1.16243 -2.41094,-2.06652 -3.89627,-2.75537 -1.48534,-0.68884 -3.2074,-1.16241 -4.84342,-1.44225 -1.63602,-0.27985 -3.18588,-0.36595 -4.84343,-0.19374 -1.65754,0.17222 -3.42266,0.60273 -4.80035,1.636 z', info: '', selected: false, name:'Primer Molar Inferior Derecho' ,condition:''},
        { id: 14, path: 'm 169.69193,201.93835 c -0.49511,1.18394 -0.62426,2.56162 -0.96869,4.0039 -0.34443,1.44228 -0.9041,2.94909 -1.27005,4.39137 -0.36595,1.44228 -0.53816,2.81993 -0.64579,3.91778 -0.10763,1.09785 -0.15069,1.91584 0.38748,2.75537 0.53817,0.83954 1.65752,1.70057 3.29354,2.47552 1.63602,0.77496 3.78861,1.46379 6.41485,2.13111 2.62624,0.66732 5.72597,1.3131 8.2661,1.61447 2.54012,0.30137 4.5205,0.25831 6.00583,-0.10764 1.48532,-0.36596 2.47551,-1.05478 3.18589,-2.04501 0.71037,-0.99022 1.14089,-2.28177 1.24851,-3.70253 0.10763,-1.42075 -0.10763,-2.97061 -0.12915,-4.30525 -0.0215,-1.33465 0.15069,-2.45399 0.47359,-3.681 0.3229,-1.22702 0.79646,-2.56162 0.73188,-3.83168 -0.0646,-1.27007 -0.66731,-2.47552 -2.19571,-3.70253 -1.52839,-1.22701 -3.98234,-2.47551 -6.17804,-3.25047 -2.1957,-0.77495 -4.13303,-1.07631 -5.96279,-1.20547 -1.82975,-0.12916 -3.55182,-0.0861 -5.27394,0.17222 -1.72213,0.25832 -3.4442,0.73189 -4.73579,1.4638 -1.29158,0.7319 -2.15262,1.72209 -2.64772,2.90604 z', info: '', selected: false, name:'Segundo Molar Inferior Derecho' ,condition:''},
        { id: 15, path: 'm 183.5764,170.72519 c -2.84147,0.15068 -4.60663,0.79647 -6.00585,1.61448 -1.39922,0.81801 -2.43247,1.8082 -3.40116,2.94911 -0.96869,1.14091 -1.87278,2.43246 -2.32483,3.48726 -0.45205,1.0548 -0.45205,1.87278 -0.38747,2.75537 0.0646,0.88259 0.19373,1.82972 0.27984,2.69078 0.0861,0.86107 0.12916,1.636 0.17221,2.75538 0.043,1.11938 0.0861,2.58314 0.23679,3.63794 0.15069,1.0548 0.409,1.70057 1.29159,2.36789 0.88259,0.66733 2.38941,1.35616 4.09,1.91585 1.7006,0.55968 3.59488,0.9902 6.41486,1.33463 2.81999,0.34442 6.56549,0.60273 9.08408,0.53814 2.51859,-0.0646 3.81015,-0.45205 5.10174,-1.18395 1.29159,-0.7319 2.58315,-1.8082 3.25046,-2.92758 0.66731,-1.11938 0.71037,-2.28178 0.71037,-4.04696 0,-1.76518 -0.0431,-4.13303 -0.27985,-5.6614 -0.23679,-1.52838 -0.6673,-2.2172 -0.81799,-2.90605 -0.15068,-0.68885 -0.0215,-1.37768 -0.45206,-2.32485 -0.43054,-0.94717 -1.42073,-2.15262 -2.56164,-3.272 -1.14091,-1.11938 -2.43246,-2.15262 -5.03719,-2.84146 -2.60472,-0.68885 -6.52243,-1.03327 -9.3639,-0.88258 z', info: '', selected: false, name:'Tercer Molar Inferior Derecho' ,condition:''},
        //Dientes superiores
        { id: 16, path: 'm 188.87187,120.20294 c -2.28179,0.12915 -5.03716,0.21526 -7.06064,0.58121 -2.02349,0.36595 -3.31504,1.01173 -4.54205,1.74363 -1.22701,0.7319 -2.38941,1.54989 -3.09978,2.56164 -0.71037,1.01175 -0.96868,2.2172 -1.01173,3.29352 -0.0431,1.07633 0.12915,2.02347 0.58121,3.27201 0.45206,1.24854 1.18394,2.7984 1.87279,4.43442 0.68885,1.63602 1.33462,3.35809 2.06653,4.60662 0.7319,1.24853 1.54988,2.02347 2.62621,2.49705 1.07633,0.47357 2.41094,0.64578 5.01566,0.86105 2.60472,0.21526 6.47938,0.47357 9.12713,0.21525 2.64775,-0.25832 4.06846,-1.03325 5.10173,-2.10958 1.03327,-1.07633 1.67905,-2.45399 2.06653,-4.13306 0.38747,-1.67907 0.51662,-3.65945 0.55967,-5.33852 0.0431,-1.67906 0,-3.05672 -0.45206,-4.56358 -0.45206,-1.50686 -1.31309,-3.14282 -2.10957,-4.34831 -0.79649,-1.20548 -1.52837,-1.98041 -2.32485,-2.58315 -0.79648,-0.60274 -1.65752,-1.03326 -2.99217,-1.16242 -1.33465,-0.12915 -3.14282,0.0431 -5.42461,0.17222 z', info: '', selected: false, name:'Tercer Molar Superior Derecho' ,condition:''},
        { id: 17, path: 'm 195.22214,119.75088 c 0.92563,-0.45205 2.43247,-1.27005 3.46574,-2.34638 1.03326,-1.07633 1.59294,-2.41094 2.02347,-3.63795 0.43053,-1.22701 0.73189,-2.34635 0.77494,-3.70253 0.043,-1.35617 -0.17221,-2.94909 -0.68885,-4.21915 -0.51664,-1.27006 -1.33462,-2.2172 -2.32484,-3.12132 -0.99023,-0.90411 -2.15262,-1.76514 -3.29353,-2.23872 -1.14091,-0.47358 -2.26025,-0.559683 -3.89627,-0.645789 -1.63602,-0.08611 -3.78861,-0.172211 -5.98432,4e-6 -2.19571,0.172215 -4.4344,0.602735 -6.19957,1.183945 -1.76517,0.58122 -3.05672,1.3131 -4.11152,2.00195 -1.0548,0.68885 -1.87278,1.33463 -2.26025,2.02348 -0.38748,0.68884 -0.34442,1.42072 -0.409,2.2172 -0.0646,0.79649 -0.23679,1.65752 -0.21526,2.66927 0.0215,1.01175 0.23679,2.17415 0.64579,3.16437 0.40901,0.99021 1.01173,1.8082 1.59295,2.51857 0.58121,0.71038 1.14088,1.3131 1.7221,1.87279 0.58122,0.55969 1.18394,1.07631 1.89432,1.48531 0.71038,0.40901 1.52836,0.71037 2.34637,0.99022 0.81801,0.27984 1.63599,0.53815 2.73385,0.64578 1.09785,0.10764 2.47551,0.0646 3.74557,0.0431 1.27007,-0.0215 2.43246,-0.0215 3.55184,-0.0646 1.11938,-0.0431 2.19567,-0.12916 2.90604,-0.21527 0.71038,-0.0861 1.05479,-0.17221 1.98043,-0.62426 z', info: '', selected: false, name:'Segundo Molar Superior Derecho' ,condition:''},
        { id: 18, path: 'm 180.84256,78.226623 c -1.65753,0.172211 -3.03521,0.430525 -4.45596,0.947166 -1.42076,0.51664 -2.88452,1.291572 -3.98237,2.023475 -1.09785,0.731902 -1.82973,1.420729 -2.32483,2.389424 -0.49511,0.968696 -0.75342,2.217195 -0.86105,3.702529 -0.10764,1.485333 -0.0646,3.207405 0.0431,4.520519 0.10763,1.313114 0.27984,2.2172 0.90411,3.099788 0.62428,0.882588 1.70057,1.743621 2.66926,2.389415 0.9687,0.645795 1.82974,1.076314 3.05675,1.485317 1.22702,0.409003 2.81993,0.796469 4.21916,0.968679 1.39922,0.172211 2.60467,0.129159 3.96084,0.04305 1.35617,-0.08611 2.86298,-0.215262 4.11152,-0.258315 1.24854,-0.04305 2.23873,0 3.1859,-0.516642 0.94716,-0.516642 1.85125,-1.592938 2.45399,-2.690791 0.60274,-1.097852 0.9041,-2.217197 1.09784,-3.207416 0.19373,-0.990219 0.27984,-1.851255 0.23678,-2.863003 -0.043,-1.011748 -0.21526,-2.174145 -0.62427,-3.508792 -0.409,-1.334646 -1.05478,-2.84146 -1.70057,-4.003888 -0.6458,-1.162429 -1.29157,-1.980412 -2.36791,-2.733842 -1.07633,-0.753429 -2.58314,-1.442256 -4.30526,-1.743623 -1.72213,-0.301367 -3.65946,-0.215263 -5.31698,-0.04305 z', info: '', selected: false, name:'Primer Molar Superior Derecho' ,condition:''},
        { id: 19, path: 'm 178.84061,77.537779 c -1.07632,0.215265 -2.71232,0.473582 -4.3268,0.538159 -1.61449,0.06458 -3.20741,-0.06458 -4.73579,-0.58122 -1.52839,-0.516642 -2.99214,-1.420726 -3.98236,-2.497056 -0.99022,-1.076331 -1.50684,-2.32483 -1.80821,-3.573367 -0.30137,-1.248537 -0.38747,-2.497041 -0.0861,-3.61642 0.30138,-1.119378 0.99021,-2.109569 1.78669,-2.949102 0.79649,-0.839534 1.70057,-1.528357 2.84148,-2.152627 1.14091,-0.62427 2.51857,-1.183944 4.13306,-1.420733 1.61449,-0.236788 3.46571,-0.150685 4.99409,0.107634 1.52838,0.258319 2.73383,0.688837 3.61642,1.463796 0.88258,0.774959 1.44226,1.894308 1.91584,3.099794 0.47358,1.205487 0.86105,2.49704 0.88257,4.025425 0.0215,1.528386 -0.32289,3.293508 -0.90411,4.498989 -0.58122,1.205481 -1.3992,1.851256 -2.06652,2.260257 -0.66732,0.409001 -1.18394,0.581207 -2.26026,0.796471 z', info: '', selected: false, name:'Segundo Premolar Superior Derecho' ,condition:''},
        { id: 20, path: 'm 173.67429,51.426362 c -0.73189,-1.485317 -1.89431,-3.336577 -3.12132,-4.45595 -1.22702,-1.119373 -2.51857,-1.506839 -4.19765,-1.614469 -1.67907,-0.107629 -3.74555,0.06458 -5.33851,0.365951 -1.59296,0.301373 -2.7123,0.731888 -3.81016,1.463794 -1.09785,0.731906 -2.17414,1.765146 -2.97062,2.776894 -0.79648,1.011748 -1.3131,2.001939 -1.59294,3.035213 -0.27984,1.033274 -0.3229,2.109568 -0.15068,2.949099 0.17221,0.839532 0.55968,1.442259 1.76517,2.324848 1.20549,0.882589 3.22893,2.044989 5.10173,2.755359 1.87281,0.71037 3.59488,0.96868 5.05868,1.054785 1.4638,0.08611 2.66925,1e-6 3.89627,-0.473586 1.22701,-0.473587 2.47551,-1.334622 3.4442,-2.088049 0.96869,-0.753427 1.65752,-1.399205 2.15263,-2.109582 0.49511,-0.710378 0.79647,-1.485307 0.79647,-2.432476 -1e-5,-0.947169 -0.30137,-2.066514 -1.03327,-3.551831 z', info: '', selected: false, name:'Primer Premolar Superior Derecho' ,condition:''},
        { id: 21, path: 'm 143.38677,45.614258 c 0.71037,0.279843 1.9589,0.71037 3.40118,0.904106 1.44228,0.193735 3.07824,0.150683 4.80037,-4e-6 1.72212,-0.150687 3.53029,-0.408997 5.25241,-0.796476 1.72213,-0.38748 3.35809,-0.904099 4.64968,-1.420736 1.29159,-0.516637 2.23873,-1.033258 3.12132,-1.765161 0.88258,-0.731903 1.70057,-1.67904 2.08804,-2.43247 0.38748,-0.753431 0.34442,-1.3131 0.10763,-2.066532 -0.2368,-0.753431 -0.66731,-1.700567 -1.22701,-2.712316 -0.55969,-1.01175 -1.24852,-2.088039 -2.10958,-3.056732 -0.86106,-0.968693 -1.8943,-1.829727 -2.71231,-2.324834 -0.818,-0.495108 -1.42073,-0.624264 -2.23874,-0.688844 -0.81801,-0.06458 -1.85125,-0.06458 -2.92758,0.193742 -1.07633,0.258321 -2.19567,0.774941 -3.12131,1.420739 -0.92564,0.645798 -1.65752,1.420728 -2.49706,2.303316 -0.83953,0.882589 -1.78667,1.87278 -2.51857,2.690787 -0.7319,0.818008 -1.24852,1.463785 -1.87279,2.346374 -0.62427,0.882589 -1.35615,2.001934 -1.85126,2.733833 -0.49511,0.7319 -0.75342,1.076314 -0.96868,1.485319 -0.21527,0.409004 -0.38748,0.882571 -0.45206,1.334631 -0.0646,0.45206 -0.0215,0.882573 0.0861,1.162418 0.10764,0.279845 0.27984,0.408998 0.99021,0.68884 z', info: '', selected: false, name:'Colmillo Superior Derecho' ,condition:''},
        { id: 22, path: 'm 138.67251,16.489156 c -1.50684,0.516631 -2.79842,1.636 -3.72406,2.626218 -0.92563,0.990218 -1.48531,1.851257 -2.02347,2.733843 -0.53816,0.882586 -1.05479,1.786676 -1.61448,2.841477 -0.55969,1.054801 -1.16241,2.26025 -1.70057,3.207413 -0.53816,0.947164 -1.01173,1.635993 -1.46379,2.303317 -0.45206,0.667325 -0.88258,1.313102 -1.09784,1.851263 -0.21526,0.538161 -0.21526,0.968678 0.0215,1.334629 0.2368,0.365951 0.71037,0.667313 1.1409,0.861051 0.43053,0.193738 0.81799,0.279841 1.29157,0.322893 0.47359,0.04305 1.03326,0.04305 1.80822,0.02153 0.77496,-0.02153 1.76515,-0.06458 3.01369,-0.129159 1.24854,-0.06458 2.75535,-0.150684 4.26221,-0.30137 1.50686,-0.150687 3.01367,-0.365945 4.30526,-0.51663 1.29159,-0.150685 2.36788,-0.236788 3.33657,-0.387475 0.9687,-0.150687 1.82973,-0.365946 2.49705,-0.688845 0.66732,-0.322899 1.14089,-0.753416 1.74363,-1.205474 0.60275,-0.452058 1.33463,-0.925628 1.80821,-1.270051 0.47358,-0.344422 0.68884,-0.559682 0.88258,-0.796474 0.19374,-0.236791 0.36595,-0.495101 0.49511,-0.947159 0.12915,-0.452058 0.21526,-1.097836 0.19373,-1.743632 -0.0215,-0.645796 -0.15068,-1.291572 -0.30137,-1.872789 -0.15068,-0.581217 -0.32289,-1.097836 -0.71037,-1.743633 -0.38748,-0.645798 -0.99021,-1.420732 -1.59295,-2.023472 -0.60274,-0.60274 -1.20547,-1.03326 -1.80821,-1.549896 -0.60274,-0.516637 -1.20547,-1.119364 -2.02348,-1.614473 -0.81801,-0.495108 -1.85125,-0.882573 -2.51857,-1.14089 -0.66732,-0.258317 -0.96868,-0.387471 -1.98044,-0.495104 -1.01175,-0.107632 -2.73382,-0.193736 -4.24066,0.322896 z', info: '', selected: false, name:'Incisivo Lateral Superior Derecho' ,condition:''},
        { id: 23, path: 'm 111.76462,31.772838 c 0.43053,0 0.9041,0 1.39921,0.04305 0.49511,0.04305 1.01174,0.129158 1.48532,0.193737 0.47358,0.06458 0.9041,0.107632 1.50685,-2e-6 0.60274,-0.107634 1.37767,-0.365945 2.04499,-0.64579 0.66732,-0.279844 1.227,-0.58121 1.85127,-0.882581 0.62427,-0.301371 1.3131,-0.602734 2.54011,-1.377692 1.22702,-0.774959 2.99214,-2.02346 4.5851,-3.228944 1.59296,-1.205485 3.01367,-2.367883 4.15458,-3.487263 1.1409,-1.11938 2.00193,-2.195671 2.60467,-3.121311 0.60275,-0.925639 0.94716,-1.700573 1.27006,-2.518582 0.32289,-0.818008 0.62425,-1.679046 0.64578,-2.540106 0.0215,-0.86106 -0.23679,-1.722096 -0.64579,-2.49705 -0.40901,-0.774955 -0.96868,-1.46378 -1.8728,-2.1741571 -0.90412,-0.7103768 -2.15262,-1.4422576 -3.20741,-2.1095785 -1.0548,-0.6673209 -1.91584,-1.2700474 -2.75537,-1.700576 -0.83954,-0.4305286 -1.65752,-0.6888382 -2.47553,-1.0332642 -0.81801,-0.3444261 -1.63599,-0.7749422 -2.51858,-1.0978395 -0.88259,-0.3228973 -1.82973,-0.5381566 -3.31506,-0.7318947 -1.48534,-0.1937381 -3.50877,-0.3659449 -5.0802,-0.4089963 -1.57144,-0.043051 -2.69078,0.043052 -3.46573,0.3659506 -0.77495,0.322899 -1.20547,0.882573 -1.61448,1.3346295 -0.409,0.4520566 -0.79646,0.796468 -1.09784,1.506849 -0.30137,0.710381 -0.51663,1.7866732 -0.77494,2.9275802 -0.25832,1.140907 -0.55968,2.346359 -0.818,3.487264 -0.25832,1.140904 -0.47358,2.217199 -0.53816,3.315051 -0.0646,1.097853 0.0215,2.217199 0.17221,3.65948 0.15069,1.44228 0.36595,3.207403 0.53816,4.692731 0.17221,1.485327 0.30137,2.690777 0.62427,3.573361 0.3229,0.882584 0.83952,1.442258 1.46379,2.131108 0.62427,0.68885 1.35615,1.506835 1.91584,1.915834 0.55969,0.408999 0.94715,0.408999 1.37768,0.408999 z', info: '', selected: false, name:'Incisivo Central Superior Derecho' ,condition:''},
        { id: 24, path: 'm 94.909515,32.504732 c 1.011737,0.04305 2.131104,-0.0861 3.121323,-0.322897 0.990219,-0.236792 1.851256,-0.581206 2.626212,-1.076317 0.77495,-0.495111 1.46378,-1.14089 2.06652,-2.066533 0.60274,-0.925643 1.11937,-2.131094 1.48532,-3.185891 0.36595,-1.054797 0.58121,-1.958885 0.75342,-3.185901 0.17221,-1.227016 0.30136,-2.776879 0.30136,-4.133048 0,-1.35617 -0.12915,-2.518569 -0.25831,-3.681001 -0.12916,-1.162432 -0.25832,-2.32483 -0.40901,-3.379628 -0.15068,-1.054798 -0.32289,-2.0019381 -0.51663,-3.1213196 -0.19374,-1.1193815 -0.409,-2.4109346 -0.818,-3.3150449 -0.40901,-0.9041103 -1.01173,-1.4207292 -1.67906,-1.8512599 -0.66732,-0.4305307 -1.3992,-0.7749448 -2.927591,-0.8825749 -1.528391,-0.1076302 -3.853184,0.021525 -5.31698,0.1937374 -1.463795,0.1722125 -2.066521,0.3874717 -2.755371,0.6888439 -0.688849,0.3013722 -1.463782,0.6888387 -2.583165,1.0547894 -1.119383,0.3659507 -2.583143,0.7103648 -4.176107,1.4422703 -1.592963,0.7319055 -3.315036,1.8512525 -4.82189,3.0997925 -1.506855,1.2485398 -2.798407,2.6261968 -3.48725,3.8316798 -0.688842,1.205484 -0.774946,2.238726 -0.495097,3.487267 0.279848,1.248541 0.925624,2.712301 1.851267,3.982364 0.925643,1.270063 2.131093,2.346357 3.207418,3.25047 1.076325,0.904112 2.023464,1.635992 3.121319,2.432475 1.097855,0.796482 2.346356,1.657517 3.530315,2.453998 1.183958,0.796481 2.303303,1.52836 3.185889,2.152629 0.882585,0.624268 1.528363,1.140891 2.303318,1.506839 0.774955,0.365949 1.679042,0.581208 2.69078,0.62426 z', info: '', selected: false, name:'Incisivo Central Superior Izquierdo' ,condition:''},
        { id: 25, path: 'm 83.199201,33.968522 c 0.365947,-0.172211 0.495104,-0.473579 0.538156,-0.839531 0.04305,-0.365952 10e-7,-0.796469 -0.301373,-1.463793 -0.301374,-0.667325 -0.861047,-1.571412 -1.506844,-2.798427 -0.645796,-1.227015 -1.377676,-2.77688 -2.023471,-4.068469 -0.645795,-1.291589 -1.205468,-2.324832 -1.808211,-3.293524 -0.602744,-0.968693 -1.248521,-1.87278 -1.958896,-2.669261 -0.710376,-0.79648 -1.485308,-1.485308 -2.195683,-1.980417 -0.710375,-0.495108 -1.356152,-0.796471 -2.045001,-1.054789 -0.688849,-0.258317 -1.420729,-0.473576 -2.174158,-0.43052 -0.753429,0.04306 -1.528359,0.344417 -2.604689,0.710369 -1.07633,0.365952 -2.453987,0.79647 -3.680997,1.356161 -1.227011,0.559691 -2.303304,1.248519 -3.207417,2.174162 -0.904113,0.925643 -1.635993,2.088041 -2.303315,3.20742 -0.667322,1.119379 -1.270047,2.195673 -1.420728,3.228946 -0.150681,1.033274 0.150681,2.023463 0.559686,2.819943 0.409006,0.79648 0.925628,1.399205 1.700585,1.937368 0.774958,0.538162 1.808201,1.011731 2.755367,1.420734 0.947166,0.409003 1.808203,0.753418 2.798425,1.033262 0.990221,0.279845 2.109564,0.495103 3.207417,0.645788 1.097853,0.150686 2.174149,0.236789 3.401162,0.279842 1.227013,0.04305 2.604669,0.04305 3.917787,0.150686 1.313118,0.107634 2.561618,0.322893 3.680997,0.32289 1.11938,-2e-6 2.109569,-0.215261 2.906048,-0.344419 0.79648,-0.129159 1.399206,-0.172211 1.765153,-0.344421 z', info: '', selected: false, name:'Incisivo Lateral Superior Izquierdo' ,condition:''},
        { id: 26, path: 'm 66.214939,46.346153 c 0.301368,-0.193737 0.559683,-0.538158 0.796476,-0.753423 0.236792,-0.215264 0.45205,-0.301367 0.645788,-0.559687 0.193739,-0.25832 0.365946,-0.688837 0.452052,-1.140895 0.08611,-0.452058 0.08611,-0.925628 -0.06458,-1.334632 C 67.893985,42.148513 67.592624,41.8041 67.205146,41.244409 66.817668,40.684717 66.344097,39.909785 65.935094,39.19941 65.52609,38.489035 65.181677,37.843259 64.858779,37.197462 64.535881,36.551666 64.234519,35.90589 63.674826,35.066353 63.115134,34.226817 62.29715,33.193574 61.737463,32.547783 61.177776,31.901991 60.876414,31.64368 60.445882,31.406888 c -0.430533,-0.236792 -0.990205,-0.452051 -2.174171,-0.818003 -1.183966,-0.365953 -2.992139,-0.882574 -4.542047,-0.947148 -1.549908,-0.06457 -2.84146,0.322892 -3.788623,0.645789 -0.947164,0.322898 -1.549888,0.581207 -2.174158,1.162426 -0.62427,0.581219 -1.270046,1.485307 -1.808208,2.281788 -0.538163,0.79648 -0.968681,1.485308 -1.313104,2.238738 -0.344424,0.753429 -0.602734,1.571412 -0.710365,2.346367 -0.107631,0.774956 -0.06458,1.506836 0.172214,2.109577 0.236793,0.602741 0.66731,1.07631 1.44227,1.679054 0.774959,0.602745 1.894305,1.334624 3.013685,1.894312 1.119379,0.559688 2.238725,0.947155 3.745585,1.270052 1.506861,0.322898 3.40114,0.581208 4.886466,0.796472 1.485325,0.215265 2.561619,0.387472 3.831687,0.473577 1.270067,0.0861 2.733826,0.0861 3.637935,0.06458 0.904109,-0.02153 1.248522,-0.06458 1.549891,-0.258314 z', info: '', selected: false, name:'Colmillo Superior Izquierdo' ,condition:''},
        { id: 27, path: 'm 57.948835,56.312835 c 0.08611,-1.033263 0.129159,-2.712316 -0.08611,-3.853216 -0.215269,-1.140901 -0.688838,-1.743624 -1.528376,-2.518581 -0.839539,-0.774957 -2.044989,-1.722097 -3.185893,-2.389416 -1.140904,-0.66732 -2.2172,-1.054786 -3.315053,-1.39921 -1.097853,-0.344423 -2.217199,-0.645786 -3.336579,-0.882577 -1.119379,-0.236791 -2.238725,-0.408998 -3.379631,-0.408996 -1.140906,2e-6 -2.303305,0.172209 -3.207416,0.710375 -0.904112,0.538167 -1.549889,1.442254 -2.131105,2.217208 -0.581215,0.774954 -1.097835,1.42073 -1.506837,2.410953 -0.409003,0.990223 -0.710365,2.324829 -0.882577,3.42268 -0.172211,1.09785 -0.215263,1.958886 0.08611,2.647733 0.301374,0.688847 0.947152,1.205469 1.829741,1.829739 0.882589,0.624269 2.001935,1.356149 2.992154,1.937364 0.990219,0.581215 1.851255,1.011734 2.81995,1.27005 0.968696,0.258317 2.044989,0.344421 3.336583,0.452054 1.291594,0.107633 2.798406,0.236788 4.176102,-0.04306 1.377696,-0.279849 2.626198,-0.968679 3.767103,-1.636001 1.140904,-0.667322 2.174147,-1.313098 2.755359,-1.829734 0.581211,-0.516635 0.710367,-0.904101 0.796472,-1.937364 z', info: '', selected: false, name:'Primer Premolar Superior Izquierdo' ,condition:''},
        { id: 28, path: 'm 31.277732,61.349992 c -0.88258,0.47358 -1.614473,1.076316 -2.238741,1.915853 -0.624268,0.839537 -1.14089,1.915832 -1.549893,3.293532 -0.409003,1.377701 -0.710365,3.05672 -0.839523,4.391361 -0.129157,1.334642 -0.0861,2.324832 0.236796,3.164365 0.322901,0.839533 0.925626,1.528361 1.420735,2.02347 0.495109,0.495108 0.882574,0.79647 1.765167,1.011735 0.882593,0.215265 2.260249,0.34442 3.508786,0.667319 1.248537,0.3229 2.367882,0.839521 3.681004,0.94715 1.313121,0.10763 2.819933,-0.193733 4.046942,-0.538158 1.227009,-0.344425 2.174149,-0.731892 3.013682,-1.399218 0.839533,-0.667326 1.571412,-1.614463 2.174154,-2.518576 0.602742,-0.904114 1.076312,-1.76515 1.140888,-2.863005 0.06457,-1.097854 -0.27984,-2.43246 -0.688844,-3.767104 -0.409004,-1.334644 -0.882574,-2.66925 -1.506845,-3.573361 -0.624272,-0.90411 -1.399202,-1.377679 -2.131105,-1.808209 C 42.579033,61.866616 41.890206,61.479151 41.17983,61.17778 40.469454,60.876409 39.737575,60.661151 38.575137,60.510465 37.412699,60.35978 35.819786,60.273677 34.50667,60.402838 33.193553,60.532 32.160312,60.876413 31.277732,61.349992 Z', info: '', selected: false, name:'Segundo Premolar Superior Izquierdo' ,condition:''},
        { id: 29, path: 'm 21.676997,78.484938 c -0.322894,0.258315 -1.313105,0.861052 -1.958897,1.420741 -0.645792,0.559689 -0.947155,1.076312 -1.442267,2.109591 -0.495112,1.033278 -1.18394,2.583141 -1.592941,3.74557 -0.409002,1.162428 -0.538157,1.937361 -0.581209,3.056744 -0.04305,1.119383 -1e-6,2.583143 0.107633,3.680991 0.107633,1.097849 0.279839,1.829729 0.538159,2.561632 0.258319,0.731902 0.602733,1.463782 1.506853,2.174157 0.90412,0.710375 2.36788,1.399203 3.59489,1.808205 1.22701,0.409001 2.2172,0.538156 3.099787,0.624261 0.882586,0.08611 1.657518,0.129158 2.841481,0.215264 1.183963,0.08611 2.77688,0.215256 4.391369,-9e-6 1.614489,-0.215269 3.250457,-0.774941 4.649679,-1.356157 1.399222,-0.581216 2.561619,-1.18394 3.379624,-2.06653 0.818005,-0.882591 1.291575,-2.044988 1.549891,-3.035207 0.258316,-0.990219 0.301367,-1.808202 0.258313,-2.884531 -0.04306,-1.076329 -0.17221,-2.410935 -0.43053,-3.724052 -0.258319,-1.313118 -0.645784,-2.604671 -1.205475,-3.702522 -0.559691,-1.097851 -1.291573,-2.001939 -2.238742,-2.647732 -0.94717,-0.645793 -2.109567,-1.033259 -3.293525,-1.377682 -1.183959,-0.344424 -2.389409,-0.645787 -3.917796,-0.839524 -1.528386,-0.193738 -3.379612,-0.279842 -5.037153,-0.236787 -1.657541,0.04305 -3.121302,0.215261 -3.680982,0.258312 -0.55968,0.04305 -0.215267,-0.04305 -0.538162,0.215265 z', info: '', selected: false, name:'Primer Molar Superior Izquierdo' ,condition:''},
        { id: 30, path: 'm 11.387419,103.28325 c -0.667318,1.07632 -1.5714216,2.75537 -1.894313,4.09001 -0.3228914,1.33464 -0.064581,2.32483 -0.02153,3.22894 0.04305,0.90412 -0.1291558,1.7221 0.1506935,2.79843 0.2798493,1.07633 1.0117307,2.41094 1.7436327,3.37963 0.731901,0.96869 1.463779,1.57141 2.303316,2.00194 0.839536,0.43053 1.786676,0.68884 3.164377,0.94715 1.377702,0.25832 3.185877,0.51663 5.187846,0.66732 2.001969,0.15068 4.197608,0.19374 6.070413,-0.0431 1.872805,-0.23679 3.422667,-0.75342 4.714255,-1.48532 1.291589,-0.7319 2.324833,-1.67904 3.444213,-3.0998 1.119381,-1.42075 2.324831,-3.31503 2.733828,-4.97257 0.408998,-1.65754 0.02153,-3.07825 -0.301367,-4.04694 -0.322898,-0.96869 -0.581209,-1.48531 -1.205481,-2.26027 -0.624271,-0.77495 -1.614465,-1.8082 -2.841479,-2.49704 -1.227014,-0.68885 -2.690775,-1.03326 -4.176105,-1.29158 -1.485331,-0.25831 -2.992142,-0.43052 -4.477473,-0.62426 -1.48533,-0.193739 -2.94909,-0.408999 -4.585108,-0.408997 -1.636018,2e-6 -3.444192,0.215262 -4.52051,0.365947 -1.076319,0.15068 -1.420735,0.23679 -1.9589,0.43053 -0.538165,0.19374 -1.270044,0.4951 -1.851257,0.88258 -0.581214,0.38747 -1.011733,0.86104 -1.679051,1.93736 z', info: '', selected: false, name:'Segundo Molar Superior Izquierdo' ,condition:''},
        { id: 31, path: 'm 37.714101,128.55514 c 10e-7,1.33463 -0.258316,3.09979 -0.538162,4.21916 -0.279846,1.11938 -0.58121,1.59295 -0.925634,2.23874 -0.344424,0.6458 -0.731892,1.46379 -1.097841,2.34637 -0.36595,0.88259 -0.710364,1.82973 -1.183947,2.58316 -0.473584,0.75342 -1.076313,1.3131 -1.915848,1.85126 -0.839535,0.53816 -1.915831,1.05478 -3.078265,1.54989 -1.162434,0.49511 -2.410934,0.96868 -3.853213,1.20547 -1.442279,0.23679 -3.078246,0.23679 -4.908003,0.23679 -1.829757,0 -3.85319,0 -5.230881,-0.12916 -1.377691,-0.12916 -2.109571,-0.38747 -2.647731,-0.818 -0.538159,-0.43053 -0.882576,-1.03326 -1.227,-1.74364 -0.344424,-0.71037 -0.688836,-1.52835 -1.033263,-2.38942 -0.3444256,-0.86106 -0.6888414,-1.76515 -0.9902124,-2.69079 -0.3013711,-0.92564 -0.5596823,-1.87278 -0.6888393,-2.90605 -0.1291571,-1.03327 -0.1291571,-2.15262 -0.1722104,-3.03521 -0.043053,-0.88258 -0.1291571,-1.52836 0.1722189,-2.28179 0.3013759,-0.75343 0.990203,-1.61446 1.5714188,-2.38941 0.5812154,-0.77496 1.0547854,-1.46379 1.5498954,-2.17416 0.49511,-0.71038 1.011732,-1.44226 2.001957,-2.06653 0.990225,-0.62426 2.453984,-1.14089 4.068475,-1.35615 1.614491,-0.21526 3.379613,-0.12916 4.972574,-0.0861 1.592962,0.043 3.01367,0.043 4.219154,0.10763 1.205483,0.0646 2.195673,0.19373 3.056731,0.27984 0.861059,0.0861 1.592942,0.12916 2.518584,0.409 0.925642,0.27985 2.044989,0.79647 2.884521,1.48532 0.839532,0.68885 1.399207,1.54989 1.808208,2.43247 0.409001,0.88259 0.667312,1.78668 0.667313,3.12131 z', info: '', selected: false, name:'Tercer Molar Superior Izquierdo' ,condition:''},
    ],
    situacionDental:[],
    tipoLesiones:[],
    tipoRetraso:[],
    comboOrientacionCesarea:["Vertical","Horizontal"],
    orientacionCesarea:'',
    selectedTooth:null,
    dialog_dent:false,
    selectProtesis:'',
    selectSiProtesis:'',
    tipoEnfermedad:'',
    tiempoDiagnostico:'',
    tipoCQuirurgicas:[],
    quirurgica:'',
    rapid: "",
    rAtencionId: "",
    rHechoId: "",
    nuc: "",
    //************************************************ */
    idMediaAfiliacion: "",
    listaimputados: [],
    personas: [],
    personaId: '',
    complexion: "",
    complexionL: "",
    peso: "",
    pesoL: "",
    estatura: "",
    estaturaL: "",
    formacaras: [],
    formacara: "",
    formacaraL: "",
    colorojo: "",
    colorojoL: "",
    tez: "",
    tezL: "",
    formaCabell: "",
    formaCabellL: "",
    colocabello: "",
    colocabelloL: "",
    largocabello: "",
    largocabelloL: "",
    v_tnariz: "",
    v_tnarizL: "",
    tamanonariz: "",
    tamanonarizL: "",
    dorsonariz: "",
    dorsonarizL: "",
    v_glabios: "",
    v_glabiosL: "",
    v_gnariz: "",
    v_gnarizL: "",
    v_tfrente: "",
    v_tfrenteL: "",
    tamanoceja: "",
    tamanocejaL: "",
    formaceja: "",
    formacejaL: "",
    v_tboca: "",
    v_tbocaL: "",
    tamanooreja: "",
    tamanoorejaL: "",
    v_fmenton: "",
    v_fmentonL: "",
    tipoojo: "",
    tipoojoL: "",
    v_datos: ["Chica", "Mediana"],
    numerooficio: "",
    dialogarchivo: false,
    dialogpictures: "",

    v_distrito: "",
    v_dirSubPro: "",
    v_agencia: "",
    v_usuario: "",
    v_puesto: "",
    complexiontipo: [],
    Colorojos: [],
    Tez: [],
    tipocabellos: [],
    tipocabello: "",
    tipocabelloL: "",
    colorcabellos: [],
    largocabellos: [],
    dorsonarices: [],
    grosorlabios: [],
    tipofrente: [],
    tamanocejas: [],
    formacejas: [],
    tamañoboca: [],
    tamanoorejas: [],
    formamenton: [],
    tipoojos: [],
    agenciainfo: [
      { text: "direccion", value: "" },
      { text: "telefono", value: "" },
    ],
    agenciaid: "",
    fechas: "",
    personanombre: "",
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    menu8: false,
    cicatriz: false,
    tatuaje: false,
    dentaduracompleta: true,
    pupilentes: "",
    menu1L: false,
    menu2L: false,
    menu3L: false,
    menu4L: false,
    menu5L: false,
    menu6L: false,
    menu7L: false,
    menu8L: false,
    menu9L: false,
    menu10L: false,
    menu11L: false,
    menu12L: false,
    menu13L: false,
    menu14L: false,
    menu15L: false,
    menu16L: false,
    cicatrizL: false,
    tatuajeL: false,
    dentaduracompletaL: true,
    pupilentesL: false,

    calvicies: [],
    calvicie: "",
    calvicieL: "",

    tratamientoquimicos: [],
    tratamientoquimico: "",
    tratamientoquimicoL: "",

    aderenciarorejas: [],
    aderenciaroreja: "",
    aderenciarorejaL: "",

    formaojos: [],
    formaojo: "",
    formaojoL: "",

    implantacioncejas: [],
    implantacionceja: "",
    implantacioncejaL: "",

    puntasnariz: [],
    puntanariz: "",
    puntanarizL: "",

    tipomentons: [],
    tipomenton: "",
    tipomentonL: "",

    otrascarac: "",
    otrascaracL: "",

    tamanodentals: [],
    tamanodental: "",
    tamanodentalL: "",

    tratamientodentals: [],
    tratamientodental: "",
    tratamientodentalL: "",

    tamanodentals: [],
    tamanodental: "",
    tamanodentalL: "",

    tratamientodental: "",
    tratamientodentalL: "",

    gruposanguineos: [
      { text: "AB RH+", value: "AB RH+" },
      { text: "AB RH-", value: "AB RH-" },
      { text: "A RH+", value: "A RH+" },
      { text: "A RH-", value: "A RH-" },
      { text: "B RH+", value: "B RH+" },
      { text: "B RH-", value: "B RH-" },
      { text: "O RH+", value: "O RH+" },
      { text: "O RH-", value: "O RH-" },
      { text: "Se desconoce", value: "Se desconoce" },
    ],
    gruposanguineo: "",
    gruposanguineoL: "",

    alturanarices: [],
    alturanariz: "",
    alturanarizL: "",

    tipodentaduras: [],
    tipodentadura: "",
    tipodentaduraL: "",

    dientesausentes: "",
    dientesausentesL: "",

    tamañonariz: "",
    tamañonarizL: "",

    textocicatriz: "",
    textocicatrizL: "",

    textotatuaje: "",
    textotatuajeL: "",

    otrotratamiento: "",
    otrotratamientoL: "",

    lateralidades: [
      { text: "Ambidiestro", value: "Ambidiestro" },
      { text: "Diestro", value: "Diestro" },
      { text: "Siniestro", value: "Siniestro" },
      { text: "Se desconoce", value: "Se desconoce" },
    ],
    lateralidade: "",
    lateralidadeL: "",
    pomulos: [],
    pomulo: "",
    pomuloL: "",
    //*************** */
    headers: [
      { text: "Nombre", value: "nombreImputado" },
      { text: "Fecha  regsitro", value: "fechaSys" },
      { text: "Distrito", value: "curp" },
      { text: "Agencia", value: "nombre" },
      { text: "Usuario", value: "medio de notificacion" },
      { text: "Puesto", value: "correo electronico" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: -1,
    impirmirIndex: -1,
    //-----CLAIM------------------------------------------
    u_iddistrito: "",
    u_distrito: "",
    u_dirSubPro: "",
    u_idagencia: "",
    u_agencia: "",
    u_idmoduloservicio: "",
    u_modulo: "",
    u_idusuario: "",
    u_nombre: "",
    u_clave: "",
    u_rol: "",
    u_puesto: "",
    u_subproc: "",
    //----------------------------------------------------
    logo1: "",
    logo2: "",
    modaldocumento: false,
    contenido: null,
    //-------------------------veriables para carga de imagenes---------------------------
    imageName: "",
    imageUrl: null,
    imageFile: "",
    descripciondocumento: "",
    GUID: "",
    tiposdocumentos: [
      { text: "Fotografías", value: "1" },
      { text: "Documentos", value: "2" },
      { text: "Resultados", value: "3" },
      { text: "Indicios", value: "4" },
      { text: "Identficaciones", value: "5" },
      { text: "Entrevista", value: "6" },
      { text: "Inspección", value: "7" },
      { text: "Aseguramiento", value: "8" },
      { text: "Cadena de custodia", value: "9" },
    ],
    tiposdocumento: "",
    rutaconsulta: "",
    descrip: "",
    tipo: "",
    archivos: [],
    dialogimagen: false,
    searchar: "",
    headersar: [
      { text: "TipoDocumento", value: "fipoDocumento",  sortable: true },
      { text: "Descripción", value: "descripcion",  },
      { text: "Opciones", value: "opciones", align: "center"},
    ],
    personaMA:'',
    unasNoSaludables:[],
    texto: 'Vista Previa',
    qrCode: null,
    docMediaAfil: 'Media afiliacion',
    vistaPreviaTF: true,
    fechaedit:'',
    PDesaSelect:'',
    PersDSelect:'',
    ClasPerSelect:'',
    NomPerSelect:'',
    clasificacionPersonaSelect:'',
    arrayTooth:[],
    arrayPersona:[],
    editTooth:'',
    idMediaAfiliacion:'',
    idMFD:'',
    tipoOjos2: [],
    tipoOjo2: '',
    idMAD: '',
    NormalDesaparecido: [
    { text: "Media Filiación general", value: 1},
    { text: "Media Filiación para persona desaparecida", value: 2},
    ],
    desaparecioSiNo : []
  }),

  created() {
    let me = this;

    me.rHechoId = me.$store.state.rhechoid;
    me.rAtencionId = me.$store.state.ratencionid;
    me.nuc = me.$store.state.nuc;
    if (me.rHechoId == null) {
      me.$alert(
        "Notificación",
        "Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.",
        function () {
          me.$router.push("./umixta-carpetas");
        }
      );
    } else {
      me.$notify("Carpeta abierta correctamente !!!", "success");

      me.u_iddistrito = me.$store.state.usuario.iddistrito;
      me.u_distrito = me.$store.state.usuario.distrito;
      me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
      me.u_idagencia = me.$store.state.usuario.idagencia;
      me.u_agencia = me.$store.state.usuario.agencia;
      me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
      me.u_modulo = me.$store.state.usuario.modulo;
      me.u_idusuario = me.$store.state.usuario.idusuario;
      me.u_nombre = me.$store.state.usuario.usuario;
      me.u_clave = me.$store.state.usuario.clave;
      me.u_rol = me.$store.state.usuario.rol;
      me.u_puesto = me.$store.state.usuario.puesto;
      me.u_subproc = me.$store.state.usuario.subProc;
      // ****************************************************************************
      me.listaMediaAfiliacion();
      me.listarLogo();
      me.listarcomplexion();
      me.listarFormacara();
      me.listarColorojos();
      me.listartipo2ojos();
      me.listartez();
      me.listarformacabello();
      me.listarcolorcabello();
      me.listarlargocabello();
      me.listartamañonariz();
      me.listartiponariz();
      me.listargrosorlabios();
      me.listartipofrente();
      me.listartipocejas();
      me.listarformacejas();
      me.listartamañoboca();
      me.listartipoorejas();
      me.listarformamenton();
      me.listartipoojos();
      me.listarrHecho();
      
      
      me.listarpomulos();
      me.listarcalvicie();
      me.listartratamientosquimicos();
      me.listaradherenciaorejas();
      me.listarformadeojo();
      me.listarimpnatacionceja();
      me.listarpuntanariz();
      me.listartipomenton();
      me.listartamanodental();
      me.listartratamientodental();
      me.listartipodentadura();

      me.listarUnasNoSaludables()
      me.listarSituacionDental()
      me.listarTipodeLesiones()
      me.listarTipodeRetraso()
    }

    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        this.$store.commit("LOADER", true);
        return config;
      },
      (error) => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        this.$store.commit("LOADER", false);
        // Do something with response data
        return response;
      },
      (err) => {
        // Do something with response error
        return new Promise((resolve, reject) => {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
          throw err;
        });
      }
    );
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? ((this.PDesaSelect === true && this.clasificacionPersonaSelect === 'Victima directa') ? "Registro de Media Filiación para Cedula de Persona No Localizada o Desaparecida de " + this.personaMA : "Registro de Media Filiación de " + this.personaMA)
        : ((this.PersDSelect === true && this.ClasPerSelect === 'Victima directa') ? "Actualizar Registro de Media Filiación de para Cedula de Persona No Localizada o Desaparecida de " + this.NomPerSelect : "Actualizar Registro de Media Filiación de " + this.NomPerSelect)

    },
    formIcon() {
      return this.editedIndex === -1 ? "add" : "edit";
    },
    textosino() {
      if (this.cicatriz) return "Si";
      else return "No";
    },
    textosino2() {
      if (this.tatuaje) return "Si";
      else return "No";
    },
    textosino3() {
      if (this.dentaduracompleta) return "Si";
      else return "No";
    },
    textosino3L() {
      if (this.dentaduracompletaL) return "Si";
      else return "No";
    },
    selectedTeeth() {
      return this.dentadura.filter(tooth => tooth.selected);
    },
  },

  watch: {
    arrayTooth(){
      let me = this

      if(me.modalAdd){
        if(me.radioCaracteristicaDental == 'Si tiene')
        {          
          if(me.arrayTooth.length > 0){
            if(me.error.arrayTooth){
              delete me.error.arrayTooth
            }
          }else{        
            me.error = {...me.error, arrayTooth: 'Debe seleccionar almenos un diente'}
          }          
        }
      }
    }
  },
  methods: {
    //Esta funcion se utiliza para darle manejo a la seleccion de dientes en cavidad oral
    selectTooth(tooth) {
        tooth.selected = !tooth.selected;
        this.selectedTooth = tooth.selected ? tooth : null;               

        if(tooth.selected == false){
          tooth.condition = ''
        }
          var validateTooth = this.arrayTooth.some(t => t.id == tooth.id)

          var arrayAux = []

          if(validateTooth) {
            arrayAux = this.arrayTooth.filter(tt => tt.id != tooth.id )

            this.arrayTooth = arrayAux
          }else{
            this.arrayTooth.push(
              {
                id: this.selectedTooth.id,
                name: this.selectedTooth.name,
                condition: this.selectedTooth.condition
              }
            )
          }
    },
    // este grupo de clases son para manejar los tamaños y la informacion de los menus del 8 al 16
    updateMenu8L(){
      if(this.radioManchas === 'No tiene' || this.radioManchas === 'Se desconoce')
      {
        delete this.error.tipoMancha
        delete this.error.ManchaOtra
        
        this.tipoMancha = []
        this.ManchaOtra = ''
      }
      if(!this.tipoMancha.includes('Otra')) this.ManchaOtra=''
    },
    updateMenu9L(){
      if(this.radioLunares === 'No tiene' || this.radioLunares === 'Se desconoce' )
      {
        delete this.error.CyULunares
        this.CyULunares = ''
      }
    },
    updateMenu10() {
      this.menu10L = false;
      this.$nextTick(() => {
        this.menu10L = true;
        this.$nextTick(() => {
          if (this.$refs.menuR10 && this.$refs.menuR10.updateDimensions) {
            this.$refs.menuR10.updateDimensions();
          }
        });
      });
      if(this.radioCicatrices === 'No tiene' || this.radioCicatrices === 'Se desconoce')
      {
        delete this.error.TCicatriz
        delete this.error.tipoCQuirurgicas
        delete this.error.operacionMyU
        delete this.error.orientacionCesarea
        delete this.error.numerodeCesarea
        delete this.error.CyUTraumatica

        this.TCicatriz = ''
        this.tipoCQuirurgicas = ''
        this.operacionMyU = ''
        this.orientacionCesarea = ''
        this.numerodeCesarea = 0
        this.CyUTraumatica = ''
      }
      if(!this.TCicatriz.includes('Traumaticas'))
      {
        delete this.error.CyUTraumatica

        this.CyUTraumatica = ''
      }
      if(!this.TCicatriz.includes('Quirúrgicas'))
      {
        delete this.error.tipoCQuirurgicas
        delete this.error.operacionMyU
        delete this.error.orientacionCesarea
        delete this.error.numerodeCesarea

        this.tipoCQuirurgicas = []
        this.operacionMyU = ''
        this.orientacionCesarea = ''
        this.numerodeCesarea = 0
      }
      if(!this.tipoCQuirurgicas.includes('Operación'))
      {
        this.operacionMyU = ''
      }
      if(!this.tipoCQuirurgicas.includes('Cesárea'))
      {
        this.orientacionCesarea = ''
        this.numerodeCesarea = 0
      }
    },
    updateMenu11L(){
      if(this.radioTatuajes === 'No tiene' || this.radioTatuajes === 'Se desconoce')
      {
        delete this.error.NumeroTatuajes
        delete this.error.DescripcionTatuajes
        this.NumeroTatuajes = 0
        this.DescripcionTatuajes = ''
      }
    },
    updateMenu12L(){
      if(this.radioPiercing === 'No tiene' || this.radioPiercing === 'Se desconoce')
      {
        delete this.error.NumeroPiercing
        delete this.error.DescripcionPiercing
        this.NumeroPiercing = 0
        this.DescripcionPiercing = ''
      }
    },
    updateMenu13L(){
      if(this.radioUñas === 'Saludable' || this.radioUñas === 'Se Desconoce')
      {
        delete this.error.NoSaludables
        this.NoSaludables = ''
      }
    },
    updateMenu14L(){
      this.menu14L = false;
      this.$nextTick(() => {
        this.menu14L = true;
        this.$nextTick(() => {
          if (this.$refs.menuR14 && this.$refs.menuR14.updateDimensions) {
            this.$refs.menuR14.updateDimensions();
          }
        });
      });
      if(this.radioDeformidades === 'No tiene' || this.radioDeformidades === 'Se desconoce')
      {
        delete this.error.tipoDeformidad
        delete this.error.ubicacionCongenitas
        delete this.error.ubicacionAdquiridas
        
        this.tipoDeformidad = []
        this.ubicacionCongenitas = ''
        this.ubicacionAdquiridas = ''
      }
      if(!this.tipoDeformidad.includes('Congénitas')) 
      {
        delete this.error.ubicacionCongenitas
        this.ubicacionCongenitas = ''
      }
      if(!this.tipoDeformidad.includes('Adquiridas')) 
      {
        delete this.error.ubicacionAdquiridas
        this.ubicacionAdquiridas = ''
      }
    },
    updateMenu15() {
      this.menu15L = false;
      this.$nextTick(() => {
        this.menu15L = true;
        this.$nextTick(() => {
          if (this.$refs.menuR15 && this.$refs.menuR15.updateDimensions) {
            this.$refs.menuR15.updateDimensions();
          }
        });
      });
      
      if(this.selectProtesis === 'No tiene' || this.selectProtesis === 'Se desconoce')
      {
        delete this.error.selectSiProtesis
        this.selectSiProtesis = ''
      }

      if(this.radioCaracteristicaDental === 'No tiene' || this.radioCaracteristicaDental === 'Se desconoce')
      {
        this.dentadura.map((x) =>{
          x.condition = ''
          x.selected = false
        })
        this.arrayTooth = []
        delete this.error.arrayTooth
        delete this.error.dientes
      }
    },
    updateMenu16() {
      this.menu16L = false;
      this.$nextTick(() => {
        this.menu16L = true;
        this.$nextTick(() => {
          if (this.$refs.menuR16 && this.$refs.menuR16.updateDimensions) {
            this.$refs.menuR16.updateDimensions();
          }
        });
      });

      if(this.switchTraumatismos != '') delete this.error.switchTraumatismos

      delete this.error.Ttraumatismo;
      //  !this.Ttraumatismo.includes('Fracturas')? delete this.error.Ubifractura : ''; 
      //  if(!this.Ttraumatismo.includes('Lesiones'))
      //  {
      //   delete this.error.comboTipoLesiones;
      //   delete this.error.UbiLesiones;
      //  }

      if(this.switchTraumatismos === 'No tiene' || this.switchTraumatismos === 'Se desconoce')
      {
        this.Ttraumatismo = ''
        this.UbiFractura = ''
        this.comboTipoLesiones = ''
        this.mordedura = ''
        this.OtraLesion = ''
        this.UbiLesiones = ''
      }
      if(!this.Ttraumatismo.includes('Lesiones'))
      {
        delete this.error.comboTipoLesiones;
        delete this.error.UbiLesiones;
        delete this.error.OtraLesion
        delete this.error.mordedura
        this.comboTipoLesiones = ''
        this.mordedura = ''
        // this.UbiFractura = ''
        this.OtraLesion = ''
        this.UbiLesiones = ''
      }
      if(!this.Ttraumatismo.includes('Fracturas'))
      {
        delete this.error.Ubifractura 
        this.UbiFractura = ''
      }
      
      if(!this.comboTipoLesiones.includes('Mordedura'))
      {
        this.mordedura = ''
        delete this.error.mordedura 
      }

      if(!this.comboTipoLesiones.includes('Otra'))
      {
        delete this.error.OtraLesion
        this.OtraLesion = ''
      }

      if(this.switchFacultadesMentales == null || !this.switchFacultadesMentales.includes('Si'))
      {
        this.TRetraso = ''
        delete this.error.TRetraso
      }

      if(this.switchEnfermedadesCronicas == null || !this.switchEnfermedadesCronicas.includes('Si tiene') )
      {
        delete this.error.tipoEnfermedad
        delete this.error.tiempoDiagnostico
        delete this.error.switchTratamiento
        delete this.error.medicamentoCronicas
        delete this.error.periocidadCronicas
        
        this.tipoEnfermedad = ''
        this.tiempoDiagnostico = ''
        this.switchTratamiento = ''
        this.medicamentoCronicas = ''
        this.periocidadCronicas = ''
      }
      if(this.switchTratamiento != 'Si tiene')
      {
        delete this.error.medicamentoCronicas
        delete this.error.periocidadCronicas
        
        this.medicamentoCronicas = ''
        this.periocidadCronicas = ''
      }
      
      if(this.switchAlergias == null || !this.switchAlergias.includes('Si tiene'))
      {
        delete this.error.switchTratamientoAlergia
        delete this.error.medicamentoAlergias
        delete this.error.periocidadAlergias
        
        this.switchTratamientoAlergia = ''
        this.medicamentoAlergias = ''
        this.periocidadAlergias = ''
      }
      
      if(this.switchTratamientoAlergia != 'Si tiene')
      {
        delete this.error.medicamentoAlergias
        delete this.error.periocidadAlergias
        
        this.medicamentoAlergias = ''
        this.periocidadAlergias = ''
      }
      
      if(this.switchLentes == null || !this.switchLentes.includes('Si tiene'))
      {
        delete this.error.radioLentes
        delete this.error.lentesGraduacion

        this.radioLentes = ''
        this.lentesGraduacion = ''
      }
      if(this.switchAparatosAuditivos != 'Si tiene')
      {
        delete this.error.oidos

        this.oidos = ''
      }
    },
    closeM16(){
        this.menu16L = false; 
    },
    // Con esta funcion abrimos el formulario de la media filiacion
    abrirMediaAfiliacion(){
      let me = this 
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.personaMA = me.personaSelect.text;

      this.$cat.get("api/Personas/ListarPorId/" + me.personaSelect.value, configuracion).then(function (response) {
          me.PDesaSelect = response.data.registro
          me.clasificacionPersonaSelect = response.data.clasificacion
          me.modalAdd = 1;
          me.modalPersonaSelect = false
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    // Con esta funcion cerramos el formulario de la persona a seleccionar
    cerrarModalPersonaSelect(){
      let me = this
      me.modalPersonaSelect = false
      me.personaSelect = ''
      me.desaparecioSiNo = [];
    },
    // esta clase hace que en los apartados de estatura y peso solo acepte numeros y un solo punto decimal
    validarSoloNumero(event){
      let me = this
      const charCode = event.charCode;
      const charStr = String.fromCharCode(charCode);

      if ((charCode >= 48 && charCode <= 57) || (charStr === '.' && !this.estatura.includes('.'))) {
        return true;  // Permitir el ingreso
      } else {
        event.preventDefault();  // Prevenir el ingreso de cualquier otro carácter
      }
    },
    // Clase para captar el evento fuera del modal
    onDialogClose(isOpen){
      if (!isOpen) {
        this.personaSelect = ''  // Limpia los campos cuando el modal se cierra
      }
    },
    //en estas funciones se listan los catalogos nuevos
    listarTipodeRetraso(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let retrasoarray = []

      me.$conf.get("api/TipoRetraso/Listar", configuracion).then(function (response) {
        retrasoarray = response.data;
          retrasoarray.map(function (x) {
            me.tipoRetraso.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarTipodeLesiones(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let lesionesarray = []

      me.$conf.get("api/TipoLesiones/Listar", configuracion).then(function (response) {
        lesionesarray = response.data;
          lesionesarray.map(function (x) {
            me.tipoLesiones.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarSituacionDental(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let SitDentalarray = []

      me.$conf.get("api/SituacionDental/Listar", configuracion).then(function (response) {
        SitDentalarray = response.data;
          SitDentalarray.map(function (x) {
            me.situacionDental.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarUnasNoSaludables(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let unasarray = []

      me.$conf.get("api/UnasNoSaludables/Listar", configuracion).then(function (response) {
          unasarray = response.data;
          unasarray.map(function (x) {
            me.unasNoSaludables.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    //Funcion para la creacion de QR
    async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) 
    {
        let me=this; 
        var textoModificado = nuc.replace(/-/g, "~");

        var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
        var dia = moment(date).format("DD");
        var mes = moment(date).format("MMMM");
        var año = moment(date).format("YYYY");
        var fecha = dia + " de " + mes + " del " + año;
        
        try {
            me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id);
        } catch (err) {
            console.error('Error:', err);
        }
    },
    listarpomulos() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Pomulos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.pomulos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarcalvicie() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Calvicies/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.calvicies.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartratamientosquimicos() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tratamientos_Quimicos_Cabellos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tratamientoquimicos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listaradherenciaorejas() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Adherencia_Orejas/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.aderenciarorejas.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarformadeojo() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Forma_De_Ojos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.formaojos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarimpnatacionceja() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Implantacion_Cejas/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.implantacioncejas.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarpuntanariz() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Punta_Narizs/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.puntasnariz.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipomenton() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tipo_De_Mentons/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tipomentons.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartamanodental() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tamano_Dentals/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tamanodentals.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartratamientodental() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tratamiento_Dentals/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tratamientodentals.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipodentadura() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tipo_Dentaduras/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tipodentaduras.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    resizeIframe(obj) {
      obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
    },
    listarLogo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf.get("api/ConfGlobals/Listar", configuracion)
        .then(function (response) {
          me.logo1 = response.data.logo1;
          me.logo2 = response.data.logo2;
          me.logo3 = response.data.logo3;
          me.logo4 = response.data.logo4;
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    formatearfechahora: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY hh:mm:ss a");
    },
    cerrarcarpeta() {
      this.$store.state.rHechoId = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    agregar() {
      let me = this;
      me.modalPersonaSelect = true;
      me.personaSelect = '';
      me.desaparecioSiNo = [];
    },
    close() {
      this.modalAdd = 0;
      this.modaldocumento = false;

      this.limpiar();
    },
    limpiar() {
      this.idMediaAfiliacion = "";
      this.personaSelect = "";
      this.complexion = "";
      this.peso = "";
      this.estatura = "";
      this.formacara = "";
      this.colorojo = "";
      this.tipoOjo2 = "";
      this.tez = "";
      this.formaCabell = "";
      this.colocabello = "";
      this.largocabello = "";
      this.dorsonariz = "";
      this.tamanonariz = "";
      this.v_glabios = "";
      this.v_tfrente = "";
      this.tamanoceja = "";
      this.formaceja = "";
      this.v_tboca = "";
      this.tamanooreja = "";
      this.v_fmenton = "";
      this.tipoojo = "";
      this.numerooficio = "";
      this.v_distrito = "";
      this.v_dirSubPro = "";
      this.v_agencia = "";
      this.v_usuario = "";
      this.v_puesto = "";

      this.lateralidade = "";
      this.pomulo = "";
      this.gruposanguineo = "";
      this.tipocabello = "";
      this.calvicie = "";
      this.tratamientoquimico = "";
      this.aderenciaroreja = "";
      this.formaojo = "";
      this.implantacionceja = "";
      this.puntanariz = "";
      this.cicatriz = false;
      this.tatuaje = false;
      this.textocicatriz = "";
      this.textotatuaje = "";
      this.pupilentes = "";
      this.otrascarac = "";
      this.tamanodental = "";
      this.tratamientodental = "";
      this.dentaduracompleta = true;
      this.dientesausentes = "";
      this.tipodentadura = "";
      this.otrotratamiento = "";
      this.alturanariz = "";
      this.tipomenton = "";

      this.editedIndex = -1;
      this.impirmirIndex = -1;
      this.modalAdd = 0;

      this.imageFile = "";
      this.tiposdocumento = "";
      this.descripciondocumento = "";
      this.imageName = "";
      this.imageUrl = "";
      this.qrCode = null;
      this.vistaPreviaTF = true;

      this.radioManchas = ''
      this.Nicotina = ''
      this.ManchaOtra = ''
      //* LUNARES
      this.radioLunares = ''
      this.CyULunares = ''
      //* CICATRICES
      this.radioCicatrices = ''
      this.CyUTraumatica = ''
      this.quirurgica = ''
      this.tipoCQuirurgicas = ''
      this.numerodeCesarea = ''
      this.orientacionCesarea = ''
      this.operacionMyU = ''
      //* Tatuajes
      this.radioTatuajes = ''
      this.NumeroTatuajes = ''
      this.DescripcionTatuajes = ''
      //* Piercing 
      this.radioPiercing = ''
      this.NumeroPiercing = ''
      this.DescripcionPiercing = ''
      //* Uñas
      this.radioUñas = ''
      this.NoSaludables = ''
      this.unasPostizas = ''
      //* Deformidades
      this.radioDeformidades = ''
      this.radioCongenitas = ''
      this.ubicacionCongenitas = ''
      this.radioAdquiridas = ''
      this.ubicacionAdquiridas = ''
      //* Cavidad Oral
      this.selectProtesis = ''
      this.selectSiProtesis = ''
      this.radioCaracteristicaDental = ''
          
        this.dentadura.map(dd => {
            dd.selected = false
            dd.condition = ''           
        })    
      this.arrayTooth=[]
      //* Informacion Medica
      this.switchTraumatismos = ''
      this.UbiFractura = ''
      this.radioLesiones = ''
      this.comboTipoLesiones = ''
      this.mordedura = ''
      this.OtraLesion = ''
      this.UbiLesiones = ''
      this.switchFacultadesMentales = ''
      this.TRetraso = ''
      this.switchEnfermedadesCronicas = ''
      this.tipoEnfermedad = ''
      this.tiempoDiagnostico = ''
      this.switchTratamiento = ''
      this.medicamentoCronicas = ''
      this.periocidadCronicas = ''
      this.switchAlergias = ''
      this.switchTratamientoAlergia = ''
      this.medicamentoAlergias = ''
      this.periocidadAlergias = ''
      this.switchLentes = ''
      this.radioLentes = ''
      this.lentesGraduacion = ''
      this.switchAparatosAuditivos = ''
      this.ClasPerSelect = ''
      this.PersDSelect = ''
      this.PDesaSelect = ''
      this.error= {nah: 'nah'}
    },
    async editItem(item) {
      this.ClasPerSelect = item.clasificacionPersona
      this.PersDSelect = item.registro
      this.NomPerSelect = item.nombreImputado
      this.idMFD = item.idMediaFiliacionDesaparecido ? item.idMediaFiliacionDesaparecido : ''
      this.idMediaAfiliacion = item.idMediaAfiliacion;

      this.personaSelect = new Object();
      this.personaSelect.text = item.nombreImputado;
      this.personaSelect.value = item.personaId;

      this.complexion = item.complexion;

      this.peso = item.peso;
      this.estatura = item.estatura;

      this.formacara = item.formaCara;

      this.colorojo = item.coloOjos;

      this.tipoOjo2 = item.tipo2Ojos;

      this.tez = item.tez;

      this.tipocabello = item.formaCabello;

      this.colocabello = item.colorCabello;

      this.largocabello = item.largoCabello;

      this.dorsonariz = item.tipoNariz;

      this.alturanariz = item.tamañoNariz;

      this.v_glabios = item.grosorLabios;

      this.v_tfrente = item.tipoFrente;

      this.tamanoceja = item.cejas;

      this.formaceja = item.tipoCejas;

      this.v_tboca = item.tamañoBoca;

      this.tamanooreja = item.tamañoOrejas;

      this.v_fmenton = item.formaMenton;

      this.tipoojo = item.tipoOjo;

      this.v_distrito = item.distrito;
      this.v_dirSubPro = item.dirSubProc;
      this.v_agencia = item.agencia;
      this.v_usuario = item.usuario;
      this.v_puesto = item.puesto;

      this.gruposanguineo = item.gruposanguineo;
      this.calvicie = item.calvicie;
      this.aderenciaroreja = item.adherenciaOreja;
      this.tratamientoquimico = item.tratamientosQuimicosCabello;
      this.formaojo = item.formaOjo;
      this.implantacionceja = item.implantacionCeja;
      this.puntanariz = item.puntaNariz;
      this.tipothisnton = item.tipothisnton;
      this.cicatriz = item.cicatriz;
      this.textocicatriz = item.descripcionCicatriz;
      this.tatuaje = item.tatuaje;
      this.textotatuaje = item.descripcionTatuaje;
      this.otrascarac = item.otrasCaracteristicas;
      this.tamanodental = item.tamanoDental;
      this.tratamientodental = item.tratamientoDental;
      this.dentaduracompleta = item.dentaduraCompleta;
      this.dientesausentes = item.dientesAusentes;
      this.tipodentadura = item.tipoDentadura;
      this.pomulo = item.pomulos;
      this.lateralidade = item.lateralidad;
      this.pupilentes = item.pupilentes2;
      if (item.tratamientoDental == "Otro")
        this.otrotratamiento = item.tratamientoDental;
      this.tipomenton = item.tipoMenton;
      this.numerooficio = item.numerooficio;
      if(this.PersDSelect){
      //VERIFICACION DE CAMPOS VACIOS
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let comprobarMAD = await this.$cat.get("api/Personas/ListarPorId/" + this.personaSelect.value, configuracion);
          let resMAD = comprobarMAD.data
          this.PDesaSelect = resMAD.registro;
          this.clasificacionPersonaSelect = resMAD.clasificacion;
        //? MEDIA FILIACION LARGA
        //* MANCHAS
        this.radioManchas = item.manchas
        this.tipoMancha = item.tipoManchas ? JSON.parse(item.tipoManchas) : []
        this.ManchaOtra = item.manchasOtrasCyU        
        //* LUNARES
        this.radioLunares = item.lunares
        this.CyULunares = item.lunaresCyU
        //* CICATRICES
        this.radioCicatrices = item.cicatrices
        this.TCicatriz = item.tipoCicatrices ? JSON.parse(item.tipoCicatrices) : []
        this.CyUTraumatica = item.cicatricesTraumaticasCyU
        this.tipoCQuirurgicas = item.cicatricesQuirurgicasTipo ? JSON.parse(item.cicatricesQuirurgicasTipo) : ''
        this.numerodeCesarea = item.cicatricesQuirurgicasCesareaNumero
        this.orientacionCesarea = item.cicatricesQuirurgicasCesareaOrientacion
        this.operacionMyU = item.cicatricesQuirurgicasOperacionMyU
        //* Tatuajes
        this.radioTatuajes = item.tatuajes
        this.NumeroTatuajes = item.tatuajesNumero
        this.DescripcionTatuajes = item.tatuajesDescripcion
        //* Piercing 
        this.radioPiercing = item.piercing
        this.NumeroPiercing = item.piercingNumero
        this.DescripcionPiercing = item.piercingDescripcion
        //* Uñas
        this.radioUñas = item.uñasEstado
        this.NoSaludables = item.uñasNoSaludables ? JSON.parse(item.uñasNoSaludables): ''
        this.unasPostizas = item.uñasPostizas
        //* Deformidades
        this.radioDeformidades = item.deformidades
        this.tipoDeformidad = item.tipoDeformidades ? JSON.parse(item.tipoDeformidades) : []
        this.ubicacionCongenitas = item.congenitasUbicacion
        this.ubicacionAdquiridas = item.adquiridasUbicacion
        //* Cavidad Oral
        this.selectProtesis = item.protesisDental
        this.selectSiProtesis = item.protesisDentalUbicacion
        this.radioCaracteristicaDental = item.dentaduraCaracteristicas
        this.editTooth = item.dentaduraDetalles? JSON.parse(item.dentaduraDetalles): ''
        var arrayTooth = item.dentaduraDetalles? JSON.parse(item.dentaduraDetalles):[]
        
        this.arrayTooth = []    
        arrayTooth.map(d => {        
          this.dentadura.map(dd => {
            if(dd.id == d.id){
              dd.selected = true
              dd.condition = d.condition        
              this.arrayTooth.push({
                id: d.id,
                name: d.name,
                condition: d.condition
              })
            }
            
          })    
        }) 
        //* Informacion Medica
        this.switchTraumatismos = item.traumatismos
        this.Ttraumatismo = item.tipoTraumatismos? JSON.parse(item.tipoTraumatismos):[]
        this.UbiFractura = item.ubicacionFracturas
        this.comboTipoLesiones = item.tipoLesiones? JSON.parse(item.tipoLesiones):[]
        this.mordedura = item.causaMordedura
        this.OtraLesion = item.tipoLesionesOtra
        this.UbiLesiones = item.ubicacionLesiones
        this.switchFacultadesMentales = item.facultadesMentales
        this.TRetraso = item.tipoRetraso
        this.switchEnfermedadesCronicas = item.enfermedadesCronicas
        this.tipoEnfermedad = item.enfermedadTipo
        this.tiempoDiagnostico = item.enfermedadTiempoDiagnostico
        this.switchTratamiento = item.tratamientoEnfermedadCronica
        this.medicamentoCronicas = item.tratamientoMedicamento
        this.periocidadCronicas = item.tratamientoPeriocidad
        this.switchAlergias = item.alergias
        this.switchTratamientoAlergia = item.tratamientoAlergia
        this.medicamentoAlergias = item.mdicamentoTratamientoAlergia
        this.periocidadAlergias = item.periocidadTratamientoAlergia
        this.switchLentes = item.lentes
        this.radioLentes = item.tipoLentes
        this.lentesGraduacion = item.lentesGraduacion
        this.switchAparatosAuditivos = item.aparatosAuditivos
        this.oidos = item.oidos
      }
      
      this.editedIndex = 1;
      this.modalAdd = 1;
      this.fechaedit = item.fechaSys;      
    },
    imprimirItem(item) {
      let me = this;
      
      this.PersDSelect = item.registro
      this.personaSelect = new Object();
      this.personanombre = item.nombreImputado;

      this.idMediaAfiliacion = item.idMediaAfiliacion;
      this.personaSelect = item.personaId;

      this.complexion = item.complexion;

      this.peso = item.peso;
      this.estatura = item.estatura;

      this.formacara = item.formaCara;

      this.colorojo = item.coloOjos;

      this.tipoOjo2 = item.tipo2Ojos;
      
      this.tez = item.tez;

      this.tipocabello = item.formaCabello;

      this.colocabello = item.colorCabello;

      this.largocabello = item.largoCabello;

      this.dorsonariz = item.tipoNariz;

      this.alturanariz = item.tamañoNariz;

      this.v_glabios = item.grosorLabios;

      this.v_tfrente = item.tipoFrente;

      this.tamanoceja = item.cejas;

      this.formaceja = item.tipoCejas;

      this.v_tboca = item.tamañoBoca;

      this.tamanooreja = item.tamañoOrejas;

      this.v_fmenton = item.formaMenton;

      this.tipoojo = item.tipoOjo;

      this.v_distrito = item.distrito;
      this.v_dirSubPro = item.dirSubProc;
      this.v_agencia = item.agencia;
      this.v_usuario = item.usuario;
      this.v_puesto = item.puesto;

      this.fechas =
        item.fechaSys.substring(8, 10) +
        " de " +
        this.obtenermes(item.fechaSys.substring(5, 7) - 1) +
        " del " +
        item.fechaSys.substring(0, 4);

      this.numerooficio = item.numerooficio;

      this.gruposanguineo = item.gruposanguineo;
      this.calvicie = item.calvicie;
      this.aderenciaroreja = item.adherenciaOreja;
      this.tratamientoquimico = item.tratamientosQuimicosCabello;
      this.formaojo = item.formaOjo;
      this.implantacionceja = item.implantacionCeja;
      this.puntanariz = item.puntaNariz;
      this.tipothisnton = item.tipothisnton;
      this.cicatriz = item.cicatriz;
      this.textocicatriz = item.descripcionCicatriz;
      this.tatuaje = item.tatuaje;
      this.textotatuaje = item.descripcionTatuaje;
      this.otrascarac = item.otrasCaracteristicas;
      this.tamanodental = item.tamanoDental;
      this.tratamientodental = item.tratamientoDental;
      this.dentaduracompleta = item.dentaduraCompleta;
      this.dientesausentes = item.dientesAusentes;
      this.tipodentadura = item.tipoDentadura;
      this.pomulo = item.pomulos;
      this.lateralidade = item.lateralidad;
      this.pupilentes = item.pupilentes2;
      this.tipomenton = item.tipoMenton;

      if(this.PersDSelect === true)
      {
        
        //? MEDIA FILIACION LARGA
        //* MANCHAS
        this.radioManchas = item.manchas
        this.tipoMancha = item.tipoManchas? JSON.parse(item.tipoManchas): []
        this.ManchaOtra = item.manchasOtrasCyU
        //* LUNARES
        this.radioLunares = item.lunares
        this.CyULunares = item.lunaresCyU
        //* CICATRICES
        this.radioCicatrices = item.cicatrices
        this.TCicatriz = item.tipoCicatrices? JSON.parse(item.tipoCicatrices):[]
        this.CyUTraumatica = item.cicatricesTraumaticasCyU
        this.tipoCQuirurgicas = item.cicatricesQuirurgicasTipo? JSON.parse(item.cicatricesQuirurgicasTipo):''
        this.numerodeCesarea = item.cicatricesQuirurgicasCesareaNumero
        this.orientacionCesarea = item.cicatricesQuirurgicasCesareaOrientacion
        this.operacionMyU = item.cicatricesQuirurgicasOperacionMyU
        //* Tatuajes
        this.radioTatuajes = item.tatuajes
        this.NumeroTatuajes = item.tatuajesNumero
        this.DescripcionTatuajes = item.tatuajesDescripcion
        //* Piercing 
        this.radioPiercing = item.piercing
        this.NumeroPiercing = item.piercingNumero
        this.DescripcionPiercing = item.piercingDescripcion
        //* Uñas
        this.radioUñas = item.uñasEstado
        this.NoSaludables = item.uñasNoSaludables? JSON.parse(item.uñasNoSaludables):''
        this.unasPostizas = item.uñasPostizas
        //* Deformidades
        this.radioDeformidades = item.deformidades
        this.tipoDeformidad = item.tipoDeformidades? JSON.parse(item.tipoDeformidades):[]
        this.ubicacionCongenitas = item.congenitasUbicacion
        this.ubicacionAdquiridas = item.adquiridasUbicacion
        //* Cavidad Oral
        this.selectProtesis = item.protesisDental
        this.selectSiProtesis = item.protesisDentalUbicacion
        this.radioCaracteristicaDental = item.dentaduraCaracteristicas
        this.editTooth = item.dentaduraDetalles? JSON.parse(item.dentaduraDetalles):''
        var arrayTooth = item.dentaduraDetalles? JSON.parse(item.dentaduraDetalles):[]
        
        this.arrayTooth = []    
        arrayTooth.map(d => {        
          this.dentadura.map(dd => {
            if(dd.id == d.id){
              dd.selected = true
              dd.condition = d.condition        
              this.arrayTooth.push({
                    id: d.id,
                    name: d.name,
                    condition: d.condition
                  })
            }
  
          })    
        })
        //* Informacion Medica
        this.switchTraumatismos = item.traumatismos
        this.Ttraumatismo = item.tipoTraumatismos? JSON.parse(item.tipoTraumatismos):[]
        this.UbiFractura = item.ubicacionFracturas
        this.comboTipoLesiones = item.tipoLesiones? JSON.parse(item.tipoLesiones):[]
        this.mordedura = item.causaMordedura
        this.OtraLesion = item.tipoLesionesOtra
        this.UbiLesiones = item.ubicacionLesiones
        this.switchFacultadesMentales = item.facultadesMentales
        this.TRetraso = item.tipoRetraso
        this.switchEnfermedadesCronicas = item.enfermedadesCronicas
        this.tipoEnfermedad = item.enfermedadTipo
        this.tiempoDiagnostico = item.enfermedadTiempoDiagnostico
        this.switchTratamiento = item.tratamientoEnfermedadCronica
        this.medicamentoCronicas = item.tratamientoMedicamento
        this.periocidadCronicas = item.tratamientoPeriocidad
        this.switchAlergias = item.alergias
        this.switchTratamientoAlergia = item.tratamientoAlergia
        this.medicamentoAlergias = item.mdicamentoTratamientoAlergia
        this.periocidadAlergias = item.periocidadTratamientoAlergia
        this.switchLentes = item.lentes
        this.radioLentes = item.tipoLentes
        this.lentesGraduacion = item.lentesGraduacion
        this.switchAparatosAuditivos = item.aparatosAuditivos
        this.oidos = item.oidos
      }

      //Se coloca en false para indicar que no es una vita previa y muestre en QR asi como lo genera
      me.vistaPreviaTF = false;
      me.generarQR(me.docMediaAfil,me.nuc,item.usuario,item.fechaSys,item.idMediaAfiliacion);

      this.modaldocumento = false;
      //Hago la espera de 1 segundo para garantizar la creacion correcta del QR, podria no tenerlo pero mejor prevenir
      setTimeout(() => 
      {
        me.imprimirMediaAfiliacion(item.usuario, item.puesto, item.agencia);
        
      }, 1000);
    },
    async listaMediaAfiliacion() {
    let me = this;
    let header = { Authorization: "Bearer " + this.$store.state.token };
    let configuracion = { headers: header };
    
    try {
      let response = await this.$cat.get("api/MediaAfiliacions/ListarPorRHecho/" + me.rHechoId, configuracion);
      
      let temp = response.data;

      // Usamos `Promise.all` para esperar todas las llamadas a la API
      await Promise.all(
        temp.map(async (x, index) => {
          me.arrayPersona.push(x.personaId);
          if (x.registro === true) {
            try {
              let impResponse = await this.$cat.get("api/MediaFiliacionDesaparecido/ListarPorRHecho/" + x.rHechoId, configuracion);
              if(!impResponse.data)
              {
                temp[index] = {...temp[index], impD: false}
              }else{ 
              impResponse.data.map(ghj =>{                
                if(ghj.personaId == x.personaId){                  
                  temp[index] = {...temp[index], ...ghj, impD: true}
                }
              })
            }
            } catch (error) {
              console.error("Error al obtener MediaFiliacionDesaparecido:", error);
            }
          }else{
            temp[index] = {...temp[index], impD: true}
          }
        })
      );
        me.listaimputados = temp;
    } catch (err) {
      if (err.response.status == 400) {
        me.$notify("No es un usuario válido", "error");
      } else if (err.response.status == 401) {
        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", "error");
        me.e401 = true;
        me.showpage = false;
      } else if (err.response.status == 403) {
        me.$notify("No esta autorizado para ver esta pagina", "error");
        me.e403 = true;
        me.showpage = false;
      } else if (err.response.status == 404) {
        me.$notify("El recurso no ha sido encontrado", "error");
      } else {
        me.$notify("Error al intentar listar los registros!!!", "error");
      }
    }



    },
    verimagen(item) {
      let me = this;
      me.rutaconsulta = item.ruta;
      me.descrip = item.descripcionDocumento;
      me.tipo = item.tipoDocumento;
      me.dialogimagen = true;
    },
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var personasArray = [];
      this.$cat.get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion).then(function (response) {
        
        personasArray = response.data;
        me.personas=[]
        personasArray.map(function (x) { 
          if(!me.arrayPersona.includes(x.personaId))
          {
              if(me.desaparecioSiNo === 1){
                me.personas.push({text:(x.registro === false? x.nombreCompleto: ''), value: x.personaId});
              }    
              else if(me.desaparecioSiNo === 2){
                me.personas.push({text:(x.registro === true? x.nombreCompleto + " - Persona Desaparecida" : ''), value: x.personaId});
              }
          }
          });
          me.personas = me.personas.filter(item => item.text !== '');

              if(me.personas.length == 0 && me.desaparecioSiNo === 2){
                alertify.alert("Notificación","No se ha registrado ninguna persona relacionada con el tema de desaparición, o las personas vinculadas ya cuentan con una Media Filiación como persona desaparecida..",
                  function(){
                    me.$router.push('./victimaidti');
                  });
              } else if(me.personas.length == 0 && me.desaparecioSiNo === 1){
                alertify.alert("Notificación","Las personas registradas ya poseen una Media Filiación.",
                  function(){
                    me.modalPersonaSelect = false;
                  });
              }     
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error");
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    generateUUID: function () {
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
    pickFile() {
      this.removeImage();
      this.$refs.image.click();
    },
    removeImage() {
      this.$refs.image.value = "";
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    consultararchivo(item) {
      let me = this;
      me.dialogpictures = true;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/ArchivosMediaAfiliacion/Listar/" + item.idMediaAfiliacion, configuracion).then(function (response) {
          me.archivos = response.data;
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion).then(function (response) {
          (me.agenciaid = response.data.agenciaid), me.informacionagencia();
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    informacionagencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get("api/Agencias/Listarporid/" + me.agenciaid, configuracion).then(function (response) {
          me.agenciainfo = response.data;
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    loadarchive(item) {
      let me = this;
      me.idmediaAfiliacion = item.idMediaAfiliacion;
      me.dialogarchivo = true;
      me.limpiar();
    },
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.personanombre = me.personaSelect.text;
      var peso;
      if (this.peso != "") peso = this.peso;
      else peso = 0;

      var estatura;
      if (this.estatura != "") estatura = this.estatura;
      else estatura = 0;
      var tratamientodental;
      if (me.tratamientodental == "Otro")
        tratamientodental = me.otrotratamiento;
      else tratamientodental = me.tratamientodental;

      var descripcionRegTabI =
        "Registro de media afiliacion de " + me.personanombre;

        me.$confirm(
            "Esperando confirmación",
            "¿Estás seguro de que deseas guardar la información?",
            async function () {
              let idmediaafiliacion = null;

              try {
                // Realiza la primera petición
                const response1 = await this.$cat.post(
                  "api/MediaAfiliacions/Crear",
                  {
                    personaId: me.personaSelect.value,
                    rHechoId: me.rHechoId,
                    complexion: me.complexion,
                    peso: peso,
                    estatura: estatura,
                    formaCara: me.formacara,
                    coloOjos: me.colorojo,
                    tez: me.tez,
                    formaCabello: me.tipocabello,
                    colorCabello: me.colocabello,
                    largoCabello: me.largocabello,
                    tamañoNariz: me.alturanariz,
                    tipoNariz: me.dorsonariz,
                    grosorLabios: me.v_glabios,
                    tipoFrente: me.v_tfrente,
                    cejas: me.tamanoceja,
                    tipoCejas: me.formaceja,
                    tamañoBoca: me.v_tboca,
                    tamañoOrejas: me.tamanooreja,
                    formaMenton: me.v_fmenton,
                    tipoOjo: me.tipoojo,
                    tipo2Ojos: me.tipoOjo2,
                    distrito: me.u_distrito,
                    dirSubProc: me.u_dirSubPro,
                    agencia: me.u_agencia,
                    usuario: me.u_nombre,
                    puesto: me.u_puesto,
                    numerooficio: me.numerooficio,
                    Gruposanguineo: me.gruposanguineo,
                    Calvicie: me.calvicie,
                    AdherenciaOreja: me.aderenciaroreja,
                    TratamientosQuimicosCabello: me.tratamientoquimico,
                    FormaOjo: me.formaojo,
                    ImplantacionCeja: me.implantacionceja,
                    PuntaNariz: me.puntanariz,
                    TipoMenton: me.tipomenton,
                    Cicatriz: me.cicatriz,
                    DescripcionCicatriz: me.textocicatriz,
                    Tatuaje: me.tatuaje,
                    DescripcionTatuaje: me.textotatuaje,
                    OtrasCaracteristicas: me.otrascarac,
                    TamanoDental: me.tamanodental,
                    TratamientoDental: tratamientodental,
                    DentaduraCompleta: me.dentaduracompleta,
                    DientesAusentes: me.dientesausentes,
                    TipoDentadura: me.tipodentadura,
                    Pomulos: me.pomulo,
                    Lateralidad: me.lateralidade,
                    Pupilentes: me.pupilentes === 'Si tiene' ? true : false,
                    Pupilentes2 : me.pupilentes,
                  },
                  configuracion
                );

                  // Guarda el id de la media afiliación retornado
                  me.idMAD = response1.data;
                // Verifica si se debe realizar la segunda petición
        
                if (me.PDesaSelect) {
                    me.guardarMADesaparecido();
                  }
                  
                  // Si todo es exitoso
                  me.$notify("La información se guardo correctamente !!!", "success");
                  
                  // Actualiza la vista
                  const now = moment();
                  me.vistaPreviaTF = false;
                  me.generarQR(me.docMediaAfil, me.nuc, me.u_nombre, now, idmediaafiliacion);
                  me.modalAdd = 0;
                  me.modaldocumento = false;
                  me.listaMediaAfiliacion();
                  me.crearRegistroTableroI(descripcionRegTabI);
                
                // Espera 1 segundo para garantizar la creación correcta del QR
                setTimeout(() => {
                  me.imprimirMediaAfiliacion(me.u_nombre, me.u_puesto, me.u_agencia);
                }, 1000);
              } catch (error) {
                // Si algo falla, y se creó la primera operación, intenta revertirla
                if (idmediaafiliacion) {
                  try {
                    await me.$CAT.delete('api/MediaAfiliacions/eliminarMFporID/'+ me.idMAD, configuracion);
                    me.modalAdd = 0;
                    me.modaldocumento = false;
                  } catch (deleteError) {
                  }
                }
              }
            },
            function () {
              alertify.warning("Verifica la información");
            }
          ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    guardarMADesaparecido(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
        try{
            this.$cat.post("api/MediaFiliacionDesaparecido/Crear",
              {
                MediaFiliacionId: me.idMAD,
                //? Manchas
                Manchas: me.radioManchas,
                TipoManchas: JSON.stringify(me.tipoMancha),
                ManchasOtrasCyU: me.ManchaOtra,
                //? Lunares
                Lunares: me.radioLunares,
                LunaresCyU: me.CyULunares,
                //? Cicatrices
                Cicatrices: me.radioCicatrices,
                CicatricesTraumaticasCyU: me.CyUTraumatica,
                TipoCicatrices: JSON.stringify(me.TCicatriz),
                CicatricesQuirurgicasTipo: JSON.stringify(me.tipoCQuirurgicas),
                CicatricesQuirurgicasCesareaNumero: me.numerodeCesarea,
                CicatricesQuirurgicasCesareaOrientacion: me.orientacionCesarea,
                CicatricesQuirurgicasOperacionMyU: me.operacionMyU,
                //? Tatuajes
                Tatuajes: me.radioTatuajes,
                TatuajesNumero: me.NumeroTatuajes,
                TatuajesDescripcion: me.DescripcionTatuajes,
                //? Piercing 
                Piercing: me.radioPiercing,
                PiercingNumero: me.NumeroPiercing,
                PiercingDescripcion: me.DescripcionPiercing,
                //? Uñas
                UñasEstado: me.radioUñas,
                UñasNoSaludables: JSON.stringify(me.NoSaludables),
                UñasPostizas: me.unasPostizas,
                //? Deformidades
                Deformidades: me.radioDeformidades,
                TipoDeformidades: JSON.stringify(me.tipoDeformidad),
                CongenitasUbicacion: me.ubicacionCongenitas,
                AdquiridasUbicacion: me.ubicacionAdquiridas,
                //? Cavidad Oral
                ProtesisDental: me.selectProtesis,
                ProtesisDentalUbicacion: me.selectSiProtesis,
                DentaduraCaracteristicas: me.radioCaracteristicaDental,
                DentaduraDetalles: JSON.stringify(me.arrayTooth),
                //? Informacion Medica
                //*TRAUMATISMOS
                Traumatismos: me.switchTraumatismos,
                TipoTraumatismos: JSON.stringify(me.Ttraumatismo),
                UbicacionFracturas: me.UbiFractura,
                TipoLesiones: JSON.stringify(me.comboTipoLesiones),
                CausaMordedura: me.mordedura,
                TipoLesionesOtra: me.OtraLesion,
                UbicacionLesiones: me.UbiLesiones,
                //*FACULTADES MENTALES
                FacultadesMentales: me.switchFacultadesMentales,
                TipoRetraso: me.TRetraso,
                //*ENFERMEDADES CRONICAS
                EnfermedadesCronicas: me.switchEnfermedadesCronicas,
                EnfermedadTipo: me.tipoEnfermedad,
                EnfermedadTiempoDiagnostico: me.tiempoDiagnostico,
                TratamientoEnfermedadCronica: me.switchTratamiento,
                TratamientoMedicamento: me.medicamentoCronicas,
                TratamientoPeriocidad: me.periocidadCronicas,
                //*ALERGIAS
                Alergias: me.switchAlergias,
                TratamientoAlergia: me.switchTratamientoAlergia,
                MdicamentoTratamientoAlergia: me.medicamentoAlergias,
                PeriocidadTratamientoAlergia: me.periocidadAlergias,
                //*LENTES
                Lentes: me.switchLentes,
                TipoLentes: me.radioLentes,
                LentesGraduacion: me.lentesGraduacion,
                //* APARATOS AUDITIVOS
                AparatosAuditivos: me.switchAparatosAuditivos,
                Oidos: me.oidos,
              },configuracion);
            } catch (err) {
                // Manejo de errores
                if (err.response.status == 400) {
                  me.$notify("No es un usuario válido", "error");
                } else if (err.response.status == 401) {
                  me.$notify(
                    "Por favor inicie sesión para poder navegar en la aplicación",
                    "error"
                  );
                  me.e401 = true;
                  me.showpage = false;
                } else if (err.response.status == 403) {
                  me.$notify("No está autorizado para ver esta página", "error");
                  me.e403 = true;
                  me.showpage = false;
                } else if (err.response.status == 404) {
                  me.$notify("El recurso no ha sido encontrado", "error");
                } else {
                  me.$notify(
                    "Error al intentar actualizar el registro!!!",
                    "error"
                  );
              }
        }
    },
    actualizar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.personanombre = me.personaSelect.text;
      var tratamientodental;
      if (me.tratamientodental == "Otro")
        tratamientodental = me.otrotratamiento;
      else tratamientodental = me.tratamientodental;

      me.$confirm(
          "Esperando confirmación",
          "¿Estás seguro de que deseas actualizar la información?",
          async function () {
            try {
              // Primera solicitud
              const response1 = await this.$cat.put("api/MediaAfiliacions/Actualizar", {
                idMediaAfiliacion: me.idMediaAfiliacion,
                personaId: me.personaSelect.value,
                rHechoId: me.rHechoId,
                complexion: me.complexion,
                peso: me.peso,
                estatura: me.estatura,
                formaCara: me.formacara,
                coloOjos: me.colorojo,
                tez: me.tez,
                formaCabello: me.tipocabello,
                colorCabello: me.colocabello,
                largoCabello: me.largocabello,
                tamañoNariz: me.alturanariz,
                tipoNariz: me.dorsonariz,
                grosorLabios: me.v_glabios,
                tipoFrente: me.v_tfrente,
                cejas: me.tamanoceja,
                tipoCejas: me.formaceja,
                tamañoBoca: me.v_tboca,
                tamañoOrejas: me.tamanooreja,
                formaMenton: me.v_fmenton,
                tipoOjo: me.tipoojo,
                tipo2Ojos: me.tipoOjo2,
                Gruposanguineo: me.gruposanguineo,
                Calvicie: me.calvicie,
                AdherenciaOreja: me.aderenciaroreja,
                TratamientosQuimicosCabello: me.tratamientoquimico,
                FormaOjo: me.formaojo,
                ImplantacionCeja: me.implantacionceja,
                PuntaNariz: me.puntanariz,
                TipoMenton: me.tipomenton,
                Cicatriz: me.cicatriz,
                DescripcionCicatriz: me.textocicatriz,
                Tatuaje: me.tatuaje,
                DescripcionTatuaje: me.textotatuaje,
                OtrasCaracteristicas: me.otrascarac,
                TamanoDental: me.tamanodental,
                TratamientoDental: tratamientodental,
                DentaduraCompleta: me.dentaduracompleta,
                DientesAusentes: me.dientesausentes,
                TipoDentadura: me.tipodentadura,
                Pomulos: me.pomulo,
                Lateralidad: me.lateralidade,
                Pupilentes: me.pupilentes === 'Si tiene' ? true : false,
                Pupilentes2 : me.pupilentes,
              }, configuracion);

              me.idMAD = response1.data;

              let comprobacionMediaAF = await this.$cat.get("api/MediaFiliacionDesaparecido/ComprobarMADesaparecido/" + me.idMAD, configuracion);
              let ExistenciaMAD = comprobacionMediaAF.data;
              // Si la primera solicitud es exitosa, PersDSelect y ExistenciaMAD es verdadero, ejecuta la segunda solicitud
              if (me.PersDSelect && ExistenciaMAD.ner) {
                  me.actualizarMADesaparecido();
              }
              else if(me.PersDSelect && !ExistenciaMAD.ner)
              {
                me.guardarMADesaparecido();
              }

              // Notificación de éxito
              me.$notify("La información se actualizó correctamente !!!", "success");
              me.listaMediaAfiliacion();
              
              me.vistaPreviaTF = false;
              me.generarQR(me.docMediaAfil, me.nuc, me.u_nombre, me.fechaedit, me.idMediaAfiliacion);
              me.modalAdd = 0;
              me.modaldocumento = false;
              
              setTimeout(() => {
                me.imprimirMediaAfiliacion(me.u_nombre, me.u_puesto, me.u_agencia);
              }, 1000);
              // me.PersDSelect = ''
              // me.ClasPerSelect = ''

            } catch (err) {
              // Manejo de errores
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", "error");
              } else if (err.response.status == 401) {
                me.$notify(
                  "Por favor inicie sesión para poder navegar en la aplicación",
                  "error"
                );
                me.e401 = true;
                me.showpage = false;
              } else if (err.response.status == 403) {
                me.$notify("No está autorizado para ver esta página", "error");
                me.e403 = true;
                me.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recurso no ha sido encontrado", "error");
              } else {
                me.$notify(
                  "Error al intentar actualizar el registro!!!",
                  "error"
                );
              }
            }
          },
          function () {
            alertify.warning("Verifica la información");
          }
        ).set("labels", { ok: "Actualizar", cancel: "Cancelar" });
    },
    actualizarMADesaparecido(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      // Si la primera solicitud es exitosa y PersDSelect es verdadero, ejecuta la segunda solicitud
          try{
            this.$cat.put("api/MediaFiliacionDesaparecido/Actualizar", {
                  IdMediaFiliacionDesaparecido: me.idMFD,
                  MediaFiliacionId: me.idMAD,
                  //? Manchas
                  Manchas: me.radioManchas,
                  TipoManchas: JSON.stringify(me.tipoMancha),
                  ManchasOtrasCyU: me.ManchaOtra,
                  //? Lunares
                  Lunares: me.radioLunares,
                  LunaresCyU: me.CyULunares,
                  //? Cicatrices
                  Cicatrices: me.radioCicatrices,
                  TipoCicatrices: JSON.stringify(me.TCicatriz),
                  CicatricesTraumaticasCyU: me.CyUTraumatica,
                  CicatricesQuirurgicasTipo: JSON.stringify(me.tipoCQuirurgicas),
                  CicatricesQuirurgicasCesareaNumero: me.numerodeCesarea,
                  CicatricesQuirurgicasCesareaOrientacion: me.orientacionCesarea,
                  CicatricesQuirurgicasOperacionMyU: me.operacionMyU,
                  //? Tatuajes
                  Tatuajes: me.radioTatuajes,
                  TatuajesNumero: me.NumeroTatuajes,
                  TatuajesDescripcion: me.DescripcionTatuajes,
                  //? Piercing 
                  Piercing: me.radioPiercing,
                  PiercingNumero: me.NumeroPiercing,
                  PiercingDescripcion: me.DescripcionPiercing,
                  //? Uñas
                  UñasEstado: me.radioUñas,
                  UñasNoSaludables: JSON.stringify(me.NoSaludables),
                  UñasPostizas: me.unasPostizas,
                  //? Deformidades
                  Deformidades: me.radioDeformidades,
                  TipoDeformidades: JSON.stringify(me.tipoDeformidad),
                  CongenitasUbicacion: me.ubicacionCongenitas,
                  AdquiridasUbicacion: me.ubicacionAdquiridas,
                  //? Cavidad Oral
                  ProtesisDental: me.selectProtesis,
                  ProtesisDentalUbicacion: me.selectSiProtesis,
                  DentaduraCaracteristicas: me.radioCaracteristicaDental,
                  DentaduraDetalles: JSON.stringify(me.arrayTooth),
                  //? Informacion Medica
                  //*TRAUMATISMOS
                  Traumatismos: me.switchTraumatismos,
                  TipoTraumatismos: JSON.stringify(me.Ttraumatismo),
                  UbicacionFracturas: me.UbiFractura,
                  TipoLesiones: JSON.stringify(me.comboTipoLesiones),
                  CausaMordedura: me.mordedura,
                  TipoLesionesOtra: me.OtraLesion,
                  UbicacionLesiones: me.UbiLesiones,
                  //*FACULTADES MENTALES
                  FacultadesMentales: me.switchFacultadesMentales,
                  TipoRetraso: me.TRetraso,
                  //*ENFERMEDADES CRONICAS
                  EnfermedadesCronicas: me.switchEnfermedadesCronicas,
                  EnfermedadTipo: me.tipoEnfermedad,
                  EnfermedadTiempoDiagnostico: me.tiempoDiagnostico,
                  TratamientoEnfermedadCronica: me.switchTratamiento,
                  TratamientoMedicamento: me.medicamentoCronicas,
                  TratamientoPeriocidad: me.periocidadCronicas,
                  //*ALERGIAS
                  Alergias: me.switchAlergias,
                  TratamientoAlergia: me.switchTratamientoAlergia,
                  MdicamentoTratamientoAlergia: me.medicamentoAlergias,
                  PeriocidadTratamientoAlergia: me.periocidadAlergias,
                  //*LENTES
                  Lentes: me.switchLentes,
                  TipoLentes: me.radioLentes,
                  LentesGraduacion: me.lentesGraduacion,
                  //* APARATOS AUDITIVOS
                  AparatosAuditivos: me.switchAparatosAuditivos,
                  Oidos: me.oidos,
                }, configuracion);
          }catch (err) {
              // Manejo de errores
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", "error");
              } else if (err.response.status == 401) {
                me.$notify(
                  "Por favor inicie sesión para poder navegar en la aplicación",
                  "error"
                );
                me.e401 = true;
                me.showpage = false;
              } else if (err.response.status == 403) {
                me.$notify("No está autorizado para ver esta página", "error");
                me.e403 = true;
                me.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recurso no ha sido encontrado", "error");
              } else {
                me.$notify(
                  "Error al intentar actualizar el registro!!!",
                  "error"
                );
              }
            }        
    },
    crearRegistroTableroI(descripcionRegTabI) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      this.$cat.post(
          "api/RegistroTableroI/Crear",
          {
            RhechoId: me.rHechoId,
            TipoRegistroTableroI: descripcionRegTabI,
            Distrito: me.u_distrito,
            DirSub: me.u_dirSubPro,
            Agencia: me.u_agencia,
            ModuloServicioId: me.u_idmoduloservicio,
            Modulo: me.u_modulo,
            UsuarioId: me.u_idusuario,
            NombreUsuario: me.u_nombre,
          },configuracion).then(function (response) {
          me.$notify("La información se guardo correctamente !!!", "success");
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar crear el  registro!!!", "error");
          }
        });
    },
    listarcomplexion() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Complexion/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.complexiontipo.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarFormacara() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Forma_de_Cara/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.formacaras.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarColorojos() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Color_Ojos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.Colorojos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartez() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tez/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.Tez.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarformacabello() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Forma_de_cabello/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tipocabellos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarcolorcabello() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Color_de_Cabellos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.colorcabellos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarlargocabello() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Largo_de_Cabello/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.largocabellos.push(x.dato);
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartamañonariz() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tamaño_Nariz/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.alturanarices.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartiponariz() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/TipoNariz/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.dorsonarices.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listargrosorlabios() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Grosor_de_labios/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.grosorlabios.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipofrente() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tipo_de_Frente/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tipofrente.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipocejas() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Cejas/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tamanocejas.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarformacejas() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tipo_de_Cejas/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.formacejas.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartamañoboca() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tamaño_de_Boca/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tamañoboca.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipoorejas() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Tipo_de_Orejas/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tamanoorejas.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarformamenton() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Forma_de_Menton/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.formamenton.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listartipoojos() {
      var indiciosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/TipoOjos/Listar", configuracion).then(function (response) {
          indiciosarray = response.data;
          indiciosarray.map(function (x) {
            me.tipoojos.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    guardarArchivo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$validator.validateAll("dialogodocs").then((result) => {
        if (result) {
          var nombreCarpeta;
          if (me.imageFile) {
            let formData = new FormData();
            formData.append("file", me.imageFile);
            nombreCarpeta = "C" + me.nuc.substr(1);
            me.GUID = me.generateUUID();

            this.$cat.post("api/ArchivosMediaAfiliacion/Post/" + nombreCarpeta + "/" + me.GUID, formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }, configuracion).then(function (response) {
                this.$cat.post(
                    "api/ArchivosMediaAfiliacion/Crear",
                    {
                      MediaAfiliacionid: me.idmediaAfiliacion,
                      tipoDocumento: me.tiposdocumento.text,
                      descripcionDocumento: me.descripciondocumento,
                      puesto: "na",
                      ruta: response.data.ruta,
                      UDistrito: me.u_distrito,
                      USubproc: me.u_dirSubPro,
                      UAgencia: me.u_agencia,
                      UUsuario: me.u_nombre,
                      UPuesto: me.u_puesto,
                      UModulo: me.u_modulo,
                    },configuracion).then(function (response) {
                    me.$notify(
                      "La información se guardo correctamente !!!",
                      "success"
                    );
                    me.dialogarchivo = false;
                    me.listar();
                    me.limpiar();
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
                      me.$notify(
                        "No esta autorizado para ver esta pagina",
                        "error"
                      );
                      me.e403 = true;
                      me.showpage = false;
                    } else if (err.response.status == 404) {
                      me.$notify("El recuso no ha sido encontrado", "error");
                    } else {
                      me.$notify(
                        "Error al intentar crear el  registro!!!",
                        "error"
                      );
                    }
                  });
              })
              .catch(function () {
              });
          }
        }
      });
    },
    downloadPdf(nombre, puesto, agencia) {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var dirsubproc = this.v_dirSubPro;
      var agencia = this.v_agencia;
      var u_subProc = this.u_subproc;
      var nuc = this.nuc;

      var pupilente, cicatriz, tatuaje, dentaduracompleta;

      pupilente = this.pupilentes;
      

      if (this.cicatriz) cicatriz = "Si";
      else cicatriz = "No";

      if (this.tatuaje) tatuaje = "Si";
      else tatuaje = "No";

      if (this.dentaduracompleta) dentaduracompleta = "Si";
      else dentaduracompleta = "No";
      //------------------------------------
      var peso,
        estatura,
        gruposanguineo,
        complexion,
        tez,
        formacara,
        tipoojo,
        formaojo,
        colorojo,
        formaCabell,
        tipocabello,
        colocabello,
        calvicie,
        largocabell,
        tratamientoquimico;

        if(this.largocabello == '') largocabell = ''
        else largocabell = this.largocabello

      if (this.peso == "") peso = 0;
      else peso = this.peso;

      if (this.estatura == "") estatura = 0;
      else estatura = this.estatura;

      if (this.gruposanguineo == "") gruposanguineo = " ";
      else gruposanguineo = this.gruposanguineo;

      if (this.complexion == "") complexion = " ";
      else complexion = this.complexion;

      if (this.tez == "") tez = " ";
      else tez = this.tez;

      if (this.formacara == "") formacara = " ";
      else formacara = this.formacara;

      if (this.tipoojo == "") tipoojo = " ";
      else tipoojo = this.tipoojo;

      if (this.formaojo == "") formaojo = " ";
      else formaojo = this.formaojo;

      if (this.colorojo == "") colorojo = " ";
      else colorojo = this.colorojo;

      if (this.formaCabell == "") formaCabell = " ";
      else formaCabell = this.formaCabell;

      if (this.tipocabello == "") tipocabello = " ";
      else tipocabello = this.tipocabello;

      if (this.colocabello == "") colocabello = " ";
      else colocabello = this.colocabello;

      if (this.calvicie == "") calvicie = " ";
      else calvicie = this.calvicie;

      if (this.tratamientoquimico == "") tratamientoquimico = " ";
      else tratamientoquimico = this.tratamientoquimico;

      var tamanooreja,
        aderenciaroreja,
        tamanoceja,
        formaceja,
        implantacionceja,
        alturanariz,
        dorsonariz,
        puntanariz,
        v_tboca,
        v_glabios,
        v_tfrente,
        lateralidade,
        pomulo,
        tamanodental,
        tratamientodental,
        tipodentadura,
        v_fmenton,
        tipomenton;

      if (this.tamanooreja == "") tamanooreja = " ";
      else tamanooreja = this.tamanooreja;

      if (this.aderenciaroreja == "") aderenciaroreja = " ";
      else aderenciaroreja = this.aderenciaroreja;

      if (this.tamanoceja == "") tamanoceja = " ";
      else tamanoceja = this.tamanoceja;

      if (this.formaceja == "") formaceja = " ";
      else formaceja = this.formaceja;

      if (this.implantacionceja == "") implantacionceja = " ";
      else implantacionceja = this.implantacionceja;

      if (this.alturanariz == "") alturanariz = " ";
      else alturanariz = this.alturanariz;

      if (this.dorsonariz == "") dorsonariz = " ";
      else dorsonariz = this.dorsonariz;

      if (this.puntanariz == "") puntanariz = " ";
      else puntanariz = this.puntanariz;

      if (this.v_tboca == "") v_tboca = " ";
      else v_tboca = this.v_tboca;

      if (this.v_glabios == "") v_glabios = " ";
      else v_glabios = this.v_glabios;

      if (this.v_tfrente == "") v_tfrente = " ";
      else v_tfrente = this.v_tfrente;

      if (this.lateralidade == "") lateralidade = " ";
      else lateralidade = this.lateralidade;

      if (this.pomulo == "") pomulo = " ";
      else pomulo = this.pomulo;

      if (this.tratamientodental == "") tratamientodental = " ";
      else if (this.tratamientodental != "Otro")
        tratamientodental = this.tratamientodental;
      else tratamientodental = this.otrotratamiento;

      if (this.v_fmenton == "") v_fmenton = " ";
      else v_fmenton = this.v_fmenton;

      if (this.tipomenton == "") tipomenton = " ";
      else tipomenton = this.tipomenton;

      if (this.tamanodental == "") tamanodental = " ";
      else tamanodental = this.tamanodental;

      if (!this.dentaduracompleta)
        if (this.tipodentadura == "") tipodentadura = " ";
        else tipodentadura = this.tipodentadura;


        let body = []
        let bodyLargo = []
        body.push(
          
                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Peso",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Estatura",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Grupo sanguíneo",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: peso + " Kg" },
                  { style: "Texto", text: estatura + " m" },
                  { style: "Texto", text: gruposanguineo },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Complexión",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Tez",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Forma de la cara",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: complexion },
                  { style: "Texto", text: tez },
                  { style: "Texto", text: formacara },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Ojos",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tipoojo },
                  {
                    style: "Texto", text: "Forma" + "\n\n" + formaojo,
                  },
                  { style: "Texto", text: "Tipo" + "\n\n" + this.tipoOjo2 },
                ],
                [
                  { style: "Texto", text: "Color" + "\n\n" + colorojo },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Pupilente" + "\n\n" + pupilente,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Cabello",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Longitud" + "\n\n" + largocabell},
                  { style: "Texto", text: "Tipo" + "\n\n" + tipocabello },
                  { style: "Texto", text: "Color" + "\n\n" + colocabello },
                ],
                [
                  { style: "Texto", text: "Calvicie" + "\n\n" + calvicie },
                  {
                    style: "Texto",
                    text: "Tratamientos químicos" + "\n\n" + tratamientoquimico,
                    colSpan: 2,
                  },
                  "",
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Orejas",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tamanooreja },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Adherencia" + "\n\n" + aderenciaroreja,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Ceja",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tamanoceja },
                  { style: "Texto", text: "Forma" + "\n\n" + formaceja },
                  {
                    style: "Texto",
                    text: "Implantación" + "\n\n" + implantacionceja,
                  },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Nariz",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Altura" + "\n\n" + alturanariz },
                  { style: "Texto", text: "Dorso" + "\n\n" + dorsonariz },
                  { style: "Texto", text: "Punta" + "\n\n" + puntanariz },
                ],

                [
                  {
                    colSpan: 1,
                    style: "Titulo",
                    text: "Boca",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    colSpan: 2,
                    style: "Titulo",
                    text: "Labios",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                ],
                [
                  { style: "Texto", text: v_tboca },
                  { colSpan: 2, style: "Texto", text: v_glabios },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Mentón",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Forma" + "\n\n" + v_fmenton },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Tipo" + "\n\n" + tipomenton,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Frente",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Lateralidad",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Pómulos",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: v_tfrente },
                  { style: "Texto", text: lateralidade },
                  { style: "Texto", text: pomulo },
                ],
                [{
                            style: "Titulo",
                            colSpan: 3,
                            text: "Señas particulares",
                            fillColor: "#eeeeee",
                            fontSize: 10,
                            bold: true,
                            alignment: "center",
                          },"",""
                  ],
                  [{
                      colSpan: 3,
                      style: "Texto",
                      text: "Cicatrices: " + cicatriz + "\n\n" + this.textocicatriz + "\n\n" + "Tatuajes: " + tatuaje + "\n\n" + this.textotatuaje + "\n\n" + "Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades, perforaciones, manchas, bigote, barba, fracturas, prótesis etc.): " +
                        "\n\n" + this.otrascarac + "\n\n" + "Tamaño dental: " + "\n\n" + tamanodental + "\n\n" + "Tratamiento dental: " + "\n\n" + tratamientodental + "\n\n" + "Dentadura completa: " + "\n\n" + dentaduracompleta +
                        "\n\n" + (!this.dentaduracompleta ? "Dientes ausentes: " + "\n\n" + this.dientesausentes + "\n\n" : "") + (!this.dentaduracompleta ? "Tipo de dentadura: " + "\n\n" + tipodentadura + "\n\n" : ""),
                    },{},{}
                  ]
        )
        bodyLargo.push(
          
                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Peso",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Estatura",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Grupo sanguíneo",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: peso + " Kg" },
                  { style: "Texto", text: estatura + " m" },
                  { style: "Texto", text: gruposanguineo },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Complexión",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Tez",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Forma de la cara",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: complexion },
                  { style: "Texto", text: tez },
                  { style: "Texto", text: formacara },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Ojos",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tipoojo },
                  {
                    style: "Texto", text: "Forma" + "\n\n" + formaojo,
                  },
                  { style: "Texto", text: "Tipo" + "\n\n" + this.tipoOjo2 },
                ],
                [
                  { style: "Texto", text: "Color" + "\n\n" + colorojo },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Pupilente" + "\n\n" + pupilente,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Cabello",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Longitud" + "\n\n" + largocabell },
                  { style: "Texto", text: "Tipo" + "\n\n" + tipocabello },
                  { style: "Texto", text: "Color" + "\n\n" + colocabello },
                ],
                [
                  { style: "Texto", text: "Calvicie" + "\n\n" + calvicie },
                  {
                    style: "Texto",
                    text: "Tratamientos químicos" + "\n\n" + tratamientoquimico,
                    colSpan: 2,
                  },
                  "",
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Orejas",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {},
                  {},
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tamanooreja },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Adherencia" + "\n\n" + aderenciaroreja,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Ceja",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Tamaño" + "\n\n" + tamanoceja },
                  { style: "Texto", text: "Forma" + "\n\n" + formaceja },
                  {
                    style: "Texto",
                    text: "Implantación" + "\n\n" + implantacionceja,
                  },
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Nariz",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Altura" + "\n\n" + alturanariz },
                  { style: "Texto", text: "Dorso" + "\n\n" + dorsonariz },
                  { style: "Texto", text: "Punta" + "\n\n" + puntanariz },
                ],

                [
                  {
                    colSpan: 1,
                    style: "Titulo",
                    text: "Boca",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    colSpan: 2,
                    style: "Titulo",
                    text: "Labios",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                ],
                [
                  { style: "Texto", text: v_tboca },
                  { colSpan: 2, style: "Texto", text: v_glabios },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Mentón",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Forma" + "\n\n" + v_fmenton },
                  {
                    colSpan: 2,
                    style: "Texto",
                    text: "Tipo" + "\n\n" + tipomenton,
                  },
                  {},
                ],

                [
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Frente",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Lateralidad",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                  {
                    style: "Titulo",
                    colSpan: 1,
                    text: "Pómulos",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },
                ],
                [
                  { style: "Texto", text: v_tfrente },
                  { style: "Texto", text: lateralidade },
                  { style: "Texto", text: pomulo },
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Manchas",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },"",""
                ],
                [
                  {
                    colSpan: 1,
                    style: "Texto",
                    text: "Manchas" + "\n\n" + this.radioManchas
                  },
                  {
                    colSpan: 1,
                    style: "Texto",
                    text: "Tipos de Manchas" + "\n\n" + (this.radioManchas && !this.radioManchas.includes('Si tiene') ? '-----------' : this.tipoMancha)
                  },
                  {
                    colSpan: 1,
                    style: "Texto",
                    text: "Otras Manchas" + "\n\n" + ((this.radioManchas && !this.radioManchas.includes('Si tiene') || !this.tipoMancha.includes('Otra'))? '-----------' : this.ManchaOtra)
                  }
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Lunares",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  },{},{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Lunares \n\n" + this.radioLunares
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Color y Ubicación \n\n" + (this.radioLunares && !this.radioLunares.includes('Si tiene') ? '-----------' : this.CyULunares)
                  },{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Cicatrices",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Cicatrices \n\n" + this.radioCicatrices
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Tipo de Cicatrices \n\n" + (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene') ? '-----------' : this.TCicatriz)
                  },
                  {}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Traumáticas Color y Ubicacion \n\n" + (((this.TCicatriz && !this.TCicatriz.includes('Traumaticas')) || (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene'))) ? '-----------' : this.CyUTraumatica) 
                  },
                  {},{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Tipo de Cicatrices Quirúrgicas \n\n" + (((this.TCicatriz && !this.TCicatriz.includes('Quirúrgicas')) || (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene'))) ? '-----------' : this.tipoCQuirurgicas) 
                  },
                  {
                    style:"Texto",
                    colSpan:2,
                    text:"Motivo y Ubicación de la Operación \n\n" + (((this.TCicatriz && !this.TCicatriz.includes('Quirúrgicas')) || (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene')) || (this.tipoCQuirurgicas && !this.tipoCQuirurgicas.includes('Operación'))) ? '-----------' : this.operacionMyU) 
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Orientación de la Cesárea \n\n" + (((this.TCicatriz && !this.TCicatriz.includes('Quirúrgicas')) || (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene')) || (this.tipoCQuirurgicas && !this.tipoCQuirurgicas.includes('Cesárea'))) ? '-----------' : this.orientacionCesarea) 
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Número de Partos \n\n" + (((this.TCicatriz && !this.TCicatriz.includes('Quirúrgicas')) || (this.radioCicatrices && !this.radioCicatrices.includes('Si tiene')) || (this.tipoCQuirurgicas && !this.tipoCQuirurgicas.includes('Cesárea'))) ? '-----------' : this.numerodeCesarea)  
                  },{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Tatuajes",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Tatuajes \n\n" + this.radioTatuajes
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Número de Tatuajes \n\n" + (this.radioTatuajes && !this.radioTatuajes.includes('Si tiene') ? '------------' : this.NumeroTatuajes)
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Descripción(Forma, ubicación, color) \n\n" + (this.radioTatuajes && !this.radioTatuajes.includes('Si tiene') ? '------------' : this.DescripcionTatuajes) 
                  },
                  {},{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Piercing",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Piercing \n\n" + this.radioPiercing
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Número de Piercing \n\n" + (this.radioPiercing && !this.radioPiercing.includes('Si tiene') ? '-----------' : this.NumeroPiercing)
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Descripción(Forma, ubicación, color) \n\n" + (this.radioPiercing && !this.radioPiercing.includes('Si tiene') ? '-----------' : this.DescripcionPiercing)
                  },
                  {},{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Uñas",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Estado de las Uñas \n\n" + this.radioUñas
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Uñas Postizas \n\n" + this.unasPostizas
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"No Saludables \n\n" + (this.radioUñas && !this.radioUñas.includes('No Saludable') ? '-----------' : this.NoSaludables)
                  },
                  {},{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Deformidades",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Deformidades \n\n" + this.radioDeformidades
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Tipo de Deformidades \n\n" + (this.radioDeformidades && !this.radioDeformidades.includes('Si tiene') ? '-----------' : this.tipoDeformidad)
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Ubicación de Deformidades Congenitas \n\n" + (((this.radioDeformidades && !this.radioDeformidades.includes('Si tiene')) || (this.tipoDeformidad && !this.tipoDeformidad.includes('Congénitas'))) ? '-----------' : this.ubicacionCongenitas) 
                  },
                  {},{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Ubicación de Deformidades Adquiridas \n\n" + (((this.radioDeformidades && !this.radioDeformidades.includes('Si tiene')) || (this.tipoDeformidad && !this.tipoDeformidad.includes('Adquiridas'))) ? '-----------' : this.ubicacionAdquiridas)  
                  },
                  {},{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Cavidad Oral",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Prótesis Dental \n\n" + this.selectProtesis
                  },
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Orientación de Prótesis Dental \n\n" + (this.selectProtesis && !this.selectProtesis.includes('Si tiene') ? '-----------' : this.selectSiProtesis)
                  },
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"¿Conoce alguna características de los dientes? \n\n" + this.radioCaracteristicaDental
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Características de los dientes \n\n" + (this.radioCaracteristicaDental && !this.radioCaracteristicaDental.includes('Si tiene') ? '-----------' : (this.arrayTooth.map((x) =>{return(x.name + ': ' + x.condition + "\n")}))) 
                    // text:"Características de los dientes \n\n" + (!this.radioCaracteristicaDental.includes('Si tiene') ? '-----------' : (this.PersDSelect === true ? (this.editTooth.map((a) =>{return(a.name + ': ' + a.condition + '\n')})) : (this.PDesaSelect === true ? this.arrayTooth.map((x) =>{return(x.name + ': ' + x.condition + "\n")}) : ''))) 
                  },{},{}
                ],
                [
                  {
                    style: "Titulo",
                    colSpan: 3,
                    text: "Información Médica",
                    fillColor: "#eeeeee",
                    fontSize: 10,
                    bold: true,
                    alignment: "center",
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Traumatismos \n\n" + this.switchTraumatismos
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Tipo de Traumatismos \n\n" + (this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene') ? '-----------' : this.Ttraumatismo)
                  },
                  {}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 3,
                    text:"Ubicación de Fractura \n\n" + (((this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene')) || (this.Ttraumatismo && !this.Ttraumatismo.includes('Fracturas'))) ? '-----------' : this.UbiFractura) 
                  },{},{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Tipo de Lesiones \n\n" + (((this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene')) || (this.Ttraumatismo && !this.Ttraumatismo.includes('Lesiones'))) ? '-----------' : this.comboTipoLesiones)  
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Ubicación de Lesiones \n\n" + (((this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene')) || (this.Ttraumatismo && !this.Ttraumatismo.includes('Lesiones'))) ? '-----------' : this.UbiLesiones)   
                  }
                  ,{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Otra Lesión \n\n" + (((this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene')) || (this.Ttraumatismo && !this.Ttraumatismo.includes('Lesiones')) || (this.comboTipoLesiones && !this.comboTipoLesiones.includes('Otra'))) ? '-----------' : this.OtraLesion)    
                  },
                  {
                    style:"Texto",
                    colSpan: 2,
                    text:"Mordedura causada por \n\n" + (((this.switchTraumatismos && !this.switchTraumatismos.includes('Si tiene')) || (this.Ttraumatismo && !this.Ttraumatismo.includes('Lesiones')) || (this.comboTipoLesiones && !this.comboTipoLesiones.includes('Mordedura'))) ? '-----------' : this.mordedura)
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan: 1,
                    text:"Facultades Mentales \n\n" + this.switchFacultadesMentales
                  },
                  {
                    style:"Texto",
                    colSpan:2,
                    text:"Tipo de retraso \n\n" + (this.switchFacultadesMentales && !this.switchFacultadesMentales.includes('Si') ? '-----------' : this.TRetraso) 
                  },{}
                ],
                [
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Enfermedades Cronicas \n\n" + this.switchEnfermedadesCronicas
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text: "Tipo de Enfermedad \n\n" + (this.switchEnfermedadesCronicas && !this.switchEnfermedadesCronicas.includes('Si tiene') ? '-----------' : this.tipoEnfermedad)
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Tiempo de Diagnóstico \n\n" + (this.switchEnfermedadesCronicas && !this.switchEnfermedadesCronicas.includes('Si tiene') ? '-----------' : this.tiempoDiagnostico) 
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Tratamiento \n\n" + (this.switchEnfermedadesCronicas && !this.switchEnfermedadesCronicas.includes('Si tiene') ? '-----------' : this.switchTratamiento)
                  },
                  {
                    style:"Texto",
                    colSpan:2,
                    text:"Periodicidad \n\n" + (((this.switchEnfermedadesCronicas && !this.switchEnfermedadesCronicas.includes('Si tiene')) || (this.switchTratamiento && !this.switchTratamiento.includes('Si tiene'))) ? '-----------' : this.periocidadCronicas)
                  },
                  {}
                ],
                [
                  {
                    style:"Texto",
                    colSpan:3,
                    text:"Medicamento Enfermedades \n\n" + (((this.switchEnfermedadesCronicas && !this.switchEnfermedadesCronicas.includes('Si tiene')) || (this.switchTratamiento && !this.switchTratamiento.includes('Si tiene'))) ? '-----------' : this.medicamentoCronicas) 
                  },
                ],
                [
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Alergias \n\n" + this.switchAlergias
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Tratamiento \n\n" + (this.switchAlergias && !this.switchAlergias.includes('Si tiene') ? '-----------' : this.switchTratamientoAlergia)
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Periodicidad \n\n" + (((this.switchAlergias && !this.switchAlergias.includes('Si tiene')) || (this.switchTratamientoAlergia && !this.switchTratamientoAlergia.includes('Si tiene'))) ? '-----------' : this.periocidadAlergias) 
                  },
                ],
                [
                  {
                    style:"Texto",
                    colSpan:3,
                    text:"Medicamento Alergias \n\n" + (((this.switchAlergias && !this.switchAlergias.includes('Si tiene')) || (this.switchTratamientoAlergia && !this.switchTratamientoAlergia.includes('Si tiene'))) ? '-----------' : this.medicamentoAlergias)  
                  },
                ],
                [
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Lentes \n\n" + this.switchLentes
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Tipo de Lentes \n\n" + (this.switchLentes && !this.switchLentes.includes('Si tiene') ? '----------' : this.radioLentes)
                  },
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Graduación \n\n" + (this.switchLentes && !this.switchLentes.includes('Si tiene') ? '----------' : this.lentesGraduacion) 
                  }
                ],
                [
                  {
                    style:"Texto",
                    colSpan:1,
                    text:"Aparatos Auditivos \n\n" + this.switchAparatosAuditivos
                  },
                  {
                    style:"Texto",
                    colSpan:2,
                    text:"Oido \n\n" + (this.switchAparatosAuditivos && !this.switchAparatosAuditivos.includes('Si tiene') ? '-----------' : this.oidos)
                  }
                ]
              )
      //************************************************* */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];
      //***************************************************************************** */
      //Seccion de codigo necesario para condicionar el pie de pagina
      let me = this;
      var vista = me.vistaPreviaTF;
      const qr = me.qrCode;
      //***************************************************************************** */

      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          const footerContent = [
            {
              image: logo4,
              width: 612,
              absolutePosition: { x: 0, y: 0 },
            },
            vista != true? 
            {
                image: qr,
                width: 80, // Ajusta el ancho según tu diseño
                height: 80, // Ajusta la altura según tu diseño
                absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño

            }
          : "",
          ];

          return footerContent;
        },
        header: function (currentPage, pageCount, pageSize) {
          return [
            {
              image: logo3,
              width: 612,
              absolutePosition: { x: 0, y: 0 },
            },
            /*{ 
                            image: logo2,
                            width: 50,  
                            absolutePosition: {x: 495, y: 30},
                        },*/
          ];
        },

        content: [
          {
            text: u_subProc + "\n" + dirsubproc + "\n" + agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: "Número Único de Caso: " + nuc,
            style: "Titulo",
            alignment: "right",
            margin: [0, 110, 72, 0],
            absolutePosition: { x: 85, y: 150 },
          },
          {
            text: this.u_distrito + ", Hidalgo a " + this.fechas,
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "\nMEDIA FILIACIÓN\n\n\n",
            style: "Titulo",
            alignment: "center",
          },

          {
            text: "Nombre de la persona: " + this.personanombre + "\n\n\n",
            style: "Texto",
            alignment: "center",
            bold: true,
          },

          {
            style: "table",
            margin:[0,0,0,0],
            table: {
              headerRows: 0,
              widths: ["33.3%", "33.3%", "33.3%"],
              body: (this.PDesaSelect === true || this.PersDSelect === true) ? bodyLargo : body,
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          //Aqui se coloca el QR con lña condicion que no sea la viata previa
          this.vistaPreviaTF != true? 
          {
              image: this.qrCode,
              width: 200,
              alignment: 'center',
              margin: [0, 15, 0, 15]
          }
        : "",
        ],

        styles: {
          Adscripcion: {
            fontSize: 10,
            bold: true,
          },
          Fecha: {
            fontSize: 9,
          },
          Nooficio: {
            fontSize: 8,
            bold: true,
          },
          DePara: {
            fontSize: 10,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 9,
            bold: true,
          },
          PiePagina: {
            fontSize: 7,
            color: "white",
          },
          Texto: {
            fontSize: 10,
            alignment: "justify",
          },
          Titulo: {
            fontSize: 12,
            bold: true,
          },
          SubTitulo: {
            fontSize: 11,
            semibold: true,
          },
        },
      };

      return dd;
    },
    imprimirMediaAfiliacion(nombre, puesto, agencia) 
    {
      let me = this;

      var dd = me.downloadPdf(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      me.limpiar();
    },
    //Nueva froma de generar la vista previa para la media afiliacion
    mostrarpdf_MediaAfiliacion() {
      let me = this;      

      me.$refs.form.validate();

        let missingFields = [];
        if(!me.gruposanguineo)
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opcion en Grupo Sanguineo')
          me.error = {...me.error, sangre: 'Este campo es obligatorio'}
        } 
        if(!me.v_tfrente)
        {
          missingFields.push(' &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tipo de Frente')
          me.error = {...me.error, frente: 'Este campo es obligatorio'}
        } 
        if(!me.lateralidade) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Lateralidad')
          me.error = {...me.error, lateralidad: 'Este campo es obligatorio'}
        }
        if(!me.estatura) 
        {
          missingFields.push('  &nbsp;&nbsp;&nbsp;-Llene el campo de Estatura')
          me.error = {...me.error, estatura: 'Este campo es obligatorio'}
        } 
        else if(me.estatura < 0) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-No hay estaturas negativas')
          me.error = {...me.error, estatura: 'No hay estaturas negativas'}
        }
        if(!me.complexion) 
        {
          missingFields.push('  &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Complexión')
          me.error = {...me.error, complexion: 'Este campo es obligatorio'}
        }
        if(!me.tez) 
        {
          missingFields.push('  &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tez')
          me.error = {...me.error, tez: 'Este campo es obligatorio'}
        }
        if(!me.peso) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Llene el campo de Peso')
          me.error = {...me.error, peso: 'Este campo es obligatorio'}
        } 
        else if(me.peso < 0) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-No hay pesos negativos')
          me.error = {...me.error, peso: 'No hay pesos negativos'}
        }
        if(!me.formacara) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Forma de la cara')
          me.error = {...me.error, formacara: 'Este campo es obligatorio'}
        }
        if(!me.pomulo) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Pomulo')
          me.error = {...me.error, pomulos: 'Este campo es obligatorio'}
        }
        //? MENU DE CABELLO
        if(!me.largocabello) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Longitud de cabello en el menu de Cabello')
          me.error = {...me.error, largocabello: 'Este campo es obligatorio'}
        }
        if(!me.calvicie) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Calvicie en el menu de Cabello')
          me.error = {...me.error, calvicie: 'Este campo es obligatorio'}
        }
        if(!me.tipocabello) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tipo de Cabello en el menu de Cabello')
          me.error = {...me.error, tipocabello: 'Este campo es obligatorio'}
        }
        if(!me.tratamientoquimico) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tratamiento quimico en el menu de Cabello')
          me.error = {...me.error, tratamientoquimico: 'Este campo es obligatorio'}
        }
        if(!me.colocabello) 
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Color de Cabello en el menu de Cabello')
          me.error = {...me.error, colocabello: 'Este campo es obligatorio'}
        }
        //?OREJAS
        if(!me.tamanooreja)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tamaño de oreja en el menu de Orejas')
          me.error = {...me.error, tamanooreja: 'Este campo es obligatorio'}
        }
        if(!me.aderenciaroreja)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Adherencia orejas en el menu de Orejas')
          me.error = {...me.error, aderenciaroreja: 'Este campo es obligatorio'}
        }
        //? OJOS
        if(!me.tipoojo)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tamaño de ojos en el menu de Ojos')
          me.error = {...me.error, tipoojo: 'Este campo es obligatorio'}
        }
        if(!me.pupilentes)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Pupilentes en el menu de Ojos')
          me.error = {...me.error, pupilentes: 'Este campo es obligatorio'}
        }
        if(!me.colorojo)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Color de Ojos en el menu de Ojos')
          me.error = {...me.error, colorojo: 'Este campo es obligatorio'}
        }
        if(!me.formaojo)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Forma de ojo en el menu de Ojos')
          me.error = {...me.error, formaojo: 'Este campo es obligatorio'}
        }
        //?CEJAS
        if(!me.tamanoceja)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tamaño de ceja en el menu de Cejas')
          me.error = {...me.error, tamanoceja: 'Este campo es obligatorio'}
        }
        if(!me.formaceja)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Forma de ceja en el menu de Cejas')
          me.error = {...me.error, formaceja: 'Este campo es obligatorio'}
        }
        if(!me.implantacionceja)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Implantación ceja en el menu de Cejas')
          me.error = {...me.error, implantacionceja: 'Este campo es obligatorio'}
        }
        //? NARIZ
        if(!me.alturanariz)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Altura de nariz en el menu de Nariz')
          me.error = {...me.error, alturanariz: 'Este campo es obligatorio'}
        }
        if(!me.dorsonariz)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Dorso de nariz en el menu de Nariz')
          me.error = {...me.error, dorsonariz: 'Este campo es obligatorio'}
        }
        if(!me.puntanariz)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Punta de nariz en el menu de Nariz')
          me.error = {...me.error, puntanariz: 'Este campo es obligatorio'}
        }
        //? MENTON
        if(!me.v_fmenton)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Forma de mentón en el menu de Menton')
          me.error = {...me.error, v_fmenton: 'Este campo es obligatorio'}
        }
        if(!me.tipomenton)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tipo de menton en el menu de Menton')
          me.error = {...me.error, tipomenton: 'Este campo es obligatorio'}
        }
        //? BOCA
        if(!me.v_tboca)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Tamaño de boca en el menu de Boca')
          me.error = {...me.error, v_tboca: 'Este campo es obligatorio'}
        }
        if(!me.v_glabios)
        {
          missingFields.push('   &nbsp;&nbsp;&nbsp;-Seleccione una opcion en Grosor de labios en el menu de Boca')
          me.error = {...me.error, v_glabios: 'Este campo es obligatorio'}
        }
        //?MANCHAS
        if(!me.radioManchas && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa' )
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opcion en Manchas')
          me.error = {...me.error, radioManchas: 'Este campo es obligatorio'}
        }
        if(me.tipoMancha && me.tipoMancha.length == 0 && me.radioManchas === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione al menos una opcion en Tipo de manchas en el menu de Manchas')
          me.error = {...me.error, tipoMancha: 'Este campo es obligatorio'}
        }
        if(!me.ManchaOtra && me.radioManchas === 'Si tiene' && (me.tipoMancha && me.tipoMancha.includes('Otra')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la otra mancha en el menu de Manchas')
          me.error = {...me.error, ManchaOtra: 'Este campo es obligatorio'}
        }
        //?LUNARES
        if(!me.radioLunares && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa' )
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opcion en Lunares')
          me.error = {...me.error, radioLunares: 'Este campo es obligatorio'}
        }
        if(!me.CyULunares && me.radioLunares === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba Color y ubicación de Lunares en el menu de Lunares')
          me.error = {...me.error, CyULunares: 'Este campo es obligatorio'}
        }
        //?CICATRICES
        if(!me.radioCicatrices && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opcion en Cicatrices')
          me.error = {...me.error, radioCicatrices: 'Este campo es obligatorio'}
        }
        if(me.radioCicatrices === 'Si tiene' && (me.TCicatriz && me.TCicatriz.length === 0))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione almenos una opcion en Tipo de Cicatrices en menú Cicatrices')
          me.error = {...me.error, TCicatriz: 'Este campo es obligatorio'}
        }
        if(!me.CyUTraumatica && (me.TCicatriz && me.TCicatriz.includes('Traumaticas')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opcion en Cicatrices traumaticas Color y ubicacion en menu Cicatrices')
          me.error = {...me.error, CyUTraumatica: 'Este campo es obligatorio'}
        }
        if((me.tipoCQuirurgicas && me.tipoCQuirurgicas.length == 0) && (me.TCicatriz && me.TCicatriz.includes('Quirúrgicas')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una o varias opciones en Tipo de Cicatrices quirurgicas en menu Cicatrices')
          me.error = {...me.error, tipoCQuirurgicas: 'Este campo es obligatorio'}
        }
        if(!me.operacionMyU && (me.tipoCQuirurgicas && me.tipoCQuirurgicas.includes('Operación')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba Motivo y ubicación de Operación en el menu de Cicatrices')
          me.error = {...me.error, operacionMyU: 'Este campo es obligatorio'}
        }
        if((me.orientacionCesarea && me.orientacionCesarea.length == 0) && (me.tipoCQuirurgicas && me.tipoCQuirurgicas.includes('Cesárea')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Orientación de Cesarea en el menu de Cicatrices')
          me.error = {...me.error, orientacionCesarea: 'Este campo es obligatorio'}
        }
        if((me.numerodeCesarea <= 0 || me.numerodeCesarea === '') && (me.tipoCQuirurgicas && me.tipoCQuirurgicas.includes('Cesárea')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Ingrese algun numero de Partos en el menu de Cicatrices')
          me.error = {...me.error, numerodeCesarea: 'Este campo es obligatorio'}
        }
        //? TATUAJES
        if(!me.radioTatuajes && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Tatuajes')
          me.error = {...me.error, radioTatuajes: 'Este campo es obligatorio'}
        }
        if(((me.NumeroTatuajes <= 0 || me.NumeroTatuajes === '')) && me.radioTatuajes === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Ingrese un número de Tatuajes en el menu de Tatuajes')
          me.error = {...me.error, NumeroTatuajes: 'Este campo es obligatorio'}
        }
        if(!me.DescripcionTatuajes && me.radioTatuajes === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Ingrese una Descripción en el menu de Tatuajes')
          me.error = {...me.error, DescripcionTatuajes: 'Este campo es obligatorio'}
        }
        //? PIERCING
        if(!me.radioPiercing && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Piercing')
          me.error = {...me.error, radioPiercing: 'Este campo es obligatorio'}
        }
        if((me.NumeroPiercing <= 0 || me.NumeroPiercing === '') && me.radioPiercing === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Ingrese un número de Piercings en el menu de Piercing')
          me.error = {...me.error, NumeroPiercing: 'Este campo es obligatorio'}
        }
        if(!me.DescripcionPiercing && me.radioPiercing === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Ingrese una Descripción en el menu de Piercing')
          me.error = {...me.error, DescripcionPiercing: 'Este campo es obligatorio'}
        }
        //? UÑAS
        if(!me.radioUñas && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Uñas')
          me.error = {...me.error, radioUñas: 'Este campo es obligatorio'}
        }
        if((me.NoSaludables && me.NoSaludables.length === 0) && me.radioUñas === 'No Saludable')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una o varias opciones en No Saludables en menu Uñas')
          me.error = {...me.error, NoSaludables: 'Este campo es obligatorio'}
        }
        if(!me.unasPostizas && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Uñas Postizas en menu Uñas')
          me.error = {...me.error, unasPostizas: 'Este campo es obligatorio'}
        }
        //? DEFORMIDADES
        if(!me.radioDeformidades && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Deformidades')
          me.error = {...me.error, radioDeformidades: 'Este campo es obligatorio'}
        }
        if((me.tipoDeformidad && me.tipoDeformidad.length === 0) && me.radioDeformidades === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una o más opciones en Tipo de Deformidad en el menu Deformidades')
          me.error = {...me.error, tipoDeformidad: 'Este campo es obligatorio'}
        }
        if(!me.ubicacionCongenitas && (me.tipoDeformidad && me.tipoDeformidad.includes('Congénitas')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la Ubicación de la Deformidad Congénita en el Menu Deformidades')
          me.error = {...me.error, ubicacionCongenitas: 'Este campo es obligatorio'}
        }
        if(!me.ubicacionAdquiridas && (me.tipoDeformidad && me.tipoDeformidad.includes('Adquiridas')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la Ubicación de la Deformidad Adquirida en el Menu Deformidades')
          me.error = {...me.error, ubicacionAdquiridas: 'Este campo es obligatorio'}
        }
        //?CAVIDAD ORAL
        if(!me.selectProtesis && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Protesis Dental en el menu de Cavidad Oral')
          me.error = {...me.error, selectProtesis: 'Este campo es obligatorio'}
        }
        if(!me.selectSiProtesis && (me.selectProtesis && me.selectProtesis.includes('Si tiene')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Orientación de Protesis Dental en el menu de Cavidad Oral')
          me.error = {...me.error, selectSiProtesis: 'Este campo es obligatorio'}
        }
        if(!me.radioCaracteristicaDental && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Caracteristicas dentales en el menu de Cavidad Oral')
          me.error = {...me.error, radioCaracteristicaDental: 'Este campo es obligatorio'}
        }
        if(me.radioCaracteristicaDental == 'Si tiene')
        {
          if(me.arrayTooth && me.arrayTooth.length <= 0)
          {
            missingFields.push('&nbsp;&nbsp;&nbsp;-Debe seleccionar almenos un diente en el menú de Cavidad Oral')
            me.error = {...me.error, arrayTooth: 'Debe seleccionar almenos un diente'}
          }else{
            me.arrayTooth.map((dddd) =>{
              if(dddd.condition == ''){
                me.error.dientes = {...me.error.dientes, [dddd.id]: 'Debe seleccionar almenos una condición'}
                missingFields.push('&nbsp;&nbsp;&nbsp;-Debe seleccionar una condición para el diente ' + dddd.name + ' en el menú de Cavidad Oral')
              }
            })
          }
        }
        //?INFORMACION MEDICA
        //*TRAUMATISMOS
        if(!me.switchTraumatismos && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en Traumatismos en el menú de Información Medica')
          me.error = {...me.error, switchTraumatismos: 'Este campo es obligatorio'}
        }
        if((me.Ttraumatismo && me.Ttraumatismo.length == 0) && me.switchTraumatismos === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione almenos una opción en Tipo de Traumatismos en el menú de Información Medica')
          me.error = {...me.error, Ttraumatismo: 'Este campo es obligatorio'}
        }
        if(!me.UbiFractura && (me.Ttraumatismo && me.Ttraumatismo.includes('Fracturas')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la Ubicación de la Fractura en el menú de Información Medica')
          me.error = {...me.error, Ubifractura: 'Este campo es obligatorio'}
        }
        if(!me.UbiLesiones && (me.Ttraumatismo && me.Ttraumatismo.includes('Lesiones')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la Ubicación de las Lesiones en el menú de Información Medica')
          me.error = {...me.error, UbiLesiones: 'Este campo es obligatorio'}
        }
        if((me.comboTipoLesiones && me.comboTipoLesiones.length === 0) && (me.Ttraumatismo && me.Ttraumatismo.includes('Lesiones')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione almenos una opción en Tipo de Lesiones en el menú de Información Medica')
          me.error = {...me.error, comboTipoLesiones: 'Este campo es obligatorio'}
        }
        if(!me.mordedura && (me.comboTipoLesiones && me.comboTipoLesiones.includes('Mordedura')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la causa de la mordedura en el menú de Información Medica')
          me.error = {...me.error, mordedura: 'Este campo es obligatorio'}
        }
        if(!me.OtraLesion && (me.comboTipoLesiones && me.comboTipoLesiones.includes('Mordedura')))
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la otra lesión en el menú de Información Medica')
          me.error = {...me.error, OtraLesion: 'Este campo es obligatorio'}
        }
        //*FACULTADES MENTALES
        if(!me.switchFacultadesMentales && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en facultades mentales en el menú de Información Medica')
          me.error = {...me.error, switchFacultadesMentales: 'Este campo es obligatorio'}
        }
        if(!me.TRetraso && me.switchFacultadesMentales === 'Si')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en tipo de retraso en el menú de Información Medica')
          me.error = {...me.error, TRetraso: 'Este campo es obligatorio'}
        }
        //*ENFERMEDADES CRONICAS
        if(!me.switchEnfermedadesCronicas && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en enfermedades crónicas en el menú de Información Medica')
          me.error = {...me.error, switchEnfermedadesCronicas: 'Este campo es obligatorio'}
        }
        if(!me.tipoEnfermedad && me.switchEnfermedadesCronicas === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba un tipo de enfermedad crónica en el menú de Información Medica')
          me.error = {...me.error, tipoEnfermedad: 'Este campo es obligatorio'}
        }
        if(!me.tiempoDiagnostico && me.switchEnfermedadesCronicas === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba el tiempo de diagnostico de enfermedad crónica en el menú de Información Medica')
          me.error = {...me.error, tiempoDiagnostico: 'Este campo es obligatorio'}
        }
        if(!me.switchTratamiento && me.switchEnfermedadesCronicas === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en tratamiento de enfermedad crónica en el menú de Información Medica')
          me.error = {...me.error, switchTratamiento: 'Este campo es obligatorio'}
        }
        if(!me.medicamentoCronicas && me.switchTratamiento === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba el medicamento de la enfermedad crónica en el menú de Información Medica')
          me.error = {...me.error, medicamentoCronicas: 'Este campo es obligatorio'}
        }
        if(!me.periocidadCronicas && me.switchTratamiento === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la periocidad del medicamento de la enfermedad crónica en el menú de Información Medica')
          me.error = {...me.error, periocidadCronicas: 'Este campo es obligatorio'}
        }
        //*ALERGIAS
        if(!me.switchAlergias && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en alergias en el menú de Información Medica')
          me.error = {...me.error, switchAlergias: 'Este campo es obligatorio'}
        }
        if(!me.switchTratamientoAlergia && me.switchAlergias === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en tratamiento de Alergia en el menú de Información Medica')
          me.error = {...me.error, switchTratamientoAlergia: 'Este campo es obligatorio'}
        }
        if(!me.medicamentoAlergias && me.switchTratamientoAlergia === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba el medicamento del tratamiento de Alergia en el menú de Información Medica')
          me.error = {...me.error, medicamentoAlergias: 'Este campo es obligatorio'}
        }
        if(!me.periocidadAlergias && me.switchTratamientoAlergia === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la periocidad del medicamento en el tratamiento de Alergia en el menú de Información Medica')
          me.error = {...me.error, periocidadAlergias: 'Este campo es obligatorio'}
        }
        //*LENTES
        if(!me.switchLentes && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en lentes en el menú de Información Medica')
          me.error = {...me.error, switchLentes: 'Este campo es obligatorio'}
        }
        if(!me.radioLentes && me.switchLentes === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en tipo de lentes en el menú de Información Medica')
          me.error = {...me.error, radioLentes: 'Este campo es obligatorio'}
        }
        if(!me.lentesGraduacion && me.switchLentes === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Escriba la graduación de los lentes en el menú de Información Medica')
          me.error = {...me.error, lentesGraduacion: 'Este campo es obligatorio'}
        }
        //* APARATOS AUDITIVOS
        if(!me.switchAparatosAuditivos && me.PDesaSelect && me.clasificacionPersonaSelect === 'Victima directa')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en aparatos auditivos en el menú de Información Medica')
          me.error = {...me.error, switchAparatosAuditivos: 'Este campo es obligatorio'}
        }
        if(!me.oidos && me.switchAparatosAuditivos === 'Si tiene')
        {
          missingFields.push('&nbsp;&nbsp;&nbsp;-Seleccione una opción en tipo de aparatos auditivos en el menú de Información Medica')
          me.error = {...me.error, oidos: 'Este campo es obligatorio'}
        }
        





        if(Object.keys(me.error).length <= 1){
          
          me.fechas = me.generarfecha();
          me.personanombre = me.personaSelect.text;
          me.generarQR(me.docMediaAfil,me.nuc,me.u_nombre,me.fechas,me.idMediaAfiliacion);
          
          var dd = me.downloadPdf(me.u_nombre, me.u_puesto, me.u_agencia);
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");
          
          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
          }
          var doc = pdfMake.createPdf(dd);
            var f = document.getElementById("iframepdf");
            var callback = function (url) {
              f.setAttribute("src", url);
            };
            doc.getDataUrl(callback, doc);
            
            me.modaldocumento = true;
          }else{
            alertify.alert(` <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" style="vertical-align:middle;color:#e10000;" viewBox="0 0 12 12"><path fill="currentColor" d="M1.757 10.243a6.001 6.001 0 1 1 8.488-8.486a6.001 6.001 0 0 1-8.488 8.486M6 4.763l-2-2L2.763 4l2 2l-2 2L4 9.237l2-2l2 2L9.237 8l-2-2l2-2L8 2.763Z"/></svg> Error`,
                            'Aun no haz llenado todos los campos<br><br>' + '  ' + missingFields.join('<br>'),
                             function(){
                              alertify.error('Revisa los campos vacios');
                            });
          }
    },
    blabla(id, condi){
      let me = this
      
      me.arrayTooth.map(ttt =>{
        if(ttt.id == id) ttt.condition = condi
      })

    },
    generarfecha() {
      var fecha;
      fecha =
        moment().format("DD") +
        " de " +
        moment().format("MMMM") +
        " del " +
        moment().format("YYYY");
      return fecha;
    },
    obtenermes: function (mes) {
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
    listartipo2ojos() {
      var ojitos = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/TipoOjos/ListarTipoOjo", configuracion).then(function (response) {
        ojitos = response.data;
        ojitos.map(function (x) {
            me.tipoOjos2.push({ text: x.dato, value: x.dato });
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
  },
};
</script>

<style scoped>
.espaciado {
  padding: 30px !important;
}

.espaciado2 {
  margin-bottom: -30px !important;
  margin-top: -30px !important;
}

.espaciado3 {
  margin-bottom: -30px !important;
  margin-left: -24px !important;
  margin-right: -24px !important;
  margin-top: -30px !important;
}

.espaciado4 {
  margin-bottom: 30px !important;
  margin-top: 30px !important;
  padding-left: 70px !important;
  padding-right: 70px !important;
}

.tooth {
  fill: white;
  stroke: black;
  stroke-width: 2;
  cursor: pointer;
}

.tooth_e {
  fill: white;
  stroke: rgb(255, 0, 0);
  stroke-width: 2;
  cursor: pointer;
}

.selected {
  fill: yellow;
}

.no-arrows ::-webkit-outer-spin-button,
.no-arrows ::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
