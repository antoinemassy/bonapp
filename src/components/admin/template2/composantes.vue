<template>
  <v-flex md7>
    <div>
      <v-toolbar flat color="secondary">
        <v-toolbar-title>Composantes</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }" >
            <v-btn  @click="initialize()" >
              <v-icon color="grey lighten" >refresh</v-icon>
            </v-btn>
            <v-btn v-on="on" >
              <v-icon color="grey lighten" >add_circle</v-icon>
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
                    <v-text-field solo v-model="editedItem.nom" label="Composante"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field solo v-model="editedItem.coefficient" label="Coefficient"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.semestre"
                      :items="semestres"
                      item-value="_id"
                      item-text="nom"
                      label="Semestre"
                      solo
                    ></v-select>
                  </v-flex>
                  <v-flex v-if="this.editedIndex !== -1"> 
                    <v-card-title>
                      <span class="headline">Familles</span>
                    </v-card-title>
                    <v-flex xs12 sm12 md12>
                      <v-list>
                        <v-list-tile v-for="item in editedItem.familles" :key="item.familles">
                          <v-list-tile-content>
                            <v-list-tile-title v-text="item.nom"></v-list-tile-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-btn icon ripple @click="deleteFamille(item)">
                              <v-icon color="grey lighten-1">delete</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs12 sm12 md8 ml-3>
                      <v-subheader>Créer une famille</v-subheader>
                      <v-layout row wrap>
                        <v-flex xs12 sm5 md10>
                          <v-text-field
                            v-model="newFamille.nom"
                            label="Entrer le nom d’une nouvelle famille"
                            single-line
                            solo
                          ></v-text-field>
                        </v-flex>
                        <v-btn icon ripple @click="addFamille(newFamille )">
                          <v-icon color="grey lighten-1">add_circle</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>
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
        :items="composantes"
        item-key="nom"
        hide-actions
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.nom }}</td>
          <td>{{ props.item.coefficient }}</td>
          <td>{{ props.item.semestre.nom }}</td>
          <td class="text-xs-right">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(props.item)">delete</v-icon>
            <router-link
              style="text-decoration:none"
              :to="{path: '/admin/template/'+ template._id + '/semestre/' + props.item.semestre._id + '/composante/' + props.item._id}"
            >
              <v-icon small class="mr-2" @click="open(props.item)">open_in_new</v-icon>
            </router-link>
          </td>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-flex>
</template>
 


<script>
export default {
  data: () => ({
    newFamille: { nom: "" },
    template: { nom: "", _id: "" },
    dialog: false,
    headers: [
      {
        text: "Composante",
        align: "left",
        sortable: false,
        value: "nom"
      },
      { text: "Coefficient", value: "coefficient", sortable: false },
      { text: "Semestre", value: "semestre", sortable: false },
      { text: "Actions", align: "center", value: "nom", sortable: false }
    ],
    composantes: [],
    familles: [],
    editedIndex: -1,
    editedItem: {
      nom: "",
      coefficient: 0,
      semestre: 0,
      familles: ""
    },
    defaultItem: {
      nom: "",
      coefficient: 0,
      semestre: 0,
      familles: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouvelle composante"
        : "Editer la composante";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.template._id = this.$route.params._id;
    this.initialize();
  },

  methods: {
    initialize() {
      this.composantes = [];
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres";
      this.$http.get(baseURI).then(result => {
        this.semestres = result.data;

        for (var i = 0, len = this.semestres.length; i < len; i++) {
          for (
            var j = 0, len2 = this.semestres[i]["composantes"].length;
            j < len2;
            j++
          ) {
            let comp = this.semestres[i]["composantes"][j];
            comp["semestre"] = this.semestres[i];
            comp["oldsemestre"] = this.semestres[i];
            this.composantes.push(comp);
            console.log(comp);
          }
        }
        console.log(this.composantes);
      });

      /*
      (this.composantes = [
        {
          nom: "Compétences générales (Informatique et Télécom)",
          coefficient: 1,
          semestre: "Semestre 2",
          familles: [
            "Agir en bon communicant dans un environnement scientifique et technique",
            "Agir en acteur efficace dans un groupe",
            "Agir en professionel responsable"
          ]
        },
        {
          nom: "Informatique",
          coefficient: 2,
          semestre: "Semestre 1",
          familles: [
            "Agir en bon communicant dans un environnement scientifique et technique"
          ]
        },
        {
          nom: "Télécom",
          coefficient: 1,
          semestre: "Semestre 2"
        }
      ])
      */
    },

    editItem(item) {
      this.editedIndex = this.composantes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.composantes.indexOf(item);
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres/" +
        this.editedItem.semestre +
        "/composantes/" +
        item._id;
      confirm("Are you sure you want to delete this item?") &&
        this.$http
          .delete(baseURI)
          .then(result => {
            this.composantes.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
          });
    },

    addFamille(newFamille) {
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres/" +
        this.editedItem.semestre._id +
        "/composantes/" +
        this.editedItem._id +
        "/familles/";

      this.$http
        .post(baseURI, { nom: newFamille.nom })
        .then(result => {
          console.log(result);
          this.editedItem.familles.push({
            nom: result.data.nom,
            _id: result.data._id
          });
          this.newFamille = Object.assign({}, { nom: "" });
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteFamille(item) {
      const index = this.editedItem.familles.indexOf(item);
      console.log(index);
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres/" +
        this.editedItem.semestre._id +
        "/composantes/" +
        this.editedItem._id +
        "/familles/" +
        item._id;
      confirm("Are you sure you want to delete this item?") &&
        this.$http
          .delete(baseURI)
          .then(result => {
            this.editedItem.familles.splice(index, 1);
          })
          .catch(error => {
            console.log(error);
          });
    },

    open(item) {
      //To define
      this.composantes.indexOf(item);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    remove(item) {
      this.editedItem.familles.splice(
        this.editedItem.familles.indexOf(item),
        1
      );
      this.editedItem.familles = [...this.editedItem.familles];
    },

    save() {
      if (this.editedIndex > -1) {
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.editedItem.oldsemestre._id +
          "/composantes/" +
          this.editedItem._id;
        this.$http
          .patch(baseURI, {
            nom: this.editedItem.nom,
            coefficient: this.editedItem.coefficient,
            semestre: this.editedItem.semestre._id || this.editedItem.semestre
          })
          .then(result => {
            Object.assign(this.composantes[this.editedIndex], this.editedItem);
            this.initialize();
            //location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.editedItem.semestre +
          "/composantes";
        this.$http
          .post(baseURI, {
            nom: this.editedItem.nom,
            coefficient: this.editedItem.coefficient,
            semestre: this.editedItem.semestre
          })
          .then(result => {
            this.composantes.push(this.editedItem);
            this.initialize();
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.close();
    }
  }
};
</script>