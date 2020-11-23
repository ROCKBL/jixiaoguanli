<template>
	<div class="rank">
		<van-nav-bar title="公司排行榜"  left-arrow class="pageNavNative" @click-left="onClickLeft" right-text="部门" @click-right="onClickRight"/>


		<van-tabs v-model="dateTypeActive" title-active-color="#2E67B2" title-inactive-color="#999999" color="#2E67B2"  line-width=70  @change="topTabChange" swipe-threshold=4>
		  	<van-tab title="日积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">日积分统计</div>
		  			<div class="tabHeadRight" @click="showPop1">{{ yearMonthDay.date }}<van-icon name="arrow" /></div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="月度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">月度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop2">{{ yearMonth.date }}<van-icon name="arrow" /></div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="季度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">季度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop3">{{ season.date }}<van-icon name="arrow" /></div>
		  		</div>
		  	</van-tab>
		  	<van-tab title="年度积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">年度积分统计</div>
		  			<div class="tabHeadRight" @click="showPop4">{{ year.date }}<van-icon name="arrow" /></div>
		  		</div>
		  	</van-tab>

		  	<van-tab title="总积分统计" class="tab">
		  		<div class="tabHead" >
		  			<div class="tabHeadLeft">总积分统计</div>
		  		</div>
		  	</van-tab>
		</van-tabs>


		<!-- 下半部分 -->
		<div class="rankList">
			<div class="rankListHead">
				<div class="rankListFirst rankListColumn">排名</div>
				<div class="rankListSecond rankListColumn">姓名</div>
				<div class="rankListThird rankListColumn">分数</div>
			</div>
			<div v-for="item in list" class="rankListRow">
				<div class="rankListFirst rankListColumn">{{ item.company }}</div>
				<div class="rankListSecond rankListColumn">{{ item.name }}</div>
				<div class="rankListThird rankListColumn">{{ item.total }}</div>
			</div>
		</div>
		




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

