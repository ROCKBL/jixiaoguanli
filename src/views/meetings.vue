<template>
	<div class="meetings">
		<van-nav-bar title="三会记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
			<div class="messageList">
				<div class="message" v-for="meeting in meetingList" @click="seeDetail(meeting)">
					<div class="messageIcon">
						<!-- <van-icon class="iconfont " class-prefix='icon' name="renwu1" size="26" color="white" /> -->
						<van-icon size="26" name="notes-o" color="white" />
					</div>
					<div class="messageRight">
						<div class="messageRightTop">
							<div class="messageTitle">{{ meeting.name }}</div>
							<div class="messageDate">
								组织者：{{ meeting.createBy }}
								<!-- <van-icon v-if="!meeting.hint" name="info" size="20" color="red" style="margin-left: 10px;" /> -->
							</div>
						</div>
						<div class="messageRightBottom">
							<div class="messageTip" style="font-size: 10px;">会议时间：{{ meeting.meetTime }}</div>
						</div>
					</div>
				</div>
			</div>
		</van-list>

		<van-empty v-if="meetingList.length==0" description="没有相关信息" />
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			meetingList:[
				
			],

			loading:true,
			finished:false,
			pagesize:10
		}
	},
	computed:{},
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
        seeDetail(meeting){
        	
        	// this.$router.push({ path: '/meetingInfo', query: { obj: JSON.stringify(meeting) }})
        	this.$router.push({ path: '/meetingInfo', query: { id: meeting.id }})
        },
        getData(){
        	var that=this;
			var url=this.baseUrl+"/meeting/personGet";
			return this.axios({
				method: 'get',
				url: url,
				// params: {
			 //      pageNo: 1,
			 //      pageSize:10
			 //    }
			}).then(function(response) {
			  	var data=response.data
			  	that.loading=false
			  	// console.log(response)
			  	if(data.result){
			  		that.meetingList=data.result
			  	}
			  	if(data.result.length<that.pagesize){
			  		that.finished=true
			  	}

			})
        },

	},
	mounted(){

	},
	created(){
		// 获取任务消息列表
		// var that=this;
		// var url=this.baseUrl+"/meeting/personGet";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
		// 	// params: {
		//  //      pageNo: 1,
		//  //      pageSize:10
		//  //    }
		// }).then(function(response) {
		//   	var data=response.data

		//   	console.log(response)
		//   	if(data.result){
		//   		that.meetingList=data.result
		//   	}

		// })

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
	

	.meetings{
		text-align: left;
	}
	.meetings .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.meetings .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.meetings .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}
	.meetings .messageRight{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.meetings .messageRightTop{
		display: flex;
		align-items: center;
	}
	.meetings .messageTitle{
		color: #333333;
		font-size: 15px;
	}
	.meetings .messageDate{
		color: #999999;
		font-size: 11px;
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.meetings .messageRightBottom{
		display: flex;
		margin-top: 10px;
	}
	.meetings .messageTip{
		font-size: 14px;
		color: #999999;
	}
</style>