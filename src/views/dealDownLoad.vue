<template>
	<div class="dealOutApply">
		<van-nav-bar title="文件下载申请"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

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
						<div class="messageUnitStatus" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</div>
					</div>
					<div class="messageUnitTip">
						<div class="messageUnitTime">提交时间：{{ item.createTime }}</div>
						<van-icon class="messageUnitIcon"  :class="item.active?'messageUnitIconActive':''" name="arrow" />
					</div>
				</div>

				<div class="messageUnitContent" v-show="item.active" :class="item.active?'messageUnitContentActive':''">
					
					<div class="downloadWrap">
						<van-icon class="iconfont" class-prefix='icon' name="wenjian" size="44" color="#2E67B2"  />
						<div class="downloadinfo">
							<div class="downloadfileName">{{ item.fileName }}</div>
							<div class="downloadfileType">{{ item.fileType }}</div>
						</div>
					</div>

					<div class="btnsRow" v-if="item.status=='审核中'">
						<van-button @click="agree(item)" size="small" class="agreeBtn" type="info">通过</van-button>
						<van-button @click="disagree(item)" size="small" class="disagreeBtn" plain type="info">拒绝</van-button>
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
		agree(item){
			// console.log(item)

			var that=this;

			Dialog.confirm({
			  	title: '',
			  	message: '确定执行该操作？',
			}).then(() => {
			    // on confirm
			    var url=that.baseUrl+"/apply/edit";
				var data={
					id:item.id,
					status:"审核通过"
				}
				that.axios({
					method: 'post',
					url: url,
					data:data
				}).then(function(res){
					if(res.data.code==200){
						that.Toast("执行成功")
					}

					console.log(res)
					that.refreshPage()
				})

			}).catch(() => {
			    // on cancel

			});

			

		},
		disagree(item){
			var that=this;

			Dialog.confirm({
			  	title: '',
			  	message: '确定执行该操作？',
			}).then(() => {
			    // on confirm
			    var url=that.baseUrl+"/apply/edit";
				var data={
					id:item.id,
					status:"审核拒绝"
				}
				that.axios({
					method: 'post',
					url: url,
					data:data
				}).then(function(res){
					if(res.data.code==200){
						that.Toast("执行成功")
					}
					// console.log(res)
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
        statusClass(status){
        	var classname=""
        	switch(status){
        		case null:
        		case "审核中":
        			classname="greenStatus"
        			break;
        		case "审核通过":
        		case "已通过":
        			classname="blueStatus"
        			break;
        		case "审核拒绝":
        		case "已拒绝":
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
			var url=this.baseUrl+"/apply/personList";

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
					params.status="审核中"
					break
				case "已通过":
					params.status="审核通过"
					break
				case "已拒绝":
					params.status="审核拒绝"
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
	},
	mounted(){

	},
	created(){
		// 获取任务消息列表
		
		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				that.getData()

			}).catch(function(error){
				that.Toast(error);
			})
		}else{
			that.getData()
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



  /*  .dealOutApply .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.dealOutApply .applyForOutTable{
		width: 700px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.dealOutApply .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
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

	}
	.dealOutApply .applyForOutCell .value input,.dealOutApply .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}
	.dealOutApply .newValue{

		font-size: 14px;
	}*/



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


	.dealOutApply .downloadWrap{
		display: flex;
		align-items: center;
		padding: 5px 0px;
	}
	.dealOutApply .downloadinfo{
		margin-left: 10px;
		font-size: 14px;
	}
	.downloadfileType{
		color: rgba(153, 153, 153, 1);
		font-size: 12px;
		margin-top: 5px;
	}
</style>