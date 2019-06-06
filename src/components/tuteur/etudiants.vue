<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mt-3 wrap>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Etudiants</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center mt-1>
      <v-flex md2 xs4>
        <v-select
          @change="changedValue"
          :items="promotions"
          item-text="nom"
          item-value="_id"
          label="Promotion"
          solo-inverted
        ></v-select>
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
              item-key="code"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.prenom }}</td>
                <td class="text-xs-center">{{ props.item.nom }}</td>
                <td class="text-xs-center">{{ props.item.code }}</td>
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
    promotions: [],
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
        value: "code",
        sortable: false
      },
      { text: "Groupe", align: "center", value: "groupe", sortable: false },
      { text: "Equipe", align: "center", value: "equipe", sortable: false },
      { text: "Actions", align: "right", value: "prenom", sortable: false }
    ],
    groupes:[],
    etudiants: [],
    editedIndex: -1,
    editedItem: {
      prenom: "",
      nom: "",
      code: "",
      
      groupe: "",
      equipe: ""
    },
    defaultItem: {
      prenom: "",
      nom: "",
      code: "",
     
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
    changedValue: function(value) {
      //receive the value selected (return an array if is multiple)
      console.log(value);
      this.etudiants=[]
      const baseURI2 =
        "http://bonapp.floriancomte.fr/promotions/" + value + "/groupes";
      this.$http
        .get(baseURI2)
        .then(result => {
          this.groupes= result.data;
          for (var i = 0, len = this.groupes.length; i < len; i++) {
            for (var j = 0, len2 = this.groupes[i]["equipes"].length; j < len2; j++){
              for (var k = 0, len3 = this.groupes[i]["equipes"][j]["eleves"].length; k < len3; k++){
                  let etudiant = this.groupes[i]["equipes"][j]["eleves"][k];
                  etudiant["groupe"] = this.groupes[i].nom
                  etudiant["equipe"] = this.groupes[i]["equipes"][j].nom
                  this.etudiants.push(etudiant)
              }
            }
          }
          
          
        })
        .catch(error => {
          console.log(error);
        });
    },

    initialize() {
      const baseURI = "http://bonapp.floriancomte.fr/promotions";
      this.$http.get(baseURI).then(result => {
        this.promotions = result.data;
        console.log(this.promotions);
      });
      // this.etudiants = [
      //   {
      //     prenom: "Michel",
      //     nom: "Dupond",
      //     code: 12345,
      //     groupe: "G1",
      //     equipe: "G1A"
      //   },
      //   {
      //     prenom: "Thierry",
      //     nom: "De Chateau",
      //     code: 54321,
      //     groupe: "G2",
      //     equipe: "G2A"
      //   },
      //   {
      //     prenom: "Jean",
      //     nom: "Ti",
      //     code: 33433,
      //     groupe: "G2",
      //     equipe: "G2A"
      //   }
      // ];
    }
  }
};
</script>