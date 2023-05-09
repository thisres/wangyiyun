import service from "..";
//input回车查询歌曲
export function getMusicdoSearchList(data){
    return service({
        url:`/search?keywords=${data}`,
		method:'POST',
    })
}

//input 输入时查询歌曲
export function getMusicSearchList(data){
    return service({
        url:`/search/suggest?keywords=${data}&type=mobile`,
		method:'POST',
    })
}

//热搜榜
export function getMusicSearchDetail(){
    return service({
        url:`/search/hot/detail`,
    })
}