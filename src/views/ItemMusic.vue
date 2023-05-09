<template>
  <itemMusiceTop :playlist="state.playlist"/>
  <itemMusicList :tracks="state.tracks" :subscribedCount="state.playlist.subscribedCount"/>
</template>

<script>
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router';
import {getMusicItemList} from '@/request/api/item'
import itemMusiceTop from '@/components/item/itemMusiceTop.vue'
import itemMusicList from '@/components/item/ItemMusicList.vue'

export default {
    setup() {
        const state = reactive({
            playlist:{},//歌单详情页数据
            tracks:[]//歌单歌曲详情
        })
        onMounted(async () => {
            let id = useRoute().query.id
            // console.log(id);

            let res=await getMusicItemList(id)
            console.log(res);
            state.playlist=res.data.playlist

            state.tracks=res.data.playlist.tracks

            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        
        });
        return {state}
    },
    components:{
        itemMusiceTop,
        itemMusicList,
    }
}

</script>

<style lang='less' scoped>

</style>
