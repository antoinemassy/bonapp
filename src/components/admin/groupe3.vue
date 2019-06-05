<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-center mb-3 pt-0 mt-4>
      <v-flex md3>
        <router-link style="text-decoration:none" :to="{path: '/admin/promotion/' +promotion._id}">
          <v-card color="accent" class="white--text">
            <v-card-title class="justify-center" primary-title>
              <div class="headline">{{promotion.nom}}</div>
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
                          <v-text-field v-model="editedItem.code" label="Id"></v-text-field>
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
              :items="eleves"
              hide-actions
              item-key="prenom"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.prenom }}</td>
                <td class="text-xs-center">{{ props.item.nom }}</td>
                <td class="text-xs-center">{{ props.item.code }}</td>
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
    promotion: {},
    groupe: {},
    equipe: { name: "G1A" },
    genres: [{ name: "M" }, { name: "F" }],
    dialog: false,
    headers: [
      { text: "Prenom", align: "center", value: "prenom", sortable: false },
      { text: "Nom", align: "center", value: "nom", sortable: false },
      { text: "Id", align: "center", value: "code", sortable: false },
      { text: "Genre", align: "center", value: "genre", sortable: false },
      { text: "Actions", align: "right", value: "name", sortable: false }
    ],
    eleves: [],
    editedIndex: -1,
    editedItem: {
      prenom: "",
      nom: "",
      code: "",
      genre: ""
    },
    defaultItem: {
      prenom: "",
      nom: "",
      code: "",
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
    this.promotion._id = this.$route.params.idPromotion;
    this.groupe._id = this.$route.params.idGroupe;
    this.equipe._id = this.$route.params.idEquipe;
    this.initialize();
  },

  methods: {
    initialize() {
      
      const baseURI =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id;
        this.$http.get(baseURI).then(result => {
        
        this.promotion = {_id:this.promotion._id, nom: result.data.nom};
        console.log(result.data);
      });



      const baseURI2 =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id +
        "/groupes/" +
        this.groupe._id +
        "/equipes/" +
        this.equipe._id+
        "/eleves";
      this.$http.get(baseURI2).then(result => {
        console.log(result.data);
        this.eleves = result.data;
      });
      // this.eleves = [
      //   {
      //     prenom: "Antoine",
      //     nom: "Massy",
      //     code: "9414",
      //     genre: "M"
      //   },
      //   {
      //     prenom: "Jean Michel",
      //     nom: "Dupont",
      //     code: "3310",
      //     genre: "M"
      //   },
      //   {
      //     prenom: "Jean Thierry",
      //     nom: "De le puenta",
      //     code: "118218",
      //     genre: "M"
      //   }
      // ];
    },

    editItem(item) {
      this.editedIndex = this.eleves.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.eleves.indexOf(item);
      console.log(index);
      const baseURI =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id +
        "/groupes/" +
        this.groupe._id +
        "/equipes/" +
        this.equipe._id+
        "/eleves/"+
        item.code;
        console.log(baseURI);
      confirm("Are you sure you want to delete this item?") &&
        this.$http
          .delete(baseURI)
          .then(result => {
            this.eleves.splice(index, 1);
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
        Object.assign(this.eleves[this.editedIndex], this.editedItem);
      } else {
        
        const baseURI =
        "http://bonapp.floriancomte.fr/promotions/" +
        this.promotion._id +
        "/groupes/" +
        this.groupe._id +
        "/equipes/" +
        this.equipe._id+
        "/eleves";
        this.$http
          .post(baseURI, {
            prenom: this.editedItem.prenom,
            nom: this.editedItem.nom,
            code: this.editedItem.code,
            genre: this.editedItem.genre
          })
          .then(result => {
            this.eleves.push(this.editedItem);
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