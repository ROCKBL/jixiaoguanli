<template>
	<div class="jifenMessages">
		<van-nav-bar title="积分消息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="jfTitle">扣分项目</div>

		<div class="jfCard" v-for="m in message">
			<div class="jfCardHead">
				<div class="jfCardName">{{ m.name }}</div>
				<div class="jfCardScore">{{ m.score }}</div>
				<div class="jfCardDate">{{ m.date }}</div>
			</div>
			<div class="jfCardBody">
				<div class="jfCardReason">{{ m.reason }}</div>
				<div class="jfCardBzWrap">
					<div class="jfCardBzLabel">备注：</div>
					<div class="jfCardBz">{{ m.bz }}</div>
				</div>
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
			message:[
				{ name:"A",score:"-4分",reason:"员工旷工半日:(扣发1.5日薪水)",date:"2020-08-20",bz:"备注备注备,注备注备注"},
				{ name:"B",score:"-4分",reason:"员工旷工半日:(扣发1.5日薪水)",date:"2020-08-20",bz:"备注备注备,注备注备注"},
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

	},
	mounted(){

	},
	created(){
		// 获取积分消息
		var that=this;
		// var url=this.baseUrl+"/statistics/totalIntegral";
		var url=this.baseUrl+"/statistics/totalStatistics";
		
		this.axios({
			method: 'get',
			url: url,
			// params: {
		 //      id: 1,
		 //    }
		}).then(function(response) {
		  	var data=response.data
		  	if(data.code==200){
		  		// 初始化消息列表
		  		// aStatistics，bStatistics，cStatistics，dStatistics
		  		// that.message=[].concat()
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
	

	.jifenMessages{
		text-align: left;
		color: #333333;
	}

	.jifenMessages .jfTitle{
		font-size: 15px;
		padding: 10px;
		text-align: center;
	}
	.jifenMessages .jfCard{
		border-radius: 6px;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		width:calc(100% - 30px);
		margin:0px auto;
		margin-bottom: 10px;
		padding: 0px 15px;
		box-sizing: border-box;
	}

	.jifenMessages .jfCardHead{
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		display: flex;
		align-items: center;
	}
	.jifenMessages .jfCardBody{
		padding-bottom: 20px;
	}
	.jifenMessages .jfCardName{
		font-size: 20px;
		color: #333333;

	}
	.jifenMessages .jfCardScore{
		color: #FF0000;
		font-size: 16px;
		margin-left: 10px;
		margin-bottom: 2px;
	}
	.jifenMessages .jfCardDate{
		margin-left: auto;
		color: #999999;
		font-size: 12px;
	}
	.jifenMessages .jfCardReason{
		font-size: 14px;
		padding: 10px 0px;
	}
	.jifenMessages .jfCardBzWrap{}
	.jifenMessages .jfCardBzLabel{
		padding-bottom: 5px;
	}
	.jifenMessages .jfCardBz{
		font-size: 11px;
		color: #999999;
	}

</style>