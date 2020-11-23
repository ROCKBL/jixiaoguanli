<template>
	<div class="login">
		<!-- <div class="bg"></div> -->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="height: 56vw;">
		  	<van-swipe-item v-for="o in imgList">
		  		<van-image width="100%" height="220" fit="fill" :src="o.picturePath" />
		  	</van-swipe-item>
		</van-swipe>

		<div class="loginForm">
			<el-input class="loginFormItem loginID" placeholder="请输入您的用户名" prefix-icon="el-icon-user" v-model="usrId"></el-input>
			<el-input class="loginFormItem loginPW" placeholder="请输入您的密码" prefix-icon="el-icon-lock" v-model="passWord" show-password></el-input>

			<el-button class="loginBtn loginFormItem" type="primary" @click="login" :loading="btnLoading">登录</el-button>
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
			usrId:"",
			passWord:"",

			btnLoading:false,

			imgList:[],//轮播图列表
		}
	},
	computed:{},
	watch:{},
	components: {
		// HelloWorld
	},
	methods:{
		// login(){
		// 	var that=this
		// 	var url=this.baseUrl+"/loginPage"
		// 	// var url="http://129.211.186.83:12345/getRecent"
		// 	console.log(url)
		// 	// console.log(this.usrId)
		// 	// console.log(this.passWord)
		// 	this.axios({
		// 		method: 'post',
  // 				url: url,
  // 				params: {
		// 	      username: this.usrId,
		// 	      password:this.passWord
		// 	    }
		// 	}).then(function(response) {
		// 	  	var data=response.data
		// 	  	if(data.code==200){
		// 	  		// 保存登录状态

		// 	  		// 跳转首页
			  		
		// 	  		// console.log(response)
		// 	  		that.cookieTool.set('jixiao', 'Bearer' +data.token);

		// 	  		that.cookieTool.set('userId',data.id)

		// 	  		that.$router.replace("/")
			  		
		// 	  	}else{
		// 	  		// that.Toast('网络错误');
		// 	  	}

		// 	}).catch(function(response){
		// 		// window.a=response
		// 		// console.log(response)
				
		// 		that.Toast('用户名或密码错误');
		// 	})


		// 	// 登录首页
		// 	// this.$router.replace("/")
		// }

		login(){
			var that=this;

			this.btnLoading=true

			store.dispatch('login',{usrId:this.usrId,passWord:this.passWord}).then(function(msg){
				if(msg!="ok"){
					that.Toast(msg);
					return
				}

				that.btnLoading=false

				that.$router.replace("/")

			}).catch(function(error){
				that.Toast('用户名或密码错误');
				that.btnLoading=false
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

	},
	mounted(){
		// var url="http://129.211.186.83:12345/getRecent"
		// var url="http://172.16.17.133:8080/loginPage"
		// this.axios.get(url).then((response) => {
		//   console.log(response.data)
		// })
		
	},
	created(){
		this.getRotation()
	}

}
</script>

<style type="text/css" >
	.login .bg{
		/*background-color: red;*/
		/*background: url('../assets/img/963.gif');*/
		background: url('../assets/img/homebg.png');
		background-repeat: no-repeat;
		height: 210px;
		background-size: 100% 100%;
	}

	.login .el-input__inner{
		height: 100%;
		padding-left: 40px;
	}


	.login .loginForm{
		/*border-radius: 30px 30px 0px 0px;*/
		/*margin-top: -30px;*/
		border-radius: 15px 15px 0px 0px;
		margin-top: -10px;
		background-color: white;
	}

	.login .loginFormItem{
		width: calc(100% - 70px);
		margin:0px auto;
		height: 48px;
	}
	.login .el-input__icon{
		line-height: 48px;
	}

	.login .loginFormItem i{
		color: #333333;
		font-size: 20px;
		width: 35px;
	}
	.login .loginID{
		margin-top: 40px;
	}
	.login .loginPW{
		margin-top: 25px;
	}
	.login .loginBtn{
		margin-top: 55px;
		background-color: #2E67B2;
		border-color: #2E67B2;
		
	}
</style>