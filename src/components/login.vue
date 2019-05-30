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
                  <v-text-field v-model="nom" prepend-icon="person" name="login" label="Nom d'utilisateur" type="text"></v-text-field>
                  <v-text-field v-model="mdp" id="password" prepend-icon="lock" name="password" label="Mot de passe" type="password"></v-text-field>
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
      nom:"",
      mdp:""
    }),
    methods:{
      login(){
        if(this.nom && this.mdp ==="admin"){
          this.$router.push('/admin/profil');
        }
        if(this.nom && this.mdp ==="tuteur"){
          this.$router.push('/tuteur/profil');
        }
        

        
      }
    }
   
  }
</script>