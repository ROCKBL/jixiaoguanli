<template>
	<div class="noticeDetail">
		<van-nav-bar title="公告信息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="noticeTitle">{{ title }}</div>
		<div v-html="content" class="noticeContent"></div>
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			title:"",
			content:"",
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
		console.log(obj)
		this.title=obj.name
		this.content=obj.content
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
		//   		// that.title=
		//			// that.content=
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
	

	.noticeDetail{
		text-align: left;
	}

	.noticeDetail .noticeTitle{
		text-align: center;
		font-size: 20px;
		color: #333333;
		margin:15px 0px;
	}
	.noticeDetail .noticeContent{
		width: calc(100% - 30px);
		margin:0px auto;
		color: #999999;
	}
</style>