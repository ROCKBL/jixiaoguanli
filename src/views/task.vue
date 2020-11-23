<template>
	<div class="task">
		<van-nav-bar title="任务目标"   class="pageNavNative"  />

		<div class="itemRow" @click="seeMore('公司级')" v-if="isHigh">
			<div class="itemRowLeft" style="background-color: #2E67B2;">
				<van-icon class="iconfont" class-prefix='icon' name="show_gongsiguanli_fill" size="22" />
			</div>
			<div class="itemRowLabel">公司级</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>

		<div class="itemRow" @click="seeMore('部门级')">
			<div class="itemRowLeft" style="background-color: #9C15CD;">
				<van-icon class="iconfont" class-prefix='icon' name="xiazai4" size="22" />
			</div>
			<div class="itemRowLabel">部门级</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>
		<div class="itemRow" @click="seeMore('个人级')">
			<div class="itemRowLeft" style="background-color: #8079EF;">
				<van-icon class="iconfont" class-prefix='icon' name="paihangbang" size="24" />
			</div>
			<div class="itemRowLabel">个人级</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>



		<van-tabbar v-model="active" class="tabbarNav" active-color="#2E67B2" inactive-color="#999999" @change="changeTabbar">
		  	<van-tabbar-item >
		  		首页
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="shouye" size="26" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		积分
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="paigongfenpeishebei" size="32" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		任务
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="renwutongji" size="32" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		我的
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="xiazai4" size="26" />
			    </template>
		  	</van-tabbar-item>
		</van-tabbar>

	</div>
</template>

<script type="text/javascript">

import store from '@/store';

import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			active: 2,
			// isHigh:false,
			isHigh:store.state.isHigh
		}
	},
	computed:{
		...mapState({
			userInfo(state){ return state.userInfo},
		})
	},
	watch:{},
	components: {
		
	},
	methods:{
		changeTabbar(index){
			// if(index==this.active){
			// 	return
			// }
			switch(index){
				case 0:
					this.$router.replace("/")
					break;
				case 1:
					this.$router.replace("/jifenInfo")
					break;
				case 2:
					this.$router.replace("/task")
					break;
				case 3:
					this.$router.replace("/mine")
					break;
			}
		},

		showToast(){
			Toast('抱歉，职级不够！\n 努力加油，公司发展期待您的共商献策！');
		},

		isHighLevel(){
			var that=this;
			var url=this.baseUrl+"/com/emplyee/checkEmplyeeIdentity";
			this.axios({
				method: 'get',
				url: url,
				// params:params
				params: {
			      id: store.state.userInfo.id,
			    }
			}).then(function(response){
				var data=response.data
				if(data.code==200){
					that.isHigh=true
				}else{

				}
			})
		},
		seeMore(v){
			//根据接口返回值判断是否进入到下个页面 

			// if(v=="个人级"){
			// 	this.$router.push({ path: '/personalTask'})
			// 	return
			// }


			var that=this;
			// var url=this.baseUrl+"/task/targetTask";
			// var url=this.baseUrl+"/com/emplyee/checkEmplyeeIdentity";
			// var params={};
			// params.taskBjectType=v;
			
			// if(this.userInfo.id){
			// 	return
			// }

			// console.log(this.userInfo)
			// console.log(store.state.userInfo)
			// this.axios({
			// 	method: 'get',
			// 	url: url,
			// 	// params:params
			// 	params: {
			//       id: store.state.userInfo.id,
			//     }
			// }).then(function(response) {
			//   	var data=response.data
			//   	console.log(data)
			//   	if(data.code==200){
			//   		// 判断是否具有权限
			//   		// that.$router.push({ path: '/taskMid', query: { type:v }})
			//   	}else{
			//   		// that.Toast('网络错误');
			//   	}
			// }).catch(function(response){
			// 	that.showToast();
			// })


			// console.log(v)
			if(v=="公司级"){
				if(this.isHigh){
					this.$router.push({ path: '/taskMid', query: { type:v }})
				}else{
					this.showToast()
				}
			}else{
				this.$router.push({ path: '/taskMid', query: { type:v }})
			}
			

			// this.showToast();
		},
		// seeMessage(type){
		// 	switch(type){
		// 		case 'renwu':
		// 			this.$router.push('/');
		// 			break;
		// 		case 'jifen':
		// 			this.$router.push('/');
		// 			break;
		// 		case 'gongsi':
		// 			this.$router.push('/');
		// 			break;
		// 	}
		// }

	},
	mounted(){

	},
	created(){
		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing
				// that.isHighLevel()
				if(store.state.isHigh==null){
					store.dispatch("getUserLevel").then(function(){
						that.isHigh=store.state.isHigh
					})
				}


			}).catch(function(error){
				that.Toast(error);
			})
		}else{
			// that.isHighLevel()
			if(store.state.isHigh==null){
				store.dispatch("getUserLevel").then(function(){
					that.isHigh=store.state.isHigh
				})
			}
		}

	}

}
</script>

<style type="text/css" >
	.tabbarNav{
		padding-bottom: 3px;
		border-top: 1px solid rgba(0,0,0,0.1);
		padding-top: 2px;
	}
	.van-tabbar{
		height: 45px;
	}
	.van-tabbar-item__icon{
		margin-bottom: 0px;
	}
	.tabbarNav .van-tabbar-item__text{
		margin-top: auto;
	}

	.pageNavNative{
		height: 64px;
		background-color: #004E9B;
	}
	.pageNavNative .van-nav-bar__title{
        color: white;
        font-size: 18px;
        /*font-weight: 500;*/
    }
    .pageNavNative .van-icon{
        color: white;
        font-size:20px;
    }


	.task{
		text-align: left;
	}

	.task .itemRow{
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.task .itemRowLeft{
		height: 41px;
		width: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: white;
	}
	.task .itemRowLabel{
		margin-left: 10px;
		color: #333333;
		font-size: 17px;
	}
	.task .itemRowRight{
		margin-left: auto;
		color: #999999;
		font-size: 24px;
	}

	.van-toast__text{
		line-height: 34px;
	}
	.van-toast{
		background-color: rgba(0,0,0,0.5);
	}
</style>