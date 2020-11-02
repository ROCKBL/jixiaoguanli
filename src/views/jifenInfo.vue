<template>
	<div class="jifenInfo">
		<van-nav-bar title="积分详情"   class="pageNavNative" >
			<template #right>
				<div class="navRightBtn" @click="seeRank">
					<van-icon class="iconfont" class-prefix='icon' name="paixingbang" size="24" />
					<div class="label">排行榜</div>
				</div>
			</template>
		</van-nav-bar>


		<van-tabs v-model="dateTypeActive" title-active-color="#2E67B2" title-inactive-color="#999999" color="#2E67B2"  line-width=70  @change="topTabChange" swipe-threshold=4>
		  	<van-tab title="日积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">日积分统计</div>
		  			<div class="tabHeadRight" @click="showPop1">{{ yearMonthDay.date }}<van-icon name="arrow" /></div>
		  		</div>
		  		<div class="tabTable">
		  			<div class="tabTableColumn dateColumn">
		  				<div class="tabTableColumnLabel">时间</div>
		  				<div class="tabTableColumnValue">{{ yearMonthDay.date }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">A分数值</div>
		  				<div class="tabTableColumnValue">{{ yearMonthDay.a }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">B分数值</div>
		  				<div class="tabTableColumnValue">{{ yearMonthDay.b }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">积分统计</div>
		  				<div class="tabTableColumnValue">{{ yearMonthDay.total }}</div>
		  			</div>
		  		</div>	
		  	</van-tab>
		  	<van-tab title="月度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">月度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop2">{{ yearMonth.date }}<van-icon name="arrow" /></div>
		  		</div>
		  		<div class="tabTable">
		  			<div class="tabTableColumn dateColumn">
		  				<div class="tabTableColumnLabel">时间</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.date }}</div>
		  			</div>
		  			<!-- <div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">A分数值</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.a }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">B分数值</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.b }}</div>
		  			</div> -->
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">A分</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.a }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">B分</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.b }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">C分</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.c }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">D分</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.d }}</div>
		  			</div>

		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">积分统计</div>
		  				<div class="tabTableColumnValue">{{ yearMonth.total }}</div>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="季度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">季度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop3">{{ season.date }}<van-icon name="arrow" /></div>
		  		</div>
		  		<div class="tabTable">
		  			<div class="tabTableColumn dateColumn">
		  				<div class="tabTableColumnLabel">时间</div>
		  				<div class="tabTableColumnValue">{{ season.date }}</div>
		  			</div>

		  			<!-- <div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">A分数值</div>
		  				<div class="tabTableColumnValue">{{ season.a }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">B分数值</div>
		  				<div class="tabTableColumnValue">{{ season.b }}</div>
		  			</div> -->
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">A分</div>
		  				<div class="tabTableColumnValue">{{ season.a }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">B分</div>
		  				<div class="tabTableColumnValue">{{ season.b }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">C分</div>
		  				<div class="tabTableColumnValue">{{ season.c }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">D分</div>
		  				<div class="tabTableColumnValue">{{ season.d }}</div>
		  			</div>


		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">积分统计</div>
		  				<div class="tabTableColumnValue">{{ season.total }}</div>
		  			</div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="年度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">年度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop4">{{ year.date }}<van-icon name="arrow" /></div>
		  		</div>
		  		<div class="tabTable">
		  			<div class="tabTableColumn dateColumn">
		  				<div class="tabTableColumnLabel">时间</div>
		  				<div class="tabTableColumnValue">{{ year.date }}</div>
		  			</div>

		  			<!-- <div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">A分数值</div>
		  				<div class="tabTableColumnValue">{{ year.a }}</div>
		  			</div>
		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">B分数值</div>
		  				<div class="tabTableColumnValue">{{ year.b }}</div>
		  			</div> -->
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">A分</div>
		  				<div class="tabTableColumnValue">{{ year.a }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">B分</div>
		  				<div class="tabTableColumnValue">{{ year.b }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">C分</div>
		  				<div class="tabTableColumnValue">{{ year.c }}</div>
		  			</div>
		  			<div class="tabTableColumnHalf">
		  				<div class="tabTableColumnLabel">D分</div>
		  				<div class="tabTableColumnValue">{{ year.d }}</div>
		  			</div>


		  			<div class="tabTableColumn">
		  				<div class="tabTableColumnLabel">积分统计</div>
		  				<div class="tabTableColumnValue">{{ year.total }}</div>
		  			</div>
		  		</div>
		  	</van-tab>

		  	<van-tab title="总积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">总积分统计</div>
		  			
		  		</div>
		  		<div class="tabTable">
		  			<div class="tabTableColumn_3 dateColumn">
		  				<div class="tabTableColumnLabel">时间</div>
		  				<div class="tabTableColumnValue">{{ today }}</div>
		  			</div>
		  			<div class="tabTableColumn_3">
		  				<div class="tabTableColumnLabel">工龄</div>
		  				<div class="tabTableColumnValue">{{ seniority }}年</div>
		  			</div>
		  			<div class="tabTableColumn_3">
		  				<div class="tabTableColumnLabel">积分统计</div>
		  				<div class="tabTableColumnValue">{{ totalNum }}</div>
		  			</div>
		  		</div>
		  	</van-tab>
		</van-tabs>


		<!-- 下半部分 -->
		<van-tabs v-model="tyepActive" title-active-color="#2E67B2" title-inactive-color="#999999" color="#2E67B2"  line-width=50 @change="bottomTabChange" >
		  	<van-tab title="A分记录"></van-tab>
		  	<van-tab title="B分记录"></van-tab>
		  	<van-tab title="C分记录" v-if="dateTypeActive!=0"></van-tab>
		  	<van-tab title="D分记录" v-if="dateTypeActive!=0"></van-tab>
		</van-tabs>

		<div style="margin-top: 10px;"></div>


		<div class="jfCard" v-if="tyepActive===3" v-for="m in list">
			<div class="jfCardHead">
				<div class="jfCardName">D</div>
				<div class="jfCardScore">+{{ m.score }}</div>
				<!-- <div class="jfCardDate">{{ m.date }}</div> -->
			</div>
			<div class="jfCardBody">
				<div class="jfCardRow">{{ m.name }}</div>
			</div>
		</div>

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<div class="jfCard" v-if="tyepActive===0||tyepActive===1" v-for="m in list">
				<div class="jfCardHead">
					<!-- <div class="jfCardName">{{ m.name }}</div>
					<div class="jfCardScore">{{ m.score }}</div>
					<div class="jfCardDate">{{ m.date }}</div> -->
					<div class="jfCardName">{{ m.type }}</div>
					<div class="jfCardScore">
						<span v-if="m.active=='减分'">-</span>
						<span v-else>+</span>
						{{ m.num }}
					</div>
					<div class="jfCardDate">{{ m.createDate }}</div>
				</div>
				<div class="jfCardBody">
					<!-- <div class="jfCardReason">{{ m.reason }}</div> -->
					<div class="jfCardReason">{{ m.associationType }}</div>
					
					<div class="jfCardBzWrap">
						<div class="jfCardBzLabel">计分项：</div>
						<!-- <div class="jfCardBz">{{ m.bz }}</div> -->
						<div class="jfCardBz">{{ m.content }}</div>
					</div>
				</div>
			</div>


			<div class="jfCard" v-if="tyepActive===2" v-for="m in list">
				<div class="jfCardHead">
					<div class="jfCardName">C</div>
					<div class="jfCardScore">{{ m.scorpNum }}</div>
					<!-- <div class="jfCardDate">{{ m.date }}</div> -->
				</div>
				<div class="jfCardBody">
					<div class="jfCardRow">{{ m.taskName }}</div>
					<div class="jfCardRow">权重分：{{ m.presetNum }}</div>
					<div class="jfCardRow">任务完成度：{{ m.scorpNum }}</div>
				</div>
			</div>

		</van-list>

		

		<van-empty image="network" description="没有数据" v-if="list.length==0" />


		<div style="margin-bottom: 60px;"></div>


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


		<!-- 年月日时间选择器 -->
		<van-popup v-model="pop1" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="date" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm1" @cancel="popCancel1" />
		</van-popup>
		<!-- 年月选择器 -->
		<van-popup v-model="pop2" position="bottom" :style="{ height: '50%' }" >
			<van-datetime-picker v-model="currentDate" type="year-month" title="" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="popConfirm2" @cancel="popCancel2" />
		</van-popup>
		<!-- 季度选择器 -->
		<van-popup v-model="pop3" position="bottom" :style="{ height: '50%' }" >
			<van-picker title="" show-toolbar :columns="seasonColumns" @confirm="popConfirm3" @cancel="popCancel3" />
		</van-popup>

		<van-popup v-model="pop4" position="bottom" :style="{ height: '50%' }" >
			<van-picker title="" show-toolbar :columns="yearColumns" @confirm="popConfirm4" @cancel="popCancel4" />
		</van-popup>


	</div>
</template>

<script type="text/javascript">

import store from '@/store';

import { mapState } from 'vuex'

import Vue from 'vue';
import { Empty } from 'vant';
Vue.use(Empty);

export default {
	name: '',
	store,
	data(){
		return{
			loading:false,
			finished:false,

			active: 1,//tabbar
			dateTypeActive:0,//上面的tab
			tyepActive:0,//下面的tab

			totalNum:0,//总统计积分
			today:(new Date()).Format('yyyy-MM-dd'),//今天
			// 年月日
			yearMonthDay:{
				// date:"2020-8-10",
				date:(new Date()).Format('yyyy-MM-dd'),
				a:0,
				b:0,
				total:0
			},
			pop1:false,

			// 年月
			yearMonth:{
				// date:"2020-8-10",
				date:(new Date()).Format('yyyy-MM'),
				a:0,
				b:0,
				c:0,
				d:0,
				total:0
			},
			pop2:false,

			// 季度
			season:{
				date:"2020-8-10",
				a:0,
				b:0,
				c:0,
				d:0,
				total:0
			},
			pop3:false,

			// 年
			year:{
				// date:"2020-8-10",
				date:(new Date()).Format('yyyy'),
				a:0,
				b:0,
				c:0,
				d:0,
				total:0
			},
			pop4:false,

			// 公用
			minDate: new Date(2020, 0, 1),
	      	maxDate: new Date(2050, 0, 1),
	      	currentDate: new Date(),

	      	// 展示的列表数据
			list:[],
			// 全部的列表数据
			allList:[
				// { name:"A",score:"-4分",reason:"员工旷工半日:(扣发1.5日薪水)",date:"2020-08-20",bz:"备注备注备,注备注备注"},
				// { name:"B",score:"-4分",reason:"员工旷工半日:(扣发1.5日薪水)",date:"2020-08-20",bz:"备注备注备,注备注备注"},
				// { name:"C",score:"-4分",taskName:"任务名称",percent:"50%",weight:"9.0",date:"2020-08-20"},
				// { name:"D",score:"+4分",date:"2020"},
			],
			alist:[],
			blist:[],
			clist:[],
			dlist:[],

			// 接口地址
			ABurl:null,
			Curl:null,
			Durl:null,
			TJurl:null,

			// 接口参数
			SDate:null,//起始时间
			EDate:null,//结束时间

			pgn:1,//分页页码

		}
	},
	computed:{
		yearColumns(){
			var start=2020;
			var end=2050;
			var ar=[];
			for(var i =start;i<=end;i++){
				ar.push(i+"年")
			}
			return ar;
		},
		seasonColumns(){
			var ar=[
				{values: ['周一', '周二', '周三', '周四', '周五'],},
				{values: ['第一季度', '第二季度', '第三季度', '第四季度'],},
			]
			var start=2020;
			var end=2050;
			var yearAr=[]
			for(var i =start;i<=end;i++){
				yearAr.push(i+"年")
			}
			ar[0].values=yearAr
			return ar
		},

		...mapState({
			seniority(state){ return state.userInfo.workYears||""},
			empno(state){ return state.userInfo.number||""},

			userJob(state){ return state.userInfo.stationName||""},
		})


	},
	watch:{},
	components: {

	},
	methods:{
		onLoad(){
			var that=this;
			this.pgn+=1
			switch(this.tyepActive){
	    		case 0:
	    		// A
	    			this.getCardInfo("alist",this.pgn,"add").then(function(m){
	    				console.log(m)
	    				that.loading=false

	    				if(m.result.records.length<5){
	    					that.finished=true


	    				}else{
	    					
	    				}
	    				
	    			});
	    			break;
	    		case 1:
	    		// B
	    			// this.list=this.blist
	    			this.getCardInfo("blist",this.pgn,"add").then(function(m){
	    				console.log(m)
	    				that.loading=false
	    				if(m.result.records.length<5){
	    					that.finished=true
	    				}else{
	    					
	    				}
	    				
	    			})
	    			break;
	    		case 2:
	    		// C
	    			// this.list=this.clist
	    			this.getCardInfo("clist",this.pgn,"add").then(function(m){
	    				console.log(m)
	    				that.loading=false
	    				if(m.result.records.length<5){
	    					that.finished=true
	    				}else{
	    					
	    				}
	    				
	    			})
	    			break;

	    	}

		},


		changeTabbar(index){
			// if(index==this.active){
			// 	return
			// }
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
		seeRank(){
			this.$router.push("/rank")
		},
		// 年月日
		showPop1(){
			this.pop1=true;
		},
		popConfirm1(value){
			this.pop1=false;
			// console.log(value);
			this.yearMonthDay.date=value.Format('yyyy-MM-dd');
			// console.log(value.Format('yyyy-MM-dd'))
			this.refreshData()
		},
		popCancel1(){
			this.pop1=false;
		},

		// 年月
		showPop2(){
			this.pop2=true;
		},
		popConfirm2(value){
			this.pop2=false;
			// console.log(value);
			this.yearMonth.date=value.Format('yyyy-MM');

			this.refreshData()
		},
		popCancel2(){
			this.pop2=false;
		},
		// 季度
		showPop3(){
			this.pop3=true;
		},
		popConfirm3(value){
			this.pop3=false;
			// console.log(value);
			this.season.date=value[0]+value[1];
			this.refreshData()
		},
		popCancel3(){
			this.pop3=false;
		},
		// 年
		showPop4(){
			this.pop4=true;
		},
		popConfirm4(value){
			this.pop4=false;
			// console.log(value);
			value=value.substr(0,4);
			// console.log(value);
			this.year.date=value;

			this.refreshData()
		},
		popCancel4(){
			this.pop4=false;
		},



		formatter(type, val) {
	      if (type === 'year') {
	        return `${val}年`;
	      } else if (type === 'month') {
	        return `${val}月`;
	      }else if (type === 'day') {
	        return `${val}日`;
	      }

	      return val;
	    },



	    topTabChange(name,title){
	    	// 刷新上面表格 和 下面卡片数据
	    	this.refreshData();
	    },
	    bottomTabChange(name,title){
	    	// 刷新下面卡片数据
	    	this.refreshCardData()
	    },

	    refreshData(){
	  //   	// 刷新页面数据
	  //   	// this.dateTypeActive
	  //   	// this.yearMonthDay or others
	  //   	// this.tyepActive
	  //   	// var url=this.baseUrl+"/com/scoreCalculation/list";
	  //   	var url="";
	  //   	var params={
	  //   		id:2
	  //   	};//请求参数

	  //   	var dateTypeAr=["日","月","季","年"];
	  //   	var currentType=dateTypeAr[this.dateTypeActive]
	  //   	if(currentType=="日"){
	  //   		// 处理上传的日期参数
	  //   		// this.yearMonthDay.date
	  //   		// url=this.baseUrl+"/statistics/dayIntegral"
	  //   		url=this.baseUrl+"/statistics/statisticsDayIntegral"
	  //   		params.date=this.yearMonthDay.date
	  //   	}
	  //   	if(currentType=="月"){
	  //   		// this.yearMonth.date
	  //   		// url=this.baseUrl+"/statistics/monthIntegral"
	  //   		url=this.baseUrl+"/statistics/statisticsMonthIntegral"
	  //   		params.date=this.yearMonth.date
	  //   	}
	  //   	if(currentType=="季"){
	  //   		// url=this.baseUrl+"/statistics/seasonIntegral"
	  //   		url=this.baseUrl+"/statistics/quarterIntegral"
	  //   		// 季度特殊处理
	  //   		var year=this.season.date.substr(0,4);
	  //   		var season=this.season.date.substr(5,4);
	  //   		// console.log(year)
	  //   		// console.log(season)
	  //   		switch(season){
	  //   			case '第一季度':
	  //   				params.year=year
	  //   				params.quarter=1
	  //   				break;
	  //   			case '第二季度':
	  //   				params.year=year
	  //   				params.quarter=2
	  //   				break;
	  //   			case '第三季度':
	  //   				params.year=year
	  //   				params.quarter=3
	  //   				break;
	  //   			case '第四季度':
	  //   				params.year=year
	  //   				params.quarter=4
	  //   				break;
	  //   		}
	  //   	}
	  //   	if(currentType=="年"){
	  //   		// this.year.date
	  //   		url=this.baseUrl+"/statistics/yearStatistics"
	  //   		params.year=this.year.date
	  //   	}
	    	
	  //   	// 获取统计总数据

	  //   	// todo
	  //   	var that=this;
			
			// this.axios({
			// 	method: 'get',
			// 	url: url,
			// 	params: params
			// }).then(function(response) {
			//   	var data=response.data
			//   	if(data.code==200){
			//   		// 获取所有数据
			//   		// that.allList
			//   		switch(currentType){
			//   			case '日':
			//   				// that.yearMonthDay.a=Anum
			//   				// that.yearMonthDay.b=Bnum
			//   				// that.yearMonthDay.total=num
			//   				break;
			//   			case '月':
			//   				// that.yearMonth.a=
			//   				// that.yearMonth.b=
			//   				// that.yearMonth.total=
			//   				break;
			//   			case '季':
			//   				// that.season.a=
			//   				// that.season.b=
			//   				// that.season.total=
			//   				break;
			//   			case '年':
			//   				// that.year.a=
			//   				// that.year.b=
			//   				// that.year.total=
			//   				break;
			//   		}

			//   		that.alist=data.result.astatistics
			//   		that.blist=data.result.bstatistics
			//   		that.clist=data.result.cstatistics
			//   		that.dlist=data.result.dstatistics

			//   		that.refreshCardData()
			//   	}else{
			//   		// that.Toast('网络错误');
			  		
			//   	}
			// })

			var dateTypeAr=["日","月","季","年","总计"];
			var currentType=dateTypeAr[this.dateTypeActive];//当前页面类型：日，月。。。

			var that=this;

			// 处理日期参数
			if(currentType=="日"){
				var date1=new Date(this.yearMonthDay.date)
				var date2=new Date(date1.getTime()+24*60*60*1000)

				this.SDate=date1.Format("yyyy-MM-dd")
				this.EDate=date2.Format("yyyy-MM-dd")

				// console.log(this.SDate)
				// console.log(this.EDate)
			}
			if(currentType=="月"){
				var date1=new Date(this.yearMonth.date)
				this.SDate=date1.Format("yyyy-MM-dd")

				date1.setMonth(date1.getMonth()+1)
				this.EDate=date1.Format("yyyy-MM-dd")


				// console.log(this.SDate)
				// console.log(this.EDate)

			}
			if(currentType=="季"){
				var year=this.season.date.substr(0,4);
	    		var season=this.season.date.substr(5,4);

	    		var date1=""
	    		var date2=""
				switch(season){
	    			case '第一季度':
	    				date1=year+"-01-01"
	    				date2=year+"-04-01"
	    				break;
	    			case '第二季度':
	    				date1=year+"-04-01"
	    				date2=year+"-07-01"
	    				break;
	    			case '第三季度':
	    				date1=year+"-07-01"
	    				date2=year+"-10-01"
	    				break;
	    			case '第四季度':
	    				date1=year+"-10-01"
	    				date2=(Number(year)+1)+"-01-01"
	    				break;
	    		}

	    		this.SDate=date1
	    		this.EDate=date2

				// console.log(this.SDate)
				// console.log(this.EDate)
			}
			if(currentType=="年"){
				var date1=new Date(this.year.date)
				this.SDate=date1.Format("yyyy-MM-dd")

				date1.setFullYear(date1.getFullYear()+1)
				this.EDate=date1.Format("yyyy-MM-dd")

				// console.log(this.SDate)
				// console.log(this.EDate)

			}

			if(currentType=="总计"){
				this.SDate=null
				this.EDate=null
			}

			// 清空数据

			// 获取统计数据
			this.getTj()
			

			// 获取A分详情列表初始化
	    	// this.getCardInfo("alist",1,"new")
	    	this.refreshCardData()

	    },

	    getTj(){
	    	var that=this;

	    	this.axios({
				method: 'post',
				url: this.TJurl,
				params: {
					startTime:that.SDate,
					endTime:that.EDate,
					empNumber:that.empno,
				}
			}).then(function(response){
				var data=response.data

				if(data.code==200){
					var obj=data.result.records[0]||{}
					if(that.dateTypeActive==0){
						// 日积分
						that.yearMonthDay.a=obj.a||0
						that.yearMonthDay.b=obj.b||0
						that.yearMonthDay.total=(obj.total-obj.d)||0
					}
					if(that.dateTypeActive==1){
						// 月积分
						that.yearMonth.a=obj.a||0
						that.yearMonth.b=obj.b||0
						// that.yearMonth.total=(obj.total-obj.d)||0
						that.yearMonth.c=obj.c||0
						that.yearMonth.d=obj.d||0
						that.yearMonth.total=obj.total||0
					}
					if(that.dateTypeActive==2){
						// 季积分
						that.season.a=obj.a||0
						that.season.b=obj.b||0
						// that.season.total=(obj.total-obj.d)||0
						that.season.c=obj.c||0
						that.season.d=obj.d||0
						that.season.total=obj.total||0
					}
					if(that.dateTypeActive==3){
						// 年积分
						that.year.a=obj.a||0
						that.year.b=obj.b||0
						that.year.total=obj.total||0

						that.year.c=obj.c||0
						that.year.d=obj.d||0
					}
					if(that.dateTypeActive==4){
						// 总积分
						that.totalNum=obj.total||0
					}

				}

				// console.log(response)
			})
	    },
	    getCardInfo(type,pageNo,mode){
	    	// mode  new:刷新   add:添加
	    	if(mode=="new"){
	    		this[type]=[]
	    		this.list=[]

	    		this.pgn=1;
	    	}
	    	
	    	var url="";
	    	switch(type){
	    		case "alist":
	    		case "blist":
	    			url=this.ABurl	    		
	    			break;
	    		case "clist":
	    			url=this.Curl
	    			break;
	    		case "dlist":
	    			url=this.Durl
	    			break;
	    	}

	    	var that=this;
	    	var params={
	    		pageNo:pageNo,
				pageSize:5,
				startTime:that.SDate,
				endTime:that.EDate,
				empNumber:that.empno,
	    	}
	    	if(type=="alist"){
	    		params.type="A"
	    	}
	    	if(type=="blist"){
	    		params.type="B"
	    	}

	    	var axj=this.axios({
				method: 'get',
				url: url,
				params:params
			}).then(function(response){
				// console.log(response)
				var data=response.data
				if(data.code==200){
					if(mode=="new"){
						that[type]=data.result.records
					}
					if(mode=="add"){
						that[type]=that[type].concat(data.result.records)
					}

					if(type=="dlist"){
						var ar=[
							{ score:data.result.stationScore,name:"岗位："+that.userJob },
							{ score:data.result.yearScore,name:"工龄："+that.seniority+"年" },
						]
						that[type]=ar
					}

					that.list=that[type]
				}

				return data

			})

			return axj
	    },

	    refreshCardData(){
	    	// 刷新卡片数据
	    	// todo
	    	// var showAr=[];
	    	// var cardType=["A","B","C","D"]
	    	// for(var i=0;i<this.allList.length;i++){
	    	// 	if(this.allList[i].name==cardType[this.tyepActive]){
	    	// 		showAr.push(this.allList[i])
	    	// 	}
	    	// }
	    	this.finished=false
	    	switch(this.tyepActive){
	    		case 0:
	    		// A
	    			this.getCardInfo("alist",1,"new")
	    			break;
	    		case 1:
	    		// B
	    			// this.list=this.blist
	    			this.getCardInfo("blist",1,"new")
	    			break;
	    		case 2:
	    		// C
	    			// this.list=this.clist
	    			this.getCardInfo("clist",1,"new")
	    			break;
	    		case 3:
	    		// D
	    			// this.list=this.dlist
	    			this.getCardInfo("dlist",1,"new")
	    			this.finished=true
	    			break;
	    	}

	    	
	    	// this.list=showAr;
	    },

	    init(){
	    	// 初始化界面数据
	    	var dateObj=new Date();
	    	this.yearMonthDay.date=dateObj.Format('yyyy-MM-dd');
	    	this.yearMonth.date=dateObj.Format('yyyy-MM');
	    	this.year.date=dateObj.Format('yyyy');

	    	var year=dateObj.getFullYear();
	    	var month=dateObj.getMonth()+1;
	    	var season="";
	    	if(month<4){
	    		season="第一季度";
	    	}else if(month<7){
	    		season="第二季度";
	    	}else if(month<10){
	    		season="第三季度";
	    	}else{
	    		season="第四季度";
	    	}
	    	this.season.date=year+"年"+season;


	    	// 生成接口地址
	    	this.ABurl=this.baseUrl+"/com/scoreCalculation/integralAB";
	    	this.Curl=this.baseUrl+"/com/scoreCalculation/showIntegralC";

	    	this.Durl=this.baseUrl+"/com/scoreCalculation/getUserD";
	    	this.TJurl=this.baseUrl+"/statistics/IntegralStatistics";

	    }
	},
	mounted(){

	},
	created(){
		this.init();

		this.refreshData();

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

    .jifenInfo .pageNavNative{
    	/*position: fixed;*/
    	/*width: 100%;*/
    	/*top: 0px;*/
    	/*left: 0px;*/
    }


	.jifenInfo{
		text-align: left;
		color: #333333;

		/*padding-top: 64px;*/
	}
	.jifenInfo .navRightBtn{
		display:flex; 
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.jifenInfo .navRightBtn .label{
		font-size: 8px;
	}

	.jifenInfo .tab{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;

	}
	.jifenInfo .tabHead{
		display: flex;
		align-items: center;
	}
	.jifenInfo .tabHeadLeft{
		font-size: 14px;
	}
	.jifenInfo .tabHeadRight{
		margin-left: auto;
		font-size: 12px;
		display: flex;
		align-items: center;
	}
	.jifenInfo .tabTable{
		display: flex;
		padding: 20px 0px;
		border-radius: 5px;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		margin-top: 10px;
		margin-bottom: 5px;
	}

	.jifenInfo .tabTableColumn{
		width: 24%;
		box-sizing: border-box;
	}
	.jifenInfo .tabTableColumnHalf{
		width: 12%;
		box-sizing: border-box;
	}



	.jifenInfo .dateColumn{
		width: 28%;	
	}


	.jifenInfo .tabTableColumn_3{
		width: 33.3%;
		box-sizing: border-box;
	}

	.jifenInfo .tabTableColumnLabel{
		font-size: 12px;
		text-align: center;
		
	}
	.jifenInfo .tabTableColumnValue{
		font-size: 12px;
		text-align: center;
		margin-top: 20px;
	}



	.jifenInfo .jfCard{
		border-radius: 6px;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		width:calc(100% - 30px);
		margin:0px auto;
		margin-bottom: 10px;
		padding: 0px 15px;
		box-sizing: border-box;
	}

	.jifenInfo .jfCardHead{
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		display: flex;
		align-items: center;
	}
	.jifenInfo .jfCardBody{
		padding-bottom: 20px;
	}
	.jifenInfo .jfCardName{
		font-size: 20px;
		color: #333333;

	}
	.jifenInfo .jfCardScore{
		color: #FF0000;
		font-size: 16px;
		margin-left: 10px;
		margin-bottom: 2px;
	}
	.jifenInfo .jfCardDate{
		margin-left: auto;
		color: #999999;
		font-size: 12px;
	}
	.jifenInfo .jfCardReason{
		font-size: 14px;
		padding: 10px 0px;
	}
	.jifenInfo .jfCardBzWrap{}
	.jifenInfo .jfCardBzLabel{
		padding-bottom: 5px;
	}
	.jifenInfo .jfCardBz{
		font-size: 11px;
		color: #999999;
	}

	.jifenInfo .jfCardRow{
		font-size: 14px;
		color: #333333;
		margin-top: 10px;
	}
</style>