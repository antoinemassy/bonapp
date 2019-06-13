<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Connexion à Bon APP</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="nom"
                  prepend-icon="person"
                  name="login"
                  label="Nom d'utilisateur"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="mdp"
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Mot de passe"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()">Connexion</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    nom: "",
    mdp: "",
    etudiants: [],
    

  }),

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.etudiants = [];
      const baseURI = "http://bonapp.floriancomte.fr/promotions/";
      this.$http
        .get(baseURI)
        .then(result => {
          for (var i = 0, len = result.data.length; i < len; i++) {
            const baseURI2 =
              "http://bonapp.floriancomte.fr/promotions/" +
              result.data[i]._id +
              "/groupes";
            this.$http
              .get(baseURI2)
              .then(result => {
                this.groupes = result.data;
                for (var i = 0, len = this.groupes.length; i < len; i++) {
                  for (
                    var j = 0, len2 = this.groupes[i]["equipes"].length;
                    j < len2;
                    j++
                  ) {
                    for (
                      var k = 0,
                        len3 = this.groupes[i]["equipes"][j]["eleves"].length;
                      k < len3;
                      k++
                    ) {
                      let etudiant = this.groupes[i]["equipes"][j]["eleves"][k];
                      etudiant["groupe"] = this.groupes[i].nom;
                      etudiant["equipe"] = this.groupes[i]["equipes"][j].nom;
                      etudiant["equipe_id"] = this.groupes[i]["equipes"][j]._id;
                      etudiant["equipe_id"] = this.groupes[i]["equipes"][j].code;
                      
                      this.etudiants.push(String(etudiant.code));
                    }
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    login() {
      if (this.nom && this.mdp === "admin") {
        this.$router.push("/admin/profil");
      }
      if (this.nom && this.mdp === "tuteur") {
        this.$router.push("/tuteur/profil");
      }
      if ((this.etudiants.includes(this.nom))  && this.mdp === "eleve") {
        this.$router.push("/eleve/"+  this.nom + "/profil");
      }
    }
  }
};
</script>