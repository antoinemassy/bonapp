<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mt-4 mb-3 pt-0 mt-0>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{template.nom}}</div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-around>
      <v-card></v-card>
      <Niveaux/>
      <Semestres/>
      <v-card></v-card>
    </v-layout>
    <v-layout row justify-space-around pt-3>
      <Composantes/>
    </v-layout>
  </v-container>
</template>


<script>
import Niveaux from "./template2/niveaux.vue";
import Semestres from "./template2/semestres.vue";
import Composantes from "./template2/composantes.vue";

export default {
  data: () => ({
    template: { nom: "", id:""}
  }),
  created(){
    this.template._id = this.$route.params._id;
    const baseURI = "http://bonapp.floriancomte.fr/templates/" + this.template._id;
      this.$http.get(baseURI).then(result => {
        console.log(result.data)
        this.template = result.data;
      });
  },
  components: {
    Niveaux,
    Semestres,
    Composantes
  }
};
</script>