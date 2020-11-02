<template>
	<div class="fujianDownload">
		<van-nav-bar title="附件申请下载"   class="pageNavNative" left-arrow @click-left="onClickLeft"  />

		<div class="itemRow" v-for="item in list">
			<div class="itemRowLeft" >
				<van-icon class="iconfont" class-prefix='icon' name="wenjian" size="44" />
			</div>
			<!-- <div class="itemRowLabel">附件申请下载</div> -->
			<!-- <van-icon class="itemRowRight" name="arrow" /> -->

			<div class="itemRowMid">
				<div class="itemRowMidName">{{ item.name }}</div>
				<div class="itemRowMidType">{{ item.type }}</div>
			</div>

			<div class="itemRowRight">
				<div class="itemRowRightDate">{{ item.createTime }}</div>
				<el-button type="primary" class="itemRowRightBtn" size="small" @click="apply(item)" >申请下载</el-button>

				<!-- <el-button type="primary" class="itemRowRightBtn" size="small" @click="apply(item)" v-if="item.status==0" >申请下载</el-button> -->
				<!-- <div class="itemRowRightText" style="color: #1C8B07" v-if="item.status==1">审核中</div> -->
				<!-- <div class="itemRowRightText" style="color: #2E67B2" v-if="item.status==2">审核通过</div> -->
				<!-- <div class="itemRowRightText" style="color: #FF0000" v-if="item.status==3">审核失败</div> -->
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
			list:[
				// {name:"文件的名称",type:"文件类型",url:"url",date:"2020-8-20",status:0},
				// {name:"文件的名称1",type:"文件类型",url:"url1",date:"2020-8-20",status:1},
				// {name:"文件的名称2",type:"文件类型",url:"url2",date:"2020-8-20",status:2},
				// {name:"文件的名称3",type:"文件类型",url:"url4",date:"2020-8-20",status:3},
			]
		}
	},
	computed:{},
	watch:{},
	components: {
		
	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        
		downloadfile(url){
			console.log(url)
		},
		apply(file){
			var url=this.baseUrl+"/apply/add";
			var that=this;

			this.axios({
				method: 'post',
				url: url,
				// data:{
				// 	fileId:file.id,
				// 	name:file.name
				// },
				params:{
					fileId:file.id,
					fileName:file.name
				}
			}).then(function(response){
				console.log(response)
				if(response.data.code==200){
					that.Toast("已经提交申请")
				}else{
					that.Toast("提交失败："+response.data.message)
				}

			})

		}
	},
	mounted(){

	},
	created(){
		// var url=this.baseUrl+"/apply/fileApply";


		// var url=this.baseUrl+"/apply/queryById";
		// var url=this.baseUrl+"/file/queryFile";
		// console.log("aaaa")
		var url=this.baseUrl+"/file/queryFileList";

		
		var that=this;
		this.axios({
			method: 'get',
			url: url,
		}).then(function(response){

			// console.log(response)
			that.list=response.data.result

		})


		// var url1=this.baseUrl+"/file/queryFile";
		// this.axios({
		// 	method: 'get',
		// 	url: url1,
		// }).then(function(response){

		// 	console.log(response)

		// })

	}

}
</script>

<style type="text/css" >
	.tabbarNav{
		padding-bottom: 3px;
		border-top: 1px solid rgba(0,0,0,0.1);
		padding-top: 2px;
	}
	.van-tabbar{
		height: 45px;
	}
	.van-tabbar-item__icon{
		margin-bottom: 0px;
	}
	.tabbarNav .van-tabbar-item__text{
		margin-top: auto;
	}

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


	.fujianDownload{
		text-align: left;
	}

	.fujianDownload .itemRow{
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.fujianDownload .itemRowLeft{
		height: 41px;
		width: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: #2E67B2;
	}
	.fujianDownload .itemRowMid{
		margin-left: 10px;
		color: #333333;
		font-size: 17px;
	}
	.fujianDownload .itemRowRight{
		margin-left: auto;
		color: #999999;
		font-size: 24px;
		display: flex;
		flex-direction: column;
	}

	.fujianDownload .itemRowRightDate{
		font-size: 12px;
		color: #999999;
		margin-left: auto;
	}

	.fujianDownload .itemRowRightBtn{
		background-color:#2E67B2;
		border-color:#2E67B2;
		font-size: 14px;
		padding:8px 12px;
		margin-top: 10px;
	}

	.fujianDownload .itemRowMidName{
		font-size: 15px;
		color: #333333;
	}
	.fujianDownload .itemRowMidType{
		font-size: 12px;
		color: #999999;
		margin-top: 10px;
	}

	.fujianDownload .itemRowRightText{
		font-size: 14px;
		margin-top: 10px;
		text-align: right;
	}
</style>