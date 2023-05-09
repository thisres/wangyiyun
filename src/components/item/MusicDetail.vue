<template>
    <img class="bgimg" :src="musicList.al.picUrl" alt="">
    <div class="detailTop">
        <div class="detailLeft">
            <svg class="icon" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <div class="detailLeft_text">
                <p>{{ musicList.name }}</p>
                <span v-for="(item, index) in musicList.ar" :key="index">{{ item.name }}</span>
            </div>
        </div>
        <div class="detailRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" @click="isLyricShow = true" v-show="!isLyricShow">
        <img class="img_needle" :class="{ img_needle_avtive: !isbtnShow }" src="@/assets/needle-ab.png" alt="">
        <img class="img_cd" src="@/assets/chipan.png" alt="">
        <img class="img_ar" :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }" :src="musicList.al.picUrl"
            alt="">
    </div>
    <div class="detailContent" @click="isLyricShow = false" v-show="isLyricShow">
        <div class="musicLyric" ref="musicLyric">
            <p v-for="(item, index) in lyric" :key="index"
                :class="{ activetext: (currentTime * 1000 >= item.time) && (currentTime * 1000 < item.pre) }">
                {{ item.lrc }}
                <!-- {{currentTime*1000}} -->
                <!-- {{item.tiem}} -->
            </p>
        </div>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xihuan"></use>
            </svg>
            <a :href="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
            </a>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shipin1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jianyi"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duratioin" step="0.05" v-model="currentTime">
        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg @click="goPlay(-1)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg v-if="isbtnShow" class="icon bofan" aria-hidden="true" @click="musicpaly">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-else class="icon bofan" aria-hidden="true" @click="musicpaly">
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg @click="goPlay(1)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            isLyricShow: false,
        }
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playList', 'playListIndex', 'duratioin']),
        lyric: function () {
            let arr;
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 9)
                    let lrc = item.slice(11, item.length)
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    return { min, sec, mill, lrc, time }
                })
                arr.pop()
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 10000000
                    } else {
                        item.pre = arr[i + 1].time
                    }
                });
            }
            // console.log(arr);
            console.log(this.currentTime * 1000);
            return arr
        }
    },
    mounted() {
        // console.log(this.musicList);
        this.addDuration()
    },
    watch: {
        currentTime: function (newValue) {
            let p = document.querySelector("p.activetext")
            // console.log([p]);
            if (p) {
                if (p.offsetTop > 210) {
                    // console.log([this.$refs.musicLyric]);
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 210
                }
            }
            if (newValue === this.duratioin) {
                this.goPlay(1)
            }
        }

    },
    props: ['musicList', 'isbtnShow', 'musicpaly', 'addDuration'],
    methods: {
        backHome: function () {
            this.updateDetailShow()
            this.isLyricShow = false
        },
        goPlay: function (num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            } else if (index == this.playList.length) {
                index = 0
            }
            this.$refs.musicLyric.scrollTop = 0
            this.upadatePlayListIndex(index)
        },
        ...mapMutations(['updateDetailShow', 'upadatePlayListIndex'])
    }
}

</script>

<style lang='less' scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -10;
    filter: blur(70px);
}

.detailTop {
    width: 100%;
    display: flex;
    padding: .4rem;
    justify-content: space-between;
    align-items: center;

    .detailLeft {
        flex: 1;
        display: flex;
        align-items: center;

        .detailLeft_text {
            flex: 1;
            margin-left: .4rem;
            text-align: center;

            p {
                font-size: .36rem;
                color: #fff;
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
                width: 70%;
                font-size: .28rem;
                color: #aaa;
            }
        }
    }

    .icon {
        fill: #fff;
        width: .5rem;
        height: .5rem;
    }
}

.detailContent {
    width: 100%;
    height: 8.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;

    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        top: -.2rem;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-15deg);
        transition: all 1s;
        z-index: -1;
    }

    .img_needle_avtive {
        width: 2rem;
        height: 3rem;
        position: absolute;
        top: -.4rem;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(3deg);
        transition: all 1s;
        z-index: -1;
    }

    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -2;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.24rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_pauesd {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .musicLyric {
        width: 100%;
        height: 95%;
        margin-top: .2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: scroll;

        p {
            color: #b2bec3;
            margin-bottom: .4rem;
            font-size: 18px;
        }

        .activetext {
            color: #fff;
            font-size: .52rem;
        }
    }
}

.detailFooter {
    width: 100%;
    padding: .4rem;

    .footerTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;
    }

    .footerContent {
        height: .6rem;

        .range {
            width: 100%;
            height: .06rem;
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bofan {
            width: .9rem;
            height: .9rem;
        }
    }

    .icon {
        fill: #fff;
        width: .55rem;
        height: .55rem;
    }
}
</style>
