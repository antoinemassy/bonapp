<template>
  <v-container fill-height>
    <v-layout row justify-center align-start>
      <v-flex xs12 sm5>
        <v-icon>description</v-icon>Template2020
        <v-card>
          <v-subheader>Nivaux de compétences</v-subheader>
        </v-card>
        <v-card>
          <v-list>
            <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                  <v-list-tile-action-text v-text="item.note"> </v-list-tile-action-text>
              </v-list-tile-action>    
            </v-list-tile>
          </v-list>
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
        { title: "Non acquis", note: "5" },
        { title: "Loin", note: "10" },
        { title: "Proche", note: "15" }
      ]
    };
  },
  methods: {}
};
</script>