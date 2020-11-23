<template>
	<div class="mydeclaration">
		<van-nav-bar title="守护者宣言"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="wrap" v-html="SHZPic"></div>
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
			SHZPic:"",
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
        getSHZ(){
			// 获取守护者 
			var that=this;
			this.axios({
				method: 'get',
				url: this.baseUrl+"/notice/queryEmpId",
				params:{
					type:1
				},
			}).then(function(response){
				// console.log(response)
				that.SHZPic=response.data.result[0].content
			})
		},
	},
	mounted(){

	},
	created(){
		var that=this;

		// if(JSON.stringify(store.state.userInfo)=="{}"){

		// 	store.dispatch('getUserInfo').then(function(msg){
		// 		// nothing

		// 	}).catch(function(error){
		// 		that.Toast(error);
		// 	})
		// }

		this.getSHZ()
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


	.mydeclaration{
		text-align: left;
	}

	.mydeclaration .wrap{
		box-sizing: border-box;
		padding: 0px 15px;
	}
</style>