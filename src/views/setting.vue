<template>
	<div class="setting">
		<van-nav-bar title="设置"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="wrap">
			<div class="item" @click="changePW">
				<van-icon class="iconfont leftIcon" class-prefix='icon' name="mima" size="26"  />
				<div class="itemLabel">修改密码</div>
				<van-icon name="arrow" class="rightIcon" size="20" />
			</div>
			<div class="item" @click="logout">
				<van-icon class="iconfont leftIcon" class-prefix='icon' name="tuichu" size="22"  />
				<div class="itemLabel">退出登录</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

import store from '@/store';
import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{

		}
	},
	computed:{
		...mapState({
			userPic(state){ return state.userInfo.photo||""},
			userName(state){ return state.userInfo.name||""},
			userDep(state){ return state.userInfo.depName||""},
			jobLevel(state){ return state.userInfo.stationLevel||""},

			userJob(state){ return state.userInfo.stationName||""},
			userId(state){ return state.userInfo.idNumber||""},
			gender(state){ return state.userInfo.sex||""},
			age(state){ return state.userInfo.age||""},
			empno(state){ return state.userInfo.number||""},
			place(state){ return state.userInfo.workAddress||""},
			entryDate(state){ return state.userInfo.createTime||""},
			probation(state){ return state.userInfo.probationPeriod||""},
			seniority(state){ return state.userInfo.workYears||""},
			contractAwardDate(state){ return state.userInfo.lastSigningTime||""},
			contractvalidityDate(state){ return state.userInfo.contractEndDate||""},
			depName(state){ return state.userInfo.depName||""},
			userInfo(state){ return state.userInfo},
		})

	},
	watch:{},
	components: {

	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        changePW(){
        	this.$router.push("/changePW")
        },
        logout(){
        	var that=this;
			store.dispatch('logout').then(function(){
				that.$router.replace("/login")
			})
        },
	},
	mounted(){

	},
	created(){
		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing

			}).catch(function(error){
				that.Toast(error);
			})
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


	.setting{
		text-align: left;
	}
	.setting .item{
		display: flex;
		align-items: center;
		padding: 10px 15px;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		height: 60px;
	}
	.setting .itemLabel{
		color: #333333;
		font-size: 15px;
		margin-left: 15px;
	}
	.setting .leftIcon{

	}
	.setting .rightIcon{
		margin-left: auto;
		color: #999999;
	}
	.setting .wrap{
		box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	}
</style>