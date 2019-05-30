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
                    <v-list-tile-content class="align-end" style="font-weight:bold">TBD</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile v-for="j in i.competences" :key="j">
                    <v-list-tile-content>{{j}}:</v-list-tile-content>
                    <v-list-tile-content class="align-end">TBD</v-list-tile-content>
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
        nom: "Dupont",
        studentNumber: 159,
        GESGrade: 10,
        electroniqueGrade: 10,
        signalGrade: 10,
        GITGrade: 12,
        informatiqueGrade: 12,
        telecomGrade: 3,
        integrationGrade: 10
      },
      {
        prenom: "Michel",
        nom: "Dupont",
        studentNumber: 237,
        GESGrade: 3,
        electroniqueGrade: 12,
        signalGrade: 20,
        GITGrade: 12,
        informatiqueGrade: 17,
        telecomGrade: 19,
        integrationGrade: 13
      },
      {
        prenom: "Lea",
        nom: "Bertrand",
        studentNumber: 262,
        GESGrade: 16,
        electroniqueGrade: 20,
        signalGrade: 16,
        GITGrade: 12,
        informatiqueGrade: 11,
        telecomGrade: 11,
        integrationGrade: 11
      },
      {
        prenom: "Jeanne",
        nom: "Du Chateau",
        studentNumber: 305,
        GESGrade: 13.7,
        electroniqueGrade: 17,
        signalGrade: 14.3,
        GITGrade: 13,
        informatiqueGrade: 11,
        telecomGrade: 12,
        integrationGrade: 11
      },
      {
        prenom: "Peter",
        nom: "Mc Donald",
        studentNumber: 356,
        GESGrade: 16.0,
        electroniqueGrade: 12,
        signalGrade: 3.9,
        GITGrade: 12,
        informatiqueGrade: 16,
        telecomGrade: 14,
        integrationGrade: 12
      }
    ]
  }),

    watch: {
      switch1(newValue){
        //called whenever switch1 changes
        
        if(newValue==="Synthèse"){
          this.$router.push('/admin/equipe');
        }
      }
    },
  methods: {
    moyenneS1: function(n) {
      return (n.GESGrade + n.electroniqueGrade + n.signalGrade) / 3;
    },
    minS1: function(n) {
      return Math.min(n.GESGrade, n.electroniqueGrade, n.signalGrade);
    },
    moyenneS2: function(n) {
      return (n.GITGrade + n.informatiqueGrade + n.telecomGrade) / 3;
    },
    minS2: function(n) {
      return Math.min(n.GITGrade, n.informatiqueGrade, n.telecomGrade);
    },
    moyenneS3: function(n) {
      return n.integrationGrade / 1;
    },
    minS3: function(n) {
      return Math.min(n.integrationGrade);
    }
  }
};
</script>