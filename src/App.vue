<template>
  <v-app id="inspire">
   <router-view></router-view>
    <v-footer color="primary" class="white--text" app>
      <span>Ébène</span>
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

  }
  }
</script>