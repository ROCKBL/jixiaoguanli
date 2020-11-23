<template>
	<div class="taskMid">
		<van-nav-bar :title="title"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<!-- <div class="itemRow" v-for="item in list" @click="seeTask(item)">
			<div class="itemRowInfo">
				<div class="itemRowName">{{ item.name }}</div>
				<div class="itemRowDate">{{ item.createTime }}</div>
			</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div> -->

		<div v-if="title!='个人级'" class="itemRow" v-for="item in list" @click="seeTask(item)">
			<div class="itemRowInfo">
				<div class="itemRowName">{{ item.taskIndicators }}</div>
				<div class="itemRowDate" v-if="item.totalObjName">{{ item.totalObjName }}</div>
			</div>
			<div style="margin-left: auto;">{{ item.startEndTime }}年</div>
			<van-icon style="margin-left: 10px;" class="itemRowRight" name="arrow" />
		</div>

		<div v-if="title=='个人级'" class="itemRow" v-for="item in list" @click="seeTask(item)">
			<div class="itemRowInfo">
				<div class="itemRowName">{{ formatDate(item.monthChoose) }}任务</div>
				<div class="itemRowDate">{{ item.totalObjName }}</div>
			</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>

		<van-empty v-if="list.length==0" description="没有相关信息" />

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

				// {name:"销售额",date:"2020-08-20 16:40"},
				// {name:"生产力",date:"2020-08-20 16:40"},
				// {name:"盈利能力",date:"2020-08-20 16:40"},
			],
			title:"公司级",

			isHigh:store.state.isHigh
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
        formatDate(date){
        	var d=new Date(date)
        	return d.Format("yyyy年MM月")
        },
        seeTask(item){
        	// 跳转
        	// this.$router.push("/taskDetail")

        	if(this.title=="公司级"){
        		this.$router.push({ path: '/companyTask', query: { obj: JSON.stringify(item) }})
        	}
        	if(this.title=="部门级"){
        		// decomposition
        		// console.log(item)
        		if(item.decomposition!=1){
        			this.Toast('该任务没有分解')
        			return
        		}
        		this.$router.push({ path: '/depTask', query: { obj: JSON.stringify(item) }})
        	}

        	if(this.title=="个人级"){
        		this.$router.push({ path: '/personalTask', query: { obj: JSON.stringify(item) }})
        	}


        	// this.$router.push({ path: '/taskDetail', query: { obj: JSON.stringify(item) }})
        },
		// seeMessage(type){
		// 	switch(type){
		// 		case 'renwu':
		// 			this.$router.push('/');
		// 			break;
		// 		case 'jifen':
		// 			this.$router.push('/');
		// 			break;
		// 		case 'gongsi':
		// 			this.$router.push('/');
		// 			break;
		// 	}
		// }

		getTaskList(){
			// 获取公司或部门或个人任务列表
			var that=this

			var params={
				page:1,
				rows:99999,
				targetLevel:this.title
			};

			var url=this.baseUrl+"/task/findByTargetLevel";
				this.axios({
				method: 'get',
				url: url,
				params:params
				// params: {
			 //      id: 1,
			 //    }
			}).then(function(response) {
			  	var data=response.data

			  	// console.log(response)

			  	if(data.code==200){

			  		that.list=data.result
			

			  		if(that.title=="个人级"){
			  			// var ar=[]
			  			// var objx={}
			  			// for(var i =0;i<data.result.length;i++){
			  			// 	if(objx[data.result[i].montuh]){
			  			// 		objx[data.result[i].montuh][data.result[i].aid]=true

			  			// 	}else{
			  			// 		objx[data.result[i].montuh]={}
			  			// 		// objx[data.result[i].montuh].push(objx[data.result[i].])
			  			// 		objx[data.result[i].montuh][data.result[i].aid]=true
			  			// 	}

			  			// }

			  			// // console.log(objx)
			  			// for(var m in objx){
			  			// 	ar.push({
			  			// 		monthChoose:m,
			  			// 		con:objx[m]
			  			// 	})
			  			// }
			  			// ar.sort(function(o1,o2){
			  			// 	console.log(o1.monthChoose)

			  			// 	return (new Date(o2.monthChoose)).getTime()-(new Date(o1.monthChoose)).getTime()

			  			// 	// return o1.monthChoose>o2.monthChoose
			  			// })
			  			// that.list=ar

			  			// 处理个人级任务
			  			var ar=data.result
			  			var newAr=[]
			  			ar.map(function(o){
			  				var find=newAr.find(function(obj){
			  					return obj.totalObjName==o.totalObjName&&obj.montuh==o.montuh
			  				})
			  				if(find){
			  					find.group.push(o)
			  					find.con[o.aid]=true
			  				}else{
			  					var newOne={
			  						group:[o],
			  						totalObjName:o.totalObjName,
			  						montuh:o.montuh,
			  						monthChoose:o.montuh,
			  						con:{}
			  					}
			  					newOne.con[o.aid]=true
			  					newAr.push(newOne)
			  				}
			  			})
			  			newAr.sort(function(o1,o2){

			  				return (new Date(o2.monthChoose)).getTime()-(new Date(o1.monthChoose)).getTime()
			  			})
			  			that.list=newAr
			  		}
			  		
			  	}else{
			  		that.Toast('网络错误');
			  	}
			})


		},
		isHighLevel(){
			var that=this;
			var url=this.baseUrl+"/com/emplyee/checkEmplyeeIdentity";
			return this.axios({
				method: 'get',
				url: url,
				// params:params
				params: {
			      id: store.state.userInfo.id,
			    }
			}).then(function(response){
				var data=response.data
				if(data.code==200){
					
				}else{
					if(that.title=="公司级"){
						that.$router.replace({ path: '/', })
					}
					
				}
			}).catch(function(response){
				if(that.title=="公司级"){
					that.$router.replace({ path: '/', })
				}
			})
		},

		jdgeLevel(){
			if(that.title=="公司级"){
				if(!that.isHigh){
					that.$router.replace({ path: '/', })
				}
			}
		}

	},
	mounted(){

	},
	created(){
		var title=this.$router.currentRoute.query.type
		this.title=title

		this.getTaskList()
		
		var that=this;
		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing
				// that.isHighLevel()
				if(store.state.isHigh==null){
					store.dispatch("getUserLevel").then(function(){
						that.isHigh=store.state.isHigh
						that.jdgeLevel()
					})
				}

			}).catch(function(error){
				that.Toast(error);
			})
		}else{
			// that.isHighLevel()
			if(store.state.isHigh==null){
				store.dispatch("getUserLevel").then(function(){
					that.isHigh=store.state.isHigh
					that.jdgeLevel()
				})
			}
		}


		// switch(title){
		// 	case "公司级":
		// 	case "部门级":
				
		// 		break;
		// 	case "个人级":
				
		// 		break;
		// }


		// /task/list?taskBjectType=公司级&id=2

		// 根据title获取任务列表数据


		// var that=this;

		// var params={
		// 	page:1,
		// 	rows:999,
		// 	targetLevel:title
		// };
		// // params.level=title


		// // var url=this.baseUrl+"/task/list";

		// // var url=this.baseUrl+"/com/target/list";

		// var url=this.baseUrl+"/task/findByTargetLevel";
		
		
		// this.axios({
		// 	method: 'get',
		// 	url: url,
		// 	params:params
		// 	// params: {
		//  //      id: 1,
		//  //    }
		// }).then(function(response) {
		//   	var data=response.data

		//   	// console.log(response)

		//   	if(data.code==200){


		//   		// 初始化消息列表数据

		//   // 		baseTarget: 20
		// 		// completion: null
		// 		// completionDegree: ""
		// 		// endTime: null
		// 		// id: 2
		// 		// month: 9
		// 		// objectName: "欧阳斌斌"
		// 		// result: null
		// 		// role_id: null
		// 		// startTime: null
		// 		// supperTarget: 30
		// 		// targetId: 17
		// 		// targetLevel: "个人级"
		// 		// targetName: "销售部个人业绩目标"
		// 		// targetType: "可量化"
		// 		// taskBjectType: "个人级"
		// 		// taskObject: 2
		// 		// taskObjectName: null
		// 		// weight: "2"

		//   		// that.list=

		//   		// that.list=data.result.records





		//   		// if(title=="公司级"){
		//   		// 	var ar1=[]
		//   		// 	for(var i =0;i<data.result.records.length;i++){
		//   		// 		if(data.result.records[i].targetLevel=="公司级"){
		//   		// 			for(var j=0;j<data.result.records[i].bodyList.length;j++){
		//   		// 				ar1.push(data.result.records[i].bodyList[j])
		//   		// 			}
		  					
		//   		// 		}
		//   		// 	}

		//   		// 	that.list=ar1

		//   		// }
		//   		// if(title=="部门级"){
		//   		// 	var ar2=[]
		//   		// 	for(var i =0;i<data.result.records.length;i++){
		//   		// 		if(data.result.records[i].targetLevel=="部门级"){
		//   		// 			for(var j=0;j<data.result.records[i].bodyList.length;j++){
		//   		// 				ar2.push(data.result.records[i].bodyList[j])
		//   		// 			}
		//   		// 		}
		//   		// 	}

		//   		// 	that.list=ar2

		//   		// }

		  		
		//   	}else{
		//   		// that.Toast('网络错误');
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


	.taskMid{
		text-align: left;
	}

	.taskMid .itemRow{
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.taskMid .itemRowInfo{

	}
	.taskMid .itemRowName{
		color: #333333;
		font-size: 17px;
	}
	.taskMid .itemRowDate{
		color: #999999;
		font-size: 12px;
		margin-top: 5px;
	}
	.taskMid .itemRowRight{
		margin-left: auto;
		color: #999999;
		font-size: 24px;
	}
</style>