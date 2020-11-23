<template>
	<div class="adviceHistory">
		<van-nav-bar title="我的提案、建议表"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="adviceHistoryContainer">
			<div v-for="apply in applyList" class="adviceHistoryRow" @click="seeApplyDetail(apply)">
				<div class="adviceHistoryRowUp">
					<!-- <div class="time">申请时间：{{ apply.outTime }}</div> -->
					<div class="time">{{ apply.content }}</div>
					<div :class="statusClass(apply)">{{ statusLabel(apply) }}</div>
				</div>
				<!-- <div class="reason">{{ apply.outDescribe }}</div> -->
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
        	// switch(apply.approvalStatus){
        	// 	case null:
        	// 	case "审核中":
        	// 	case "审核通过":
        	// 		break;
        	// 	case "审核拒绝":
        	// 		classname="redStatus";
        	// 		break;
        	// }
        	if(apply.leaderCheckReult==1||apply.proposalStatus==1){
        		classname="redStatus";
        	}
        	return classname
        },
        statusLabel(apply){
        	if(apply.leaderCheckReult==0||apply.leaderCheckReult==null){
        		return "审核中"
        	}
        	if(apply.leaderCheckReult==1){
        		return "审核不通过"
        	}
        	if(apply.leaderCheckReult==2&&apply.proposalStatus==0){
        		return "审核通过"
        	}
        	if(apply.proposalStatus==1){
        		return "评估无效"
        	}
        	if(apply.proposalStatus==2){
        		return "评估有效"
        	}
        	// return apply.approvalStatus||"审核中";
        },
        seeApplyDetail(apply){
        	this.$router.push({
        		path:"/adviceHistoryDetail",
        		query:{apply:JSON.stringify(apply)}
        	})

        }
	},
	mounted(){

	},
	created(){
		var that=this;
		var url=this.baseUrl+"/proposal/getById";
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
	

	.adviceHistory{
		text-align: left;
	}

	.adviceHistory .adviceHistoryContainer{
		width: calc(100% - 30px);
		margin:0px auto;
	}
	.adviceHistory .adviceHistoryRow{
		border-bottom: 2px solid rgba(0,0,0,0.1);
		padding: 10px 0px;
		color: #333333;
		font-size: 14px;
	}
	.adviceHistory .adviceHistoryRowUp{
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.adviceHistory .blueStatus{
		margin-left: auto;
		color: #2E67B2;
	}
	.adviceHistory .redStatus{
		margin-left: auto;
		color: #FE0045;
	}
</style>