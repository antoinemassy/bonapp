<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mt-3 mb-1 pt-0 mt-0 wrap>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">Groupes</div>
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

    <v-layout row justify-center>
      <template>
        <v-flex md4>
          <div>
            <v-toolbar flat color="secondary">
              <v-toolbar-title>Groupes</v-toolbar-title>
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
              :items="groupes"
              :expand="expand"
              :search="search"
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
                  <v-icon small class="mr-2" @click="test(props.item)">favorite</v-icon>
                </td>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
              <template v-slot:expand="props">
                <v-card v-for="item in props.item.equipes" :key="item" flat>
                  <router-link
                    style="text-decoration:none"
                    :to="{path: '/tuteur/groupes/' + props.item._id +'/equipe/'+item._id}"
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
    search: "",
    promotions: [],
    headers: [
      {
        text: "Nom",
        align: "center",
        sortable: false,
        value: "nom"
      },
      { text: "Actions", align: "right", value: "prenom", sortable: false }
    ],
    groupes: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    changedValue: function(value) {
      //receive the value selected (return an array if is multiple)
      console.log(value);
      const baseURI2 =
        "http://bonapp.floriancomte.fr/promotions/" + value + "/groupes";
      this.$http
        .get(baseURI2)
        .then(result => {
          console.log(result.data);
          this.groupes = result.data;
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

      // this.groupes = [
      //   {
      //     nom: "G1",
      //     equipes: ["G1A", "G1B", "G1C"]
      //   },
      //   {
      //     nom: "G2",
      //     equipes: ["G2A"]
      //   },
      //   {
      //     nom: "G3",
      //     equipes: ["G3A"]
      //   }
      // ];
    }
  }
};
</script>