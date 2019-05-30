<template>
  <v-container fill-height>
    <v-layout row justify-center align-start mt-3>
      <v-flex xs12 sm5 md7>
        <v-card>
          <v-subheader>Sélectionner une promotion</v-subheader>
        </v-card>
        <v-card>
          <v-list>
            <v-list-tile v-for="item in promotions" :key="item.nom">
              <v-list-tile-content>
                <router-link
                  style="text-decoration:none"
                  :to="{path: '/admin/promotion/'+ item._id}"
                >
                  <v-list-tile-title v-text="item.nom"></v-list-tile-title>
                </router-link>
              </v-list-tile-content>
              <v-spacer></v-spacer>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.template != undefined ? item.template.nom : ''"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteItem(item)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-card>
          <v-subheader>Créer une promotion</v-subheader>
          <v-layout row wrap>
            <v-flex xs12 sm5 md4 ml-2>
              <v-text-field v-model="newitem.nom" label="Nom" single-line solo></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 sm5 md3>
              <v-select
                :items="templates"
                item-text="nom"
                item-value="_id"
                v-model="newitem.template"
                label="Template"
                solo
              ></v-select>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn icon ripple @click="addItem(newitem)">
              <v-icon color="grey lighten-1">add_circle</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newitem: { nom: "", template: "" },
      existingitem: { title: "", template: "" },
      defaultitem: { title: "", template: "" },
      promotions: [{ title: "promotest", template: "2020" }],
      templates: [{ title: "2020" }, { title: "2021" }]
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    deleteItem(item) {
      const index = this.promotions.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.promotions.splice(index, 1);
    },
    addItem(item) {
      console.log(item)
      const baseURI = "http://bonapp.floriancomte.fr/promotions";
      this.$http
        .post(baseURI, {
          
          nom: item.nom,
          template: item.template
        })
        .then(result => {
          this.promotions.push({nom: result.data.nom, _id: result.data._id, template: result.data.template});
          this.newitem = Object.assign({}, this.defaultitem);
          this.existingitem = Object.assign({}, this.defaultitem);
        })
        .catch(error =>{
          console.log(error);
        });



      // this.promotions.push(item);
      // this.newitem = Object.assign({}, this.defaultitem);
      // this.existingitem = Object.assign({}, this.defaultitem);
    },
    initialize: function() {
      const baseURI = "http://bonapp.floriancomte.fr/promotions";
      this.$http.get(baseURI).then(result => {
        this.promotions = result.data;
        console.log(this.promotions)
      });
      

      const baseURI2 = "http://bonapp.floriancomte.fr/templates";
      this.$http.get(baseURI2).then(result => {
        this.templates = result.data;
      });
    }
  }
};
</script>