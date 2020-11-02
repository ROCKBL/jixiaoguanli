<template>
	<div class="notice">
		<van-nav-bar title="公告信息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="messageList">
			<div class="message" v-for="message in messageList" @click="seeDetail(message)">
				<div class="messageIcon">
					<van-icon class="iconfont " class-prefix='icon' name="laba" size="26" color="white" />
				</div>
				<div class="messageRight">
					<div class="messageRightTop">
						<div class="messageTitle">{{ message.name }}</div>
						<div class="messageDate">{{ message.createTime }}</div>
					</div>
					<div class="messageRightBottom">
						<div class="messageTip">{{ convent(message.content) }}</div>
					</div>
				</div>
			</div>
		</div>

		
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
        convent(html){
        	var re1 = new RegExp("<.+?>","g");
        	var msg = html.replace(re1,'');
        	return msg;
        },
        seeDetail(message){
        	// console.log(message)
        	// this.$router.push("/noticeDetail")

        	this.$router.push({ path: '/noticeDetail', query: { obj: JSON.stringify(message) }})
        }
	},
	mounted(){

	},
	created(){
		// 获取公告消息列表
		var that=this;
		var url=this.baseUrl+"/notice/queryEmpId";
		this.axios({
			method: 'get',
			url: url,
			// params: {
		 //      id: 1,
		 //    }
		}).then(function(response) {
		  	var data=response.data
		  	if(data.code==200){
		  		// 初始化消息列表数据
		  		that.messageList=data.result
		  	}else{
		  		that.Toast('网络错误');
		  	}
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
	

	.notice{
		text-align: left;
	}
	.notice .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.notice .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.notice .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}
	.notice .messageRight{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.notice .messageRightTop{
		display: flex;
		align-items: center;
	}
	.notice .messageTitle{
		color: #333333;
		font-size: 15px;
	}
	.notice .messageDate{
		color: #999999;
		font-size: 12px;
		margin-left: auto;
	}
	.notice .messageRightBottom{
		display: flex;
		margin-top: 10px;
	}
	.notice .messageTip{
		font-size: 14px;
		color: #999999;

		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		width: 100%;
	}
</style>