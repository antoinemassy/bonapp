<template>
<v-container>
      <v-layout row justify-space-around mb-4 pt-0 mt-5>
        
          <v-avatar color="primary" :size="150">
            <v-icon  dark :size="70">account_circle</v-icon>
          </v-avatar>
 
      </v-layout>
      <v-layout justify-space-around pt-0 mt-5>

        <v-flex xs12 sm6 md2>
          <v-text-field
            label="Prenom"
            value="eleve"
            box
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
      <v-layout justify-space-around >


        <v-flex xs12 sm6 md2>
          <v-text-field
            label="Nom"
            value="eleve"
            box
            readonly
          ></v-text-field>
        </v-flex>

      </v-layout>
</v-container>
</template>


<script>
export default {
  data: () => ({})
};
</script>