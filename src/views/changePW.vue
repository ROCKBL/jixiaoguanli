<template>
	<div class="changePW">
		<van-nav-bar title="修改密码"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<el-form :inline="true" :model="form" :rules="rules" class="changePWForm" ref="ruleForm">
			<el-form-item prop="oldpassword" class="formitem">
				<el-input class="loginFormItem loginPW" placeholder="请输入您的旧密码" prefix-icon="el-icon-lock" v-model="form.oldpassword" show-password></el-input>
			</el-form-item>
			<el-form-item prop="newpassword" class="formitem">
				<el-input class="loginFormItem loginPW" placeholder="请输入您的新密码" prefix-icon="el-icon-lock" v-model="form.newpassword" show-password></el-input>
			</el-form-item>
			<el-form-item prop="newpassword2" class="formitem">
				<el-input class="loginFormItem loginPW" placeholder="请确认您的新密码" prefix-icon="el-icon-lock" v-model="form.newpassword2" show-password></el-input>
			</el-form-item>
		</el-form>		

		<div class="loginBtnWrap">
			<el-button class="loginBtn loginFormItem" type="primary" @click="submit" >确认</el-button>
		</div>
		
	</div>
</template>

<script type="text/javascript">

import store from '@/store';
import { mapState } from 'vuex'

export default {
	name: '',
	store,
	data(){
		var validatePassOld = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入旧密码'));
	        } else {
	          // if (this.ruleForm.checkPass !== '') {
	          //   this.$refs.ruleForm.validateField('checkPass');
	          // }
	          callback();
	        }
	    };
		var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入新密码'));
	        } else {
	          // if (this.ruleForm.checkPass !== '') {
	          //   this.$refs.ruleForm.validateField('checkPass');
	          // }
	          callback();
	        }
	    };
	    var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          	callback(new Error('请再次输入新密码'));
	        } else if (value !== this.form.newpassword) {
	          	callback(new Error('两次输入新密码不一致!'));
	        } else {
	          	callback();
	        }
	    };

		return{
			form:{
				oldpassword:"",
				newpassword:"",
				newpassword2:""
			},
			rules: {
		        oldpassword: [
		            { validator: validatePassOld, trigger: 'blur' }
		        ],
		        newpassword: [
		            { validator: validatePass, trigger: 'blur' }
		        ],
		        newpassword2: [
		            { validator: validatePass2, trigger: 'blur' }
		        ],
	        }
		}
	},
	computed:{
		...mapState({
			userPic(state){ return state.userInfo.photo||""},
			userName(state){ return state.userInfo.name||""},
			userDep(state){ return state.userInfo.depName||""},
			jobLevel(state){ return state.userInfo.stationLevel||""},

			userJob(state){ return state.userInfo.stationName||""},
			userId(state){ return state.userInfo.idNumber||""},
			gender(state){ return state.userInfo.sex||""},
			age(state){ return state.userInfo.age||""},
			empno(state){ return state.userInfo.number||""},
			place(state){ return state.userInfo.workAddress||""},
			entryDate(state){ return state.userInfo.createTime||""},
			probation(state){ return state.userInfo.probationPeriod||""},
			seniority(state){ return state.userInfo.workYears||""},
			contractAwardDate(state){ return state.userInfo.lastSigningTime||""},
			contractvalidityDate(state){ return state.userInfo.contractEndDate||""},
			depName(state){ return state.userInfo.depName||""},
			userInfo(state){ return state.userInfo},
		})

	},
	watch:{},
	components: {

	},
	methods:{
		onClickLeft(){
            this.$router.go(-1)
        },
        submit(){
        	var that=this
        	this.$refs["ruleForm"].validate((valid) => {
	          	if (valid) {
	            	// alert('submit!');
	            	that.isOldRight()

	          	} else {
	            	// console.log('error submit!!');
	            	return false;
	          	}
	        });
        },
        isOldRight(){
        	// console.log(store.state.userInfo)
        	var that=this;
			var url=this.baseUrl+"/user/passwordCheck";
			this.axios({
				method: 'get',
				url: url,
				params: {
			      	// id: this.userInfo.id,
			      	id:this.cookieTool.get("userId"),
			      	password:this.form.oldpassword
			    }
			}).then(function(response) {
				console.log(response)
			  	var data=response.data
			  	if(data.code==200){
			  		
			  		that.changepassWord()
			  	}else{

			  		that.Toast(data.message);
			  	}

			})
        },
        changepassWord(){
        	var that=this;
			var url=this.baseUrl+"/user/userEdit";
			this.axios({
				method: 'get',
				url: url,
				params: {
			      	// id: this.userInfo.id,
			      	id:this.cookieTool.get("userId"),
			      	password:this.form.newpassword
			    }
			}).then(function(response) {
				console.log(response)
			  	var data=response.data
			  	if(data.code==200){
			  		that.Toast("修改成功");
			  		that.$router.go(-1)
			  		
			  	}else{
			  		that.Toast(data.message);
			  	}

			})
        },
	},
	mounted(){

	},
	created(){
		var that=this;



		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing

			}).catch(function(error){
				that.Toast(error);
			})
		}
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


	.changePW{
		text-align: left;
	}
	.changePWForm{
		width: 80%;
		margin: auto;
		margin-top: 20px;
	}
	.changePW .formitem{
		width: 100%;
	}
	.changePW .el-form-item__content{
		width: 100%;
		/*display: block;*/
	}
	.changePW .loginFormItem input{
		/*width: calc(100% - 70px);*/
		/*margin:0px auto;*/
		height: 48px;
		padding: 0px 40px;
	}
	.changePW .el-input__icon{
		line-height: 48px;
	}

	.changePW .loginFormItem i{
		color: #333333;
		font-size: 20px;
		width: 35px;
	}
	.changePW .loginPW{

	}
	.changePW .loginBtn{
		background-color: #2E67B2;
		border-color: #2E67B2;
		width: 80%;
	}
	.changePW .loginBtnWrap{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>