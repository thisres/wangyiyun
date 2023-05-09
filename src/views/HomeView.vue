<template>
  <TopNav/>
  <SwpieTop/>
  <IconList/>
  <MusicList/>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
import SwpieTop from '@/components/home/SwpieTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwpieTop,
    IconList,
    MusicList,
  },
}
</script>
