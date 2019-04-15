<template>

      <v-flex md3>
      <div>
        <v-toolbar flat color="secondary">
          <v-toolbar-title>Semestres</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.name" label="Semestre"></v-text-field>
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

        <v-data-table :headers="headers" :items="semestres"   hide-actions  class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }} </td>
            <td class="justify-end layout px-5">
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


<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Semestre",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Actions", align: "right",value: "name", sortable: false }
    ],
    semestres: [],
    editedIndex: -1,
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.semestres = [
        {
          name: "Semestre 1"
        },
        {
          name: "Semestre 2"
        },
        {
          name: "Intégration"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.semestres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.semestres.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.semestres.splice(index, 1);
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
        Object.assign(this.semestres[this.editedIndex], this.editedItem);
      } else {
        this.semestres.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>