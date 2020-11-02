<template>
	<div class="applyHistoryDetail">
		<van-nav-bar title="申请记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="applyForOut">
			<div class="applyForOutTable">
				<el-row class="applyForOutHeadRow">
				  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工外出申请表</el-col>
				</el-row>
				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
				  	<el-col :span="4" class="applyForOutCell">
				  		<el-input v-model="name" class="value" disabled></el-input>
				  	</el-col>
				  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
				  	<el-col :span="4" class="applyForOutCell">
				  		<el-input v-model="dep" class="value" disabled></el-input>
				  	</el-col>
				  	<el-col :span="4" class="applyForOutCell label">岗位职务</el-col>
				  	<el-col :span="4" class="applyForOutCell">
				  		<el-input v-model="job" class="value" disabled></el-input>
				  	</el-col>
				</el-row>
				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">外出时间</el-col>
				  	<el-col :span="4" class="applyForOutCell">
				  		<el-input v-model="form.outTime" class="value" disabled></el-input>
				  	</el-col>
				  	<el-col :span="4" class="applyForOutCell label">外出地点</el-col>
				  	<el-col :span="4" class="applyForOutCell">
				  		<el-input v-model="form.outPlace" class="value" disabled></el-input>
				  	</el-col>
				  	<el-col :span="4" class="applyForOutCell label">审批状态</el-col>
				  	<el-col :span="4" class="applyForOutCell newValue" :class="statusClass(form.approveStatus)" >{{ statusLabel(form.approveStatus) }}</el-col>
				</el-row>

				<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
				  	<el-col :span="4" class="applyForOutCell label">外出事由描述</el-col>
				  	<el-col :span="20" class="applyForOutCell">
				  		<el-input v-model="form.outReason" class="value" type="textarea" disabled></el-input>
				  	</el-col>
				</el-row>
				<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
				  	<el-col :span="4" class="applyForOutCell label">外出期间工作安排</el-col>
				  	<el-col :span="20" class="applyForOutCell">
				  		<el-input v-model="form.arrange" class="value" type="textarea" disabled></el-input>
				  	</el-col>
				</el-row>

				<el-row class="applyForOutBodyRow">
				  	<el-col :span="4" class="applyForOutCell label">审批人</el-col>
				  	<el-col :span="4" class="applyForOutCell newValue">{{ form.approvePerson }}</el-col>
				  	<el-col :span="4" class="applyForOutCell label">审批意见</el-col>
				  	<el-col :span="4" class="applyForOutCell newValue">{{ form.approveAdvice }}</el-col>
				  	<el-col :span="4" class="applyForOutCell label">审批时间</el-col>
				  	<el-col :span="4" class="applyForOutCell newValue">{{ form.approveTime }}</el-col>
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
				outTime:"",
				outPlace:"",
				outReason:"",
				arrange:"",
				approveStatus:"",//审批状态
				approvePerson:"",//审批人
				approveTime:"",//审批时间
				approveAdvice:"",//审批意见

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


		that.form.outTime=json.outTime
		that.form.outPlace=json.outAddress
		that.form.outReason=json.outDescribe
		that.form.arrange=json.workScheduling
		that.form.approveStatus=json.approvalStatus
		that.form.approvePerson=json.approvalPerson
		that.form.approveTime=json.approvalTime
		that.form.approveAdvice=json.approvalOpinion

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
	

	.applyHistoryDetail{
		text-align: left;
	}

	.applyHistoryDetail .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.applyHistoryDetail .applyForOutTable{
		width: 700px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.applyHistoryDetail .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		text-align: center;
		
	}
	.applyHistoryDetail .applyForOutBodyRow{
		height: 40px;

	}
	.applyHistoryDetail .applyForOutBodyRowHigh{
		height: 80px;
	}

	.applyHistoryDetail .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.applyHistoryDetail .applyForOutCell.label{

		background: #DDE9F8;
	}
	.applyHistoryDetail .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);

	}
	.applyHistoryDetail .applyForOutCell .value input,.applyHistoryDetail .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}

	.applyHistoryDetail .newValue{
		color: #2E67B2;
		font-size: 14px;
	}

	.applyHistoryDetail .blueStatus{
		margin-left: auto;
		color: #2E67B2;
	}
	.applyHistoryDetail .redStatus{
		margin-left: auto;
		color: #FE0045;
	}
</style>