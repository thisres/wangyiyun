import { getMusicLyric } from '@/request/api/item';
import { createStore } from 'vuex'

export default createStore({
  namespaced: true,
  state: {
    playList:[{
      ar: [
        {
          id: 12127740,
          name: "王天阳",
        }
      ],
      al:{
        id: 139671997,
				name: "迷途的孤鸟",
				picUrl: "http://p3.music.126.net/fQgL7BdfaHIuybik2zWMvQ==/109951166998736692.jpg",
				pic_str: "109951166998736692",
				pic: 109951166998736690,
      },
      id:1916435350,
      name:'迷途的孤鸟',
    }],
    playListIndex:0,//歌单的默认下标
    isbtnShow:true,//歌曲播放默认暂停
    detailShow:false,//歌曲详情页显示
    lyricList:{},//歌词
    currentTime:0,//当前时间
    duratioin:0,//歌曲总时长
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow:function(state,value){
      state.isbtnShow=value
    },
    upadatePlayList:function(state,value){
      state.playList=value
      console.log(state.playList);
    },
    upadatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      // console.log(state.currentTime);
      state.currentTime=value
    },
    updateDuratioin:function(state,value){
      state.duratioin=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res =await getMusicLyric(value)
      // console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    }
  },
  modules: {
  }
})
