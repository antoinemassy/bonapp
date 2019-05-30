<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mb-1 pt-0 mt-3>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{template.name}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-around mb-3 pt-0 mt-0>
      <v-btn color="primary" @click="loader = 'loading3'">
        Import Excel
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
    </v-layout>

    <v-layout row justify-space-around>
      <template>
        <v-flex md3>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Groupes</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on">
                    <v-icon color="grey lighten">add_circle</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap column>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.name" label="Nom"></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-flex xs12 sm12 md12>
                        <v-list>
                          <v-list-tile v-for="item in editedItem.equipes" :key="item.equipes">
                            <v-list-tile-content>
                              <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-btn icon ripple @click="deleteEquipe(item)">
                                <v-icon color="grey lighten-1">delete</v-icon>
                              </v-btn>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>

                      <v-flex xs12 sm12 md12>
                        <v-subheader>Créer une famille</v-subheader>
                        <v-layout row wrap>
                          <v-flex xs12 sm5 md10>
                            <v-text-field
                              v-model="newEquipe.name"
                              label="Entrer le nom d’une nouvelle famille"
                              single-line
                              solo
                            ></v-text-field>
                          </v-flex>
                          <v-btn icon ripple @click="addEquipe(newEquipe)">
                            <v-icon color="grey lighten-1">add_circle</v-icon>
                          </v-btn>
                        </v-layout>
                      </v-flex>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="groupes"
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
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
              <template v-slot:expand="props">
                <router-link
                  style="text-decoration:none"
                  :to="{path: '/admin/groupe3'}"
                >
                  <v-card v-for="item in props.item.equipes" :key="item" flat>
                  <v-card-text>{{ item.name }}</v-card-text>
                </v-card>
                </router-link>
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
    template: { name: "Promotion 2020" },
    newEquipe: {},
    dialog: false,
    headers: [
      {
        text: "Nom",
        align: "center",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "right", value: "name", sortable: false }
    ],
    groupes: [],
    equipes: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      equipes: []
    },
    defaultItem: {
      name: "",
      equipes: []
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau groupe" : "Editer groupe";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.groupes = [
        {
          name: "G1",
          equipes: [{ name: "G1A" }, { name: "G1B" }, { name: "G1C" }]
        },
        {
          name: "G2",
          equipes: [{ name: "G2A" }]
        },
        {
          name: "G3",
          equipes: [{ name: "G3A" }]
        }
      ];
    },

    addEquipe(newEquipe) {
      console.log(this.editedItem.equipes);
      name = newEquipe.name;
      this.editedItem.equipes.push({
        name
        //nom: result.data.nom,
        //_id: result.data._id
      });
      this.newEquipe = Object.assign({}, {});
    },

    deleteEquipe(item) {
      const index = this.editedItem.equipes.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.editedItem.equipes.splice(index, 1);
    },

    editItem(item) {
      this.editedIndex = this.groupes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.groupes.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.groupes.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.groupes[this.editedIndex], this.editedItem);
      } else {
        this.groupes.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>