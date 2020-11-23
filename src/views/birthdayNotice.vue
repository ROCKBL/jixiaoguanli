<template>
	<div class="birthdayNotice">
		<van-nav-bar title="员工关怀"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<van-tabs v-model="active">
		  	<van-tab title="员工生日">
		  		<van-empty v-if="birthdayList.length==0" description="没有相关信息" />
		  	</van-tab>
		  	<van-tab title="劳动合同到期">
		  		<van-empty v-if="contractList.length==0" description="没有相关信息" />
		  	</van-tab>
		</van-tabs>


		<div class="tableData" v-if="active==0&&birthdayList.length>0">
			<el-table :data="birthdayList" style="width: 100%" :row-class-name="tableRowClassName">
		      	<el-table-column prop="emplyeeName" label="姓名"  >
		      		
		      	</el-table-column>
		      	<el-table-column prop="birthday" label="生日日期" >
		      		<template slot-scope="scope">
		      			<div v-if="scope.row.lunarBirthday==1">{{ scope.row.birthday }}(农历)</div>
		      			<div v-else>{{ scope.row.birthday }}</div>
		      		</template>
		      	</el-table-column>
		      	<el-table-column prop="endDayNum" label="距离天数">
		      		<template slot-scope="scope">
		      			<div v-if="scope.row.endDayNum>0">{{ scope.row.endDayNum }}天后</div>
		      			<div v-if="scope.row.endDayNum<=0">生日已经过了</div>
		      		</template>
		      	</el-table-column>
		    </el-table>
		</div>

		<div class="tableData" v-if="active==1&&contractList.length>0">
			<el-table :data="contractList" style="width: 100%" :row-class-name="tableRowClassName">
		      	<el-table-column prop="emplyeeName" label="姓名" >
		      
		      	</el-table-column>
		      	<el-table-column prop="endDayDate" label="合同到期日期" >
		      		<template slot-scope="scope">
		      			<div>{{ scope.row.endDayDate }}</div>
		      		</template>
		      	</el-table-column>
		      	<el-table-column prop="endDayNum" label="剩余天数" >
		      		<template slot-scope="scope">
		      			<div v-if="scope.row.endDayNum>0">{{ scope.row.endDayNum }}天后</div>
		      			<div v-if="scope.row.endDayNum<=0">已到期</div>
		      		</template>
		      	</el-table-column>
		    </el-table>
		</div>

		<!-- <div class="messageList">
			<div class="message" v-for="message in messageList" >
				<div class="messageIcon">
					<van-icon name="point-gift" size="26" color="white" />
				</div>

				<div class="messageContainer">
					<div class="messageName">{{ message.empName }}</div>
					<div class="messageContent">{{ formatContent(message.birthdayDate) }}</div>
				</div>

			</div>
		</div> -->

		
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			// messageList:[
			// 	// { title:"任务标题",date:"2020-08-10 16:40",tip:"公告标题公告标题公告标题,公告"},
			// 	// { title:"任务标题",date:"2020-08-10 16:40",tip:"公告标题公告标题公告标题,公告"},
			// ]

			active:0,
			birthdayList:[],
			contractList:[{}]
		}
	},
	computed:{},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		tableRowClassName({row, rowIndex}) {
			// console.log(row)
			if(row.endDayNum<=2){
				return 'redRow';
			}else if(row.endDayNum<=4){
				return 'yellowRow';
			}else if(row.endDayNum<=7){
				return 'blueRow';
			}else{
				return '';
			}

	        // if (rowIndex === 1) {
	        //   return 'redRow';
	        // } else if (rowIndex === 3) {
	        //   return 'yellowRow';
	        // }

	        // blueRow
	        // return '';
	    },

		onClickLeft(){
            this.$router.go(-1)
        },
        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },
        formatContent(time){
        	var date=new Date(time);
        	return "该员工的生日为"+date.Format("MM月dd日")
        },
        getData(){
        	var that=this;
			// var url=this.baseUrl+"/birthdyNotice/get";
			// this.axios({
			// 	method: 'get',
			// 	url: url,

			// }).then(function(response) {
			//   	var data=response.data
			//   	that.messageList=data.result
			//   	console.log(data)
			  	
			// })
			var url1=this.baseUrl+"/birthdyNotice/getBirthdayList";
			var url2=this.baseUrl+"/birthdyNotice/getConcaturtList";
			this.axios({
				method: 'post',
				url: url1,

			}).then(function(response) {
				// console.log(response)
			  	var data=response.data
			  	if(data.code==200){
			  		var ar=data.result.filter(function(o){
			  			return o!=null
			  		})
			  		ar=ar.map(function(o){
			  			o.birthday=new Date(o.birthday).Format("MM.dd")
			  			return o 
			  		})
			  		ar.sort(function(obj1,obj2){
			  			if (obj1.endDayNum < obj2.endDayNum) {
					        return -1;
					    } else if (obj1.endDayNum > obj2.endDayNum) {
					        return 1;
					    } else {
					        return 0;
					    }
			  		})

			  		that.birthdayList=ar
			  	}
			  	
			})
			this.axios({
				method: 'post',
				url: url2,

			}).then(function(response) {
				// console.log(response)
			  	var data=response.data
			  	if(data.code==200){
			  		var ar=data.result.filter(function(o){
			  			return o!=null
			  		})

			  		ar=ar.map(function(o){
			  			o.endDayDate=new Date(o.endDayDate).Format("yyyy.MM.dd")
			  			return o 
			  		})

			  		ar.sort(function(obj1,obj2){
			  			if (obj1.endDayNum < obj2.endDayNum) {
					        return -1;
					    } else if (obj1.endDayNum > obj2.endDayNum) {
					        return 1;
					    } else {
					        return 0;
					    }
			  		})
			  		that.contractList=ar

			  		console.log(ar)
			  	}
			  	
			})
        },


	},
	mounted(){

	},
	created(){
		// 获取任务消息列表
		this.getData()
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
	

	.birthdayNotice{
		text-align: left;
	}
	.birthdayNotice .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.birthdayNotice .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.birthdayNotice .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}
	/*.birthdayNotice .messageRight{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.birthdayNotice .messageRightTop{
		display: flex;
		align-items: center;
	}
	.birthdayNotice .messageTitle{
		color: #333333;
		font-size: 15px;
	}
	.birthdayNotice .messageDate{
		color: #999999;
		font-size: 12px;
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.birthdayNotice .messageRightBottom{
		display: flex;
		margin-top: 10px;
	}
	.birthdayNotice .messageTip{
		font-size: 14px;
		color: #999999;
	}*/

	.birthdayNotice .messageContainer{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.birthdayNotice .messageName{

	}
	.birthdayNotice .messageContent{
		font-size: 12px;
		color: #999999;
		margin-top: 5px;
	}




	.birthdayNotice .van-tabs__line{
		background-color: #2E67B2
	}
	.birthdayNotice .van-tab{
		color: #999999;
	}
	.birthdayNotice .van-tab--active{
		color: #2E67B2;
	}

	.birthdayNotice .tableData{
		width: calc(100% - 30px);
		margin:auto;
	}

	.redRow{
		color: #FF0000;
	}
	.yellowRow{
		color: #E79C37;
	}
	.blueRow{
		color: #2E67B2;
	}
</style>