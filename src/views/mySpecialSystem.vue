<template>
	<div class="mySpecialSystem">
		<van-nav-bar title="专项制度表"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="specialRule">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="chanpintiaokuan" size="18" />
				</div>
				<div class="specialRuleLabel">专项制度表</div>
			</div>
			<div class="divier"></div>
			
			<div style="width: 100%;overflow: auto;">
				<div class="zxTable">
					<van-row>
					  	<van-col span="24" class="zxTableName">部门专项制度表</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">部门</van-col>
					  	<van-col span="8" class="zxTableCellValue jbCenterCell">{{ zxObj.depName }}</van-col>
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">部门负责人</van-col>
					  	<van-col span="8" class="zxTableCellValue jbCenterCell">{{ zxObj.depLeaderName }}</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">相关岗位</van-col>
					  	<van-col span="20" class="zxTableCellValue ">{{ zxObj.stationName?zxObj.stationName.join(","):"" }}</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="2" class="zxTableCellLabel jbCenterCell">序号</van-col>
					  	<van-col span="9" class="zxTableCellLabel jbCenterCell">制度内容</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">责任人</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">奖扣分类型</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">奖扣分数</van-col>
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">备注</van-col>
					</van-row>
					<van-row v-for="(item,index) in zxObj.departSepicalSystemList" style="display: flex;">
						<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
					  	<van-col span="9" class="zxTableCellValue ">{{ item.content }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.dutyPerson }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.active=='加分'?'+'+item.score:'-'+item.score }}</van-col>
					  	<van-col span="4" class="zxTableCellValue ">{{ item.note }}</van-col>
					</van-row>
				</div>
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
			zxObj:{},
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
        getZX(){
			// 获取部门专项制度
			var that=this;
			this.axios({
				method: 'get',
				url: this.baseUrl+"/departSepicalSystem/list",

			}).then(function(response){
				console.log(response)
				// that.zxPic=response.data.result[0].content
				that.zxObj=response.data.result
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

		this.getZX()
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


	.mySpecialSystem{
		text-align: left;
	}
	.mySpecialSystem .divier{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		margin-bottom: 10px;
	}

	.mySpecialSystem .specialRule{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-bottom: 20px;
	}
	.mySpecialSystem .specialRuleTitle{
		display: flex;
		align-items: center;
		
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.mySpecialSystem .specialRuleIconWrap{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #2E67B2;
		color:white;
		width: 28px;
		height: 28px;
	}
	.mySpecialSystem .specialRuleLabel{
		color: #2E67B2;
		margin-left: 10px;
		font-size: 16px;
	}

	.mySpecialSystem .jbTable{
		/*width: 600px;*/
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
	}
	.mySpecialSystem .jbTableName{
		text-align: center;
		color: white;
		background-color: rgb(46, 103, 178);
		padding: 10px;
	}
	.mySpecialSystem .jbTableRow{
		display: flex;
		height: 40px;
	}
	.mySpecialSystem .jbTableHeadCell{
		background-color: rgb(233,235,245);
		/*height: 100%;*/
		font-size: 12px;
		text-align: center;
	}
	.mySpecialSystem .jbTableLeftCell{
		background-color: rgb(233,235,245);
		font-size: 12px;
	}
	.mySpecialSystem .jbcell{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		padding: 5px;
		
	}
	.mySpecialSystem .jbCenterCell{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mySpecialSystem .jbcellValue{
		font-size: 12px;
	}


	.mySpecialSystem .zxTable{
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
		width: 600px;
	}
	.mySpecialSystem .zxTableName{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		background-color: rgb(46, 103, 178);
		text-align: center;
		color: white;
		padding: 10px;
	}
	.mySpecialSystem .zxTableCellLabel{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		background-color: rgb(233,235,245);
		padding:5px;
	}
	.mySpecialSystem .zxTableCellValue{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		padding:5px;
	}
</style>