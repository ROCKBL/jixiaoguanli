<template>
	<div class="companyInfo">
		<van-nav-bar title="公司信息"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

		<div class="container">
			<div class="companyName">{{ companyName }}</div>
			<!-- <div class="corporateCulture" v-html="corporateCulture"></div> -->
			<van-image width="100%"  :src="organizationPath" />
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
			companyName:"",
			corporateCulture:"",
			organizationPath:"",
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
		var that=this;
		var url=this.baseUrl+"/company/list";
		this.axios({
			method: 'get',
			url: url,
			
		}).then(function(response) {
		  	var data=response.data
		  	if(data.code==200){
		  		var rtn=data.result[0]
		  		that.corporateCulture=rtn.corporateCulture
		  		that.organizationPath=rtn.organizationPath
		  		that.companyName=rtn.cname

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
	

	.companyInfo{
		text-align: left;
	}

	.companyInfo .companyName{
		text-align: center;
		font-size: 20px;
		color: #333333;
		margin:14px 0px;
	}


	.companyInfo .container{
		width: calc(100% - 30px);
		margin:0px auto;
		/*margin-top: 10px;*/
		margin-bottom: 20px;
	}

	.companyInfo .corporateCulture{

		margin-bottom: 10px;
	}
</style>