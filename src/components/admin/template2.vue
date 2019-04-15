<template>
  <v-container fluid grid-list-xl pt-0 pb-5>
    <v-layout row justify-space-around mb-3 pt-0 mt-0>
      <v-flex md3 xs4>
        <v-card color="accent" class="white--text">
          <v-card-title class="justify-center" primary-title>
            <div class="headline">{{template.name}}</div>
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
    template: { name: "Template 2020" }
  }),
  components: {
    Niveaux,
    Semestres,
    Composantes
  }
};
</script>