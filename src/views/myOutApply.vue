<template>
	<div class="myOutApply">
		<van-nav-bar title="员工外出申请表"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="applyForOutItem">
			<div class="applyForOut">
				<div class="applyForOutTable">
					<el-row class="applyForOutHeadRow">
					  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工外出申请表</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="userName" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="depName" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">岗位职务</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="userJob" class="value black" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">外出时间</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="form.outTime" class="value" placeholder="请输入日期"></el-input>
					  		<!-- <el-date-picker
						      v-model="form.outTime"
						      type="date"
						      placeholder="选择日期" class="value">
						    </el-date-picker> -->

					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">外出地点</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="form.outAddress" class="value" placeholder="请输入内容"></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批状态</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					</el-row>

					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">外出事由描述</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="form.outDescribe" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">外出期间工作安排</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="form.workScheduling" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row>

					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">审批人</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批意见</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批时间</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					</el-row>
				</div>

			</div>
			
			
			<el-button type="primary" class="submitBtn" @click="submit">提交</el-button>

			<div class="seeHistory" @click="seeHistory">申请记录</div>

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
				outAddress:"",
				outDescribe:"",
				workScheduling:"",

				// "approvalOpinion": "string",
				// "approvalPerson": "string",
				// "approvalStatus": "string",
				// "approvalTime": "string",
				// "empId": 0,
				empId: this.cookieTool.get('userId'),
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
        submit(){
			if(this.form.outTime==""){
				this.Toast("请输入外出时间")
				return
			}
			if(this.form.outAddress==""){
				this.Toast("请输入外出地点")
				return
			}
			if(this.form.outDescribe==""){
				this.Toast("请输入外出事由")
				return
			}
			if(this.form.workScheduling==""){
				this.Toast("请输入外出工作安排")
				return
			}

			// 提交表单
			var that=this;

			this.showloading=true;

			// that.form.outTime=that.form.outTime.Format("yyyy-MM-dd hh:mm:ss")
			var url=this.baseUrl+"/outApply/add";
			this.axios({
				method: 'post',
				url: url,
				// data:{
				// 	outApply:JSON.stringify(that.form)
				// },
				data:that.form
			}).then(function(response){

				that.showloading=false;
				
				if(response.data.code==200){
					// that.Dialog("提交申请成功")

					// setTimeout(function(){
					// 	that.$router.push("/applyHistory");
					// },1500)

					that.Dialog.alert({
					  message: '提交申请成功！',
					}).then(() => {
					  // on close
					  that.$router.push("/applyHistory");
					});
				}
				
				
			})

		},
		seeHistory(){
			// 查看历史表单
			this.$router.push("/applyHistory")
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


	.myOutApply{
		text-align: left;
	}
	.myOutApply .applyForOutItem{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.myOutApply .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.myOutApply .applyForOutTable{
		width: 700px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.myOutApply .myAdvice .applyForOutTable{
		width: 400px;
	}


	.myOutApply .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		text-align: center;
		
	}
	.myOutApply .applyForOutBodyRow{
		height: 40px;

	}
	.myOutApply .applyForOutBodyRowHigh{
		height: 80px;
	}

	.myOutApply .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.myOutApply .applyForOutCell.label{

		background: #DDE9F8;
	}
	.myOutApply .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		font-size: 12px;

	}
	.myOutApply .applyForOutCell .value input,.myOutApply .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}


	.myOutApply .submitBtn{
		background-color: #2E67B2;
		width: 200px;
		margin:10px 0px;

	}

	.myOutApply .seeHistory{
		border-bottom: 1px solid #333333;
		padding-bottom: 5px;
		color: #333333;
		font-size: 14px;
		margin-bottom: 50px;
	}

	.myOutApply .el-input--suffix .el-input__inner{
		padding-right: 10px;
	}


	.myOutApply .black input{
		color: #333!important;
	}
</style>