<template>
  <v-container fill-height>
    <v-layout row justify-center align-start>
      <v-flex xs12 sm5>
        <v-card>
          <v-subheader>Selectionner un template</v-subheader>
        </v-card>
        <v-card>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-card>
          <v-subheader>Creer un template</v-subheader>
          <v-layout row wrap>
            <v-flex xs12 sm5 md10>
              <v-text-field label="Entrer le nom d’un nouveau template" single-line solo></v-text-field>
            </v-flex>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">add_circle</v-icon>
            </v-btn>
            <v-flex xs12 sm5 md10>
              <v-select :items="items" item-text="title" label="Sélectionner un template existant" solo></v-select>
            </v-flex>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">add_circle</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Template 2017" },
        { title: "Template 2018" },
        { title: "Template 2019" },
        { title: "Template 2020" }
      ]
    };
  },
  methods: {}
};
</script>