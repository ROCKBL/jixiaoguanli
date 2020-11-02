<template>
	<div class="adviceHistoryDetail">
		<van-nav-bar title="提案、建议记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="applyForOut">
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
        statusLabel(approveStatus){
        	
        	return approveStatus||"审核中"

        },
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

		// var url=this.baseUrl+"/com/emplyee/queryByUserId";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
			
		// }).then(function(response) {
		//   	var data=response.data

		//   	that.form.dep=data.result.depName
		//   	that.form.name=data.result.name
		//   	that.form.job=data.result.stationName
		// })


		// that.form.outTime=json.outTime
		// that.form.outPlace=json.outAddress
		// that.form.outReason=json.outDescribe
		// that.form.arrange=json.workScheduling
		// that.form.approveStatus=json.approvalStatus
		// that.form.approvePerson=json.approvalPerson
		// that.form.approveTime=json.approvalTime
		// that.form.approveAdvice=json.approvalOpinion

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

	.adviceHistoryDetail .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.adviceHistoryDetail .applyForOutTable{
		width: 400px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.adviceHistoryDetail .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
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

	}
	.adviceHistoryDetail .applyForOutCell .value input,.adviceHistoryDetail .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}

	.adviceHistoryDetail .newValue{
		color: #2E67B2;
		font-size: 14px;
	}

	.adviceHistoryDetail .blueStatus{
		margin-left: auto;
		color: #2E67B2;
	}
	.adviceHistoryDetail .redStatus{
		margin-left: auto;
		color: #FE0045;
	}
</style>