<script src="./desglose.js">
import formularioModificacion from '../../components/m_tools/formularioModificacion.vue'
</script>
<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">

        <v-toolbar-title class="font-weight-regular" >Lista de Desgloses de la Carpeta</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        
        <v-flex xs12 sm6 md3>
                    <v-text-field
                        class="font-weight-regular"
                        v-model="infoCarpeta.nuc"
                        disabled
                        prepend-icon="folder"
                        filled
                    />
        </v-flex>
        
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="carpetas"
        
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuarioEnvia }}</td>
          <td>{{ props.item.nucg }}</td>
          <td>{{ props.item.dirSubRecibe }}</td>
          <td>{{ props.item.distritoRecibe }}</td>
          <td>{{ props.item.fechaDesglose }}</td>
          <td class="justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" color="error" v-on="on" @click="mostrarFormularioModificacion(props.item,{title:'Borrar Desglose',icon:'delete_forever',color:'red',operation:'Desgloses/Eliminar',buttonText:'Borrar',extraComponents:{}})">
                  delete_forever
                </v-icon>
              </template>
              <span>Eliminar Desglose</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
      
      <formularioModificacion :sTabla="infoMod.tablaAMod" @solicitarModificacion="solicitarModificacion($event)" :uDistrito="sesionInfo.u_iddistrito"   ref="formModificacion"></formularioModificacion>
    </v-flex>
  </v-layout>
</template>