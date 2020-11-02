<template>
	<div class="fujian">
		<van-nav-bar title="附件下载"   class="pageNavNative" left-arrow @click-left="onClickLeft" />

		<div class="itemRow" @click="seeMore('附件申请下载')">
			<div class="itemRowLeft" style="background-color: #2E67B2;">
				<van-icon class="iconfont" class-prefix='icon' name="xiazai" size="22" />
			</div>
			<div class="itemRowLabel">附件申请下载</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>
		<div class="itemRow" @click="seeMore('附件下载')">
			<div class="itemRowLeft" style="background-color: #2E67B2;">
				<van-icon class="iconfont" class-prefix='icon' name="fujianattachment16" size="22" />
			</div>
			<div class="itemRowLabel">附件下载</div>
			<van-icon class="itemRowRight" name="arrow" />
		</div>
		

	</div>
</template>

<script type="text/javascript">

import store from '@/store';

import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);

export default {
	name: '',
	store,
	data(){
		return{

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

		seeMore(v){
			//根据接口返回值判断是否进入到下个页面 
			switch(v){
				case "附件申请下载":
					this.$router.push({ path: '/fujianApply'})
					break;
				case "附件下载":
					this.$router.push({ path: '/fujianDownload'})
					break;
			}
			
		},
	},
	mounted(){

	},
	created(){}

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


	.fujian{
		text-align: left;
	}

	.fujian .itemRow{
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.fujian .itemRowLeft{
		height: 41px;
		width: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: white;
	}
	.fujian .itemRowLabel{
		margin-left: 10px;
		color: #333333;
		font-size: 17px;
	}
	.fujian .itemRowRight{
		margin-left: auto;
		color: #999999;
		font-size: 24px;
	}

	.van-toast__text{
		line-height: 34px;
	}
	.van-toast{
		background-color: rgba(0,0,0,0.5);
	}
</style>