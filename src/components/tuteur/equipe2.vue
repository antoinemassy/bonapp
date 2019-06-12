<template>
  <v-item-group>
    <v-container grid-list-md>
      <v-switch
        v-model="switch1"
        true-value="Synthèse"
        false-value="Ensemble"
        :label="`Vue: ${switch1.toString()}`"
      ></v-switch>

      <v-layout row justify-space-around mb-4 pt-0 mt-0>
        <v-flex md3 xs4>
          <v-card color="accent" class="white--text">
            <v-card-title class="justify-center" primary-title>
              <div class="headline">Equipe {{equipe.name}}</div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row justify-center mb-0 pt-0 mt-2>
        <v-flex md2 xs4>
          <v-select :items="promotions" item-text="name" label="Promotion" solo-inverted></v-select>
        </v-flex>
        <v-flex md2 xs4>
          <v-select :items="equipes" item-text="name" label="Equipe" solo-inverted></v-select>
        </v-flex>
      </v-layout>

       <v-layout row justify-center >
        <v-flex md2 xs4>
          <v-select :items="semestres"  label="Semestre" solo-inverted></v-select>
        </v-flex>
      </v-layout>

      <v-layout wrap>
        <v-flex v-for="n in etudiants" :key="n" xs12 md4 mb-4>
          <v-item>
            <v-card class="display-1 text-xs-center">
              <div>
                <v-card-title>
                  <v-list-tile-content class="align-center">{{ n.prenom }} {{ n.nom }}</v-list-tile-content>
                </v-card-title>
                <v-list-tile>
                  <v-list-tile-content class="align-center">
                    <h4>Numéro étudiant : {{ n.studentNumber }}</h4>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <div v-for="i in semestre1" :key="i">
                  <v-list-tile>
                    <v-list-tile-content style="font-weight:bold">{{i.name}}</v-list-tile-content>
                    <v-list-tile-content class="align-end" style="font-weight:bold">15</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile v-for="j in i.competences" :key="j">
                    <v-list-tile-content>{{j}}:</v-list-tile-content>
                    <v-list-tile-content class="align-end">Proche</v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </div>

               
              </div>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  data: () => ({
    switch1: "Ensemble",
    test: {
      name: "GESGrade"
    },
    equipes: ["G1A", "G1B", "G2A", "G3A", "G3B", "G3C", "G4A"],
    promotions: [{ name: "Promotion 2020" }, { name: "Promotion 2021" }],
    equipe: { name: "G1A" },
    semestres: ["Semestre 1", "Semestre 2", "Intégration"],
    semestre1: [
      {
        name: "Général E-S",
        competences: ["Communiquer", "Ecrire", "Travailler"]
      },
      {
        name: "Éléctronique",
        competences: ["Communiquer", "Ecrire", "Test d'elec"]
      },
      {
        name: "Signal",
        competences: ["Communiquer Signal", "Ecrire"]
      }
    ],
    etudiants: [
      {
        prenom: "Leo",
        nom: "Dupont"
      },
      {
        prenom: "Michel",
        nom: "Dupont"
      },
      {
        prenom: "Lea",
        nom: "Bertrand"
      },
      {
        prenom: "Jeanne",
        nom: "Du Chateau"
      },
      {
        prenom: "Peter",
        nom: "Mc Donald"
      }
    ]
  }),

    watch: {
      switch1(newValue){
        //called whenever switch1 changes
        
        if(newValue==="Synthèse"){
          this.$router.push('/tuteur/equipe');
        }
      }
    }
};
</script>