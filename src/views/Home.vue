<template>
	<div class="home">
		<!-- <div class="bg"></div> -->

		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="height: 48vw;">
		  	<van-swipe-item v-for="o in imgList">
		  		<van-image width="100%" height="220" fit="fill" :src="o.picturePath" />
		  	</van-swipe-item>
		</van-swipe>

		

		<div class="userInfo">
			<van-image v-if="userPic!=''" width="50" height="50" round :src="picurl+userPic" />
			<div v-else class="defaultPic" >
				<van-icon class="iconfont " class-prefix='icon' name="xiazai4" size="30"  />
			</div>

			<div class="userInfoDetail">
				<div class="userName">{{ userName }}</div>
				<div class="userOther">
					<div style="margin-right: 5px;">{{ userDep }}</div>
					<div>{{ userLevel }}</div>
				</div>
			</div>
			<!-- <van-button class="logoutBtn" type="info" @click="logout" size="mini">退出登录</van-button> -->
		</div>

		
		<div class="scope">
			<div class="scopeUnit">
				<div class="scopeUnitLabel" @click="seeModule('积分详情')">今日积分：</div>
				<div class="scopeUnitValue">{{ scope.dayIntegral }}</div>
			</div>
			<div class="scopeUnit">
				<div class="scopeUnitLabel" @click="seeModule('部门排名')">部门排名：</div>
				<div class="scopeUnitValue">{{ scope.departRanking }}</div>
			</div>
			<div class="scopeUnit">
				<div class="scopeUnitLabel" @click="seeModule('部门排名')">班组排名：</div>
				<div class="scopeUnitValue">{{ scope.teamRanking }}</div>
			</div>
		</div>

		<div v-if="birthdayTipObj.showFlag">
			<van-notice-bar v-if="birthdayTipObj.days==0" left-icon="volume-o" text="今天是你的生日"/>
			<van-notice-bar v-else left-icon="volume-o" :text="birthdayTipObj.days+'天后将是你的生日'"/>
		</div>
		<div v-else>
			<van-notice-bar v-if="gonggaoMsg.length>0" left-icon="volume-o" :text="gonggaoMsg[0].name" @click="seeDetail" color="#fff" background="#367BBE" mode="link"/>
		</div>
		

		<!-- <div class="modules">
			<div class="module" @click="seeModule('积分详情')">
				<div class="moduleIcon" style="background-color: #8079EF;">
					<van-icon class="iconfont" class-prefix='icon' name="jifen" size="32" color="white" />
				</div>
				
				<div class="moduleLabel">积分详情</div>
			</div>
			<div class="module" @click="seeModule('公告信息')">
				<div class="moduleIcon" style="background-color: #9C15CD;">
					<van-icon class="iconfont " class-prefix='icon' name="gonggao" size="32" color="white" />
				</div>
				
				<div class="moduleLabel">公告信息</div>
			</div>
			<div class="module">
				<div class="moduleIcon" style="background-color: #2E67B2;" @click="seeModule('目标任务')">
					<van-icon class="iconfont " class-prefix='icon' name="mubiao" size="28" color="white" />
				</div>
				
				<div class="moduleLabel">目标任务</div>
			</div>
		</div> -->


		<van-grid :column-num="3" :border="false" style="padding: 2px 0px;">
		  	<van-grid-item v-for="obj in modules" :key="obj.name"  :text="obj.name" :badge="obj.badge" :to="obj.url">
		  		<template #icon>
		  			<div class="messagesIcon" style="margin-bottom: 4px;">
		  				<van-icon v-if="obj.isAli" class="iconfont" class-prefix='icon' :name="obj.icon" :size="obj.size" color="white" />
		  				<van-icon v-if="!obj.isAli" :name="obj.icon" :size="obj.size" color="white" />
		  			</div>
		  		</template>
		  	</van-grid-item>
		</van-grid>
		<van-image width="100%" :src="require('@/assets/img/banner.png')" />

		<div class="gonggaoItem">
			<div class="gonggaoItemHead">
				<div class="moduleIcon" style="background-color: #9C15CD;">
					<van-icon class="iconfont " class-prefix='icon' name="gonggao" size="26" color="white" />
				</div>
				<div class="gonggaoItemHeadTitle">公司公告</div>
				<van-icon class="gonggaoItemHeadIcon" name="arrow" color="#999999" size="26" @click="seeModule('公告信息')" />
			</div>
			
			<div class="gonggaomsg" v-for="(obj,index) in gonggaoMsg" @click="seeDetailGonggao(obj)">
				<div class="gonggaomsgUp">
					<div class="gonggaomsgIndex">{{ index+1 }}.</div>
					<div class="gonggaomsgTitle">{{ obj.name }}</div>
					<div class="gonggaomsgDate">{{ obj.createTime }}</div>
				</div>
				<!-- <div class="gonggaomsgContent" v-html="obj.content"></div> -->
				<div class="gonggaomsgContent">{{ convent(obj.content) }}</div>
			</div>
		</div>


		<div style="height: 60px;"></div>
		<!-- <div class="messageBlock">
			<div class="messages" @click="seeMessage('renwu')">
				<div class="messagesIcon">
					<van-icon class="iconfont " class-prefix='icon' name="renwu" size="26" color="white" />
				</div>
				
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">任务消息</div>

					</div>
					<van-icon class="messagesRightIcon" name="arrow" color="#999999" />
				</div>
			</div>

			<div class="messages" @click="seeMessage('meetings')" >
				<div class="messagesIcon">
					<van-icon  name="label-o" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">三会记录</div>
					</div>
					<van-icon class="messagesRightIcon" name="arrow" color="#999999" />
				</div>
			</div>

			<div class="messages" @click="seeMessage('approvalNotice')" v-if="showApprovalRow">
				<div class="messagesIcon">

					<van-icon name="volume" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">查看审批通知</div>
					</div>
					<div class="messagesRightIconWrap">
						<div class="birthdayNum" v-if="approvalNoticeNum">{{ approvalNoticeNum }}</div>
						<van-icon class="" name="arrow" color="#999999" />
					</div>
				</div>
			</div>

			<div class="messages" @click="seeMessage('birthday')" v-if="showBirthdayRow">
				<div class="messagesIcon">
					<van-icon name="point-gift" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">近期生日员工</div>
					</div>
					<div class="messagesRightIconWrap">
						<div class="birthdayNum" v-if="birthdayNum">{{ birthdayNum }}</div>
						<van-icon class="" name="arrow" color="#999999" />
					</div>
					
				</div>
			</div>
			<div class="messages" @click="seeMessage('fujian')">
				<div class="messagesIcon">
					<van-icon class="iconfont " class-prefix='icon' name="fujianattachment16" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">附件下载</div>
					</div>
					<van-icon class="messagesRightIcon" name="arrow" color="#999999" />
				</div>
			</div>

			<div class="messages" @click="seeMessage('gongxunfuli')" >
				<div class="messagesIcon">
					<van-icon name="gift" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">功勋福利</div>
					</div>
					<van-icon class="messagesRightIcon" name="arrow" color="#999999" />
				</div>
			</div>

			<div class="messages" @click="seeMessage('gongsi')" >
				<div class="messagesIcon">
					<van-icon class="iconfont " class-prefix='icon' name="xiaoxi" size="26" color="white" />
				</div>
				<div class="messagesRight">
					<div class="messagesInfo">
						<div class="messagesInfoLabel">公司信息</div>
					</div>
					<van-icon class="messagesRightIcon" name="arrow" color="#999999" />
				</div>
			</div>			


			<div style="margin-bottom: 60px;"></div>
		</div> -->


		<van-tabbar v-model="active" class="tabbarNav" active-color="#2E67B2" inactive-color="#999999" @change="changeTabbar">
		  	<van-tabbar-item >
		  		首页
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="shouye" size="26" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		积分
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="paigongfenpeishebei" size="32" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		任务
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="renwutongji" size="32" />
			    </template>
		  	</van-tabbar-item>
		  	<van-tabbar-item >
		  		我的
		  		<template #icon="props">
			      	<van-icon class="iconfont" class-prefix='icon' name="xiazai4" size="26" />
			    </template>
		  	</van-tabbar-item>
		</van-tabbar>

	</div>
