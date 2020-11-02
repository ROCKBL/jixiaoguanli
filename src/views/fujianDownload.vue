<template>
	<div class="fujianDownload">
		<van-nav-bar title="附件下载"   class="pageNavNative" left-arrow @click-left="onClickLeft"  />

		<div class="itemRow" v-for="item in list" v-if="item.file">
			<div class="itemRowLeft" >
				<van-icon class="iconfont" class-prefix='icon' name="wenjian" size="44" />
			</div>
			<!-- <div class="itemRowLabel">附件申请下载</div> -->
			<!-- <van-icon class="itemRowRight" name="arrow" /> -->

			<div class="itemRowMid">
				<div class="itemRowMidName">{{ item.fileName }}</div>
				<div class="itemRowMidType">{{ item.file.type }}</div>
			</div>

			<div class="itemRowRight">
				<div class="itemRowRightDate">{{ item.createTime }}</div>
				<el-button type="primary" class="itemRowRightBtn" size="small" @click="downloadfile(item)" v-if="item.status=='审核通过'">下载</el-button>

				<!-- <el-button type="primary" class="itemRowRightBtn" size="small" @click="downloadfile(item)">下载</el-button> -->

				<div class="itemRowRightText" style="color: #1C8B07" v-if="item.status=='审核中'">{{ item.status }}</div>

				<div class="itemRowRightText" style="color: #FF0000" v-if="item.status=='审核拒绝'">审核拒绝</div>
			</div>
		</div>

		<van-empty v-if="list.length==0" description="没有相关信息" />

		<div ref="ablock"></div>

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
				// {name:"文件的名称",type:"文件类型",url:"url",date:"2020-8-20"},
				// {name:"文件的名称1",type:"文件类型",url:"url1",date:"2020-8-20"},
				// {name:"文件的名称2",type:"文件类型",url:"url2",date:"2020-8-20"},
			]
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
        
		downloadfile(apply){

			// var str="/20200908/9c08cee0b4ac7b264d53b1868f91036.png";
			// var url=this.baseUrl+"/file/down?path="+apply.file.path;
			// var url=this.baseUrl+"/file/down?path="+str;

			// window.location.href=

			console.log(apply)

			window.location.href=this.picurl+apply.file.path
			return
			
			var url=this.baseUrl+"/file/down";
			var that=this;

			this.axios({
				method: 'post',
				url: url,
				responseType: 'blob',
				params:{
					path:apply.file.path
				}
			}).then(function(response){

				// var blob = response.data;
				// var reader = new FileReader();
				// reader.readAsDataURL(blob);
				// reader.onload=function(e){
				// 	var a = document.createElement('a');
 			// 		a.download = 'data.csv';
				// 	a.href = e.target.result;
 					
 			// 		that.$ref.ablock.appendChild(a)
 			// 		a.click();
 			// 		that.$ref.ablock.innerHTML = '';
               
				// }

				console.log(response)
				if(response.data.code==500){
					that.Toast("下载失败")
					return
				}

				var ar=apply.file.path.split(".")

				let blob = new Blob([response.data]);

				// console.log(response)
				if (window.navigator.msSaveOrOpenBlob) {
		          //兼容ie
		          window.navigator.msSaveBlob(blob, apply.fileName+"."+ar[1]);
		        } else {
		          let downloadElement = document.createElement("a");
		          let href = window.URL.createObjectURL(blob); //创建下载的链接
		          downloadElement.href = href;
		          downloadElement.download = apply.fileName+"."+ar[1]; //下载后文件名
		          document.body.appendChild(downloadElement);
		          //此写法兼容火狐
		          let evt = document.createEvent("MouseEvents");
		          evt.initEvent("click", false, false);
		          downloadElement.dispatchEvent(evt);
		          document.body.removeChild(downloadElement);
		          window.URL.revokeObjectURL(href); //释放掉blob对象
		        }

			})

		},
		dateToStr(num){
			var rtn="";

			if(num<10){
				rtn+="0"+num
				return rtn
			}else{
				rtn+=num
				return rtn
			}
		},
		formatDate(dateAr){
			var rtn=""
			rtn+=dateAr[0];

			rtn+="-"+this.dateToStr(dateAr[1])
			rtn+="-"+this.dateToStr(dateAr[2])+" "

			rtn+=this.dateToStr(dateAr[3])+":"
			rtn+=this.dateToStr(dateAr[4])+":"
			rtn+=this.dateToStr(dateAr[5])

			return rtn
		}
	},
	mounted(){

	},
	created(){
		var url=this.baseUrl+"/apply/queryById";

		
		var that=this;
		this.axios({
			method: 'get',
			url: url,
		}).then(function(response){

			console.log(response)

			that.list=response.data.result
			// that.list=response.data.result

		})
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


	.fujianDownload{
		text-align: left;
	}

	.fujianDownload .itemRow{
		display: flex;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.fujianDownload .itemRowLeft{
		height: 41px;
		width: 41px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: #2E67B2;
	}
	.fujianDownload .itemRowMid{
		margin-left: 10px;
		color: #333333;
		font-size: 17px;
	}
	.fujianDownload .itemRowRight{
		margin-left: auto;
		color: #999999;
		font-size: 24px;
		display: flex;
		flex-direction: column;
	}

	.fujianDownload .itemRowRightDate{
		font-size: 12px;
		color: #999999;
		margin-left: auto;
	}

	.fujianDownload .itemRowRightBtn{
		background-color:#2E67B2;
		border-color:#2E67B2;
		font-size: 14px;
		padding:6px 15px;
		margin-top: 10px;
	}

	.fujianDownload .itemRowMidName{
		font-size: 15px;
		color: #333333;
	}
	.fujianDownload .itemRowMidType{
		font-size: 12px;
		color: #999999;
		margin-top: 10px;
	}

	.fujianDownload .itemRowRightText{
		font-size: 14px;
		margin-top: 10px;
		text-align: right;
	}
</style>