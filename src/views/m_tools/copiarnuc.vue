<script src="./copiarnuc.js">
import FormularioBorrado from './formularioBorrado.vue';
</script>
<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Copiar Carpeta en otro Distrito</v-toolbar-title
        >
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <br />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="infoBusqueda.nucg"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              slot="activator"
              v-on="on"
              @click="listar"
              color="success"
            >
              Buscar
            </v-btn>
          </template>
          <span>Buscar</span>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  color="warning"
                  v-on="on"
                  @click="seleccionarDistrito(props.item)"
                >
                  content_copy
                </v-icon>
              </template>
              <span>Copiar Carpeta</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.victima }}</td>
          <td>{{ props.item.u_Nombre }}</td>
          <td>{{ props.item.distritoactual }}</td>
          <td>{{ props.item.dspactual }}</td>
          <td>{{ props.item.agenciaactual }}</td>
          <td>{{ props.item.moduloactual }}</td>
          <td>
            {{
              props.item.fechaElevaNuc.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechaElevaNuc.substring(5, 7) - 1) +
              " del " +
              props.item.fechaElevaNuc.substring(0, 4)
            }}
          </td>
        </template>
      </v-data-table>

      <v-dialog v-model="dialogos.modalClonarCarpeta" max-width="500px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">search</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading"
              >Copiar carpeta a otro distrito</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-autocomplete
                      name="distrito"
                      :items="catalogos.distritos"
                      v-model="infoBusqueda.distrito"
                      label="Distrito:"
                      @change="listarDirecciones"
                      clearable
                      :error-messages="errors.collect('distrito')"
                    />

                    <v-autocomplete
                      name="subdireccion"
                      :items="catalogos.dsps"
                      v-model="infoBusqueda.dsp"
                      label="Subdireccion:"
                      @change="listaragencias"
                      clearable
                      :error-messages="errors.collect('subdireccion')"
                    />

                    <v-autocomplete
                      name="agencia"
                      :items="catalogos.agencias"
                      v-model="infoBusqueda.agencia"
                      label="Agencia:"
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
                      :error-messages="errors.collect('modulo')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogos.modalClonarCarpeta = false"
                  >Cerrar</v-btn
                >
                <v-btn @click.native="guardar" class="success">Clonar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <formularioBorrado
        :sTabla="infoMod.tablaAMod"
        @solicitarBorrado="solicitarBorrado($event)"
        :uDistrito="sesionInfo.u_iddistrito"
        ref="formBorrado"
      ></formularioBorrado>
    </v-flex>
  </v-layout>
</template>
