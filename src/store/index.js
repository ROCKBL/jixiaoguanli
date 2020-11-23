import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

import {url} from "@/utils/url.js"

import Cookie from 'js-cookie'


export default new Vuex.Store({
  state: {
  	userInfo:{},
    isHigh:null,//是否是主管及主管以上级别
  },
  mutations: {
  	setUserInfo(state,obj){
  		state.userInfo=obj
  	},
  	clearUserInfo(state){
  		state.userInfo={}
  	},

    setIsHigh(state,flag){
      state.isHigh=flag
    },
    clearIsHigh(state){
      state.isHigh=null
    },

  },
  actions: {
    getUserInfo({ commit, state }){
        return new Promise(function(resolve,reject){
            var url_user=url+"/com/emplyee/queryByUserId";
            axios({
                method: 'get',
                url: url_user,
            }).then(function(response) {
                var data=response.data
                if(data.code==200){

                    commit('setUserInfo', data.result)

                    resolve("ok")

                }else{

                    resolve("网络错误")
                }
            }).catch(function(response){
                reject(response)
            })
        })
    },

    getUserLevel({ commit, state }){
      return new Promise(function(resolve,reject){
          var url_user=url+"/com/emplyee/checkEmplyeeIdentity";
          axios({
              method: 'get',
              url: url_user,
              params: {
                id: state.userInfo.id,
              }
          }).then(function(response) {
              var data=response.data
              if(data.code==200){

                  commit('setIsHigh', true)
                  resolve("ok")

              }else{
                  commit('setIsHigh', false)
                  resolve("ok")
              }
          }).catch(function(response){
              reject(response)
          })
      })
    },

    login({ commit, state },loginData){
        return new Promise(function(resolve,reject){
            var url_login=url+"/loginPage";
            axios({
                method: 'post',
                url: url_login,
                params: {
                  username: loginData.usrId,
                  password:loginData.passWord
                }
            }).then(function(response) {
                var data=response.data
                if(data.code==200){
                    // 保存登录状态
                    
                    Cookie.set('jixiao', 'Bearer' +data.token);
                    Cookie.set('userId',data.id)

                    Cookie.set('username',data.data.name)
                    
                    resolve("ok")
                    
                }else{
                    // that.Toast('网络错误');
                    resolve("网络错误")
                }

                

            }).catch(function(response){
                reject(response)
            })
        })


        

    },
    logout({ commit, state }){
        return new Promise(function(resolve,reject){
            Cookie.remove("jixiao");
            Cookie.remove("userId");
            commit("clearUserInfo")

            commit("clearIsHigh")

            resolve()
            // this.$router.replace("/login")

        })
        
    }

  },
  modules: {
  }
})
