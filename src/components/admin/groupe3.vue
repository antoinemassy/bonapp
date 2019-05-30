<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
     <v-layout row justify-center mb-3 pt-0 mt-4>
      <v-flex md3>
        <router-link style="text-decoration:none" :to="{path: '/admin/promotion/test'}">
          <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{template.name}}</div>
          </v-card-title>
        </v-card>
        </router-link>
      </v-flex>
      <v-flex md3>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Équipe {{equipe.name}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    
    <v-layout row justify-space-around>
      <template>
        <v-flex md7>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Étudiants</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="700px">
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
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                          <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                          <v-select
                            v-model="editedItem.genre"
                            :items="genres"
                            item-text="name"
                            label="Genre"
                            solo
                          ></v-select>
                        </v-flex>
                      </v-layout>
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
              :items="etudiants"
              hide-actions
              item-key="prenom"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.prenom }}</td>
                <td class="text-xs-center">{{ props.item.nom }}</td>
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.genre }}</td>
                <td class="text-xs-right">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
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
    equipe: { name: "G1A" },
    genres: [{ name: "M" }, { name: "F" }],
    dialog: false,
    headers: [
      { text: "Prenom", align: "center", value: "prenom", sortable: false },
      { text: "Nom", align: "center", value: "nom", sortable: false },
      { text: "Id", align: "center", value: "id", sortable: false },
      { text: "Genre", align: "center", value: "genre", sortable: false },
      { text: "Actions", align: "right", value: "name", sortable: false }
    ],
    etudiants: [],
    editedIndex: -1,
    editedItem: {
      prenom: "",
      nom: "",
      id: "",
      genre: ""
    },
    defaultItem: {
      prenom: "",
      nom: "",
      id: "",
      genre: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau étudiant" : "Editer étudiant";
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
      this.etudiants = [
        {
          prenom: "Antoine",
          nom: "Massy",
          id: "9414",
          genre: "M"
        },
        {
          prenom: "Jean Michel",
          nom: "Dupont",
          id: "3310",
          genre: "M"
        },
        {
          prenom: "Jean Thierry",
          nom: "De le puenta",
          id: "118218",
          genre: "M"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.etudiants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.etudiants.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.etudiants.splice(index, 1);
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
        Object.assign(this.etudiants[this.editedIndex], this.editedItem);
      } else {
        this.etudiants.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>