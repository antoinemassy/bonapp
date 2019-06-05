<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-center mb-3 pt-0 mt-4>
      <v-flex md3>
        <router-link style="text-decoration:none" :to="{path: '/admin/template/'+ template._id }">
          <v-card color="accent" class="white--text">
            <v-card-title class="justify-center" primary-title>
              <div class="headline">{{template.nom}}</div>
            </v-card-title>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex md6>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{composante.nom}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex md11 xs12>
        <template>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Compétences</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn @click="reloadPage()">
                    <v-icon color="grey lighten">refresh</v-icon>
                  </v-btn>
                  <v-btn v-on="on">
                    <v-icon color="grey lighten">add_circle</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }} {{index}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap column>
                        <v-flex xs12 sm6 md2>
                          <v-select
                            v-model="editedItem.famille"
                            :items="familles"
                            item-value="_id"
                            item-text="nom"
                            label="Famille"
                            solo
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                          <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
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
                <td>{{ props.item.famille.nom }}</td>
                <td>{{ props.item.nom }}</td>
                <td>{{ props.item.description }}</td>
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
    template: {},
    semestre: {},
    composante: {},
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
        value: "name"
      },
      { text: "Description", value: "description", sortable: false },
      { text: "Coefficient", value: "coefficient", sortable: false },
      { text: "Actions", align: "right", value: "name", sortable: false }
    ],
    familles: [],
    competences: [],
    editedIndex: -1,
    editedItem: {
      famille: "",
      nom: "",
      description: "",
      coefficient: 1
    },
    defaultItem: {
      famille: "",
      name: "",
      description: "",
      coefficient: 1
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle competence"
        : "Editer la competence";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.template._id = this.$route.params.idTemplate;
    this.semestre._id = this.$route.params.idSemestre;
    this.composante._id = this.$route.params.idComposante;
    this.initialize();
  },

  methods: {
    reloadPage(){
    window.location.reload()
  },
    initialize() {
      this.composantes = [];
      this.familles = [];
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres/" +
        this.semestre._id +
        "/composantes/" +
        this.composante._id +
        "/familles/";
      this.$http.get(baseURI).then(result => {
        console.log(result.data);
        this.familles = result.data;
        this.competences = [];
        for (var i = 0; i < result.data.length; i++) {
          for (var j = 0; j < result.data[i].competences.length; j++) {
            this.competences.push({
              famille: {
                nom: result.data[i].nom,
                _id: result.data[i]._id
              },
              nom: result.data[i].competences[j].nom || "Pas de nom",
              description:
                result.data[i].competences[j].description ||
                "Pas de description",
              coefficient: result.data[i].competences[j].coefficient || 1,
              _id: result.data[i].competences[j]._id
            });
          }
        }

        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" + this.template._id;
        this.$http.get(baseURI).then(result => {
          console.log(result.data);
          this.template = result.data;
        });

        const baseURI2 =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.semestre._id +
          "/composantes/" +
          this.composante._id;
        this.$http.get(baseURI2).then(result => {
          console.log(result.data);
          this.composante = result.data;
        });
        console.log(this.composante);
        console.log(this.familles);
      });
      /*
      this.competences = [
        {
          famille: "Agir en communiquant ",
          name: "Communiquer à l'oral",
          description:
            "Il est tres important de bien savoir communiquer à l'oral pour se faire comprendre par son entrourage... ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          coefficient: 1
        },
        {
          famille: "Vivre ",
          name: "Communiquer à l'écrit",
          description:
            "- fournir le schéma fonctionnel d’un système d’analyse de signaux numériques  - Identifier les principales fonctions et fournir un schéma-bloc - Prendre en compte les contraintes d’implémentation - fournir le schéma fonctionnel d’un système d’analyse de signaux numériques",
          coefficient: 2
        },
        {
          famille: "Vivre ",
          name: "Coder",
          description: "coder le vue et coder le html ouai ouai ouai",
          coefficient: 7
        }
      ];
      */
    },

    editItem(item) {
      this.editedIndex = this.competences.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.competences.indexOf(item);
      console.log(item);
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres/" +
        this.semestre._id +
        "/composantes/" +
        this.composante._id +
        "/familles/" +
        item.famille._id +
        "/competences/" +
        item._id;
      confirm("Are you sure you want to delete this item?") &&
        this.$http
          .delete(baseURI)
          .then(result => {
            this.competences.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
          });
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
        console.log(this.editedItem);
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.semestre._id +
          "/composantes/" +
          this.composante._id +
          "/familles/" +
          this.editedItem.famille._id +
          "/competences/" +
          this.editedItem._id;
        this.$http
          .patch(baseURI, {
            nom: this.editedItem.nom,
            coefficient: this.editedItem.coefficient,
            description: this.editedItem.description
          })
          .then(result => {
            Object.assign(this.competences[this.editedIndex], this.editedItem);
           
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.semestre._id +
          "/composantes/" +
          this.composante._id +
          "/familles/" +
          this.editedItem.famille +
          "/competences";
        this.$http
          .post(baseURI, {
            nom: this.editedItem.nom,
            coefficient: this.editedItem.coefficient,
            description: this.editedItem.description
          })
          .then(result => {
            this.competences.push(this.editedItem);
           
          })
          .catch(error => {
            console.log(error);
          });

        //this.competences.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>