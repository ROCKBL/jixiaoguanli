import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Toast } from 'vant';
Vue.use(Toast);
Vue.prototype.Toast=Toast

import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.prototype.Dialog=Dialog


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 阿里图标
import "@/assets/iconfont/iconfont.css";

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


Vue.config.productionTip = false


// 服务器地址
import { url,picurl } from "@/utils/url.js"
// console.log(url)
// console.log(picurl)

Vue.prototype.baseUrl=url
Vue.prototype.picurl=picurl
// Vue.prototype.baseUrl="http://127.0.0.1:8080"
// Vue.prototype.baseUrl="http://192.168.1.162:8080"
// Vue.prototype.baseUrl="http://192.168.2.89:8080"
// Vue.prototype.baseUrl="http://106.13.236.136:8080"
// Vue.prototype.baseUrl="http://47.114.36.237:8080"




Date.prototype.Format = function(fmt) {
    //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




// 用户cookie 和页面路由跳转
import Cookie from 'js-cookie'
Vue.prototype.cookieTool=Cookie

router.beforeEach(async(to, from, next) => {

  // determine whether the user has logged in
  const hasToken = Cookie.get("jixiao")

  // console.log(hasToken)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      	next({ path: '/' })
      
    } else {
  		next()    
    }
  } else {
    /* has no token*/
    if(to.path=="/login"){
    	next()
    }else{
    	next({ path: '/login' })
    }
    

  }
})


// window.a=Toast
var toast=null
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    var token=Cookie.get("jixiao")
    // console.log(config)
    var username=Cookie.get("username")

    if(token){
    	config.headers['Authorization'] = token
      // config.headers['username'] = username
      
      
    }

    var userId=Cookie.get("userId")
    if(userId){
    	// if(config.params){
    	// 	config.params.id=userId
    	// }else{
    	// 	config.params={
    	// 		id:userId
    	// 	}
    	// }

      // if(config.data){
      //   config.data.id=userId
      // }

    }
    
    if(!toast){
      toast=Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '数据加载中...',
      })
    }

    // console.log(config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    
    console.log(error)
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response){
  if(response){
    // 判断是否登录

    // 处理cookies

  }

  Toast.clear();
  toast=null;

  return response

}, function (error) {
    // 对响应错误做些什么
    console.log(error)
    Toast.clear();

    toast=null;

    if(String(error).indexOf("403")>-1){
      Cookie.remove("jixiao");
      Cookie.remove("userId");
      Cookie.remove("username");
      router.replace("/login")
    }
    return Promise.reject(error);
});


