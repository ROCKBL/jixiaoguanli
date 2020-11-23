<template>
	<div class="myAdvice">
		<van-nav-bar title="员工提案、建议表"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="applyForOutItem">
			<div class="applyForOut">
				<div class="applyForOutTable">
					<el-row class="applyForOutHeadRow">
					  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工提案、建议表</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input  v-model="userName" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	
					  	<el-col :span="4" class="applyForOutCell label">任职岗位</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input  v-model="userJob" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input  v-model="depName" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">上级主管</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input  v-model="userInfo.parentName" class="value black" placeholder="" disabled ></el-input>
					  	</el-col>
					</el-row>


					<!-- <el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">提议具体内容</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="adviceForm.content" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row> -->
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">提案类别</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-radio-group v-model="adviceForm.proposalType">
							    <el-radio :label="'效率提升'" class="adviceType" >效率提升</el-radio>
							    <el-radio :label="'成本控制'" class="adviceType" >成本控制</el-radio>
							    <el-radio :label="'经营管理'" class="adviceType" >经营管理</el-radio>
							    <el-radio :label="'技术改进'" class="adviceType" >技术改进</el-radio>
							    <el-radio :label="'品质改进'" class="adviceType" >品质改进</el-radio>
							    <el-radio :label="'安全管理'" class="adviceType" >安全管理</el-radio>
							    <el-radio :label="'创新类'" class="adviceType" >创新类</el-radio>
							    <el-radio :label="'其他'" class="adviceType" >其他</el-radio>
							</el-radio-group>
					  	</el-col>
					</el-row>


					<el-row class="applyForOutBodyRow">
						<el-col :span="12" class="applyForOutCell label">提案内容（提案人填写）</el-col>
						<el-col :span="12" class="applyForOutCell label">改善建议（提案人填写）</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
						<el-col :span="12" class="applyForOutCell">
							<el-input v-model="adviceForm.content" class="value" type="textarea" placeholder="请输入提案内容"></el-input>
						</el-col>
						<el-col :span="12" class="applyForOutCell">
							<el-input v-model="adviceForm.suggestions" class="value" type="textarea" placeholder="请输入改善建议"></el-input>
						</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
						<el-col :span="12" class="applyForOutCell label">资源需求（提案人填写）</el-col>
						<el-col :span="12" class="applyForOutCell label">预计提案、建议效果（提案人填写）</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh" style="height: 160px;">
						<el-col :span="12" class="itemRowWrap" >
							<div class="itemRow">
								<div class="itemRowlabel">人员：</div>
								<el-input v-model="adviceForm.personnel"  class="itemRowvalue" placeholder="请输入人员"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">设备：</div>
								<el-input v-model="adviceForm.equipment"  class="itemRowvalue" placeholder="请输入设备"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">材料：</div>
								<el-input v-model="adviceForm.materials"  class="itemRowvalue" placeholder="请输入材料"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">资金：</div>
								<el-input v-model="adviceForm.funds" class="itemRowvalue" placeholder="请输入资金"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">其它：</div>
								<el-input v-model="adviceForm.otherDemand"  class="itemRowvalue" placeholder="请输入其它"></el-input>
							</div>
	
						</el-col>
						<el-col :span="12" class="applyForOutCell">
							<el-input v-model="adviceForm.expectedEffect" class="value" type="textarea" placeholder="请输入预计提案、建议效果"></el-input>
						</el-col>
					</el-row>

					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">上级主管审批</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
						<el-col :span="4" class="applyForOutCell label">相关部门评估结果</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					</el-row>
				</div>

			</div>
			<el-button type="primary" class="submitBtn" @click="submitAdvice">提交</el-button>
			<div class="seeHistory" @click="seeHistoryAdvice">我的提案、建议表</div>

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
			// 我的提议建议
			adviceForm:{
				content:"",//提案内容

				proposalType:"",//提案类别

				suggestions:"",//改善建议
				expectedEffect:"",//预计效果

				personnel:"",//人员
				equipment:"",//设备
				materials:"",//材料
				funds:"",//资金
				otherDemand:"",//其他
			},
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
        submitAdvice(){
			// console.log(store.state.userInfo.id)
			// console.log(this.userId)
			// console.log(this.empno)

			if(this.adviceForm.content==""){
				this.Toast("请输入提议具体内容")
				return
			}
			if(this.adviceForm.proposalType==""){
				this.Toast("请选择提案类别")
				return
			}
			if(this.adviceForm.suggestions==""){
				this.Toast("请输入改善建议")
				return
			}
			if(this.adviceForm.expectedEffect==""){
				this.Toast("请输入预计效果")
				return
			}
			if(this.adviceForm.personnel==""){
				this.Toast("请输入人员")
				return
			}
			if(this.adviceForm.equipment==""){
				this.Toast("请输入设备")
				return
			}
			if(this.adviceForm.materials==""){
				this.Toast("请输入材料")
				return
			}
			if(this.adviceForm.funds==""){
				this.Toast("请输入资金")
				return
			}
			// if(this.adviceForm.otherDemand==""){
			// 	this.Toast("请输入其他")
			// 	return
			// }

			var that=this;

			var url=this.baseUrl+"/proposal/add";
			that.adviceForm.empId=store.state.userInfo.id
			
			that.adviceForm.empName=store.state.userInfo.name
			that.adviceForm.empStation=store.state.userInfo.stationName
			// empName
			// empStation
			// leaderId
			// leaderName

			this.axios({
				method: 'post',
				url: url,
				data:that.adviceForm
			}).then(function(response){
				console.log(response)

				if(response.data.code==200){
					that.Dialog.alert({
					  message: '提案、建议提交成功！',
					}).then(() => {
					  // on close
					  that.$router.push("/adviceHistory");
					});
				}
				// that.$router.push("/applyHistory");
			})
		},
		seeHistoryAdvice(){
			// 查看历史提交
			this.$router.push("/adviceHistory")
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


	.myAdvice{
		text-align: left;
	}
	.myAdvice .applyForOutItem{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.myAdvice .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.myAdvice .applyForOutTable{
		width: 700px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.myAdvice .myAdvice .applyForOutTable{
		width: 400px;
	}


	.myAdvice .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		text-align: center;
		
	}
	.myAdvice .applyForOutBodyRow{
		height: 40px;

	}
	.myAdvice .applyForOutBodyRowHigh{
		height: 80px;
	}

	.myAdvice .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.myAdvice .applyForOutCell.label{

		background: #DDE9F8;
	}
	.myAdvice .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		font-size: 12px;

	}
	.myAdvice .applyForOutCell .value input,.myAdvice .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}


	.myAdvice .submitBtn{
		background-color: #2E67B2;
		width: 200px;
		margin:10px 0px;

	}

	.myAdvice .seeHistory{
		border-bottom: 1px solid #333333;
		padding-bottom: 5px;
		color: #333333;
		font-size: 14px;
		margin-bottom: 50px;
	}

	.myAdvice .el-input--suffix .el-input__inner{
		padding-right: 10px;
	}


	.myAdvice .adviceType{
		width: 33.33%;
		margin-right:0px;
		text-align: left;
		margin-bottom: 5px;
	}
	.myAdvice .el-radio-group{
		display: flex;
    	flex-wrap: wrap;
	}



	.myAdvice .itemRowWrap{
		padding: 0px;
		display: flex;
		flex-direction: column;
	}
	.myAdvice .itemRow{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
	}
	.myAdvice .itemRowvalue{
		height: 31px;
		width: calc(100% - 50px)
	}
	.myAdvice .itemRowvalue .el-input__inner{
		height: 100%;
		border:none;
	}
	.myAdvice .itemRowlabel{
		width: 50px;
		text-align: center;
	}

	.myAdvice .black input{
		color: #333!important;
	}
</style>