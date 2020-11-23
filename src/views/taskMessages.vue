<template>
	<div class="taskMessages">
		<van-nav-bar title="任务消息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="messageList">
			<div class="message" v-for="message in messageList" @click="seeDetail(message)">
				<div class="messageIcon">
					<van-icon class="iconfont " class-prefix='icon' name="renwu1" size="26" color="white" />
				</div>
				<div class="messageRight">
					<div class="messageRightTop">
						<div class="messageTitle">{{ formatDate(message.monthChoose) }}任务</div>
						<div class="messageDate">{{ message.createTime }}<van-icon v-if="!message.hint" name="info" size="20" color="red" style="margin-left: 10px;" /></div>
					</div>
					<!-- <div class="messageRightBottom">
						<div class="messageTip">{{ message.tip }}</div>
					</div> -->
				</div>
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
        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },

        seeDetail(message){

        	var that=this;
			var url=this.baseUrl+"/task/updateMsgState";
			this.axios({
				method: 'get',
				url: url,
				params: {
			      id: message.id,
			    }
			}).then(function(response) {
			  	var data=response.data			  	
			  	
			  	// if(data.code==200){
			  	// 	// 初始化消息列表数据
			  	// 	// that.messageList=
			  	// }else{
			  	// 	// that.Toast('网络错误');
			  	// }
			})


        	// this.$router.push("/taskMessageDetail")

        	// this.$router.push({ path: '/taskMessageDetail', query: { obj: JSON.stringify(message) }})

        	message.con={}
        	message.con[message.id]=true
        	this.$router.push({ path: '/personalTask', query: { obj: JSON.stringify(message) }})
        }
	},
	mounted(){

	},
	created(){
		// 获取任务消息列表
		var that=this;
		var url=this.baseUrl+"/task/myMsgPage";
		this.axios({
			method: 'get',
			url: url,
			// params: {
		 //      limit: 1,
		 //      start:1
		 //    }
		}).then(function(response) {
		  	var data=response.data

		  	if(data.result){
		  		that.messageList=data.result
		  	}
		  	// if(data.code==200){
		  	// 	// 初始化消息列表数据
		  	// 	// that.messageList=
		  	// }else{
		  	// 	// that.Toast('网络错误');
		  	// }
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
	

	.taskMessages{
		text-align: left;
	}
	.taskMessages .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.taskMessages .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.taskMessages .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}
	.taskMessages .messageRight{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.taskMessages .messageRightTop{
		display: flex;
		align-items: center;
	}
	.taskMessages .messageTitle{
		color: #333333;
		font-size: 15px;
	}
	.taskMessages .messageDate{
		color: #999999;
		font-size: 12px;
		margin-left: auto;
		display: flex;
		align-items: center;
	}
	.taskMessages .messageRightBottom{
		display: flex;
		margin-top: 10px;
	}
	.taskMessages .messageTip{
		font-size: 14px;
		color: #999999;
	}
</style>