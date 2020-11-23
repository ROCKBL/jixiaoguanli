<template>
	<div class="adviceHistoryDetail">
		<van-nav-bar title="提案、建议记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<!-- <div class="applyForOut">
			<div class="applyForOutTable">
				<el-row class="applyForOutHeadRow">
				  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工提案、建议表</el-col>
				</el-row>
				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
				  	<el-col :span="8" class="applyForOutCell">
				  		<el-input v-model="name" class="value" disabled></el-input>
				  	</el-col>
				  	
				  	<el-col :span="4" class="applyForOutCell label">任职岗位</el-col>
				  	<el-col :span="8" class="applyForOutCell">
				  		<el-input v-model="job" class="value" disabled></el-input>
				  	</el-col>
				</el-row>
				<el-row class="applyForOutBodyRow">
					<el-col :span="4" class="applyForOutCell label">部门</el-col>
				  	<el-col :span="8" class="applyForOutCell">
				  		<el-input v-model="dep" class="value" disabled></el-input>
				  	</el-col>

				  	<el-col :span="4" class="applyForOutCell label">上级主管</el-col>
				  	<el-col :span="8" class="applyForOutCell">
				  		<el-input v-model="form.leaderName" class="value" disabled></el-input>
				  	</el-col>

				</el-row>

				<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
				  	<el-col :span="4" class="applyForOutCell label">提议具体内容</el-col>
				  	<el-col :span="20" class="applyForOutCell">
				  		<el-input v-model="form.content" class="value" type="textarea" disabled></el-input>
				  	</el-col>
				</el-row>


				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">上级主管审批</el-col>
				  	<el-col :span="8" class="applyForOutCell newValue" :class="statusClass(form.leaderCheckReult)">{{ statusLabel(form.leaderCheckReult) }}</el-col>
				  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
				  	<el-col :span="8" class="applyForOutCell newValue">{{ form.leaderCheckTime }}</el-col>

				</el-row>
				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">相关部门评估结果</el-col>
				  	<el-col :span="8" class="applyForOutCell newValue">{{ form.proposalResult }}</el-col>
				  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
				  	<el-col :span="8" class="applyForOutCell newValue">{{ form.proposalTime }}</el-col>

				</el-row>

			</div>

		</div> -->


		<div class="applyForOutItem">
			<div class="applyForOut">
				<div class="applyForOutTable">
					<el-row class="applyForOutHeadRow">
					  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工提案、建议表</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		{{ form.empName }}
					  	</el-col>
					  	
					  	<el-col :span="4" class="applyForOutCell label">任职岗位</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		{{ form.empStation }}
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		{{ form.depName }}
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">上级主管</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		{{ form.leaderName }}
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">提案类别</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-radio-group v-model="form.proposalType">
							    <el-radio disabled :label="'效率提升'" class="adviceType" >效率提升</el-radio>
							    <el-radio disabled :label="'成本控制'" class="adviceType" >成本控制</el-radio>
							    <el-radio disabled :label="'经营管理'" class="adviceType" >经营管理</el-radio>
							    <el-radio disabled :label="'技术改进'" class="adviceType" >技术改进</el-radio>
							    <el-radio disabled :label="'品质改进'" class="adviceType" >品质改进</el-radio>
							    <el-radio disabled :label="'安全管理'" class="adviceType" >安全管理</el-radio>
							    <el-radio disabled :label="'创新类'" class="adviceType" >创新类</el-radio>
							    <el-radio disabled :label="'其他'" class="adviceType" >其他</el-radio>
							</el-radio-group>
					  	</el-col>
					</el-row>


					<el-row class="applyForOutBodyRow">
						<el-col :span="12" class="applyForOutCell label">提案内容（提案人填写）</el-col>
						<el-col :span="12" class="applyForOutCell label">改善建议（提案人填写）</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
						<el-col :span="12" class="applyForOutCell">
							<el-input disabled v-model="form.content" class="value" type="textarea" placeholder="请输入提案内容"></el-input>
						</el-col>
						<el-col :span="12" class="applyForOutCell">
							<el-input disabled v-model="form.suggestions" class="value" type="textarea" placeholder="请输入改善建议"></el-input>
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
								<el-input disabled v-model="form.personnel"  class="itemRowvalue" placeholder="请输入人员"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">设备：</div>
								<el-input disabled v-model="form.equipment"  class="itemRowvalue" placeholder="请输入设备"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">材料：</div>
								<el-input disabled v-model="form.materials"  class="itemRowvalue" placeholder="请输入材料"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">资金：</div>
								<el-input disabled v-model="form.funds" class="itemRowvalue" placeholder="请输入资金"></el-input>
							</div>
							<div class="itemRow">
								<div class="itemRowlabel">其它：</div>
								<el-input disabled v-model="form.otherDemand"  class="itemRowvalue" placeholder="请输入其它"></el-input>
							</div>
	
						</el-col>
						<el-col :span="12" class="applyForOutCell">
							<el-input disabled v-model="form.expectedEffect" class="value" type="textarea" placeholder="请输入预计提案、建议效果"></el-input>
						</el-col>
					</el-row>

					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">上级主管审批</el-col>
					  	<el-col :span="8" class="applyForOutCell">{{ leaderCheckLabel(form.leaderCheckReult) }}</el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell">{{ form.leaderCheckTime }}</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
						<el-col :span="4" class="applyForOutCell label">相关部门评估结果</el-col>
					  	<el-col :span="8" class="applyForOutCell">{{ proposalLabel(form.proposalStatus,form.leaderCheckReult) }}</el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell">{{ form.proposalTime }}</el-col>
					</el-row>
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
			// 个人外出申请
			form:{
				// name:"",
				// dep:"",
				// job:"",
				// outTime:"",
				// outPlace:"",
				// outReason:"",
				// arrange:"",
				// approveStatus:"",//审批状态
				// approvePerson:"",//审批人
				// approveTime:"",//审批时间
				// approveAdvice:"",//审批意见

			}
		}
	},
	computed:{
		...mapState({
			name(state){ return state.userInfo.name||""},
			dep(state){ return state.userInfo.depName||""},
			job(state){ return state.userInfo.stationName||""},
		})

	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        leaderCheckLabel(s){
        	if(s==0||s==null){
        		return "审核中"
        	}
        	if(s==1){
        		return "审核不通过"
        	}
        	if(s==2){
        		return "审核通过"
        	}
        },
        proposalLabel(s,s2){
        	if(s==0&&s2==2){
        		return "评估中"
        	}
        	if(s==1){
        		return "评估无效"
        	}
        	if(s==2){
        		return "评估有效"
        	}

        },

        // statusLabel(approveStatus){
        	
        // 	return approveStatus||"审核中"
        // },


        statusClass(approvalStatus){
        	var classname="blueStatus"
        	switch(approvalStatus){
        		case null:
        		case "审核中":
        		case "审核通过":
        			break;
        		case "审核拒绝":
        			classname="redStatus";
        			break;
        	}
        	return classname
        },

	},
	mounted(){

	},
	created(){
		var jsonStr=this.$router.currentRoute.query.apply
		var json=JSON.parse(jsonStr)

		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){
			store.dispatch('getUserInfo').then(function(msg){
				// nothing

			}).catch(function(error){
				that.Toast(error);
			})

		}

		that.form=json

	}

}
</script>

