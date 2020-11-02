<template>
	<div class="meetingInfo">
		<van-nav-bar title="三会记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="taskListWrap">
			<div class="taskList">
				<!-- <div class="taskListTimePicker" @click="showPop">目标时间：{{ yearMonth }}<van-icon name="arrow" /></div> -->

				<div class="taskListHead">会议纪要执行表</div>
				<div class="taskListBlock">
					<div class="taskListBlockHead">
						<van-icon class="iconfont" class-prefix='icon' name="renwu3" size="16" />会议信息
					</div>
					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		会议名称:
					  	</el-col>
					  	<el-col :span="15" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.name }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		会议组织者:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.createBy }}
					  	</el-col>
					</el-row>

					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		会议时间:
					  	</el-col>
					  	<el-col :span="9" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.meetTime }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		会议地点:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.address }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		纪要编制人:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.summaryPerson }}
					  	</el-col>
					</el-row>

					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		参会人员:
					  	</el-col>
					  	<el-col :span="21" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.keyPersonnel }}
					  	</el-col>
					</el-row>

					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		缺席人员:
					  	</el-col>
					  	<el-col v-if="meetingInfoObj.sortNumber" :span="21" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.sortNumber }}
					  	</el-col>
					  	<el-col v-else :span="21" class="taskListBlockRowValue">
					  		无
					  	</el-col>
					</el-row>

					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		会议主题:
					  	</el-col>
					  	<el-col :span="21" class="taskListBlockRowValue">
					  		{{ meetingInfoObj.topic }}
					  	</el-col>
					</el-row>

					<!-- <el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		上级主管:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ upper }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		目标状态:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ status }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		目标审定时间:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ time }}
					  	</el-col>
					</el-row> -->
				</div>

				<div class="taskListBlock">
					<div class="taskListBlockHead">
						<van-icon class="iconfont" class-prefix='icon' name="renwu2" size="16" />会议决议
					</div>

					<el-table :data="meetingInfoObj.meetingSummaries||[]"  border class="elTable"  header-row-class-name="tableHeadClass" cell-class-name="tableBodyClass">
				      	<!-- <el-table-column prop="id" label="序号" width="45"></el-table-column> -->
				      	<!-- <el-table-column prop="target" label="任务指标" width="180"></el-table-column>
				      	<el-table-column prop="cf" label="C分预置" width="80"></el-table-column>
				      	<el-table-column prop="bz" label="评价标准" width="90"></el-table-column>
				      	<el-table-column prop="wc" label="完成值/阶段" width="100"></el-table-column>
				      	<el-table-column prop="dc" label="单项C分得分" width="90"></el-table-column>
				      	<el-table-column prop="hj" label="合计得分" ></el-table-column> -->

				      	<el-table-column prop="resolutionMatters" label="决议事项" ></el-table-column>
				      	<el-table-column prop="complteTime" label="完成时间" width="130"></el-table-column>
				      	<el-table-column prop="personLiable" label="责任人" width="70"></el-table-column>
				      	<!-- <el-table-column prop="wc" label="完成值/阶段" width="100"></el-table-column> -->
				      	<el-table-column prop="completionStatus" label="完成情况" width="70">
				      		<template slot-scope="scope">
				      			<div v-if="scope.row.completionStatus==1">完成</div>
				      			<div v-if="scope.row.completionStatus==2">未完成</div>
				      		</template>
				      	</el-table-column>
				      	<el-table-column prop="type" label="奖扣分数类型" width="90"></el-table-column>
				      	<el-table-column prop="num" label="奖扣分数" width="70">
				      		<template slot-scope="scope">
				      			<div v-if="scope.row.active=='减分'">-{{ scope.row.num }}</div>
				      			<div v-else>+{{ scope.row.num }}</div>
				      		</template>
				      	</el-table-column>
				      	<el-table-column prop="remarks" label="备注" width="100"></el-table-column>
				    </el-table>

				</div>

			</div>
		</div>


		<!-- 年月选择器 -->
	<!-- 	<van-popup v-model="pop" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="year-month" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm" @cancel="popCancel" />
		</van-popup> -->

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

			meetingInfoObj:{},

			// 头部数据
			name:"",
			dep:"",
			job:"",
			// month:"",
			upper:"",
			status:"",
			time:"",


			// 中间表格数据
			tableData:[
				// {id:1,target:"这是个任务1",cf:20,bz:"这是标准",wc:"40%",dc:16,hj:103},
				// {id:2,target:"这是个任务2",cf:20,bz:"这是标准",wc:"40%",dc:16,},
				// {id:3,target:"这是个任务3",cf:20,bz:"这是标准",wc:"40%",dc:16,},
				// {id:4,target:"这是个任务4",cf:20,bz:"这是标准",wc:"40%",dc:16,},
			],


			pop:false,
			minDate: new Date(2020, 0, 1),
	      	maxDate: new Date(2050, 0, 1),
	      	currentDate: new Date(),
	      	// yearMonth:(new Date()).Format('yyyy年MM月'),
	      	yearMonth:null
		}
	},
	computed:{
		...mapState({
			userName(state){ return state.userInfo.name||""},
			userDep(state){ return state.userInfo.depName||""},
			// jobLevel(state){ return state.userInfo.stationLevel||""},
			userJob(state){ return state.userInfo.stationName||""},
			// userId(state){ return state.userInfo.idNumber||""},
			// depName(state){ return state.userInfo.depName||""},
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

        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }){
        	// console.log(row)
        	// console.log(column)
        	// console.log(rowIndex)
        	// console.log(columnIndex)

        	if(columnIndex==4){
        		if (rowIndex==0) {
        			return {
		              rowspan: this.tableData.length,
		              colspan: 1
		            };
        		}else{
        			return {
		              rowspan: 0,
		              colspan: 0
		            };
        		}
        	}

        },

        showPop(){
			this.pop=true;
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
	    popConfirm(value){
			this.pop=false;
			// console.log(value);
			this.yearMonth=value.Format('yyyy年MM月');

			this.refreshData()
		},
		popCancel(){
			this.pop=false;
		},

		refreshData(){

		},
	},
	mounted(){

	},
	created(){
		try{
			console.log(userName)
			console.log(userDep)
			console.log(userJob)
		}catch(e){}
		

		// var jsonStr=this.$router.currentRoute.query.obj
		// var obj=JSON.parse(jsonStr)
		// if(obj.monthChoose){
		// 	this.yearMonth=this.formatDate(obj.monthChoose)
		// }


		var id=this.$router.currentRoute.query.id
		// var axajAr=[];

		var that=this;
		
		var url=this.baseUrl+"/meeting/queryById";
		this.axios({
			method: 'get',
			url: url,
			params:{
				id:id
			}
		}).then(function(response){
			// console.log(response)
			that.meetingInfoObj=response.data.result
		})

		// for(var idx in obj.con){
		// 	var url=this.baseUrl+"/task/getTaskDetail";
		//     var aj=this.axios({
		//       method: 'get',
		//       url: url,
		//       params:{
		//         id:idx
		//       }

		//     }).then(function(response) {
		//         var data=response.data

		//         that.tableData=that.tableData.concat(data.result.bodyList)
		//         console.log(data)

		//     })

		//     axajAr.push(aj)
		// }

		// this.axios.all(axajAr).then(function(){
		// 	var hj=0;
		// 	for(var i =0;i<that.tableData.length;i++){
		// 		hj+=that.tableData[i].integralC
		// 	}
		// 	that.tableData[0].hj=hj
		// 	that.tableData.push({})
		// 	that.tableData.pop()
		// 	// that.$forceUpdate()
		// 	console.log(that.tableData)

		// })

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
	

	.meetingInfo{
		text-align: left;
	}

	.meetingInfo .companyName{
		text-align: center;
		font-size: 20px;
		color: #333333;
		margin:14px 0px;
	}


	.meetingInfo .container{
		width: calc(100% - 30px);
		margin:0px auto;
		/*margin-top: 10px;*/
		margin-bottom: 20px;
	}

	.meetingInfo .taskListWrap{
		width: 100%;
		overflow-x: auto;
		padding-bottom: 40px;
	}
	.meetingInfo .taskList{
		width: 800px;
		padding: 0px 15px;
		box-sizing: border-box;
		position: relative;
	}

	.meetingInfo .taskListBlockRow{
		line-height: 24px;
		margin-top: 10px;
		font-size: 11px;
	}
	.meetingInfo .taskListBlockRowLabel{
		text-align: right;
		padding-right: 10px;
	}
	.meetingInfo .taskListHead{
		text-align: center;
		color: #2E67B2;
		/*margin:10px 0px;*/
		margin-top: 15px;
		font-size: 15px;
		font-weight: 500;
	}

	.meetingInfo .taskListBlockHead{
		color: #2E67B2;
		font-size: 14px; 
		border-bottom: 4px solid #2E67B2;
		padding-bottom: 5px;
		margin-top: 15px;
	}

	.meetingInfo .taskListBlockRowValue{
		border-bottom: 1px solid transparent;
	}



	/*底下的table*/
	.meetingInfo .selfTabelDown td{
		border-bottom: 1px solid #fff;
		border-right: 1px solid #fff;
		text-align: center;
		padding: 10px 0px;
	}

	.meetingInfo .selfTabelDown{
		border-top:  1px solid #fff;
		border-left: 1px solid #fff;
		margin-top: 10px;
		font-size: 11px;
		color: #333333;
		background-color: #E8EBF4;
	}
	.meetingInfo .selfTabelDownHead{
		background-color: #2E67B2;
		color: white;
	}
	.meetingInfo .selfTabelDownSmallHead{
		background-color: #C7D8F2;
	}


	/*中间的table*/
	.meetingInfo .elTable{
		font-size: 11px;
		text-align: center;
		margin-top: 10px;
	}
	.meetingInfo .tableHeadClass th{
		text-align: center;
		background: #2E67B2;
		color: white;
	}
	.meetingInfo .tableBodyClass{
		text-align: center!important;
		background: #E8EBF4;
		border-color: white!important;
	}



	/*时间选择器*/
	.meetingInfo .taskListTimePicker{
		position: absolute;
		left: 15px;
		top: 0px;
		display: flex;
		align-items: center;
		padding-bottom: 5px;
		border-bottom: 1px solid rgba(0,0,0,0.2);
		font-size: 11px;
		color: #333333;
	}
</style>