<template>
  <v-flex md7>
    <div>
      <v-toolbar flat color="secondary">
        <v-toolbar-title>Composantes</v-toolbar-title>
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
                    <v-text-field solo v-model="editedItem.name" label="Composante"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field solo v-model="editedItem.coefficients" label="Coefficient"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItem.semestres"
                      :items="semestres"
                      item-text="name"
                      label="Semestre"
                      solo
                    ></v-select>
                  </v-flex>
                  <template>
                    <v-combobox
                      v-model="editedItem.familles"
                      :items="familles"
                      label="Familles"
                      chips
                      clearable
                      prepend-icon="filter_list"
                      solo
                      multiple
                    >
                      <template v-slot:selection="data">
                        <v-chip :selected="data.selected" close @input="remove(data.item)">
                          <strong>{{ data.item }}</strong>&nbsp;
                        </v-chip>
                      </template>
                    </v-combobox>
                  </template>
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
        item-key="name"
        hide-actions
        class="elevation-1"
      >
        <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
          <td>{{ props.item.coefficients }}</td>
          <td>{{ props.item.semestres }}</td>
          <td>
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="deleteItem(props.item)">delete</v-icon>
            <v-icon small class="mr-2" @click="open(props.item)">open_in_new</v-icon>
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
        text: "Composante",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Coefficient", value: "coefficients", sortable: false },
      { text: "Semestre", value: "semestres" },
      { text: "Actions", value: "name", sortable: false }
    ],
    composantes: [],
    familles:[],
    semestres:[],
    editedIndex: -1,
    editedItem: {
      name: "",
      coefficients: 0,
      semestre: 0,
      familles:""
    },
    defaultItem: {
      name: "",
      coefficients: 0,
      semestre: 0,
      familles:""
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.composantes = [
        {
          id: 1,
          name: "Compétences générales (Informatique et Télécom)",
          coefficients: 1,
          semestres: "Semestre 2",
          familles: [
            "Agir en bon communicant dans un environnement scientifique et technique",
            "Agir en acteur efficace dans un groupe",
            "Agir en professionel responsable"
          ]
        },
        {
          id: 2,
          name: "Informatique",
          coefficients: 2,
          semestres: "Semestre 1",
          familles: [
            "Agir en bon communicant dans un environnement scientifique et technique"
          ]
        },
        {
          id: 3,
          name: "Télécom",
          coefficients: 1,
          semestres: "Semestre 2"
        }
      ]
    ,
    this.semestres= [{ name: "Semestre 1" }, { name: "Semestre 2" }]
    },

    editItem(item) {
      this.editedIndex = this.composantes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.composantes.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.composantes.splice(index, 1);
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
      this.editedItem.familles.splice(this.editedItem.familles.indexOf(item), 1);
      this.editedItem.familles = [...this.editedItem.familles];
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.composantes[this.editedIndex], this.editedItem);
      } else {
        this.composantes.push(this.editedItem);
      }
      this.close();
    },
    getfamilles() {
      return this.familles;
    }
  }
};
</script>