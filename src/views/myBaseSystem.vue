<template>
	<div class="myBaseSystem">
		<van-nav-bar title="基本制度表"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="specialRule">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="qunfengshiyongguize" size="16" :style="{'margin-left':'-6px'}" />
				</div>
				<div class="specialRuleLabel">基本制度表</div>
			</div>

			<div class="divier"></div>

			<div class="jbTable">
				<van-row>
				  	<van-col span="24" class="jbTableName jbcell">基本制度表</van-col>
				</van-row>
				<van-row class="jbTableRow">
				  	<van-col class="jbTableHeadCell jbcell" span="3">制度类型</van-col>

				  	<van-col span="21">
				  		<van-row style="height: 100%;display: flex;">
					  		<van-col class="jbTableHeadCell jbcell jbCenterCell" span="3">序号</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="13">基本制度内容</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="4">奖扣分数类型</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="4">奖扣分数</van-col>
						</van-row>
				  	</van-col>

				</van-row>
				<van-row v-for="item in jbTableData" style="display: flex;" >
					<van-col class="jbTableLeftCell jbcell jbCenterCell" span="3">{{ item.name }}</van-col>
				  	<van-col  span="21">
				  		<van-row  v-for="(unit,index) in item.children" style="display: flex;">
					  		<van-col class="jbcell jbCenterCell jbcellValue" span="3">{{ index+1 }}</van-col>
						  	<van-col class="jbcell jbcellValue" span="13">{{ unit.scoringItems }}</van-col>
						  	<van-col class="jbcell jbCenterCell jbcellValue" span="4">{{ unit.categoryAB }}</van-col>
						  	<van-col class="jbcell jbCenterCell jbcellValue" span="4">{{ unit.active=="减分"?"-"+unit.num:"+"+unit.num }}</van-col>
						</van-row>
				  	</van-col>
				</van-row>
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
        getJB(){
			// 获取基本制度
			var that=this;
			this.axios({
				method: 'get',
				url: this.baseUrl+"/com/scoreCalculation/list",
				params:{
					pageNo:1,
					pageSize:9999
				},
			}).then(function(res){
				// console.log(res)
				if(res.data.code==200){
					// that.jbTableData=res.data.result.records
					var ar=[]
					for(var i=0;i<res.data.result.records.length;i++){
						var find=ar.find(function(o){
							return o.pointsTypeId==res.data.result.records[i].pointsTypeId
						})
						if(find){
							find.children.push(res.data.result.records[i])
						}else{
							ar.push({
								children:[res.data.result.records[i]],
								pointsTypeId:res.data.result.records[i].pointsTypeId,
								name:res.data.result.records[i].name
							})
						}
					}
					that.jbTableData=ar
					// console.log(ar)
				}
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

		this.getJB()
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


	.myBaseSystem{
		text-align: left;
	}
	.myBaseSystem .divier{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		margin-bottom: 10px;
	}

	.myBaseSystem .specialRule{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-bottom: 20px;
	}
	.myBaseSystem .specialRuleTitle{
		display: flex;
		align-items: center;
		
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.myBaseSystem .specialRuleIconWrap{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #2E67B2;
		color:white;
		width: 28px;
		height: 28px;
	}
	.myBaseSystem .specialRuleLabel{
		color: #2E67B2;
		margin-left: 10px;
		font-size: 16px;
	}

	.myBaseSystem .jbTable{
		/*width: 600px;*/
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
	}
	.myBaseSystem .jbTableName{
		text-align: center;
		color: white;
		background-color: rgb(46, 103, 178);
		padding: 10px;
	}
	.myBaseSystem .jbTableRow{
		display: flex;
		height: 40px;
	}
	.myBaseSystem .jbTableHeadCell{
		background-color: rgb(233,235,245);
		/*height: 100%;*/
		font-size: 12px;
		text-align: center;
	}
	.myBaseSystem .jbTableLeftCell{
		background-color: rgb(233,235,245);
		font-size: 12px;
	}
	.myBaseSystem .jbcell{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		padding: 5px;
		
	}
	.myBaseSystem .jbCenterCell{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.myBaseSystem .jbcellValue{
		font-size: 12px;
	}

</style>