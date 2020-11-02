<template>
	<div class="gongxunfuli">
		<van-nav-bar title="功勋福利"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="tableWrap" v-if="tableData.length>0">
			<el-table :data="tableData" style="width: 100%;" :cell-style="{textAlign:'center'}" border header-cell-class-name="tableDataHead">
		      	<el-table-column prop="score" label="分数" width="100"></el-table-column>
		      	<el-table-column prop="welfare" label="功勋福利内容" ></el-table-column>

		    </el-table>
		</div>
		

		<van-empty v-if="tableData.length==0" description="没有相关信息" />
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			tableData:[

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

        getData(){
        	var that=this;
			var url=this.baseUrl+"/welfare/list";
			this.axios({
				method: 'get',
				url: url,

			}).then(function(response) {
				console.log(response)
			  	var data=response.data

			  	that.tableData=data.result.records
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
	

	.gongxunfuli{
		text-align: left;
	}
	.gongxunfuli .messageList{
		width: calc(100% - 30px);
		margin:0 auto;
	}
	.gongxunfuli .message{
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
	}
	.gongxunfuli .messageIcon{
		background-color: #2E67B2;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 48px;
		width: 48px;
	}


	.gongxunfuli .messageContainer{
		margin-left: 10px;
		width: calc(100% - 58px);
	}
	.gongxunfuli .messageName{

	}
	.gongxunfuli .messageContent{
		font-size: 12px;
		color: #999999;
		margin-top: 5px;
	}


	.gongxunfuli .tableWrap{
		width: calc(100% - 50px);
		margin:auto;
		margin-top: 20px;
	}

	.gongxunfuli .tableDataHead{
		background-color: #2E67B2;
		color: white;
		text-align: center;
	}
</style>