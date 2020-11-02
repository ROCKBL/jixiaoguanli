<template>
	<div class="taskMessageDetail">
		<van-nav-bar title="任务消息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="taskInfo">
			<div class="taskInfoHead">
				<div class="taskInfoHeadIcon">
					<van-icon class="iconfont " class-prefix='icon' name="renwu1" size="12" color="white" />
				</div>
				<div class="taskInfoHeadTitle">任务内容</div>
			</div>

			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">任务名称：</div>
				<div class="taskInfoRowValue">{{ name }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">任务类型：</div>
				<div class="taskInfoRowValue">{{ type }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">任务对象：</div>
				<div class="taskInfoRowValue">{{ target }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">计划时间：</div>
				<div class="taskInfoRowValue">{{ date }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">任务权重：</div>
				<div class="taskInfoRowValue">{{ weight }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">基准指标：</div>
				<div class="taskInfoRowValue">{{ jzzb }}</div>
			</div>
			<div class="taskInfoRow">
				<div class="taskInfoRowLabel">挑战指标：</div>
				<div class="taskInfoRowValue">{{ tzzb }}</div>
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
			name:"盈利能力",
			type:"可量化",
			target:"人事部",
			date:"9月",
			weight:"8.0",
			jzzb:"500万",
			tzzb:"600万",
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

	},
	mounted(){

	},
	created(){
		// 数据来源上级路由
		var jsonStr=this.$router.currentRoute.query.obj
		var obj=JSON.parse(jsonStr)


		// 处理传递的数据


		// 如果route传递的参数不足则调用接口
		// var that=this;
		// var url=this.baseUrl+"/com/emplyee/queryById";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
		// 	// params: {
		//  //      id: 1,
		//  //    }
		// }).then(function(response) {
		//   	var data=response.data
		//   	if(data.code==200){
		//   		// 初始化消息列表数据
		//   		// that.messageList=
		//   	}
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
	

	.taskMessageDetail{
		text-align: left;
	}
	.taskMessageDetail .taskInfo{
		border-radius: 6px;
		box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
		width: calc(100% - 30px);
		margin:10px auto;
		padding: 0px 16px;
		box-sizing: border-box;
		padding-bottom: 40px;
	}
	.taskMessageDetail .taskInfoRow{
		display: flex;
		padding: 10px 0px;
		font-size: 15px;
		color: #333333;
	}

	.taskMessageDetail .taskInfoHead{
		display: flex;
		padding: 10px 0px;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}

	.taskMessageDetail .taskInfoHeadIcon{
		border-radius: 50%;
		background-color: #2E67B2;
		width: 21px;
		height: 21px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.taskMessageDetail .taskInfoHeadTitle{
		margin-left: 10px;
		font-size: 15px;
		color: #333333;
	}

	.taskMessageDetail .taskInfoRowValue{
		margin-left: 10px;
	}
</style>