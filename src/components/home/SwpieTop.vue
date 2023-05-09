<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in state.images" :key="index">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    import axios from 'axios'
    import {reactive,onMounted} from 'vue'
    import {getBanner} from '@/request/api/home.js'
    export default {
        setup(){
            const state=reactive({
                images:[]
            });
            onMounted(async ()=>{
                let res = await getBanner()
                console.log(res);
                state.images=res.data.banners
            })
            return {state}
        }
    }
</script>

<style lang="less" scoped>
    #swiperTop{
        .van-swipe{
            width: 100%;
            padding: 10px;
            .van-swipe-item{
                img{
                    width: 100%;
                    height: 3rem;
                    border-radius: 10px;
                }
            }
        }
    }
    
</style>