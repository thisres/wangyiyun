<template>
    <div class="body">
        <div class="body_top">
            <div class="body_topleft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                </svg>
                <span>播放全部</span>
            </div>
            <div class="body_topright">
                <span>+ 收藏{{ subscribedCount }}</span>
            </div>
        </div>
        <div class="body_body">
            <div class="gequ" v-for="(item, index) in tracks" :key="index">
                <div class="gequleft" @click="playMusic(index)">
                    <span>{{ index + 1 }}</span>
                    <div class="gequzuoze">
                        <p>{{ item.name }}</p>
                        <span v-for="(items, i) in item.ar" :key="i">{{ items.name }}&nbsp;</span>
                    </div>
                </div>
                <div class="gequright">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shipin" v-if="item.mv != 0"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    setup(props) {
        function changeConut(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            } else {
                return num
            }
        }
        console.log(props);
        return { changeConut }
    },
    props: ['tracks', 'subscribedCount'],
    methods: {
        playMusic: function (index) {
            this.upadatePlayList(this.tracks)
            this.upadatePlayListIndex(index)
        },
        ...mapMutations(['upadatePlayList', 'upadatePlayListIndex'])
    },
}

</script>

<style lang='less' scoped>
.body {
    width: 100%;

    .body_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;

        .body_topleft {
            display: flex;
            font-size: 18px;

            .icon {
                width: .5rem;
                height: .5rem;
            }

            span {
                margin-left: .2rem;
            }
        }

        .body_topright {
            display: flex;
            padding: .2rem;
            color: #fff;
            border-radius: .4rem;
            background-color: #e74c3c;
        }
    }

    .body_body {
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #fff;

        .gequ {
            display: flex;
            align-items: center;
            padding: .2rem;

            .gequleft {
                display: flex;
                flex: 1;

                span {
                    font-size: .36rem;
                    color: #ccc;
                }

                .gequzuoze {
                    flex: 1;
                    margin-left: .4rem;
                    overflow: hidden;
                    p {
                        font-size: .32rem;
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
                        font-size: .24rem;
                        color: #ccc;
                    }
                }
            }

            .gequright {
                .icon {
                    width: .5rem;
                    height: .5rem;
                    margin-right: .2rem;
                }
            }


        }

        .gequ:nth-child(-n+3) {
            span {
                font-size: .36rem;
                color: #e74c3c;
            }

            .gequzuoze {
                span {
                    font-size: .24rem;
                    color: #ccc;
                }
            }
        }
    }
}
</style>
