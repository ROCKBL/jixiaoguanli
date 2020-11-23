<template>
	<div class="mine">
		<van-nav-bar title="我的"   class="pageNavNative" @click-right="onClickRight" >
			<template #right>
				<van-icon name="setting-o" />
			</template>
		</van-nav-bar>

		<div class="userScope">
			<van-image  v-if="userPic!=''" width="75" height="75" class="userScopeLeft" round :src="picurl+userPic" />
			<div v-else class="defaultPic" >
				<van-icon class="iconfont " class-prefix='icon' name="xiazai4" size="60"  />
			</div>
			<div class="userScopeRight">
				<div class="userName">{{ userName }}</div>
				<div class="userJob">{{ userJob }}</div>
			</div>
			<van-icon name="arrow" class="userScopeInfo" size="24" @click="seeUserInfo" />
		</div>

		<div class="workTable">
			<div class="workTableHead"><div class="workTableHeadTitle">工作管理</div></div>
			<van-grid :column-num="3">
			  	<van-grid-item v-for="work in workTable" :key="work.name" :text="work.name" :to="work.url">
			  		<template #icon>
			  			<div class="messagesIcon" style="height: 60px;display: flex;align-items: center;">
			  				<van-icon v-if="work.isAli" class="iconfont" class-prefix='icon' :name="work.icon" :size="work.size" color="#2E67B2"  />
			  				<van-icon v-if="!work.isAli" :name="work.icon" :size="work.size" color="#2E67B2" />
			  			</div>
			  		</template>
			  	</van-grid-item>
			</van-grid>
		</div>

		<div style="margin-bottom: 60px;"></div>

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
import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			active: 3,

			workTable:[
				{name:"守护者宣言",icon:"guize",size:"60",isAli:true,url:"/mydeclaration"},
				{name:"基本制度",icon:"hetongguizeguankong",size:"40",isAli:true,url:"/myBaseSystem"},
				{name:"专项制度",icon:"hetongguizeguankong2",size:"42",isAli:true,url:"/mySpecialSystem"},
				{name:"外出申请",icon:"waichu",size:"46",isAli:true,url:"/myOutApply"},
				{name:"岗位工作标准表",icon:"764bianjiqi_charubiaoge",size:"40",isAli:true,url:"/myWorkRule"},
				{name:"我的提案、建议",icon:"invition",size:"50",isAli:false,url:"/myAdvice"},
			],
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
		onClickRight(){
			this.$router.push("/setting")
		},



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

		seeUserInfo(){
			this.$router.push("/myInfo")
		}


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


	.mine{
		text-align: left;
	}

	.mine .userScope{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 15px;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
		margin-bottom: 10px;
	}

	.mine .userScopeLeft{

		/*border-radius: 50%;*/
	}
	.mine .defaultPic{
		border-radius: 50%;
	}
	.mine .userScopeRight{
		margin-left: 20px;
	}
	.mine .userName{
		font-size: 15px;
		color: #333333;
		margin-bottom: 15px;
	}
	.mine .userJob{
		font-size: 15px;
		color: #333333;
	}
	.mine .userScopeInfo{
		margin-left: auto;
		color: #999999;
	}


	.workTable{
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
	}
	.workTableHead{
		padding: 10px;
		box-sizing: border-box;
	}
	.workTableHeadTitle{
		color: #333333;
		font-size: 14px;
		padding-left: 6px;
		border-left: 4px solid #2E67B2;
	}
</style>