export default {
	name: '',
	store,
	data(){
		return{
			dateTypeActive:0,//上面的tab
			// 年月日
			yearMonthDay:{
				date:"2020-8-10",
				
			},
			pop1:false,

			// 年月
			yearMonth:{
				date:"2020-8-10",
				
			},
			pop2:false,

			// 季度
			season:{
				date:"2020-8-10",
				
			},
			pop3:false,

			// 年
			year:{
				date:"2020-8-10",
				
			},
			pop4:false,

			// 公用
			minDate: new Date(2020, 0, 1),
	      	maxDate: new Date(2050, 0, 1),
	      	currentDate: new Date(),


			list:[
				// {name:"张三",rankNum:"1",score:"102"},
				// {name:"张三",rankNum:"2",score:"102"},
				// {name:"张三",rankNum:"3",score:"102"},
			],

			// 接口参数
			SDate:null,//起始时间
			EDate:null,//结束时间

			yearSetting:[],
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

		}

	},
	watch:{},
	components: {

	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
        	this.$router.push('/rankdep')
        },
		seeRank(){},
		// 年月日
		showPop1(){
			this.pop1=true;
		},
		popConfirm1(value){
			this.pop1=false;
			this.yearMonthDay.date=value.Format('yyyy-MM-dd');
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
			this.yearMonth.date=value.Format('yyyy-MM');
			this.yearMonth.year=value.getFullYear();
			this.yearMonth.month=value.getMonth()+1;

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


	    refreshData(){
	    	// // 刷新页面数据
	    	// // this.dateTypeActive
	    	// // this.yearMonthDay or others
	    	// // this.tyepActive
	    	// var url="";
	    	// var params={};

	    	// var dateTypeAr=["日","月","季","年","总计"];
	    	// if(dateTypeAr[this.dateTypeActive]=="日"){
	    	// 	// 处理上传的日期参数
	    	// 	// this.yearMonthDay.date
	    	// 	url=this.baseUrl+"/statistics/dayIntegralRanking"
	    	// 	params.date=this.yearMonthDay.date

	    	// }
	    	// if(dateTypeAr[this.dateTypeActive]=="月"){
	    	// 	// this.yearMonth.date
	    	// 	url=this.baseUrl+"/statistics/monthIntegralRanking"
	    	// 	// date=this.yearMonth.date
	    	// 	params.year=this.yearMonth.year
	    	// 	params.month=this.yearMonth.month

	    	// }
	    	// if(dateTypeAr[this.dateTypeActive]=="季"){
	    	// 	// 季度特殊处理
	    	// 	url=this.baseUrl+"/statistics/quarterIntegralRanking"

	    	// 	var year=this.season.date.substr(0,4);
	    	// 	var season=this.season.date.substr(5,4);
	    	// 	// console.log(year)
	    	// 	// console.log(season)
	    	// 	switch(season){
	    	// 		case '第一季度':
	    	// 			params.year=year
	    	// 			params.quarter=1
	    	// 			break;
	    	// 		case '第二季度':
	    	// 			params.year=year
	    	// 			params.quarter=2
	    	// 			break;
	    	// 		case '第三季度':
	    	// 			params.year=year
	    	// 			params.quarter=3
	    	// 			break;
	    	// 		case '第四季度':
	    	// 			params.year=year
	    	// 			params.quarter=4
	    	// 			break;
	    	// 	}
	    	// }
	    	// if(dateTypeAr[this.dateTypeActive]=="年"){
	    	// 	// this.year.date

	    	// 	url=this.baseUrl+"/statistics/yearIntegral"
	    	// 	// creatTime=this.year.date
	    	// 	params.year=this.year.date

	    	// }

	    	// if(dateTypeAr[this.dateTypeActive]=="总计"){
	    	// 	// this.year.date
	    	// 	url=this.baseUrl+"/statistics/totalIntegralRanking"

	    	// }
	    	



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

	    		// 判断年份是否在年份设置里
	    		var find=this.yearSetting.find(function(o){
					return o.yearTime==Number(year)
				})
				if(find){
					var startTime=new Date(find.startTime).Format("yyyy-MM-dd")
					var endTime=new Date(find.endTime).Format("yyyy-MM-dd")

					var dealTime=function(date,nmonth){
						// 获取隔几个月的日期
						var d=new Date(date)
						if(d.getMonth()+nmonth>11){
							d.setFullYear(d.getFullYear()+1)
							d.setMonth(d.getMonth()+nmonth-12)
						}else{
							d.setMonth(d.getMonth()+nmonth)
						}
						return d
						// if(d.getMonth()+nmonth>11){
						// 	var n1=parseInt((d.getMonth()+nmonth+1)/12)

							
						// 	d.setFullYear(d.getFullYear()+n1)
						// }
						// if(d.getMonth()+nmonth<0){

						// }
					}
					switch(season){
						case '第一季度':
							this.SDate=startTime
							var temp=dealTime(startTime,3)
							temp.setDate(1)
	    					this.EDate=temp.Format("yyyy-MM-dd")
							break;
						case '第二季度':
							var temp1=dealTime(startTime,3)
							temp1.setDate(1)
							var temp2=dealTime(startTime,6)
							temp2.setDate(1)
							this.SDate=temp1.Format("yyyy-MM-dd")
	    					this.EDate=temp2.Format("yyyy-MM-dd")
							break;
						case '第三季度':
							var temp1=dealTime(startTime,6)
							temp1.setDate(1)
							var temp2=dealTime(startTime,9)
							temp2.setDate(1)
							this.SDate=temp1.Format("yyyy-MM-dd")
	    					this.EDate=temp2.Format("yyyy-MM-dd")
							break;
						case '第四季度':
							var temp=dealTime(startTime,9)
							temp.setDate(1)

							this.SDate=temp.Format("yyyy-MM-dd")
	    					this.EDate=endTime
							break;
					}
				}
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
				// 判断年份是否在年份设置里
				var find=this.yearSetting.find(function(o){
					return o.yearTime==(new Date(that.year.date).getFullYear())
				})
				if(find){
					this.SDate=new Date(find.startTime).Format("yyyy-MM-dd")
					this.EDate=new Date(find.endTime).Format("yyyy-MM-dd")
				}

			}

			if(currentType=="总计"){
				this.SDate=null
				this.EDate=null
			}

			// 清空数据

			// 获取统计数据
			this.getTj()





	  //   	// todo
	  //   	var that=this;
			// // var url=this.baseUrl+"/com/scoreCalculation/list";
			// this.axios({
			// 	method: 'get',
			// 	url: url,
			// 	params: params
			// }).then(function(response) {
			//   	var data=response.data
			//   	if(data.code==200){
			//   		// 获取所有数据
			//   		// that.allList

			//   	}else{
			//   		// that.Toast('网络错误');
			//   	}
			// })
	    },
	    getTj(){
	    	var that=this;

	    	this.axios({
				method: 'post',
				url: this.baseUrl+"/statistics/IntegralStatistics",
				params: {
					startTime:that.SDate,
					endTime:that.EDate,
					pageNo:1,
					pageSize:20,
				}
			}).then(function(response){
				var data=response.data

				if(data.code==200){
					that.list=data.result.records

				}

				console.log(response)
			})
	    },

	    init(){
	    	// 初始化界面数据
	    	var dateObj=new Date();
	    	this.yearMonthDay.date=dateObj.Format('yyyy-MM-dd');
	    	this.yearMonth.date=dateObj.Format('yyyy-MM');

	    	this.yearMonth.year=dateObj.getFullYear();
	    	this.yearMonth.month=dateObj.getMonth()+1;

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
	    },

	    getYearSetting(){
	    	// 获取年份设置
	    	var url=this.baseUrl+"/yearConfig/list"
	    	var that=this;
	    	return this.axios({
				method: 'get',
				url: url,
				params:{
					pageNo:1,
					pageSize:999999
				}
			}).then(function(res){
				// console.log(res)
				if(res.data.code==200){
					that.yearSetting=res.data.result.records
				}
			})

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

	},
	mounted(){

	},
	created(){
		this.init();

		var that=this

		this.getYearSetting().then(function(){
			that.refreshData();
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


    .rank .tab{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;

	}
	.rank .tabHead{
		display: flex;
		align-items: center;
	}
	.rank .tabHeadLeft{
		font-size: 14px;
	}
	.rank .tabHeadRight{
		margin-left: auto;
		font-size: 12px;
		display: flex;
		align-items: center;
	}


	.rank .rankList{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;
		border-radius: 6px;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		box-sizing: border-box;
		padding: 15px;
	}
	.rank .rankListHead{
		display: flex;

		align-items: center;
	}
	.rank .rankListRow{
		display: flex;

		align-items: center;
		margin-top: 20px;
	}
	.rank .rankListColumn{
		font-size: 15px;
		color: #333333;
		width: 33.33%;
	}

	.rank .van-nav-bar__text{
		color: white;
	}
</style>