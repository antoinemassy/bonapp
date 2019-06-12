<template>

<v-app>
   <v-toolbar color="primary" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Bon APP</v-toolbar-title>
    </v-toolbar>
    
    <v-navigation-drawer v-model="drawer" fixed app close  >
      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/eleve/' + this.eleve._id +'/profil'}">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mon profil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/eleve/' + this.eleve._id +'/fiches'}">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mes fiches</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>people_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mon equipe</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/'}">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Exit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
 <v-content>
<router-view></router-view>
 </v-content>
</v-app>
</template>


<<script>
export default {
  data: () => ({
    drawer: false,
    drawerRight: null,
    right: false,
    left: false,
    eleve:{}
  }),
  props: {
    source: String
  },
  name: "app"
  ,

  

  created() {
    this.eleve._id = this.$route.params.idEleve;
    
  },
};
</script>