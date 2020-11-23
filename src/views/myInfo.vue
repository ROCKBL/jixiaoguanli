<template>
	<div class="myInfo">
		<van-nav-bar title="个人资料"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="userInfoWrap">
			<div class="userInfo" >
				<div class="divider"></div>
				<div class="userScope">
					<van-image v-if="userPic!=''" width="90" height="90" class="userScopeLeft" :src="picurl+userPic" />
					<div v-else class="defaultPic" >
						<van-icon class="iconfont " class-prefix='icon' name="xiazai4" size="60"  />
					</div>

					<div class="userScopeRight">
						<div class="userName">{{ userName }}</div>
						<div class="userJob">{{ userJob }}</div>
					</div>
				</div>

				<div class="userInfoDetail">
					<van-icon class="iconfont userInfoDetailIcon" class-prefix='icon' name="gerenxinxi1" size="22" color="#2E67B2" />
					<div class="userInfoDetailTitle">任职信息</div>
				</div>
				<div class="divider"></div>

				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>身份证号码：</div>
						<div>{{ userId }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>性别：</div>
						<div>{{ gender }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 50px;">
						<div>年龄：</div>
						<div>{{ age }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 45px;">
						<div>工号：</div>
						<div>{{ empno }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>职务级别：</div>
						<div>{{ jobLevel }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>工作地点：</div>
						<div>{{ place }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>入职时间：</div>
						<div>{{ entryDate }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>试用期：</div>
						<div>{{ probation }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>工龄：</div>
						<div>{{ seniority }}年</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>合同签订日期：</div>
						<div>{{ contractAwardDate }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 45px;">
						<div>合同有效期：</div>
						<div>{{ contractvalidityDate }}</div>
					</div>
				</div>

				<div class="divider" style="margin-bottom: 40px;margin-top: 30px;"></div>
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
			jbTableData:[],
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


	.myInfo{
		text-align: left;
	}

	.myInfo .userInfoWrap{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;
		overflow: auto;
	}
	.myInfo .userInfo{
		width: fit-content;
		color: #333333;
	}
	.myInfo .divider{
		border: 1px solid #2E67B2;
	}

	.myInfo .userScope{
		display: flex;
		margin-top: 15px;
		margin-bottom: 35px;
	}
	.myInfo .userScopeLeft{
		box-shadow: 0px 0px 6px rgba(0,0,0,0.36);
	}
	.myInfo .userScopeRight{
		margin-left: 30px;
	}
	.myInfo .userName{
		font-size: 17px;
		font-weight: bold;
	}
	.myInfo .userJob{
		font-size: 17px;
		margin-top: 30px;
		font-weight: bold;
	}

	.myInfo .userInfoDetail{
		display: flex;
		margin-bottom: 15px;
	}
	.myInfo .userInfoDetailTitle{
		color: #2E67B2;
		font-size: 17px;
		margin-left: 5px;
	}


	.myInfo .userInfoDetailRow{
		font-size: 15px;
		color: #333333;
		margin-top: 30px;

		display: flex;
    	flex-wrap: nowrap;
    	white-space: nowrap;
	}
	.myInfo .userInfoDetailRowItem{
		display: flex;
		align-items: center;
	}
	.myInfo .userInfoDetailRowLeft{
		flex-basis: 270px;
		min-width: 270px;
	}

</style>