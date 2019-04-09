<template>
  <v-app id="inspire">
    <Toolbar/>
    
        <Content/>
   

    <v-footer color="blue-grey" class="white--text" app>
      <span>Ébène</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Content from './components/admin/template3.vue'
import Toolbar from './components/admin/toolbar.vue'

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
    Content,
    Toolbar
  },
  }
</script>