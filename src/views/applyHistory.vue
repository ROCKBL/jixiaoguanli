<template>
	<div class="applyHistory">
		<van-nav-bar title="申请记录"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="applyHistoryContainer">
			<div v-for="apply in applyList" class="applyHistoryRow" @click="seeApplyDetail(apply)">
				<div class="applyHistoryRowUp">
					<div class="time">申请时间：{{ apply.outTime }}</div>
					<div :class="statusClass(apply)">{{ statusLabel(apply) }}</div>
				</div>
				<div class="reason">{{ apply.outDescribe }}</div>
			</div>
		</div>
		
		<van-empty v-if="applyList.length==0" description="没有相关信息" />
	</div>
</template>

<script type="text/javascript">

import store from '@/store';



export default {
	name: '',
	store,
	data(){
		return{
			applyList:[
				// {id:1,time:"2020.06.20 20:30",reason:"外出事由描述外出事由描述外出事由描述",status:"审核中"},
				// {id:2,time:"2020.06.20 20:30",reason:"外出事由描述外出事由描述外出事由描述",status:"审核失败"},
				// {id:3,time:"2020.06.20 20:30",reason:"外出事由描述外出事由描述外出事由描述",status:"审核通过"},
			],
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
        statusClass(apply){
        	var classname="blueStatus"
        	switch(apply.approvalStatus){
        		case null:
        		case "审核中":
        		case "审核通过":
        			break;
        		case "审核拒绝":
        			classname="redStatus";
        			break;
        	}
        	return classname
        },
        statusLabel(apply){

        	return apply.approvalStatus||"审核中";
        },
        seeApplyDetail(apply){
        	this.$router.push({
        		path:"/applyHistoryDetail",
        		query:{apply:JSON.stringify(apply)}
        	})

        }
	},
	mounted(){

	},
	created(){
		var that=this;
		var url=this.baseUrl+"/outApply/queryByEmplyeeId";
		this.axios({
			method: 'get',
			url: url,
			params:{
				id:that.cookieTool.get("userId")
			}
			
		}).then(function(response) {
		  	var data=response.data
		  	if(data.code==200){
		  		// console.log(data.result)

		  		data.result.sort(function(a,b){
		  			var ad=new Date(a.createTime)
		  			var bd=new Date(b.createTime)
		  			return bd.getTime()-ad.getTime()
		  		})

		  		that.applyList=data.result
		  		

		  	}else{
		  		// that.Toast('网络错误');
		  		
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
	

	.applyHistory{
		text-align: left;
	}

	.applyHistory .applyHistoryContainer{
		width: calc(100% - 30px);
		margin:0px auto;
	}
	.applyHistory .applyHistoryRow{
		border-bottom: 2px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
		color: #333333;
		font-size: 14px;
	}
	.applyHistory .applyHistoryRowUp{
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.applyHistory .blueStatus{
		margin-left: auto;
		color: #2E67B2;
	}
	.applyHistory .redStatus{
		margin-left: auto;
		color: #FE0045;
	}
</style>