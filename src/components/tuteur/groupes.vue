<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mt-3 mb-1 pt-0 mt-0 wrap>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Groupes</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center mt-1>
      <v-flex md2 xs4>
        <v-select :items="promotions" item-text="name" label="Promotion" solo-inverted></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <template>
        <v-flex md4>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Groupes</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="groupes"
              :expand="expand"
              :search="search"
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
    search: "",
    promotions: [{ name: "Promotion 2020" }, { name: "Promotion 2021" }],
    headers: [
      {
        text: "Nom",
        align: "center",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "right", value: "prenom", sortable: false }
    ],
    groupes: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.groupes = [
        {
          name: "G1",
          equipes: ["G1A", "G1B", "G1C"]
        },
        {
          name: "G2",
          equipes: ["G2A"]
        },
        {
          name: "G3",
          equipes: ["G3A"]
        }
      ];
    }
  }
};
</script>