<template>
  <v-container fluid grid-list-xl pt-0 pb-5>

    <v-layout row justify-space-around  mt-3 wrap>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Etudiants</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center   mt-1>
      <v-flex md2 xs4>
        <v-select :items="promotions" item-text="name" label="Promotion" solo-inverted></v-select>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-around>
      <template>
        <v-flex md8>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Etudiants</v-toolbar-title>
              <v-divider class="mx-2" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>

            <v-data-table
              :headers="headers"
              :items="etudiants"
              :search="search"
              hide-actions
              item-key="prenom"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.prenom }}</td>
                <td class="text-xs-center">{{ props.item.nom }}</td>
                <td class="text-xs-center">{{ props.item.numEtudiant }}</td>
                <td class="text-xs-center">{{ props.item.promotion }}</td>
                <td class="text-xs-center">{{ props.item.groupe}}</td>
                <td class="text-xs-center">{{ props.item.equipe}}</td>
                <td class="text-xs-right">
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
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data: () => ({
    search: "",
    promotions: [{ name: "Promotion 2020" }, { name: "Promotion 2021" }],
    headers: [
      {
        text: "Prenom",
        align: "center",
        sortable: false,
        value: "prenom"
      },
      { text: "Nom", align: "center", value: "nom", sortable: false },
      {
        text: "Numero Etudiant",
        align: "center",
        value: "numEtudiant",
        sortable: false
      },
      {
        text: "Promotion",
        align: "center",
        value: "promotion",
        sortable: false
      },
      { text: "Groupe", align: "center", value: "groupe", sortable: false },
      { text: "Equipe", align: "center", value: "equipe", sortable: false },
      { text: "Actions", align: "right", value: "prenom", sortable: false }
    ],
    etudiants: [],
    editedIndex: -1,
    editedItem: {
      prenom: "",
      nom: "",
      numEtudiant: "",
      promotion: "",
      groupe: "",
      equipe: ""
    },
    defaultItem: {
      prenom: "",
      nom: "",
      numEtudiant: "",
      promotion: "",
      groupe: "",
      equipe: ""
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.etudiants = [
        {
          prenom: "Michel",
          nom: "Dupond",
          numEtudiant: 12345,
          promotion: 2020,
          groupe: "G1",
          equipe: "G1A"
        },
        {
          prenom: "Thierry",
          nom: "De Chateau",
          numEtudiant: 54321,
          promotion: 2020,
          groupe: "G2",
          equipe: "G2A"
        },
        {
          prenom: "Jean",
          nom: "Ti",
          numEtudiant: 33433,
          promotion: 2020,
          groupe: "G2",
          equipe: "G2A"
        }
      ];
    }
  }
};
</script>