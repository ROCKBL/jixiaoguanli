<template>
	<div class="personalTask">
		<van-nav-bar title="个人级"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="taskListWrap">
			<div class="taskList">
				<!-- <div class="taskListTimePicker" @click="showPop">目标时间：{{ yearMonth }}<van-icon name="arrow" /></div> -->

				<div class="taskListHead">个人任务目标执行表</div>
				<div class="taskListBlock">
					<div class="taskListBlockHead">
						<van-icon class="iconfont" class-prefix='icon' name="renwu3" size="16" />基础信息
					</div>
					<el-row class="taskListBlockRow">
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		目标责任人:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ userName }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		部门:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ userDep }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		岗位职务:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ userJob }}
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowLabel">
					  		目标月份:
					  	</el-col>
					  	<el-col :span="3" class="taskListBlockRowValue">
					  		{{ yearMonth }}
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
						<van-icon class="iconfont" class-prefix='icon' name="renwu2" size="16" />目标任务
					</div>

					<el-table :data="tableData" :span-method="objectSpanMethod" border class="elTable" @row-click="seeRow" header-row-class-name="tableHeadClass" cell-class-name="tableBodyClass">
				      	<!-- <el-table-column prop="id" label="序号" width="45"></el-table-column> -->
				      	<!-- <el-table-column prop="target" label="任务指标" width="180"></el-table-column>
				      	<el-table-column prop="cf" label="C分预置" width="80"></el-table-column>
				      	<el-table-column prop="bz" label="评价标准" width="90"></el-table-column>
				      	<el-table-column prop="wc" label="完成值/阶段" width="100"></el-table-column>
				      	<el-table-column prop="dc" label="单项C分得分" width="90"></el-table-column>
				      	<el-table-column prop="hj" label="合计得分" ></el-table-column> -->

				      	<el-table-column prop="taskIndicators" label="任务指标" width="180"></el-table-column>
				      	<el-table-column prop="planCScore" label="C分预置" width="70"></el-table-column>
				      	<el-table-column prop="evaluationCriterion" label="评价标准" ></el-table-column>
				      	<!-- <el-table-column prop="wc" label="完成值/阶段" width="100"></el-table-column> -->
				      	<el-table-column prop="integralC" label="单项C分得分" width="60"></el-table-column>
				      	<el-table-column prop="hj" label="合计得分" width="80"></el-table-column>

				    </el-table>

				</div>

				<div class="taskListBlock" v-if="dataType">
					<div class="taskListBlockHead">
						<van-icon class="iconfont" class-prefix='icon' name="renwu2" size="16" />指标分解
					</div>

					<table  class="selfTabelDown" width="100%" cellspacing="0" cellpadding="0" border="0">
						<tr class="selfTabelDownHead" >
							<td width="12%">类别</td>
							<td colspan="2" width="22%">第一周</td>
							<td colspan="2" width="22%">第二周</td>
							<td colspan="2" width="22%">第三周</td>
							<td colspan="2" width="22%">第四周</td>
						</tr>
						<tr v-if="dataType=='可量化'">
							<td rowspan="2" >可量化<br>指标分解</td>
							<td width="11%" class="selfTabelDownSmallHead">计划</td>
							<td width="11%" class="selfTabelDownSmallHead">实际达成</td>
							<td width="11%" class="selfTabelDownSmallHead">计划</td>
							<td width="11%" class="selfTabelDownSmallHead">实际达成</td>
							<td width="11%" class="selfTabelDownSmallHead">计划</td>
							<td width="11%" class="selfTabelDownSmallHead">实际达成</td>
							<td width="11%" class="selfTabelDownSmallHead">计划</td>
							<td width="11%" class="selfTabelDownSmallHead">实际达成</td>
						</tr>
						<tr v-if="dataType=='可量化'">
							<td>{{ atype.jx1 }}</td>
							<td>{{ atype.sj1 }}</td>
							<td>{{ atype.jx2 }}</td>
							<td>{{ atype.sj2 }}</td>
							<td>{{ atype.jx3 }}</td>
							<td>{{ atype.sj3 }}</td>
							<td>{{ atype.jx4 }}</td>
							<td>{{ atype.sj4 }}</td>
						</tr>

						<tr v-if="dataType=='不可量化'">
							<td rowspan="3">不可量化<br>指标分解</td>
							<td colspan="2" class="selfTabelDownSmallHead">阶段一</td>
							<td colspan="2" class="selfTabelDownSmallHead">阶段二</td>
							<td colspan="2" class="selfTabelDownSmallHead">阶段三</td>
							<td colspan="2" class="selfTabelDownSmallHead">阶段四</td>
						</tr>
						<tr v-if="dataType=='不可量化'">
							<td colspan="2">{{ btype.jdu1 }}</td>
							<td colspan="2">{{ btype.jdu2 }}</td>
							<td colspan="2">{{ btype.jdu3 }}</td>
							<td colspan="2">{{ btype.jdu4 }}</td>
						</tr>
						<tr v-if="dataType=='不可量化'">
							<td colspan="2">{{ btype.jdd1 }}</td>
							<td colspan="2">{{ btype.jdd2 }}</td>
							<td colspan="2">{{ btype.jdd3 }}</td>
							<td colspan="2">{{ btype.jdd4 }}</td>
						</tr>
					</table>

					<div style="border: 2px solid #2E67B2;margin-top: 10px;"></div>
				</div>
			</div>
		</div>


		<!-- 年月选择器 -->
		<van-popup v-model="pop" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="year-month" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm" @cancel="popCancel" />
		</van-popup>

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

			// 头部数据
			name:"",
			dep:"",
			job:"",
			// month:"",
			upper:"",
			status:"",
			time:"",

			// 底部表格数据
			atype:{
				jx1:null,
				sj1:null,
				jx2:null,
				sj2:null,
				jx3:null,
				sj3:null,
				jx4:null,
				sj4:null,
			},
			btype:{
				jdu1:null,
				jdd1:null,
				jdu2:null,
				jdd2:null,
				jdu3:null,
				jdd3:null,
				jdu4:null,
				jdd4:null,
			},

			// 中间表格数据
			tableData:[
				// {id:1,target:"这是个任务1",cf:20,bz:"这是标准",wc:"40%",dc:16,hj:103},
				// {id:2,target:"这是个任务2",cf:20,bz:"这是标准",wc:"40%",dc:16,},
				// {id:3,target:"这是个任务3",cf:20,bz:"这是标准",wc:"40%",dc:16,},
				// {id:4,target:"这是个任务4",cf:20,bz:"这是标准",wc:"40%",dc:16,},
			],

			dataType:null,

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
        seeRow(row, column, event){
        	return
        	console.log(row)
        	// console.log(column)
        	// console.log(event)

        	this.dataType=row.type

        	if(row.type=="可量化"){
        		this.atype.jx1=null
	        	this.atype.sj1=null
	        	this.atype.jx2=null
	        	this.atype.sj2=null
	        	this.atype.jx3=null
	        	this.atype.sj3=null
	        	this.atype.jx4=null
	        	this.atype.sj4=null

        		for(var i=0;i<row.resultList.length;i++){
        			switch(row.resultList[i].cycle){
        				case "第一周":
        					this.atype.jx1=row.resultList[i].plan;
        					this.atype.sj1=row.resultList[i].complete;
        					break;
        				case "第二周":
        					this.atype.jx2=row.resultList[i].plan;
        					this.atype.sj2=row.resultList[i].complete;
        					break;
        				case "第三周":
        					this.atype.jx3=row.resultList[i].plan;
        					this.atype.sj3=row.resultList[i].complete;
        					break;
        				case "第四周":
        					this.atype.jx4=row.resultList[i].plan;
        					this.atype.sj4=row.resultList[i].complete;
        					break;
        			}
        			
	        	}


        	}
        	if(row.type=="不可量化"){
        		this.btype.jdu1=null
        		this.btype.jdd1=null
        		this.btype.jdu2=null
        		this.btype.jdd2=null
        		this.btype.jdu3=null
        		this.btype.jdd3=null
        		this.btype.jdu4=null
        		this.btype.jdd4=null

        		for(var i=0;i<row.resultList.length;i++){
        			switch(row.resultList[i].cycle){
        				case "第一阶段":
        					this.btype.jdu1=row.resultList[i].plan;
        					this.btype.jdd1=row.resultList[i].complete;
        					break;
        				case "第二阶段":
        					this.btype.jdu2=row.resultList[i].plan;
        					this.btype.jdd2=row.resultList[i].complete;
        					break;
        				case "第三阶段":
        					this.btype.jdu3=row.resultList[i].plan;
        					this.btype.jdd3=row.resultList[i].complete;
        					break;
        				case "第四阶段":
        					this.btype.jdu4=row.resultList[i].plan;
        					this.btype.jdd4=row.resultList[i].complete;
        					break;
        			}
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
		
		// var that=this;
		// var url=this.baseUrl+"/company/list";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
			
		// }).then(function(response) {
		//   	var data=response.data
		//   	if(data.code==200){
		//   		var rtn=data.result[0]
		//   		that.corporateCulture=rtn.corporateCulture
		//   		that.organizationPath=rtn.organizationPath
		//   		that.companyName=rtn.cname

		//   	}else{
		//   		// that.Toast('网络错误');
		  		
		//   	}
		// })



		var jsonStr=this.$router.currentRoute.query.obj
		var obj=JSON.parse(jsonStr)
		if(obj.monthChoose){
			this.yearMonth=this.formatDate(obj.monthChoose)
		}


		// var params={
		// 	pageNo:1,
		// 	pageSize:10,
		// };

		// var that=this;

		// var url=this.baseUrl+"/task/list";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
		// 	params:params

		// }).then(function(response) {
		//   	var data=response.data
		//   	if(data.code==200){
		//   		console.log(response)
		//   		for(var i=0;i<data.result.records.length;i++){
		//   			if(data.result.records[i].targetLevel=="个人级"){
		//   				that.tableData=data.result.records[i].bodyList
		//   			}
		//   		}

		//   	}else{
		//   		// that.Toast('网络错误');
		//   	}
		// })


		console.log(obj)

		var axajAr=[];

		var that=this;
		for(var idx in obj.con){
			var url=this.baseUrl+"/task/getTaskDetail";
		    var aj=this.axios({
		      method: 'get',
		      url: url,
		      params:{
		        id:idx
		      }

		    }).then(function(response) {
		        var data=response.data

		        // console.log(data.result.bodyList)
		        // if(data.code==200){
		        //   for(var i=0;i<data.result.bodyList.length;i++){

		        //     if(data.result.bodyList[i].id==obj.id){
		        //       that.treeType=data.result.bodyList[i].type
		        //       that.obj=data.result.bodyList[i]

		        //     }
		            
		        //   }
		    
		        //   if(obj.type=="可量化"){
		        //     that.fetchData();
		        //   }else{
		        //     that.getTreeData();
		        //   }
		          
		        // }else{
		        //   that.Toast('网络错误');
		        // }



		        that.tableData=that.tableData.concat(data.result.bodyList)
		        console.log(data)


		    })


		    axajAr.push(aj)
		}

		this.axios.all(axajAr).then(function(){
			var hj=0;
			for(var i =0;i<that.tableData.length;i++){
				hj+=that.tableData[i].integralC
			}
			that.tableData[0].hj=hj
			that.tableData.push({})
			that.tableData.pop()
			// that.$forceUpdate()
			console.log(that.tableData)

		})


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
	

	.personalTask{
		text-align: left;
	}

	.personalTask .companyName{
		text-align: center;
		font-size: 20px;
		color: #333333;
		margin:14px 0px;
	}


	.personalTask .container{
		width: calc(100% - 30px);
		margin:0px auto;
		/*margin-top: 10px;*/
		margin-bottom: 20px;
	}

	.personalTask .taskListWrap{
		width: 100%;
		overflow-x: auto;
		padding-bottom: 40px;
	}
	.personalTask .taskList{
		width: 700px;
		padding: 0px 15px;
		box-sizing: border-box;
		position: relative;
	}

	.personalTask .taskListBlockRow{
		line-height: 24px;
		margin-top: 10px;
		font-size: 11px;
	}
	.personalTask .taskListBlockRowLabel{
		text-align: right;
		padding-right: 10px;
	}
	.personalTask .taskListHead{
		text-align: center;
		color: #2E67B2;
		/*margin:10px 0px;*/
		margin-top: 15px;
		font-size: 15px;
		font-weight: 500;
	}

	.personalTask .taskListBlockHead{
		color: #2E67B2;
		font-size: 14px; 
		border-bottom: 4px solid #2E67B2;
		padding-bottom: 5px;
		margin-top: 15px;
	}

	.personalTask .taskListBlockRowValue{
		border-bottom: 1px solid transparent;
	}



	/*底下的table*/
	.selfTabelDown td{
		border-bottom: 1px solid #fff;
		border-right: 1px solid #fff;
		text-align: center;
		padding: 10px 0px;
	}

	.selfTabelDown{
		border-top:  1px solid #fff;
		border-left: 1px solid #fff;
		margin-top: 10px;
		font-size: 11px;
		color: #333333;
		background-color: #E8EBF4;
	}
	.selfTabelDownHead{
		background-color: #2E67B2;
		color: white;

	}
	.selfTabelDownSmallHead{
		background-color: #C7D8F2;
	}


	/*中间的table*/
	.elTable{
		font-size: 11px;
		text-align: center;
		margin-top: 10px;
	}
	.tableHeadClass th{
		text-align: center;
		background: #2E67B2;
		color: white;
	}
	.tableBodyClass{
		text-align: center!important;
		background: #E8EBF4;
		border-color: white!important;

	}



	/*时间选择器*/
	.taskListTimePicker{
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