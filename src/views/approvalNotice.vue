<template>
	<div class="approvalNotice">
		<van-nav-bar title="审批查看"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="messageList">
			<div class="message" v-for="message in messageList" @click="seeInfo(message)">
				<!-- <div class="messageIcon">
					<van-icon name="volume" size="26" color="white" />
				</div>

				<div class="messageContainer">
					<div class="messageName">{{ message.name }}</div>
					<div class="messageContent">{{ message.num }}</div>
				</div> -->
				<div>{{ message.name }}</div>
				<div style="margin-left: auto;background-color: red;border-radius: 50%;width: 30px;height: 30px;display: flex;align-items: center;color:white;justify-content: center;">{{ message.num }}</div>
			</div>
		</div>

		<van-empty v-if="messageList.length==0" description="没有相关信息" />
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			messageList:[
				// { title:"任务标题",date:"2020-08-10 16:40",tip:"公告标题公告标题公告标题,公告"},
				// { title:"任务标题",date:"2020-08-10 16:40",tip:"公告标题公告标题公告标题,公告"},
			]
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
        seeInfo(message){

        	switch(message.name){
        		case "外出申请":
        			this.$router.push("/dealOutApply")
        			break;
        		case "提案改善建议":
        			this.$router.push("/dealAdvice")
        			break;
        		case "提案改善建议部门评估":
        			this.$router.push("/dealAdviceDep")
        			break;
        		case "文件下载申请":
        			this.$router.push("/dealDownLoad")
        			break;
        	}
        },
        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },
        getData(){
        	var that=this;
			var url=this.baseUrl+"/approvalNotice/get";
			this.axios({
				method: 'get',
				url: url,

			}).then(function(response) {
			  	var data=response.data

			  	that.messageList.length=0
			  	for(var s in data.result){
			  		var name=s
			  		if(s=="提议建议申请"){
			  			name="提案改善建议"
			  		}
			  		if(s=="提议建议部门评估"){
			  			name="提案改善建议部门评估"
			  		}
			  		that.messageList.push({
			  			name:name,
			  			num:data.result[s]
			  		})
			  	}

			  	// that.messageList=data.result
			  	// console.log(data)
			  	
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
	

	.approvalNotice{
		text-align: left;
	}
	.approvalNotice .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.approvalNotice .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.approvalNotice .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}

	.approvalNotice .messageContainer{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.approvalNotice .messageName{

	}
	.approvalNotice .messageContent{
		font-size: 12px;
		color: #999999;
		margin-top: 5px;
	}
</style>