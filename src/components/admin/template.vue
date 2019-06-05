<template>
  <v-container fill-height>
    <v-layout row justify-center align-start mt-3>
      <v-flex xs12 sm5>
        <v-card>
          <v-subheader>Sélectionner un template</v-subheader>
        </v-card>
        <v-card>
          <v-list>
            <v-list-tile v-for="item in templates" :key="item.nom">
              <v-list-tile-content>
                <router-link style="text-decoration:none" :to="{path: '/admin/template/'+ item._id}"><v-list-tile-title v-text="item.nom" ></v-list-tile-title></router-link>
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
          <v-subheader>Créer un template</v-subheader>
          <v-layout row wrap>
            <v-flex xs12 sm5 md10 ml-2>
              <v-text-field
                v-model="newitem.nom"
                label="Entrer le nom d’un nouveau template"
                single-line
                solo
              ></v-text-field>
            </v-flex>
            <v-btn icon ripple @click="addItem(newitem)">
              <v-icon color="grey lighten-1">add_circle</v-icon>
            </v-btn>
            <v-flex xs12 sm5 md10 ml-2>
              <v-select
                v-model="existingitem.anciennom"
                :items="templates"
                item-text="nom"
                label="Sélectionner un template existant"
                solo
              ></v-select>
            </v-flex>
            <v-btn icon ripple @click="addItem(existingitem)">
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
      newitem: { nom: "" },
      existingitem: { anciennom: "" },
      defaultitem: { nom: "" },
      templates: []
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    fetchTemplates() {
      const baseURI = "http://bonapp.floriancomte.fr/templates";
      this.$http.get(baseURI).then(result => {
        this.templates = result.data;
      });
    },
    deleteItem(item) {
      const index = this.templates.indexOf(item);
      const baseURI = "http://bonapp.floriancomte.fr/templates/"+ item._id;
      confirm("Are you sure you want to delete this item?") &&
      this.$http
        .delete(baseURI)
        .then(result => {
          this.templates.splice(index, 1);
        })
        .catch(error =>{
          console.log(error);
        });
    },
    addItem(item) {
      const baseURI = "http://bonapp.floriancomte.fr/templates";
      const nouveaunom = item.anciennom +"-bis"
      this.$http
        .post(baseURI, {
          nom: item.nom || nouveaunom
        })
        .then(result => {
          this.templates.push({nom: result.data.nom, _id: result.data._id});
          this.newitem = Object.assign({}, this.defaultitem);
          this.existingitem = Object.assign({}, this.defaultitem);
        })
        .catch(error =>{
          console.log(error);
        });
    },
    initialize: function() {
      this.fetchTemplates();
    }
  }
};
</script>