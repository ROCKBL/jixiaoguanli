<template>
	<div class="dealOutApply">
		<van-nav-bar title="提案改善建议部门评估"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="btnRow">
			<div class="btnRowLeft" @click="showTypePop">
				<div class="btnRowLeftLabel" :class="statusClass(searchType)">{{ searchType }}</div>
				<van-icon class="btnRowLeftIcon" name="arrow-down" />
			</div>
			<div class="btnRowRight">
				<div class="btnRowRightTime" :style="{ color:startTime?'#333':'#999' }" @click="showTimePop('startTime')">{{ startTime||'起始日期' }}</div>
				<div class="btnRowRightLabel">至</div>
				<div class="btnRowRightTime" :style="{ color:endTime?'#333':'#999' }" @click="showTimePop('endTime')">{{ endTime||'结束日期' }}</div>
			</div>
		</div>

		<!-- <div class="messageList"> -->
		<van-list class="messageList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="messageUnit" v-for="item in messageList" v-if="item.empId!=userInfo.id">

				<div @click="seeDetail(item)">
					<div class="messageUnitTitle">
						<div class="messageUnitName">申请人：{{ item.empName }}</div>
						<div class="messageUnitStatus" :class="statusClass(proposalLabel(item.proposalStatus,item.leaderCheckReult))">{{ statusLabel(proposalLabel(item.proposalStatus,item.leaderCheckReult)) }}</div>
					</div>
					<div class="messageUnitTip">
						<div class="messageUnitTime">提交时间：{{ item.createTime }}</div>
						<van-icon class="messageUnitIcon"  :class="item.active?'messageUnitIconActive':''" name="arrow" />
					</div>
				</div>

				<div class="messageUnitContent" v-show="item.active" :class="item.active?'messageUnitContentActive':''">
					
					<div class="applyForOut">
						<div class="applyForOutTable">
							<el-row class="applyForOutHeadRow">
							  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工提案、建议表</el-col>
							</el-row>
							<el-row class="applyForOutBodyRow">
							  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
							  	<el-col :span="8" class="applyForOutCell">
							  		{{ item.empName }}
							  	</el-col>
							  	
							  	<el-col :span="4" class="applyForOutCell label">任职岗位</el-col>
							  	<el-col :span="8" class="applyForOutCell">
							  		{{ item.empStation }}
							  	</el-col>
							</el-row>
							<el-row class="applyForOutBodyRow">
							  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
							  	<el-col :span="8" class="applyForOutCell">
							  		{{ item.depName }}
							  	</el-col>
							  	<el-col :span="4" class="applyForOutCell label">上级主管</el-col>
							  	<el-col :span="8" class="applyForOutCell">
							  		{{ item.leaderName }}
							  	</el-col>
							</el-row>
							<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
							  	<el-col :span="4" class="applyForOutCell label">提案类别</el-col>
							  	<el-col :span="20" class="applyForOutCell">
							  		<el-radio-group v-model="item.proposalType">
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
									<el-input disabled v-model="item.content" class="value" type="textarea" placeholder="请输入提案内容"></el-input>
								</el-col>
								<el-col :span="12" class="applyForOutCell">
									<el-input disabled v-model="item.suggestions" class="value" type="textarea" placeholder="请输入改善建议"></el-input>
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
										<el-input disabled v-model="item.personnel"  class="itemRowvalue" placeholder="请输入人员"></el-input>
									</div>
									<div class="itemRow">
										<div class="itemRowlabel">设备：</div>
										<el-input disabled v-model="item.equipment"  class="itemRowvalue" placeholder="请输入设备"></el-input>
									</div>
									<div class="itemRow">
										<div class="itemRowlabel">材料：</div>
										<el-input disabled v-model="item.materials"  class="itemRowvalue" placeholder="请输入材料"></el-input>
									</div>
									<div class="itemRow">
										<div class="itemRowlabel">资金：</div>
										<el-input disabled v-model="item.funds" class="itemRowvalue" placeholder="请输入资金"></el-input>
									</div>
									<div class="itemRow">
										<div class="itemRowlabel">其它：</div>
										<el-input disabled v-model="item.otherDemand"  class="itemRowvalue" placeholder="请输入其它"></el-input>
									</div>
			
								</el-col>
								<el-col :span="12" class="applyForOutCell">
									<el-input disabled v-model="item.expectedEffect" class="value" type="textarea" placeholder="请输入预计提案、建议效果"></el-input>
								</el-col>
							</el-row>

							<el-row class="applyForOutBodyRow">
							  	<el-col :span="4" class="applyForOutCell label">上级主管审批</el-col>
							  	<el-col :span="8" class="applyForOutCell">{{ leaderCheckLabel(item.leaderCheckReult) }}</el-col>
							  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
							  	<el-col :span="8" class="applyForOutCell">{{ item.leaderCheckTime }}</el-col>
							</el-row>
							<el-row class="applyForOutBodyRow">
								<el-col :span="4" class="applyForOutCell label">相关部门评估结果</el-col>
							  	<el-col :span="8" class="applyForOutCell">{{ proposalLabel(item.proposalStatus,item.leaderCheckReult) }}</el-col>
							  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
							  	<el-col :span="8" class="applyForOutCell">{{ item.proposalTime }}</el-col>
							</el-row>
						</div>

					</div>

					<div class="btnsRow" v-if="item.leaderCheckReult==2&&item.proposalStatus==0">
						<van-button @click="agree(item)" size="small" class="agreeBtn" type="info">有效</van-button>
						<van-button @click="disagree(item)" size="small" class="disagreeBtn" plain type="info">无效</van-button>
					</div>

				</div>
			</div>

		</van-list>
		<!-- </div> -->


		<van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm" @cancel="popCancel" />
		</van-popup>

		<van-popup v-model="showType" position="bottom" round >
			<div class="popRow" style="font-size: 15px;border-bottom: 1px solid rgba(0,0,0,0.1);">请选择审核状态</div>
			<div class="popRow" @click="chooseType('全部')" style="border-bottom: 1px solid rgba(0,0,0,0.1);">全部</div>
			<div class="popRow" @click="chooseType('已通过')" style="color: rgba(46, 103, 178, 1);border-bottom: 1px solid rgba(0,0,0,0.1);">已通过</div>
			<div class="popRow" @click="chooseType('审核中')" style="color: rgba(49, 165, 56, 1);border-bottom: 1px solid rgba(0,0,0,0.1);">审核中</div>
			<div class="popRow" @click="chooseType('已拒绝')" style="color: rgba(255, 0, 0, 1);border-bottom: 1px solid rgba(0,0,0,0.1);">已拒绝</div>
			<div class="popRow" @click="chooseType('取消')" style="font-size: 15px;">取消</div>
		</van-popup>

		<!-- <van-empty v-if="messageList.length==0" description="没有相关信息" /> -->

		<van-popup v-model="showScoreType" position="bottom" :style="{ maxHeight: '50%' }" >
			<div class="scoreTypeList" v-for="group in scoreTypeAr">
				<div class="scoreTypeGroupName">{{ group.name }}</div>
				<div class="scoreTypeScoreName" v-for="item in group.group" @click="chooseScoreType(item)">{{ item.scoringItems }}</div>
			</div>
		</van-popup>
	</div>
