import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      page: 1,
      size: 2,
      isShowMosk: false,
      stuList: [],
      user: {},
      sumPage:0
   },
   getters: {
      capturesIsShowMosk(state) {
         return state.isShowMosk
      }
   },
   mutations: {
      setStuList(state, list) {
         state.stuList = list;
      },
      setIsShowMosk(state, flag) {
         state.isShowMosk = flag;
      },
      setUser(state, user={}) {
         state.user = user;
      },
      setPage(state, newPage){
         state.page = newPage
      },
      setSumPage(state, cont){
         state.sumPage = Math.ceil(cont/state.size)
      }
   },
   actions: {
      getStuList({ commit, state },page) {
         api.findPage(page, state.size).then(data =>{
            commit('setStuList', data.data.data.findByPage)
            commit('setPage', page)
            commit('setSumPage', data.data.data.cont)
           } ).catch(err => console.log(err))
      },
      updateStuInfo({commit, state},newUser){
          api.updateStu(newUser).then(data=>{
              if(data.data.msg == '修改成功'){
               Object.assign(state.user,newUser)
               commit('setIsShowMosk',false)
               commit('setUser')
              }
          }).catch(err=>{
             console.log(err)
          })
      },
      delBySno(sNo){
         api.delBySno(sNo).then(data=>{
            alert(data.data.msg)
         },err=>{
            console.log(err)
         })
      },
      searchStu({dispatch, commit}, keyWord, page=1){
         api.searchStu(keyWord, page).then(data=>{
            let dataObj = data.data.data.searchList,cont = data.data.data.cont
            console.log(dataObj)
            if(dataObj.length == 0){
               alert("查询失败")
            }else{
               alert("查询成功,准备渲染页面")
               commit('setSumPage',cont)
               commit('setStuList',dataObj)
            }
         }).catch(err=>{
            console.log(err)
         })
      }
   }
})
