<template>
<v-dialog v-model="geolocalizacion.modal" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
        <v-toolbar dark color="primary">
            <v-toolbar-title>Geolocalización.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
                <v-btn  color=success text @click.native="geoGuardarLocalizacion()">
                    GUARDAR
                </v-btn>
                <v-btn icon @click="geolocalizacion.modal = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card elevation=0 class="mb-5" height="auto">
            <v-container grid-list-sm>
                <v-layout row wrap justify-center>
                    <v-flex  xs12 md12 lg12>
                        <gmap-autocomplete
                            style="width:50%;
                            height: 36px;
                            text-rendering: auto;
                            color: initial;
                            letter-spacing: normal;
                            word-spacing: normal;
                            text-transform: none;
                            text-indent: 0px;
                            text-shadow: none;
                            display: inline-block;
                            text-align: start;
                            -webkit-appearance: textfield;
                            background-color: white;
                            -webkit-rtl-ordering: logical;
                            cursor: text;
                            margin: 0em;
                            font: 400 13.3333px Arial;
                            padding: 5px 5px;
                            border-width: 2px;
                            border-style: inset;
                            border-color: initial;
                            border-image: initial;"
                            id="mapa"
                            @place_changed="geoSetPlace"
                        />
                        <v-btn outline color="primary" @click="geoAddMarker">BUSCAR</v-btn>
                        <br>
                        <gmap-map
                            :center="geolocalizacion.center"
                            :zoom="17"
                            style="width:100%;
                            height: 700px;"
                        >
                            <gmap-marker
                                :key="index"
                                v-for="(m, index) in geolocalizacion.markers"
                                :position="m.position"
                                @click="geolocalizacion.center=m.position"
                                :clickable="true"
                                :draggable="true"
                                @drag="geoUpdateCoordinates"
                                @dragend="geoUpdatecenter"
                            />
                        </gmap-map>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-card>
</v-dialog>
</template>
<script src="./modalGeolocalizacionScript.js"></script>