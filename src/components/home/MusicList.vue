<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
        <van-swipe :loop="false" :width="120" class="my-swpie" :show-indicators="false">
            <van-swipe-item class="item" v-for="(item,index) in musicList" :key="index">
                <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang2"></use>
                        </svg>
                        {{changeConut(item.playCount)}}
                    </span>
                    <span>{{item.name}}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js"
export default {
    data() {
        return {
            musicList:[],
        }
    },
    methods:{
        async getGneden(){
            let res =await getMusicList();
            console.log(res);
            this.musicList=res.data.result
        },
        changeConut:function(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+'亿'
            }else if(num>=10000){
                return (num/10000).toFixed(1)+'万'
            }
        }
    },
    mounted(){
        this.getGneden()
    }
}

</script>

<style lang='less' scoped>
    .musicList{
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
        .musicTop{
            width: 100%;
            height: .6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .title{
                font-size: .4rem;
                font-weight: 900;
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: .6rem;
                padding: 0 .2rem;
                border-radius: .4rem;
            }
        }
        .musicContent{
            width: 100%;
            height: 3.4rem;
            .my-swpie{
                height: 100%;
                position: relative;
                .item{
                    margin-right: .3rem;
                    img{
                        width: 100%;
                        height: 2.4rem;
                        border-radius: 20px;
                    }
                    span{
                        text-indent: 1em;
                        color: #000;
                        text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						word-wrap: break-word;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					    white-space: normal; //设置文字换行
						word-wrap: break-word; //设置数字强制换行
						overflow: hidden;
                    }
                    .playCount{
                        position: absolute;
                        display: flex;
                        color: #fff;
                        top: 2%;
                        left: 30%;
                        font-size: .28rem;
                        text-indent: 0;

                        .icon{
                            fill: #fff;
                        }
                    }
                }
                
            }
        }
    }
</style>
