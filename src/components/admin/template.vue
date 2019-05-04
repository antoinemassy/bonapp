<template>
  <v-container fill-height>
    <v-layout row justify-center align-start>
      <v-flex xs12 sm5>
        <v-card>
          <v-subheader>Sélectionner un template</v-subheader>
        </v-card>
        <v-card>
          <v-list>
            <v-list-tile v-for="item in templates" :key="item.nom">
              <v-list-tile-content>
                <v-list-tile-title v-text="item.nom"></v-list-tile-title>
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
            <v-flex xs12 sm5 md10>
              <v-text-field v-model="newitem.nom" label="Entrer le nom d’un nouveau template" single-line solo></v-text-field>
            </v-flex>
            <v-btn icon ripple @click="addItem(newitem)">
              <v-icon color="grey lighten-1">add_circle</v-icon>
            </v-btn>
            <v-flex xs12 sm5 md10>
              <v-select v-model="existingitem.nom" :items="templates" item-text="title" label="Sélectionner un template existant" solo></v-select>
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
      newitem:{title:""},
      existingitem:{title:""},
      defaultitem:{title:""},
      templates: []
    };
  },
  created() {
    this.initialize()
  },
  methods: {
    feetTemplates: function(){
      const baseURI = 'http://bonapp.floriancomte.fr/templates'
      this.$http.get(baseURI)
      .then((result) => {
        this.templates = result.data
        //console.log(result.data);
      })
    },
    deleteItem(item) {
      const index = this.templates.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.templates.splice(index, 1);
    },
    addItem(item){
        this.templates.push(item);
        this.newitem = Object.assign({}, this.defaultitem);
        this.existingitem = Object.assign({}, this.defaultitem);
    },
    initialize: function(){
       this.feetTemplates();
     }
  }
};
</script>