</template>

<script type="text/javascript">

import store from '@/store';

import { Dialog } from 'vant';

import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		return{
			messageList:[
				
			],
			showType:false,

			searchType:"全部",

			// startTime:new Date().Format("yyyy-MM-dd"),

			// startTime:new Date(new Date().getTime()-30*24*60*60*1000).Format("yyyy-MM-dd"),
			// endTime:new Date(new Date().getTime()+24*60*60*1000).Format("yyyy-MM-dd"),
			startTime:"",
			endTime:"",


			showTime:false,
			timePopType:null,
			minDate: new Date(2020, 0, 1),
	      	maxDate: new Date(2050, 0, 1),
	      	currentDate: new Date(),

	      	loading:true,
			finished:false,
			pageNum:1,
			pageSize:10,


			scoreTypeAr:[],
			showScoreType:false,
			operatObj:{},
		}
	},
	computed:{
		...mapState({
			userPic(state){ return state.userInfo.photo||""},
			userName(state){ return state.userInfo.name||""},
			userDep(state){ return state.userInfo.depName||""},
			userLevel(state){ return state.userInfo.stationLevel||""},
			birthday(state){ return state.userInfo.birthday||""},
			userInfo(state){ return state.userInfo||{}},
		})
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		leaderCheckLabel(s){
        	if(s==0||s==null){
        		return "审核中"
        	}
        	if(s==1){
        		return "审核拒绝"
        	}
        	if(s==2){
        		return "审核通过"
        	}
        },
        proposalLabel(s,s2){
        	if(s==0&&s2==2){
        		return "审核中"
        	}
        	if(s==1){
        		return "无效"
        	}
        	if(s==2){
        		return "有效"
        	}

        },
		agree(item){
			// console.log(item)
			this.operatObj=item
			this.showScoreType=true

			// var that=this;
			

		},
		chooseScoreType(o){
			var that=this
			Dialog.confirm({
			  	title: '',
			  	message: '确定执行加分项：'+o.scoringItems+'吗？',
			}).then(() => {
			    // on confirm
			    var url=that.baseUrl+"/proposal/addResult";
				var params={
					id:that.operatObj.id,
					status:2,
					scoreCalculationId:o.id,
					empId:that.operatObj.empId
				}
				that.axios({
					method: 'post',
					url: url,
					params:params
				}).then(function(res){
					console.log(res)
					if(res.data.code==200){
						that.Toast("执行成功")
					}
					that.refreshPage()
				})
			}).catch(() => {
			    // on cancel

			});

			that.showScoreType=false
		},

		disagree(item){
			var that=this;

			Dialog.confirm({
			  	title: '',
			  	message: '确定执行该操作？',
			}).then(() => {
			    // on confirm
			    var url=that.baseUrl+"/proposal/addResult";
				var params={
					id:item.id,
					status:1
				}
				that.axios({
					method: 'post',
					url: url,
					params:params
				}).then(function(res){
					// console.log(res)
					if(res.data.code==200){
						that.Toast("执行成功")
					}
					that.refreshPage()
				})
			}).catch(() => {
			    // on cancel

			});

			
		},
		popCancel(){
			this.showTime=false
		},
		popConfirm(val){
			// console.log(val)
			// console.log(new Date(val).Format('yyyy-MM-dd'))
			if(this.timePopType=="startTime"&&val.getTime()>new Date(this.endTime).getTime()){
				this.Toast("起始时间不能大于结束时间")
				return
			}
			if(this.timePopType=="startTime"&&new Date(val).Format('yyyy-MM-dd')==new Date(this.endTime).Format('yyyy-MM-dd')){
				this.Toast("起始时间不能等于结束时间")
				return
			}
			if(this.timePopType=="endTime"&&val.getTime()<new Date(this.startTime).getTime()){
				this.Toast("结束时间不能小于起始时间")
				return
			}
			if(this.timePopType=="endTime"&&new Date(val).Format('yyyy-MM-dd')==new Date(this.startTime).Format('yyyy-MM-dd')){
				this.Toast("结束时间不能等于起始时间")
				return
			}

			this.showTime=false
			this[this.timePopType]=new Date(val).Format('yyyy-MM-dd')
			// console.log(this.startTime)
			// console.log(this.endTime)
			this.refreshPage()
		},
		showTimePop(type){
			this.showTime=true
			this.timePopType=type
			this.currentDate=new Date(this[type])
		},
		showTypePop(){
			this.showType=true
		},
		onClickLeft(){
            this.$router.go(-1)
        },
        chooseType(type){
        	this.showType=false
        	if(type=="取消"){
        		return
        	}
        	this.searchType=type
        	
        	this.refreshPage()
        },

        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },
        formatter(type, val) {
	      	if (type === 'year') {
	        	return `${val}年`;
	      	} else if (type === 'month') {
	        	return `${val}月`;
	      	}else if (type === 'day') {
	        	return `${val}日`;
	      	}
	      	return val;
	    },

        seeDetail(item){
        	item.active=!item.active
        },
        statusLabel(approveStatus){
        	
        	return approveStatus||"审核中"

        },
        statusClass(approvalStatus){
        	var classname=""
        	switch(approvalStatus){
        		case null:
        		case "审核中":
        			classname="greenStatus"
        			break;
        		case "审核通过":
        		case "有效":
        		case "已通过":
        			classname="blueStatus"
        			break;
        		case "审核拒绝":
        		case "已拒绝":
        		case "无效":
        			classname="redStatus";
        			break;
        	}
        	return classname
        },
        onLoad(){
        	this.getData()
        },
        getData(){
        	var that=this;
			var url=this.baseUrl+"/proposal/proposalsList";

			var params={
				pageNo:this.pageNum,
				pageSize:this.pageSize,
				// startTime:this.startTime,
				// endTime:this.endTime,
			}
			if(this.startTime){
				params.startTime=this.startTime
			}
			if(this.endTime){
				params.endTime=this.endTime
			}


			switch(this.searchType){
				case "审核中":
					params.status=0
					break
				case "已通过":
					params.status=2
					break
				case "已拒绝":
					params.status=1
					break
			}
			this.axios({
				method: 'post',
				url: url,
				params:params
			}).then(function(response) {
			  	var data=response.data
			  	console.log(response)
			  	// if(data.code==200){
			  	// 	var ar=data.result.records.map(function(o){
			  	// 		o.active=false
			  	// 		return o  
			  	// 	})
			  	// 	that.messageList=ar
			  	// }
			  	
			  	if(data.code==200){
			  		that.pageNum+=1
			  		var ar=data.result.records.map(function(o){
			  			o.active=false
			  			return o  
			  		})
			  		if(that.pageSize>ar.length){
			  			that.finished=true
			  		}
			  		that.messageList=that.messageList.concat(ar)

			  		that.loading=false

			  	}else{
			  		that.Toast(data.message)
			  	}
			  	
			})

        },
        refreshPage(){
        	this.pageNum=1
        	this.finished=false
        	this.loading=true
        	this.messageList.length=0
        	this.getData()
        },
        getScoreType(){
        	var that=this;
			var url=this.baseUrl+"/com/scoreCalculation/list";
			var params={
				pageNo:1,
				pageSize:99999,
			}
			this.axios({
				method: 'get',
				url: url,
				params:params
			}).then(function(res){
				console.log(res)
				var data=res.data
				if(data.code==200){
					var ar=data.result.records
					var newAr=[]
					ar.map(function(o){
						if(o.active=="加分"){
							var find=newAr.find(function(obj){
								return obj.name==o.name
							})
							if(find){
								find.group.push(o)
							}else{
								newAr.push({
									name:o.name,
									group:[o]
								})
							}
						}
						
					})

					that.scoreTypeAr=newAr
				}
			})

        },
	},
	mounted(){

	},
	created(){
		// 获取任务消息列表
		// this.getData()

		// this.getScoreType()

		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				that.getData()

				that.getScoreType()

			}).catch(function(error){
				that.Toast(error);
			})
		}else{
			that.getData()

			that.getScoreType()
		}

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
	

    .dealOutApply{
    	text-align: left;
    }


    .dealOutApply .messageList{
    	
    	width: calc(100% - 30px);
    	margin:auto;
    }
    .dealOutApply .messageUnit{
    	border-bottom: 1px solid rgba(0,0,0,0.1);
    	padding:10px 0px;
    }
    .dealOutApply .messageUnitTitle{
    	display: flex;
    	align-items: center;
    }
    .dealOutApply .messageUnitName{
    	font-size: 14px;
    	color: #333333;
    }
    .dealOutApply .messageUnitStatus{
    	margin-left: auto;
    	font-size: 15px;
    }
    .dealOutApply .greenStatus{
    	color: rgba(49, 165, 56, 1);
    }
    .dealOutApply .blueStatus{
    	color: rgba(46, 103, 178, 1);
    }
    .dealOutApply .redStatus{
    	color: rgba(255, 0, 0, 1);
    }

    .dealOutApply .messageUnitTip{
    	display: flex;
    	align-items: center;
    	margin-top: 10px;
    }	
    .dealOutApply .messageUnitTime{
    	font-size: 14px;
    }
    .dealOutApply .messageUnitIcon{
    	margin-left: auto;
    	transition: -webkit-transform 0.3s;
    	transition: transform 0.3s;
    	transition: transform 0.3s, -webkit-transform 0.3s;
    }
    .dealOutApply .messageUnitIconActive{
    	-webkit-transform: rotate(90deg);
    	transform: rotate(90deg);
    }
    .dealOutApply .messageUnitContent{
    	-webkit-transition:all  0.3s ease-in-out;
    	transition:all  0.3s ease-in-out;

    }
    .dealOutApply .messageUnitContentActive{
    	
    	
    }



   


	.dealOutApply .applyForOut{
		width: 100%;
		overflow-x: auto;

	}
	.dealOutApply .applyForOutTable{
		width: 600px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;

		/*margin-bottom: 0px;*/

	}


	.dealOutApply .applyForOutCell{
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
	.dealOutApply .applyForOutBodyRow{
		height: 40px;

	}
	.dealOutApply .applyForOutBodyRowHigh{
		height: 80px;
	}

	.dealOutApply .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.dealOutApply .applyForOutCell.label{

		background: #DDE9F8;
	}
	.dealOutApply .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		font-size: 12px;

	}
	.dealOutApply .applyForOutCell .value input,.dealOutApply .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}





	.dealOutApply .el-input--suffix .el-input__inner{
		padding-right: 10px;
	}


	.dealOutApply .adviceType{
		width: 33.33%;
		margin-right:0px;
		text-align: left;
		margin-bottom: 5px;
	}
	.dealOutApply .el-radio-group{
		display: flex;
    	flex-wrap: wrap;
	}



	.dealOutApply .itemRowWrap{
		padding: 0px;
		display: flex;
		flex-direction: column;
	}
	.dealOutApply .itemRow{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
	}
	.dealOutApply .itemRowvalue{
		height: 31px;
		width: calc(100% - 50px)
	}
	.dealOutApply .itemRowvalue .el-input__inner{
		height: 100%;
		border:none;
	}
	.dealOutApply .itemRowlabel{
		width: 50px;
		text-align: center;
	}

	.dealOutApply .el-textarea__inner{
		height: 100%;
	}





	.dealOutApply .btnRow{
		display: flex;
		align-items: center;
		width: calc(100% - 30px);
    	margin:auto;
    	padding: 10px 0px;
    	border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.dealOutApply .btnRowLeft{
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333333;
	}
	.dealOutApply .btnRowLeftLabel{
		margin-right: 10px;
	}
	.dealOutApply .btnRowLeftIcon{
		font-size: 18px;
	}

	.dealOutApply .btnRowRight{
		display: flex;
		align-items: center;
		margin-left: auto;
		line-height: 20px;
	}
	.dealOutApply .btnRowRightTime{
		/*color: rgba(153, 153, 153, 1);*/
		padding: 5px;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.16);
		border-radius: 2px;
		font-size: 14px;
		color: #333333;
	}
	.dealOutApply .btnRowRightLabel{
		font-weight: normal;
		color: black;
		margin:0px 8px;
		font-size: 12px;
	}



	.dealOutApply .popRow{
		text-align: center;
		padding:10px 0px;
		font-size: 14px;
		color: #333333;
	}


	.dealOutApply .btnsRow{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dealOutApply .agreeBtn{
		background-color: rgba(46, 103, 178, 1);
		border-color: rgba(46, 103, 178, 1);
		margin-right: 20px;
		width: 100px;
	}
	.dealOutApply .disagreeBtn{
		color: rgba(255, 0, 0, 1)!important;
		border-color: rgba(255, 0, 0, 1);
		width: 100px;
	}


	.scoreTypeList{

	}
	.scoreTypeGroupName{
		font-size: 12px;
		color: #999999;
		padding: 10px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.scoreTypeScoreName{
		font-size: 14px;
		color: #333333;
		padding: 10px;
		padding-left: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
</style>