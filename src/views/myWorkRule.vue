<template>
	<div class="myWorkRule">
		<van-nav-bar title="岗位工作标准表"   left-arrow class="pageNavNative" @click-left="onClickLeft" ></van-nav-bar>

		<div class="specialRule">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="764bianjiqi_charubiaoge" size="14" />
				</div>
				<div class="specialRuleLabel">岗位工作标准表</div>
			</div>

			<div class="divier"></div>

			<div style="width: 100%;overflow: auto;">
				<div class="gwTable">
					<van-row>
					  	<van-col span="24" class="zxTableName">岗位工作标准表</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">姓名</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{ userName }}</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">岗位</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{ userJob }}</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">部门</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{ userDep }}</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">员工编号</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{ empno }}</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">直属上级</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{ gwObj.stationDepartDTO?gwObj.stationDepartDTO.leaderName:"" }}</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">上级联系电话</van-col>
					  	<van-col span="5" class="zxTableCellValue jbCenterCell">{{  }}</van-col>
					</van-row>
					<van-row style="display: flex;">
						<van-col span="16" class=" ">
							<van-row >
								<van-col span="24" class="zxTableCellLabel jbCenterCell">岗位核心职责</van-col>
							</van-row>

							<van-row style="display: flex;"  v-for="(item,index) in gwObj.stationStandardDeputyObj?gwObj.stationStandardDeputyObj['岗位核心职责']:[]">
								<van-col span="1" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
								<van-col span="23" class="zxTableCellValue ">{{ item.content }}</van-col>
							</van-row>
							
							
							<van-row >
								<van-col span="24" class="zxTableCellLabel jbCenterCell">工作指南/专项制度</van-col>
							</van-row>
							<van-row style="display: flex;">
								<van-col span="2" class="zxTableCellValue jbCenterCell">节点</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;">
										<van-col span="12" class="zxTableCellValue jbCenterCell">主要工作事项</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">时间</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">奖扣分类型</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">奖扣分数</van-col>
									</van-row>
								</van-col>								
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardGuidesObj&&gwObj.stationStandardGuidesObj['日/随时']">
								<van-col span="2" class="zxTableCellValue jbCenterCell">日/随时</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;" v-for=" item in gwObj.stationStandardGuidesObj['日/随时']">
										<van-col span="12" class="zxTableCellValue gwHeightCenterCell">{{ item.content }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.createTime }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.active=="加分"?"+"+item.score:"-"+item.score }}</van-col>
									</van-row>
								</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardGuidesObj&&gwObj.stationStandardGuidesObj['周']">
								<van-col span="2" class="zxTableCellValue jbCenterCell">周</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;" v-for=" item in gwObj.stationStandardGuidesObj['周']">
										<van-col span="12" class="zxTableCellValue gwHeightCenterCell">{{ item.content }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.createTime }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.active=="加分"?"+"+item.score:"-"+item.score }}</van-col>
									</van-row>
								</van-col>
								<!-- todo -->
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardGuidesObj&&gwObj.stationStandardGuidesObj['月']">
								<van-col span="2" class="zxTableCellValue jbCenterCell">月</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;" v-for=" item in gwObj.stationStandardGuidesObj['月']">
										<van-col span="12" class="zxTableCellValue gwHeightCenterCell">{{ item.content }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.createTime }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.active=="加分"?"+"+item.score:"-"+item.score }}</van-col>
									</van-row>
								</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardGuidesObj&&gwObj.stationStandardGuidesObj['季']">
								<van-col span="2" class="zxTableCellValue jbCenterCell">季</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;" v-for=" item in gwObj.stationStandardGuidesObj['季']">
										<van-col span="12" class="zxTableCellValue gwHeightCenterCell">{{ item.content }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.createTime }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.active=="加分"?"+"+item.score:"-"+item.score }}</van-col>
									</van-row>
								</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardGuidesObj&&gwObj.stationStandardGuidesObj['年']">
								<van-col span="2" class="zxTableCellValue jbCenterCell">年</van-col>
								<van-col span="22" class=" ">
									<van-row style="display: flex;" v-for=" item in gwObj.stationStandardGuidesObj['年']">
										<van-col span="12" class="zxTableCellValue gwHeightCenterCell">{{ item.content }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.createTime }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ item.active=="加分"?"+"+item.score:"-"+item.score }}</van-col>
									</van-row>
								</van-col>
							</van-row>
						</van-col>
						<van-col span="8" class=" ">
							<van-row style="display: flex;">
								<van-col span="12" class=" ">
									<van-row >
										<van-col span="24" class="zxTableCellLabel jbCenterCell">工作必备</van-col>
									</van-row>
									<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj?gwObj.stationStandardDeputyObj['工作必备']:[]">
										<van-col span="4" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
										<van-col span="20" class="zxTableCellValue ">{{ item.content }}</van-col>
									</van-row>
								</van-col>
								<van-col span="12" class=" ">
									<van-row >
										<van-col span="24" class="zxTableCellLabel jbCenterCell">工作必知</van-col>
									</van-row>
									<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj?gwObj.stationStandardDeputyObj['工作须知']:[]">
										<van-col span="4" class="zxTableCellValue jbCenterCell" style="box-shadow: inset 1px 0px rgba(0,0,0,0.1)">{{ index+1 }}</van-col>
										<van-col span="20" class="zxTableCellValue ">{{ item.content }}</van-col>
									</van-row>
								</van-col>
							</van-row>

							<van-row style="display: flex;">
								<van-col span="24" class="zxTableCellLabel jbCenterCell">关键绩效指标</van-col>
							</van-row>
							<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj?gwObj.stationStandardDeputyObj['关键绩效指标']:[]">
								<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
								<van-col span="22" class="zxTableCellValue ">{{ item.content }}</van-col>
							</van-row>

							<van-row style="display: flex;">
								<van-col span="24" class="zxTableCellLabel jbCenterCell">班前/班中/班后注意事项</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardDeputyObj&&gwObj.stationStandardDeputyObj['班前']">
								<van-col span="4" class="zxTableCellValue jbCenterCell" style="box-shadow: inset 1px 0px rgba(0,0,0,0.1)">班前必做</van-col>
								<van-col span="20" class=" ">
									<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj['班前']">
										<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
										<van-col span="22" class="zxTableCellValue ">{{ item.content }}</van-col>
									</van-row>
								</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardDeputyObj&&gwObj.stationStandardDeputyObj['班中']">
								<van-col span="4" class="zxTableCellValue jbCenterCell" style="box-shadow: inset 1px 0px rgba(0,0,0,0.1)">班中必查</van-col>
								<van-col span="20" class=" " style="box-shadow: inset 0px 1px rgba(0,0,0,0.1)">
									<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj['班中']">
										<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
										<van-col span="22" class="zxTableCellValue ">{{ item.content }}</van-col>
									</van-row>
								</van-col>
							</van-row>
							<van-row style="display: flex;" v-if="gwObj.stationStandardDeputyObj&&gwObj.stationStandardDeputyObj['班后']">
								<van-col span="4" class="zxTableCellValue jbCenterCell" style="box-shadow: inset 1px 0px rgba(0,0,0,0.1)">班后必报</van-col>
								<van-col span="20" class=" " style="box-shadow: inset 0px 1px rgba(0,0,0,0.1)">
									<van-row style="display: flex;" v-for="(item,index) in gwObj.stationStandardDeputyObj['班后']">
										<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
										<van-col span="22" class="zxTableCellValue ">{{ item.content }}</van-col>
									</van-row>
								</van-col>
							</van-row>
						</van-col>
					</van-row>
				</div>
			</div>

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
		return{
			gwObj:{},
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
        getGW(){
			// 获取岗位工作表
			var that=this;

			this.axios({
				method: 'get',
				url: this.baseUrl+"/stationStandard/list",
				params:{
					stationId:-1
				}
			}).then(function(response){
				console.log(response)
				if(response.data.result){
					that.gwObj=response.data.result
					// 处理数据
					// 处理工作指南数据
					that.gwObj.stationStandardGuidesObj={}
					for(var i=0;i<that.gwObj.stationStandardGuides.length;i++){
						if(that.gwObj.stationStandardGuidesObj[that.gwObj.stationStandardGuides[i].node]){
							that.gwObj.stationStandardGuidesObj[that.gwObj.stationStandardGuides[i].node].push(that.gwObj.stationStandardGuides[i])
						}else{
							that.gwObj.stationStandardGuidesObj[that.gwObj.stationStandardGuides[i].node]=[that.gwObj.stationStandardGuides[i]]
						}
					}
					// 处理表格的其他数据
					that.gwObj.stationStandardDeputyObj={
						// "岗位核心职责":[{"content":"dsad"}]
					}
					for(var i=0;i<that.gwObj.stationStandardDeputy.length;i++){
						if(that.gwObj.stationStandardDeputyObj[that.gwObj.stationStandardDeputy[i].type]){
							that.gwObj.stationStandardDeputyObj[that.gwObj.stationStandardDeputy[i].type].push(that.gwObj.stationStandardDeputy[i])
						}else{
							that.gwObj.stationStandardDeputyObj[that.gwObj.stationStandardDeputy[i].type]=[that.gwObj.stationStandardDeputy[i]]
						}
					}

				}
			})

		}
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

		this.getGW()
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


	.myWorkRule{
		text-align: left;
	}
	.myWorkRule .divier{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		margin-bottom: 10px;
	}

	.myWorkRule .specialRule{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-bottom: 20px;
	}
	.myWorkRule .specialRuleTitle{
		display: flex;
		align-items: center;
		
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.myWorkRule .specialRuleIconWrap{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #2E67B2;
		color:white;
		width: 28px;
		height: 28px;
	}
	.myWorkRule .specialRuleLabel{
		color: #2E67B2;
		margin-left: 10px;
		font-size: 16px;
	}

	.myWorkRule .jbTable{
		/*width: 600px;*/
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
	}
	.myWorkRule .jbTableName{
		text-align: center;
		color: white;
		background-color: rgb(46, 103, 178);
		padding: 10px;
	}
	.myWorkRule .jbTableRow{
		display: flex;
		height: 40px;
	}
	.myWorkRule .jbTableHeadCell{
		background-color: rgb(233,235,245);
		/*height: 100%;*/
		font-size: 12px;
		text-align: center;
	}
	.myWorkRule .jbTableLeftCell{
		background-color: rgb(233,235,245);
		font-size: 12px;
	}
	.myWorkRule .jbcell{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		padding: 5px;
		
	}
	.myWorkRule .jbCenterCell{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.myWorkRule .jbcellValue{
		font-size: 12px;
	}


	.myWorkRule .zxTable{
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
		width: 600px;
	}
	.myWorkRule .zxTableName{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		background-color: rgb(46, 103, 178);
		text-align: center;
		color: white;
		padding: 10px;
	}
	.myWorkRule .zxTableCellLabel{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		background-color: rgb(233,235,245);
		padding:5px;
	}
	.myWorkRule .zxTableCellValue{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		padding:5px;
	}

	.myWorkRule .gwTable{
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
		width: 800px;
	}
	.myWorkRule .gwHeightCenterCell{
		display: flex;
		align-items: center;
		
	}
</style>