<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      close
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>description</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Fields</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>event</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Subject</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile @click.stop="left = !left">
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
     <v-container>
       
     </v-container>
    </v-content>

    
    
    <v-footer color="blue-grey" class="white--text" app>
      <span>Antoine</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

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
    name: 'app',
  components: {
    Subject
  },
  }
</script>