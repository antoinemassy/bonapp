<template>
  <v-flex md3>
    <div>
      <v-toolbar flat color="secondary">
        <v-toolbar-title>Semestres</v-toolbar-title>
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
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.nom" label="Semestre"></v-text-field>
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

      <v-data-table :headers="headers" :items="semestres" hide-actions class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.nom }}</td>
          <td class="justify-end layout px-5">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize()">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-flex>
</template>


<script>
export default {
  data: () => ({
    template: { nom: "super template", _id: "" },
    dialog: false,
    headers: [
      {
        text: "Semestre",
        align: "left",
        sortable: false,
        value: "nom"
      },
      { text: "Actions", align: "right", value: "nom", sortable: false }
    ],
    semestres: [],
    editedIndex: -1,
    editedItem: {
      nom: ""
    },
    defaultItem: {
      nom: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau semestre" : "Editer semestre";
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
      const baseURI =
        "http://bonapp.floriancomte.fr/templates/" +
        this.template._id +
        "/semestres";
      this.$http.get(baseURI).then(result => {
        console.log(result.data);
        this.semestres = result.data;
      });
    },

    editItem(item) {
      this.editedIndex = this.semestres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.semestres.indexOf(item);
      const baseURI = "http://bonapp.floriancomte.fr/templates/" + this.template._id + "/semestres/" + item._id;
      confirm("Are you sure you want to delete this item?") &&
        this.$http
          .delete(baseURI)
          .then(result => {
            this.semestres.splice(index, 1);
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
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres/" +
          this.editedItem._id;
        this.$http
          .patch(baseURI, {
            nom: this.editedItem.nom
          })
          .then(result => {
            console.log(result)
            Object.assign(this.semestres[this.editedIndex], this.editedItem);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const baseURI =
          "http://bonapp.floriancomte.fr/templates/" +
          this.template._id +
          "/semestres" ;
        this.$http
          .post(baseURI, {
            nom: this.editedItem.nom
          })
          .then(result => {
            this.semestres.push(this.editedItem);
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