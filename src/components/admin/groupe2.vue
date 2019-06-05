<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mb-1 pt-0 mt-3>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{promotion.nom}}</div>
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
        <v-flex md4>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Groupes</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn @click="initialize()">
                    <v-icon color="grey lighten">refresh</v-icon>
                  </v-btn>
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
                          <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-flex v-if="this.editedIndex !== -1">
                        <v-flex xs12 sm12 md12>
                          <v-list>
                            <v-list-tile v-for="item in editedItem.equipes" :key="item.equipes">
                              <v-list-tile-content>
                                <v-list-tile-title v-text="item.nom"></v-list-tile-title>
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
                          <v-subheader>Créer une équipe</v-subheader>
                          <v-layout row wrap>
                            <v-flex xs12 sm5 md10>
                              <v-text-field
                                v-model="newEquipe.nom"
                                label="Entrer le nom d’une nouvelle équipe"
                                single-line
                                solo
                              ></v-text-field>
                            </v-flex>
                            <v-btn icon ripple @click="addEquipe(newEquipe)">
                              <v-icon color="grey lighten-1">add_circle</v-icon>
                            </v-btn>
                          </v-layout>
                        </v-flex>
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
              item-key="nom"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td
                  class="text-xs-center"
                  @click="props.expanded = !props.expanded"
                >{{ props.item.nom }}</td>
                <td class="text-xs-right">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
              <template v-slot:expand="props">
                <v-card v-for="item in props.item.equipes" :key="item" flat>
                  <router-link
                    style="text-decoration:none"
                    :to="{path: '/admin/promotion/'+ promotion._id+ '/groupe/' + props.item._id + '/equipe/' + item._id}"
                  >
                    <v-card-text>{{ item.nom }}</v-card-text>
                  </router-link>
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
    promotion: {},
    newEquipe: {},
    dialog: false,
    headers: [
      {
        text: "Nom",
        align: "center",
        sortable: false,
        value: "nom"
      },
      { text: "Actions", align: "right", value: "nom", sortable: false }
    ],
    groupes: [],
    equipes: [],
    editedIndex: -1,
    editedItem: {
      nom: "",
      equipes: []
    },
    defaultItem: {
      nom: "",
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
    this.promotion._id = this.$route.params.idPromotion;
    this.initialize();
  },

  methods: {
    initialize() {
      const baseURI =
        "http://bonapp.floriancomte.fr/promotions/" + this.promotion._id;
      this.$http.get(baseURI).then(result => {
        this.promotion = { _id: this.promotion._id, nom: result.data.nom };
        console.log(result.data);
      });
      const baseURI2 =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id +
        "/groupes";
      this.$http
        .get(baseURI2)
        .then(result => {
          console.log(result.data);
          this.groupes = result.data;
        })
        .catch(error => {
          console.log(error);
        });

      // this.groupes = [
      //   {
      //     nom: "G1",
      //     equipes: [{ nom: "G1A" }, { nom: "G1B" }, { nom: "G1C" }]
      //   },
      //   {
      //     nom: "G2",
      //     equipes: [{ nom: "G2A" }]
      //   },
      //   {
      //     nom: "G3",
      //     equipes: [{ nom: "G3A" }]
      //   }
      // ];
    },

    addEquipe(newEquipe) {
      const baseURI =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id +
        "/groupes/" +
        this.editedItem._id +
        "/equipes";
      this.$http
        .post(baseURI, { nom: newEquipe.nom })
        .then(result => {
          console.log(result);
          this.editedItem.equipes.push({
            nom: result.data.nom,
            _id: result.data._id
          });
          this.newEquipe = Object.assign({}, { nom: "" });
        })
        .catch(error => {
          console.log(error);
        });
      // console.log(this.editedItem.equipes);
      // nom = newEquipe.nom;
      // this.editedItem.equipes.push({
      //   nom
      //   //nom: result.data.nom,
      //   //_id: result.data._id
      // });
      // this.newEquipe = Object.assign({}, {});
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
        const baseURI =
          "http://bonapp.floriancomte.fr/promotions/" +
          this.promotion._id +
          "/groupes/" +
          this.editedItem._id;
        this.$http
          .patch(baseURI, {
            nom: this.editedItem.nom
          })
          .then(result => {
            Object.assign(this.groupes[this.editedIndex], this.editedItem);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const baseURI =
          "http://bonapp.floriancomte.fr/promotions/" +
          this.promotion._id +
          "/groupes";
        this.$http
          .post(baseURI, {
            nom: this.editedItem.nom
          })
          .then(result => {
            this.groupes.push(this.editedItem);
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