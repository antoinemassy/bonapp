<template>

<v-app>
   <v-toolbar color="primary" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Bon APP</v-toolbar-title>
    </v-toolbar>
    
    <v-navigation-drawer v-model="drawer" fixed app close  >
      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/tuteur/profil'}">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mon profil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/tuteur/groupes'}">
          <v-list-tile-action>
            <v-icon>groups</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Groupes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Favoris</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/tuteur/etudiants'}">
          <v-list-tile-action>
            <v-icon>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Etudiants</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left" :to="{path: '/tuteur/equipe'}">
          <v-list-tile-action>
            <v-icon>people_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Equipe</v-list-tile-title>
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
    left: false
  }),
  props: {
    source: String
  },
  name: "app"
};
</script>