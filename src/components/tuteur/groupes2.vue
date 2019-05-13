<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mt-3 mb-1 pt-0 mt-0 wrap>
      <v-flex md2 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Equipe {{equipe}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center mt-1>
      <v-flex md2 xs4>
        <v-select :items="composantes" item-text="name" label="Composante" solo-inverted></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <template>
        <v-flex md4>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Familles</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="familles"
              :expand="expand"
              hide-actions
              item-key="name"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td
                  class="text-xs-center"
                  @click="props.expanded = !props.expanded"
                >{{ props.item.name }}</td>
                <td class="text-xs-right">
                  <v-icon small class="mr-2" @click="test(props.item)">favorite</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
              <template v-slot:expand="props">
                <v-card v-for="item in props.item.equipes" :key="item" flat>
                  <v-card-text @click="test()">{{ item }}</v-card-text>
                </v-card>
              </template>
            </v-data-table>
          </div>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data: () => ({
    equipe:"",
    composantes: ["Compétences générales (Elec et Signal)"],
    headers: [
      {
        text: "Nom",
        align: "center",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "right", value: "prenom", sortable: false }
    ],
    familles: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.familles = [
        {
          name: "Agir en bon communicant dans un environnement scientifique et technique"
        },
        {
          name: "Etre en bon communicant"
        }
      ];
    }
  }
};
</script>