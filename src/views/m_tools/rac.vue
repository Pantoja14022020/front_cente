<script src="./rac.js">
import FormularioBorrado from '../../components/m_tools/formularioModificacion.vue';</script>
<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular" >Lista de RACs en Distrito</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="infoBusqueda.racg"
          append-icon="search"
          label="Búsqueda"
          single-line hide-details
        />
      <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" slot="activator" v-on="on" @click="listar" color="success">
              Buscar
            </v-btn>
          </template>
          <span>Opciones de busqueda</span>
        </v-tooltip>

        <v-spacer />

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" slot="activator" v-on="on" @click="dialogos.opcionesBusqueda = true" color="success">
              Opciones de busqueda
            </v-btn>
          </template>
          <span>Opciones de busqueda</span>
        </v-tooltip>

      </v-toolbar>


      <v-data-table
        :headers="headers"
        :items="carpetas"
        
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-tooltip v-if="props.item.nuc==null" bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" color="error" v-on="on" @click="mostrarFormularioModificacion(props.item,{title:'Borrar RAC',icon:'delete_forever',color:'red',operation:'Racs/Eliminar/',buttonText:'Borrar',extraComponents:{}},'RAC,CAT_RHECHO,CAT_RATENCON')">
                  delete_forever
                </v-icon>
              </template>
              <span>Eliminar RAC</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" color="#10312b" v-on="on" @click="mostrarFormularioModificacion(props.item,{title:'Modificar Número de RAC',icon:'format_list_numbered',color:'#10312b',operation:'Racs/ModNumRac/',buttonText:'Modificar',extraComponents:{text1:{label:'RAC',value:props.item.rac}}},'RAC')">
                  format_list_numbered
                </v-icon>
              </template>
              <span>Modificar Número de RAC</span>
            </v-tooltip>

          </td>
          <td>{{ props.item.rac}}</td>
          <td>{{ props.item.nuc}}</td>
          <td>{{ props.item.victima }}</td>
          <td>{{ props.item.distritoactual }}</td>
          <td>{{ props.item.agenciaactual }}</td>
          <td>{{ props.item.moduloactual }}</td>
          <td>{{ props.item.u_Nombre }}</td>
          <td>{{ props.item.fechaElevaNuc.substring(8, 10) + " de " + obtenermes(props.item.fechaElevaNuc.substring(5, 7) - 1) + " del " + props.item.fechaElevaNuc.substring(0, 4) }}
          </td>
        </template>
        
      </v-data-table>
      <v-dialog v-model="dialogos.opcionesBusqueda" max-width="500px">
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
                      name="agencia"
                      :items="catalogos.agencias"
                      v-model="infoBusqueda.agencia"
                      label="Agencia:"
                      v-if="esDirector || esAdministrador"
                      @change="listarmodulos"
                      clearable
                      :error-messages="errors.collect('agencia')"
                    />
                    <v-autocomplete
                      name="modulo"
                      :items="catalogos.modulos"
                      v-model="infoBusqueda.modulo"
                      label="Modulo:"
                      clearable
                      v-if="esDirector || esAdministrador || esCoordinador"
                      :error-messages="errors.collect('modulo')"
                    />
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :return-value.sync="infoBusqueda.fechadesde"
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
                          :error-messages="errors.collect('desde')"
                        />
                      </template>
                      <v-date-picker locale="es" v-model="infoBusqueda.fechadesde" no-title scrollable>
                        <v-spacer />
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" color="primary" @click="limpiarfechad()">
                              delete
                            </v-icon>
                          </template>
                          <span>Limpiar fecha</span>
                        </v-tooltip>
                        <v-spacer />
                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="infoBusqueda.fechahasta"
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
                          :error-messages="errors.collect('hasta')"
                        />
                      </template>
                      <v-date-picker locale="es" v-model="infoBusqueda.fechahasta" no-title scrollable>
                        <v-spacer />
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" color="primary" @click="limpiarfechah()">
                              delete
                            </v-icon>
                          </template>
                          <span>Limpiar fecha</span>
                        </v-tooltip>
                        <v-spacer />
                        <v-btn text color="primary" @click="menu2=false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-text-field
                      name="rac"
                      label="RAC:"
                      v-model="infoBusqueda.racg"
                      :error-messages="errors.collect('rac')"
                    />
                    <v-text-field
                      name="nombre"
                      label="Nombre(1ra persona registrada):"
                      v-model="infoBusqueda.nombre"
                      :error-messages="errors.collect('nombre')"
                    />
                    <v-text-field
                      name="apellido paterno"
                      label="Apellido paterno(1ra persona registrada):"
                      v-model="infoBusqueda.apellidop"
                      :error-messages="errors.collect('apellido paterno')"
                    />
                    <v-text-field
                      name="apellido materno"
                      label="Apellido materno(1ra persona registrada):"
                      v-model="infoBusqueda.apellidom"
                      :error-messages="errors.collect('apellido materno')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogos.opcionesBusqueda = false">Cerrar</v-btn>
                <v-btn @click.native="listar" class="success">Buscar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      
      <formularioModificacion :sTabla="infoMod.tablaAMod" @solicitarModificacion="solicitarModificacion($event)" :uDistrito="sesionInfo.u_iddistrito" ref="formularioModificacion"></formularioModificacion>
    </v-flex>
  </v-layout>
</template>
