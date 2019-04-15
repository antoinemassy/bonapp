<template>

<v-app>
<Toolbar/>
<router-view></router-view>
</v-app>
</template>


<script>
import Toolbar from './toolbar.vue'

  export default {
    data: () => ({
    }),
  components: {
    Toolbar
  },
  }
</script>