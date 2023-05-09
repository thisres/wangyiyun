<template>
    <div class="itemMusicTop">
        <img class="bgimg" :src="playlist.coverImgUrl" alt="">
        <div class="itemleft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemright">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-huodongmulupeizhi"></use>
            </svg>
        </div>
    </div>
    <div class="musicbody">
        <div class="musicbody_top">
            <div class="musicbody_top_left">
                <img :src="playlist.coverImgUrl" alt="">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang2"></use>
                    </svg>
                    {{ changeConut(playlist.playCount) }}
                </span>
            </div>
            <div class="musicbody_top_right">
                <p>{{ playlist.name }}</p>
                <div class="musicbody_right_top">
                    <span>{{ playlist.description }}</span>
                </div>
            </div>
        </div>
        <div class="musicbody_body">
            <div class="musicbody_body_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <p>{{changeConut(playlist.shareCount)}}</p>
            </div>
            <div class="musicbody_body_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jianyi"></use>
                </svg>
                <p>{{changeConut(playlist.commentCount)}}</p>
            </div>
            <div class="musicbody_body_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <p>下载</p>
            </div>
            <div class="musicbody_body_icon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xianshi_xuanze"></use>
                </svg>
                <p>多选</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        if (props.playlist.creator == '') {
            props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
        }
        function changeConut(num) {
            if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万'
            }else{
                return num
            }
        }
        return { changeConut }
    },
    props: ['playlist']
}

</script>

<style lang='less' scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;

    .itemleft,
    .itemright {
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;

        span {
            font-size: .4rem;
            color: #fff;
        }

        .icon {
            fill: #fff;
        }
    }

    .bgimg {
        width: 100%;
        height: 11rem;
        position: fixed;
        z-index: -1;
        filter: blur(30px);
    }
}

.musicbody {
    width: 100%;
    padding: .2rem;
    margin-top: .4rem;

    .musicbody_top {
        display: flex;

        .musicbody_top_left {
            position: relative;

            img {
                width: 2.6rem;
                height: 2.6rem;
                border-radius: .3rem;
            }

            .playCount {
                position: absolute;
                display: flex;
                color: #fff;
                top: 2%;
                left: 30%;
                font-size: .28rem;
                text-indent: 0;

                .icon {
                    fill: #fff;
                }
            }
        }

        .musicbody_top_right {
            margin-left: .4rem;

            p {
                color: #fff;
                font-size: .36rem;
            }

            .musicbody_right_top {
                display: flex;
                margin-top: .4rem;
                align-items: center;

                span {
                    font-size: .24rem;
                    color: #fff;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 3;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    white-space: normal; //设置文字换行
                    word-wrap: break-word; //设置数字强制换行
                    overflow: hidden;
                }
            }
        }
    }
    .musicbody_body{
        display: flex;
        justify-content: space-around;
        margin-top: .4rem;
        .musicbody_body_icon{
            text-align: center;
            color: #fff;
            .icon{
                fill: #fff;
            }
        }
    }
}
</style>