<style type="text/css" >
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
	

	.adviceHistoryDetail{
		text-align: left;
	}
	.adviceHistoryDetail .applyForOutItem{
		display: flex;
		flex-direction: column;
		align-items: center;

		height: calc(100vh - 64px);
		overflow: auto;

	}
	.adviceHistoryDetail .applyForOut{
		width: 100%;
		/*overflow-x: auto;*/

	}
	.adviceHistoryDetail .applyForOutTable{
		width: 600px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;

		/*margin-bottom: 0px;*/

	}


	.adviceHistoryDetail .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
		text-align: center;
		
	}
	.adviceHistoryDetail .applyForOutBodyRow{
		height: 40px;

	}
	.adviceHistoryDetail .applyForOutBodyRowHigh{
		height: 80px;
	}

	.adviceHistoryDetail .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.adviceHistoryDetail .applyForOutCell.label{

		background: #DDE9F8;
	}
	.adviceHistoryDetail .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		font-size: 12px;

	}
	.adviceHistoryDetail .applyForOutCell .value input,.adviceHistoryDetail .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}





	.adviceHistoryDetail .el-input--suffix .el-input__inner{
		padding-right: 10px;
	}


	.adviceHistoryDetail .adviceType{
		width: 33.33%;
		margin-right:0px;
		text-align: left;
		margin-bottom: 5px;
	}
	.adviceHistoryDetail .el-radio-group{
		display: flex;
    	flex-wrap: wrap;
	}



	.adviceHistoryDetail .itemRowWrap{
		padding: 0px;
		display: flex;
		flex-direction: column;
	}
	.adviceHistoryDetail .itemRow{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
	}
	.adviceHistoryDetail .itemRowvalue{
		height: 31px;
		width: calc(100% - 50px)
	}
	.adviceHistoryDetail .itemRowvalue .el-input__inner{
		height: 100%;
		border:none;
	}
	.adviceHistoryDetail .itemRowlabel{
		width: 50px;
		text-align: center;
	}

	.adviceHistoryDetail .el-textarea__inner{
		height: 100%;
	}
</style>