</template>

<script type="text/javascript">

import store from '@/store';
import { mapState } from 'vuex'

import { calendar } from '@/assets/js/calendar'

// import url from "@/utils/url.js"

export default {
	name: '',
	store,
	data(){
		return{
			active: 0,

			// userPic:"https://img.yzcdn.cn/vant/cat.jpeg",
			// userName:"用户名",
			// userDep:"财务部",
			// userLevel:"高级工程师",

			// userPic:"",
			// userName:"",
			// userDep:"",
			// userLevel:"",
			birthdayTipObj:{},//生日提醒
			birthdayNum:0,// 近期生日员工数量

			showBirthdayRow:false,

			approvalNoticeNum:0,
			showApprovalRow:false,

			scope:{},

			modules:[
				{name:"任务消息",icon:"renwu",size:"28",isAli:true,badge:null,url:"/taskMessages"},
				{name:"三会记录",icon:"label-o",size:"28",isAli:false,badge:null,url:"/meetings"},
				{name:"审批查看",icon:"shenhe_gaizhang",size:"28",isAli:true,badge:null,url:"/approvalNotice"},
				{name:"功勋福利",icon:"medal_icon",size:"28",isAli:true,badge:null,url:"/gongxunfuli"},
				{name:"员工关怀",icon:"iconfontzhizuobiaozhun023140",size:"28",isAli:true,badge:null,url:"/birthdayNotice"},
				{name:"附件下载",icon:"fujianattachment16",size:"28",isAli:true,badge:null,url:"/fujian"},
			],

			gonggaoMsg:[],

			imgList:[],//轮播图列表

		}
	},
	computed:{
		...mapState({
			userPic(state){ return state.userInfo.photo||""},
			userName(state){ return state.userInfo.name||""},
			userDep(state){ return state.userInfo.depName||""},
			userLevel(state){ return state.userInfo.stationLevel||""},
			birthday(state){ return state.userInfo.birthday||""},
			userInfo(state){ return state.userInfo||{}},
		})
	},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		changeTabbar(index){
			// console.log(index)
			// if(index==this.active){
			// 	return
			// }
			// console.log(index)
			switch(index){
				case 0:
					this.$router.replace("/")
					break;
				case 1:
					this.$router.replace("/jifenInfo")
					break;
				case 2:
					this.$router.replace("/task")
					break;
				case 3:
					this.$router.replace("/mine")
					break;
			}
		},
		
		// logout(){
		// 	// 清楚cookie

		// 	// this.cookieTool.remove("jixiao");
		// 	// this.cookieTool.remove("userId");

		// 	// this.$router.replace("/login")

		// 	var that=this;

		// 	store.dispatch('logout').then(function(){
		// 		that.$router.replace("/login")
		// 	})
		// },
		seeDetailGonggao(obj){
			this.$router.push({ path: '/noticeDetail', query: { obj: JSON.stringify(obj) }})
		},

		seeDetail(){
			var message=this.gonggaoMsg[0]
			this.$router.push({ path: '/noticeDetail', query: { obj: JSON.stringify(message) }})
		},

		seeModule(type){
			switch(type){
				case "积分详情":
					this.$router.replace("/jifenInfo")
					break;
				case "公告信息":
					this.$router.push("/notice")
					break;
				case "目标任务":
					this.$router.replace("/task")
					break;

				case "部门排名":
					this.$router.push("/rankdep")
					break;
			}
		},
		// seeMessage(type){
		// 	switch(type){
		// 		case 'renwu':
		// 			this.$router.push('/taskMessages');
		// 			break;
		// 		case 'jifen':
		// 			this.$router.push('/jifenMessages');
		// 			break;
		// 		case 'gongsi':
		// 			this.$router.push('/companyInfo');
		// 			break;
		// 		case 'fujian':
		// 			this.$router.push('/fujian');
		// 			break;
		// 		case 'birthday':
		// 			this.$router.push('/birthdayNotice');
		// 			break;
		// 		case 'gongxunfuli':
		// 			this.$router.push('/gongxunfuli');
		// 			break;
		// 		case 'approvalNotice':
		// 			this.$router.push('/approvalNotice');
		// 			break;

		// 		case 'meetings':
		// 			this.$router.push('/meetings');
		// 			break;
		// 	}
		// },


		birthdayTip(showDays){
			var bo=this.birthday
			var today=new Date(new Date().Format("yyyy-MM-dd"))


			if(this.userInfo.lunarBirthday==1){

				var birthday1=new Date(this.birthday).Format("yyyy-MM-dd")
				var ar=birthday1.split("-")
				var o=calendar.solar2lunar(ar[0],ar[1],ar[2]);
				console.log(o)
				

				var o1=calendar.lunar2solar(today.getFullYear(),o.lMonth,o.lDay);
				console.log(o1)
				
				bo=o1.date
			}

			// 过公历生日
			
			var birthday=new Date(bo)
			birthday.setFullYear(today.getFullYear())

			if(birthday<today){
				birthday.setFullYear(today.getFullYear()+1)
			}
			// console.log(birthday.Format("yyyy-MM-dd"))
			// console.log(today.Format("yyyy-MM-dd"))
			var ts=birthday.getTime()-today.getTime()
			var days=ts/1000/60/60/24
			// console.log(days)
			var rtn={
				showFlag:false,
				days:days
			}
			if(days<=showDays){
				rtn.showFlag=true
			}
			return rtn
			
				


			
		},
		getBirthdayList(){
			var that=this;
			var birthdyNotice_url=this.baseUrl+"/birthdyNotice/get"
			var axj=this.axios({
				method: 'get',
				url: birthdyNotice_url,

			}).then(function(response){
				// console.log(response)
				if(response.data.code==200){
					that.showBirthdayRow=true
					
				}
				if(response.data.result){
					that.birthdayNum=response.data.result.length
				}
				
				
			})
		},
		getApprovalNotice(){
			var that=this;
			var approvalNotice_url=this.baseUrl+"/approvalNotice/get"
			var axj=this.axios({
				method: 'get',
				url: approvalNotice_url,

			}).then(function(response){
				console.log(response)
				if(response.data.code==200){
					that.showApprovalRow=true
					
				}
				if(response.data.result){
					that.approvalNoticeNum=0;
					for(var s in response.data.result){
						that.approvalNoticeNum+=response.data.result[s]
					}
				}
				
			})
		},

		getRank(){
			// 获取排名
			var that=this;
			var url=this.baseUrl+"/departIntegral/person"
			var axj=this.axios({
				method: 'get',
				url: url,

			}).then(function(response){
				// console.log(response)
				that.scope=response.data.result
			})
		},

		getGonggaoData(){
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
			  		if(data.result.length>3){
			  			data.result.length=3
			  		}
			  		// that.gonggaoMsg=data.result.map(function(o){
			  		// 	o.content=(function(value){
			  		// 		value = value.replace(/<\/?.+?>/g,'')
						 //  	value = value.replace(/\s+/g,'')
							//   if (value.length > 20) {
						 //    	return value.slice(0, 25) + "...";
						 //  	}
						 //  	return value;
			  		// 	})(o.content)
			  		// 	return o
			  		// })

			  		that.gonggaoMsg=data.result
			  	}else{
			  		that.Toast('网络错误');
			  	}
			})
		},
		// 获取轮播图
		getRotation(){
			var that=this;
			var url=this.baseUrl+"/RotationChart/personList";
			this.axios({
				method: 'get',
				url: url,
				// params: {
			 //      id: 1,
			 //    }
			}).then(function(response) {
				console.log(response)
			  	var data=response.data
			  	if(data.code==200){
			  		
			  		that.imgList=data.result.records
			  		that.imgList=that.imgList.filter(function(o){
			  			return o.type==1&&o.enable==1
			  		})

			  	}else{
			  		that.Toast('网络错误');
			  	}
			  	console.log(that.imgList)
			})
		},
		convent(html){
        	var re1 = new RegExp("<.+?>","g");
        	var msg = html.replace(re1,'');
        	return msg;
        },
	},
	mounted(){

	},
	created(){
		// 获取员工信息
		// console.log(JSON.stringify(store.state.userInfo))

		var that=this;

		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing
				// console.log(store.state.userInfo)
				that.birthdayTipObj=that.birthdayTip(2)

			}).catch(function(error){
				that.Toast(error);
			})
		}
		// 获取生日
		
		that.getBirthdayList()
		
		// 获取审批
		this.getApprovalNotice()

		// 获取排名 
		that.getRank()
		
		// 获取公告
		that.getGonggaoData()

		// 获取轮播图
		this.getRotation()

		console.log(calendar)
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



	.home{
		text-align: left;
	}
	.home .bg{
		/*background: url('../assets/img/963.gif');*/
		background: url('../assets/img/homebg.png');
		
		background-repeat: no-repeat;
		height: 220px;
		background-size: 100% 100%;
	}

	.home .defaultPic{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-color: white;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		height: 50px;
		width: 50px;
	}

	.home .userInfo{
		width: calc(100% - 30px);
		margin:0px auto;
		display: flex;
		align-items: center;
		height: 65px;
	}
	.home .logoutBtn{
		margin-left: auto;
		background-color:#2E67B2;
		border-color: #2E67B2;
	}
	.home .userOther{
		color: #999999;
		font-size: 11px;
		display: flex;
		align-items: center;
		margin-top: 10px;
	}
	.home .userName{
		color: #333333;
		font-size: 14px;
	}
	.home .userInfoDetail{
		margin-left: 10px;
	}


	.home .modules{
		display: flex;
		height: 110px;
		align-items: center;
		width: calc(100% - 30px);
		margin:0 auto;
		justify-content: space-between;
	}
	.home .module{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.home .moduleIcon{
		height: 42px;
		width: 42px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 13px;

	}
	.home .moduleLabel{
		color: #333333;
		font-size: 18px;
		margin-top: 10px;
		text-align: center;
		font-weight: 500;
	}



	.home .messageBlock{
		width: calc(100% - 30px);
		margin:0px auto;
	}
	.home .messages{
		display: flex;
		align-items: center;
		padding: 5px 0px;
		height: 60px;
		box-sizing: border-box;
	}
	.home .messagesIcon{
		background-color: #2E67B2;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.home .messagesRight{
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: calc(100% - 56px);
		height: 100%;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.home .messagesInfo{
		/*height: 100%;*/
	}
	.home .messagesInfoLabel{
		font-size: 16px;
		color: #333333;
	}
	.home .messagesInfoTip{
		color: #999999;
		font-size: 12px;
		margin-top: 6px;
	}
	.home .messagesRightIcon{
		margin-left: auto;
	}
	.home .birthdayNum{

		border-radius: 50%;
		background-color: red;
		width: 25px;
		height: 25px;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 5px;
	}

	.home .messagesRightIconWrap{
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.home .scope{
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom:1px solid rgba(0,0,0,0.08);
		font-size: 14px;
	}
	.home .scopeUnit{
		box-sizing: border-box;
		padding: 5px;
		/*text-align: center;*/
		border-radius: 5px;
		/*box-shadow: 0px 0px 5px rgba(0,0,0,0.1);*/
		display: flex;
		line-height: 24px;
		padding-top: 0px;
	}
	.home .scopeUnitLabel{
		/*margin-bottom: 5px;*/
		/*font-size: 12px;*/
		color: #333;
		margin-right: 5px;
	}
	.home .scopeUnitValue{
		color: #999;
	}


/*new*/

	.home .van-grid-item__text{
		font-size: 13px;
		color: rgba(51, 51, 51, 1);
	}
	.home .van-grid-item__content{
		padding: 5px 8px;
	}
	.home .van-info{
		font-size: 14px;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		padding: 0px;
		text-align: center;
		line-height: 25px;
		top: 2px;
		right: 2px;
	}


	.home .gonggaoItem{
		box-sizing: border-box;
		padding: 0px 10px;
	}
	.home .gonggaoItemHead{
		display: flex;
		align-items: center;
		padding: 10px 0px;
	}
	.home .gonggaoItemHeadTitle{
		margin-left: 10px;
		color: rgba(51, 51, 51, 1);
	}
	.home .gonggaoItemHeadIcon{
		margin-left: auto;
		color: rgba(153, 153, 153, 1);
	}

	.home .gonggaomsg{
		box-sizing: border-box;
		padding: 10px 0px;
	}
	.home .gonggaomsgUp{
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.home .gonggaomsgIndex{
		color: rgba(51, 51, 51, 1);
		font-size: 14px;
	}
	.home .gonggaomsgTitle{
		color: rgba(51, 51, 51, 1);
		font-size: 14px;

	}
	.home .gonggaomsgDate{
		color: rgba(153, 153, 153, 1);
		font-size: 12px;
		margin-left: auto;
	}
	.home .gonggaomsgContent{
		margin-left: 12px;
		color: rgba(153, 153, 153, 1);
		font-size: 12px;

		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		width: calc(100% - 12px);
	}
</style>