<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="footerLeft_text">
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg @click="play" v-if="isbtnShow" class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg @click="play" v-else class="icon" aria-hidden="true">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistMusic5"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
            @ended="overAudio"></audio>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :musicpaly="play" :isbtnShow="isbtnShow"
                :addDuration="addDuration" />
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"
import MusicDetail from '@/components/item/MusicDetail.vue'

export default {
    data() {
        return {
            interVal: 0,
        }
    },
    computed: {
        //意思是将vuex中的city数据映射到组件的computed属性里
        ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow"])
    },
    mounted() {
        console.log(this.$refs);
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods: {
        play: function () {
            //判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()//播放调用函数
            } else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interVal)//暂停清除定时器
            }
        },
        addDuration: function () {
            this.updateDuratioin(this.$refs.audio.duration)
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 1000)
        },
        //播放完毕执行
        overAudio() {
            this.play()
        },
        ...mapMutations(["updateIsbtnShow", "updateDetailShow", "updateCurrentTime", "updateDuratioin"])
    },
    watch: {
        playListIndex: function () {//歌曲切换后自动播放
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
                this.updateTime()//播放调用函数
            }
        },
        playList: function () {
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
                this.updateTime()//播放调用函数
            }
        }
    },
    components: {
        MusicDetail,
    }
}

</script>

<style lang='less' scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    display: flex;
    padding: .2rem;
    justify-content: space-between;

    .footerLeft {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        .footerLeft_text {
            margin-left: .4rem;

            p {
                font-size: .4rem;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                white-space: normal; //设置文字换行
                word-wrap: break-word; //设置数字强制换行
                overflow: hidden;
            }

            span {
                font-size: .28rem;
                color: #ccc;
            }
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }
}
</style>
