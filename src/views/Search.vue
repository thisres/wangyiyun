<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-fanhui"></use>
        </svg>
        <div class="input">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo1"></use>
            </svg>
            <input type="text" v-model="keywords" @keyup.enter="enterSearch" placeholder="请输入歌曲或歌名">
        </div>
        <span @click="doSearch(keywords)">搜索</span>
    </div>
    <div class="searchbody" v-if="searchindex == 1">
        <div class="searchbody_top">
            <p>热搜榜</p>
            <div class="searchbodyicon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo1"></use>
                </svg>
                <span>热门</span>
            </div>
        </div>
        <div class="searchbody_content">
            <div class="searchbody_reso" v-for="(item, index) in searchList" @click="doSearch(item.searchWord)">
                <p>{{ ++index }}</p>
                <div class="searchbody_list">
                    <p>{{ item.searchWord }}</p>
                    <span>{{ item.content }}</span>
                </div>
                <span>{{ item.score }}</span>
            </div>
        </div>
    </div>
    <div class="searchvalue" v-else-if="searchindex == 2">
        <div class="searchprogress" v-for="(item, index) in searchvalue" :key="index" @click="doSearch(item.keyword)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo1"></use>
            </svg>
            <p>{{ item.keyword }}</p>
        </div>
    </div>
    <div class="doDearch" v-else>
        <div class="doDearch_music" v-for="(item, index) in searchmusic" @click="musicPlay(index)">
            <img :src="item.al.picUrl" alt="">
            <div class="doDearch_text">
                <p>{{ item.name }}</p>
                <div class="doDearch_ar">
                    <span  v-for="(items, index) in item.ar" :key="index">{{ items.name }}</span>
                </div>
            </div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getMusicdoSearchList } from '@/request/api/search'
import { getMusicSearchList } from '@/request/api/search'
import { getMusicSearchDetail } from '@/request/api/search'
export default {
    data() {
        return {
            keywords: '',
            searchList: [],
            searchindex: 1,
            searchvalue: [],
            searchmusic: [],
        }
    },
    async mounted() {
        this.init()
    },
    methods: {
        async init() {
            const res = await getMusicSearchDetail()
            // console.log(res.data.data);
            this.searchList = res.data.data
        },
        async doSearch(value) {
            // console.log(value);
            if (value == '') {
                this.searchindex = 1
                alert('请输入内容')
            } else {
                this.keywords = value
                const res = await getMusicdoSearchList(this.keywords)
                // console.log(res);
                this.searchmusic = res.data.result.songs
                this.searchindex = 3
            }
        },
        async enterSearch() {
            const res = await getMusicdoSearchList(this.keywords)
            this.searchmusic = res.data.result.songs
            this.searchindex = 3

        },
        musicPlay(index) {
            this.upadatePlayList(this.searchmusic)
            this.upadatePlayListIndex(index)
        },
        ...mapMutations(['upadatePlayList','upadatePlayListIndex'])
    },
    watch: {
        keywords: async function (newValue) {
            if (newValue == '') {
                this.searchindex = 1
            } else {
                const res = await getMusicSearchList(newValue)
                // console.log(res.data.result.allMatch);
                this.searchvalue = res.data.result.allMatch
                this.searchindex = 2
            }
        }
    },
}

</script>

<style lang='less' scoped>
.searchTop {
    display: flex;
    padding: .4rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    justify-content: center;
    align-items: center;

    .input {
        flex: 1;
        display: flex;
        margin-left: .2rem;
        padding: .2rem;
        border-radius: .4rem;
        background-color: #fff;

        input {
            flex: 1;
            border: none;
            margin-left: .1rem;
        }
    }

    span {
        margin-left: .1rem;
        font-size: .36rem;
        color: #636e72;
    }
}

.searchbody {
    background-color: #f5f5f5;
    padding: 0 .2rem 2rem .2rem;
    box-sizing: border-box;

    .searchbody_top {
        display: flex;
        background-color: #fff;
        justify-content: space-between;
        padding: .2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;

        p {
            font-size: .36rem;
            font-weight: 700;
        }

        .searchbodyicon {
            display: flex;
            color: #636e72;

            .icon {
                fill: #636e72;
            }
        }
    }

    .searchbody_content {
        background-color: #fff;
        padding: .2rem;
        box-sizing: border-box;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;

        .searchbody_reso {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            padding: .2rem;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;

            p {
                font-size: .4rem;
                font-weight: 700;
            }

            .searchbody_list {
                flex: 1;
                text-align: center;
                padding: 0 .2rem;
                box-sizing: border-box;

                p {
                    font-size: .36rem;
                    font-weight: 700;
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
                    color: #636e72;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    white-space: normal; //设置文字换行
                    word-wrap: break-word; //设置数字强制换行
                    overflow: hidden;
                }
            }
        }

        .searchbody_reso:nth-child(-n+4) {
            color: #e74c3c;
        }

        .searchbody_reso:last-child {
            border-bottom: none;
        }
    }
}

.searchvalue {
    padding: 0 .2rem 2rem .2rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    height: 100vh;

    .searchprogress {
        display: flex;
        padding: .2rem;
        box-sizing: border-box;

        p {
            flex: 1;
            padding-bottom: .2rem;
            margin-left: .2rem;
            color: #34495e;
            border-bottom: 1px solid #ccc;
        }

        .icon {
            fill: #3498db;
        }
    }
}

.doDearch {
    background-color: #f5f5f5;
    padding: 0 .2rem 2rem .2rem;
    box-sizing: border-box;
    border-radius: .2rem;

    .doDearch_music {
        display: flex;
        background-color: #fff;
        align-items: center;
        padding: .2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: .2rem;
        }

        .doDearch_text {
            flex: 1;
            margin-left: .2rem;

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

            .doDearch_ar {
                display: flex;
                font-size: .28rem;
                color: #34495e;
                text-overflow: ellipsis;
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
</style>
