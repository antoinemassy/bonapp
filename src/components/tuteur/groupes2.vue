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
        <v-select :items="composantes" item-text="nom" label="Composante" solo-inverted></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-around>
      <v-flex md11 xs12>
        <template>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Competences</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap column>
                        <v-flex xs12 sm6 md3>
                          <v-text-field v-model="editedItem.famille.nom" readonly label="Famille"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                          <v-text-field
                            v-model="editedItem.nom"
                            readonly
                            label="Nom de la Compétence"
                          ></v-text-field>
                        </v-flex>
                        <v-card-title>
                          <span class="headline">Equipe</span>
                        </v-card-title>
                        <v-flex xs12 sm6 md4>
                          <v-textarea
                            v-model="editedItem.observationEquipe"
                            label="Observation sur l'equipe"
                          ></v-textarea>
                        </v-flex>
                        <v-card-title>
                          <span class="headline">Eleves</span>
                        </v-card-title>
                        <v-flex
                          xs12
                          sm6
                          md3
                          v-for="item in editedItem.Notations"
                          :key="item.Notations"
                        >
                          <span class="headline">{{item.eleve}}</span> 
                          <v-textarea v-model="item.obs_ind" label="Observation individuelle"></v-textarea>
                          <v-select
                            v-model="item.niveau_actuel.nom"
                            :items="niveaux"
                            item-text="nom"
                            label="Niveau individuel"
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
            <v-data-table :headers="headers" :items="competences" hide-actions class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.famille.nom }}</td>
                <td>{{ props.item.nom }}</td>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.observationEquipe }}</td>
                <td class="text-xs-center">{{ props.item.coefficient }}</td>
                <td class="justify-center layout px-4">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
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
    items: ["Streaming", "Eating"],
    chips: [
      "Programming",
      "Playing video games",
      "Watching movies",
      "Sleeping"
    ],
    dialog: false,
    template: { nom: "Template 2020" },
    composante: { nom: "Compétences générales (Informatique et Télécom)" },
    headers: [
      {
        text: "Famille",
        align: "left",
        value: "famille"
      },
      {
        text: "Compétence",
        align: "left",
        sortable: false,
        value: "nom"
      },
      { text: "Description", value: "description" },
      { text: "Observation sur l'équipe", value: "observationEquipe" },
      { text: "Coefficient", value: "coefficient" },
      { text: "Actions", align: "right", value: "nom", sortable: false }
    ],
    familles: [],
    competences: [],
    editedIndex: -1,
    editedItem: {
      famille: "",
      nom: "",
      description: "",
      observartionEquipe: "",
      Notations: "",
      coefficient: 0
    },
    defaultItem: {
      famille: "",
      nom: "",
      description: "",
      observartionEquipe: "",
      Notations: "",
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
      this.familles = [{ nom: "Agir en communiquant " }];
      this.composantes = [{ nom: "Compétences générales (Elec et Signal)" }];
      this.equipe = "G1A";
      this.niveaux = [
        {
          nom: "Non acquis",
        },
        {
          nom: "Loin",
        },
        {
          nom: "Proche",
        }
      ];
      this.competences = [
        {
          famille: {
            nom: "FamilleTest"
          },
          nom: "Communiquer à l'oral",
          description:
            "Il est tres important de bien savoir communiquer à l'oral pour se faire comprendre par son entrourage... ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          observationEquipe: "Tres bonne equipe",
          Notations: [
            {
              eleve: "Antoine",
              id_competence: 124,
              obs_ind: "fort cet eleve",
              niveau_actuel: {
                date: "01-23-1998",
                niveau_id: 1,
                nom: "Non acquis"
              },
              historique: [
                {
                  date: "01-23-1998",
                  niveau_id: 1,
                  nom: "Non acquis"
                },
                {
                  date: "02-22-1998",
                  niveau_id: 2,
                  nom: "fort"
                }
              ]
            },
            {
              eleve: "Camille",
              id_competence: 124,
              obs_ind: "nulllle",
              niveau_actuel: {
                date: "01-23-1998",
                nom:"forte",
                niveau_id: 1
              },
              historique: [
                {
                  date: "01-23-1998",
                  niveau_id: 1
                },
                {
                  date: "02-22-1998",
                  niveau_id: 2
                }
              ]
            }
          ],
          coefficient: 1
        },
        {
          famille: {
            nom: "FamilleTest2"
          },
          nom: "Communiquer à l'écrit",
          description:
            "- fournir le schéma fonctionnel d’un système d’analyse de signaux numériques  - Identifier les principales fonctions et fournir un schéma-bloc - Prendre en compte les contraintes d’implémentation - fournir le schéma fonctionnel d’un système d’analyse de signaux numériques",
          observationEquipe:
            "Tres mauvaise equipe a l'ecrit qwertyuiopasdfghjklzxcvbnm",
          Notations: [
            {
              id_eleve: 345,
              eleve: "test",
              id_competence: 124,
              obs_ind: "niceuuuh",
              niveau_actuel: {
                date: "01-23-1998",
                nom:"Non acquis",
                niveau_id: 1
              },
              historique: [
                {
                  date: "01-23-1998",
                  niveau_id: 1
                },
                {
                  date: "02-22-1998",
                  niveau_id: 2
                }
              ]
            }
          ],
          coefficient: 2
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.competences.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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