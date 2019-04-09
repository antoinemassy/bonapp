<template>
  <v-container fill-height>
    <v-layout row justify-center align-start>
      <v-flex xs12 sm5>
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>Niveaux de compétences</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              
              <v-btn v-on="on"><v-icon color="grey lighten">add_circle</v-icon></v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.name" label="Niveau"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.notes" label="Note"></v-text-field>
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

        <v-data-table :headers="headers" :items="niveaux"   hide-actions  class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }} </td>
            <td>{{ props.item.notes }}</td>
            <td >
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
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Niveau",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Note", value: "notes" },
      { text: "Actions", value: "name", sortable: false }
    ],
    niveaux: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      notes: 0
    },
    defaultItem: {
      name: "",
      notes: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau niveau" : "Editer niveau";
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
      this.niveaux = [
        {
          name: "Non acquis",
          notes: 5
        },
        {
          name: "Loin",
          notes: 10
        },
        {
          name: "Proche",
          notes: 15
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.niveaux.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.niveaux.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.niveaux.splice(index, 1);
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
        Object.assign(this.niveaux[this.editedIndex], this.editedItem);
      } else {
        this.niveaux.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>