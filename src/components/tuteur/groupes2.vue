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

    <v-layout row justify-space-around>
      <v-flex md11 xs12>
        <template>
          <div >
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Competences</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="1000px">
                
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md2>
                          <v-text-field v-model="editedItem.name" label="Competence name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-area v-model="editedItem.description" label="Description"></v-text-area>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-textarea v-model="editedItem.observationEquipe" label="Observation sur l'equipe"></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                          <v-text-field v-model="editedItem.coefficient" label="Coefficient"></v-text-field>
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
            <v-data-table :headers="headers" :items="competences" hide-actions class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.observationEquipe }}</td>
                <td class="text-xs-center">{{ props.item.coefficient }}</td>
                <td class="justify-end layout px-4">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small class="mr-2" @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data: () => ({
    dialog: false,
    template: { name: "Template 2020" },
    composante: { name: "Compétences générales (Informatique et Télécom)" },
    headers: [
      {
        text: "Compétence",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Description", value: "description" },
      { text: "Observation sur l'équipe", value: "observationEquipe" },
      { text: "Coefficient", value: "coefficient" },
      { text: "Actions", align: "right", value: "name", sortable: false }
    ],
    familles: [],
    competences: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      observartionEquipe:"",
      coefficient: 0
    },
    defaultItem: {
      name: "",
      description: "",
      observartionEquipe:"",
      coefficient: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      this.familles = [{ name: "Agir en communiquant " }];
      this.composantes = [{ name: "Compétences générales (Elec et Signal)" }];
      this.equipe= "G1A";
      this.competences = [
        {
          name: "Communiquer à l'oral",
          description: "Il est tres important de bien savoir communiquer à l'oral pour se faire comprendre par son entrourage... ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          observationEquipe:"Tres bonne equipe",
          coefficient: 1
        },
        {
          name: "Communiquer à l'écrit",
          description: "- fournir le schéma fonctionnel d’un système d’analyse de signaux numériques  - Identifier les principales fonctions et fournir un schéma-bloc - Prendre en compte les contraintes d’implémentation - fournir le schéma fonctionnel d’un système d’analyse de signaux numériques",
          observationEquipe:"Tres mauvaise equipe a l'ecrit qwertyuiopasdfghjklzxcvbnm",
          coefficient: 2
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.competences.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.competences.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.competences.splice(index, 1);
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
        Object.assign(this.competences[this.editedIndex], this.editedItem);
      } else {
        this.competences.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>