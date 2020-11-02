<template>
	<div class="mine">
		<van-nav-bar title="我的"   class="pageNavNative"  />

		<van-tabs v-model="topTabActive" title-active-color="#2E67B2" title-inactive-color="#999999" color="#2E67B2"  line-width=80  @change="topTabChange" swipe-threshold=3>
		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="gerenxinxi1" size="22" />个人资料</div></template>
		  	</van-tab>
		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="guize" size="26" />守护者宣言</div></template>
		  	</van-tab>
		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="hetongguizeguankong" size="20" />基本制度</div></template>
		  	</van-tab>
		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="hetongguizeguankong2" size="20" />专项制度</div></template>
		  	</van-tab>

		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="waichu" size="22" />外出申请</div></template>
		  	</van-tab>

		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon class="iconfont" class-prefix='icon' name="764bianjiqi_charubiaoge" size="16" />岗位工作标准表</div></template>
		  	</van-tab>

		  	<van-tab title="">
		  		<template #title><div class="selfTab"><van-icon name="invition" size="22" />我的提案、建议</div></template>
		  	</van-tab>
		</van-tabs>

		<div class="userInfoWrap">
			<div class="userInfo" v-if="topTabActive==0">
				<div class="divider"></div>
				<div class="userScope">
					<van-image v-if="userPic!=''" width="90" height="90" class="userScopeLeft" :src="picurl+userPic" />
					<div v-else class="defaultPic" >
						<van-icon class="iconfont " class-prefix='icon' name="xiazai4" size="60"  />
					</div>

					<div class="userScopeRight">
						<div class="userName">{{ userName }}</div>
						<div class="userJob">{{ userJob }}</div>
					</div>
				</div>

				<div class="userInfoDetail">
					<van-icon class="iconfont userInfoDetailIcon" class-prefix='icon' name="gerenxinxi1" size="22" color="#2E67B2" />
					<div class="userInfoDetailTitle">任职信息</div>
				</div>
				<div class="divider"></div>

				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>身份证号码：</div>
						<div>{{ userId }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>性别：</div>
						<div>{{ gender }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 50px;">
						<div>年龄：</div>
						<div>{{ age }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 45px;">
						<div>工号：</div>
						<div>{{ empno }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>职务级别：</div>
						<div>{{ jobLevel }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>工作地点：</div>
						<div>{{ place }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>入职时间：</div>
						<div>{{ entryDate }}</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>试用期：</div>
						<div>{{ probation }}</div>
					</div>
				</div>
				<div class="userInfoDetailRow">
					<div class="userInfoDetailRowLeft userInfoDetailRowItem">
						<div>工龄：</div>
						<div>{{ seniority }}年</div>
					</div>
					<div class="userInfoDetailRowItem">
						<div>合同签订日期：</div>
						<div>{{ contractAwardDate }}</div>
					</div>
					<div class="userInfoDetailRowItem" style="margin-left: 45px;">
						<div>合同有效期：</div>
						<div>{{ contractvalidityDate }}</div>
					</div>
				</div>



				<div class="divider" style="margin-bottom: 40px;margin-top: 30px;"></div>
			</div>
		</div>
		
		<div class="manifesto" v-if="topTabActive==1">
			<!-- <van-image width="100%"  :src="jbPic" /> -->

			<div v-html="SHZPic"></div>
		</div>

		<div class="basicRule specialRule" v-if="topTabActive==2">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="qunfengshiyongguize" size="16" :style="{'margin-left':'-6px'}" />
				</div>
				<div class="specialRuleLabel">基本制度表</div>
			</div>
			<!-- <div class="tip">如图：</div>
			<van-image width="100%"  :src="jbPic" /> -->

			<!-- <div v-html="jbPic"></div> -->
			<div class="jbTable">
				<van-row>
				  	<van-col span="24" class="jbTableName jbcell">基本制度表</van-col>
				</van-row>
				<van-row class="jbTableRow">
				  	<van-col class="jbTableHeadCell jbcell" span="3">制度类型</van-col>

				  	<van-col span="21">
				  		<van-row style="height: 100%;display: flex;">
					  		<van-col class="jbTableHeadCell jbcell jbCenterCell" span="3">序号</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="13">基本制度内容</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="4">奖扣分数类型</van-col>
						  	<van-col class="jbTableHeadCell jbcell jbCenterCell" span="4">奖扣分数</van-col>
						</van-row>
				  	</van-col>

				</van-row>
				<van-row v-for="item in jbTableData" style="display: flex;" >
					<van-col class="jbTableLeftCell jbcell jbCenterCell" span="3">{{ item.name }}</van-col>
					<!-- <van-col span="2">
						<div v-for="(unit,index) in item.children">
							{{ index+1 }}
						</div>
					</van-col>
				  	<van-col span="13">
				  		<div v-for="(unit,index) in item.children">
							{{ unit.scoringItems }}
						</div>
				  	</van-col>
				  	<van-col span="3">
				  		<div v-for="(unit,index) in item.children">
							{{ unit.categoryAB }}
						</div>
				  	</van-col>
				  	<van-col span="3">
				  		<div v-for="(unit,index) in item.children">
							{{ unit.active=="减分"?"-"+unit.num:"+"+unit.num }}
						</div>
				  	</van-col> -->
				  	<van-col  span="21">
				  		<van-row  v-for="(unit,index) in item.children" style="display: flex;">
					  		<van-col class="jbcell jbCenterCell jbcellValue" span="3">{{ index+1 }}</van-col>
						  	<van-col class="jbcell jbcellValue" span="13">{{ unit.scoringItems }}</van-col>
						  	<van-col class="jbcell jbCenterCell jbcellValue" span="4">{{ unit.categoryAB }}</van-col>
						  	<van-col class="jbcell jbCenterCell jbcellValue" span="4">{{ unit.active=="减分"?"-"+unit.num:"+"+unit.num }}</van-col>
						</van-row>
				  	</van-col>
				</van-row>

			</div>
		</div>

		<div v-if="topTabActive==3" class="specialRule">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="chanpintiaokuan" size="18" />
				</div>
				<div class="specialRuleLabel">专项制度表</div>
			</div>
			<!-- <div class="tip">如图：</div> -->
			<!-- <van-image width="100%"  :src="zxPic" /> -->

			<!-- <div v-html="zxPic"></div> -->
			<div style="width: 100%;overflow: auto;">
				<div class="zxTable">
					<van-row>
					  	<van-col span="24" class="zxTableName">部门专项制度表</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">部门</van-col>
					  	<van-col span="8" class="zxTableCellValue jbCenterCell">{{ zxObj.depName }}</van-col>
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">部门负责人</van-col>
					  	<van-col span="8" class="zxTableCellValue jbCenterCell">{{ zxObj.depLeaderName }}</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">相关岗位</van-col>
					  	<van-col span="20" class="zxTableCellValue ">{{ zxObj.stationName?zxObj.stationName.join(","):"" }}</van-col>
					</van-row>
					<van-row style="display: flex;">
					  	<van-col span="2" class="zxTableCellLabel jbCenterCell">序号</van-col>
					  	<van-col span="9" class="zxTableCellLabel jbCenterCell">制度内容</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">责任人</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">奖扣分类型</van-col>
					  	<van-col span="3" class="zxTableCellLabel jbCenterCell">奖扣分数</van-col>
					  	<van-col span="4" class="zxTableCellLabel jbCenterCell">备注</van-col>
					</van-row>
					<van-row v-for="(item,index) in zxObj.departSepicalSystemList" style="display: flex;">
						<van-col span="2" class="zxTableCellValue jbCenterCell">{{ index+1 }}</van-col>
					  	<van-col span="9" class="zxTableCellValue ">{{ item.content }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.dutyPerson }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.scoreType }}</van-col>
					  	<van-col span="3" class="zxTableCellValue jbCenterCell">{{ item.active=='加分'?'+'+item.score:'-'+item.score }}</van-col>
					  	<van-col span="4" class="zxTableCellValue ">{{ item.note }}</van-col>
					</van-row>
				</div>
			</div>
		</div>

		<div v-if="topTabActive==4" class="applyForOutItem">
			<div class="applyForOut">
				<div class="applyForOutTable">
					<el-row class="applyForOutHeadRow">
					  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工外出申请表</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="userName" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="depName" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">岗位职务</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="userJob" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">外出时间</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="form.outTime" class="value" placeholder="请输入日期"></el-input>
					  		<!-- <el-date-picker
						      v-model="form.outTime"
						      type="date"
						      placeholder="选择日期" class="value">
						    </el-date-picker> -->

					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">外出地点</el-col>
					  	<el-col :span="4" class="applyForOutCell">
					  		<el-input v-model="form.outAddress" class="value" placeholder="请输入内容"></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批状态</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					</el-row>

					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">外出事由描述</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="form.outDescribe" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">外出期间工作安排</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="form.workScheduling" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row>

					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">审批人</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批意见</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">审批时间</el-col>
					  	<el-col :span="4" class="applyForOutCell"></el-col>
					</el-row>
				</div>

			</div>
			
			
			<el-button type="primary" class="submitBtn" @click="submit">提交</el-button>

			<div class="seeHistory" @click="seeHistory">申请记录</div>
		</div>

		<div v-if="topTabActive==5" class="specialRule">
			<div class="specialRuleTitle">
				<div class="specialRuleIconWrap">
					<van-icon class="iconfont" class-prefix='icon' name="764bianjiqi_charubiaoge" size="14" />
				</div>
				<div class="specialRuleLabel">岗位工作标准表</div>
			</div>
			<!-- <div class="tip">如图：</div> -->
			<!-- <van-image width="100%"  :src="gwPic" /> -->

			<!-- <div v-html="gwPic"></div> -->

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

		<div v-if="topTabActive==6" class="myAdvice applyForOutItem">
			<div class="applyForOut">
				<div class="applyForOutTable">
					<el-row class="applyForOutHeadRow">
					  	<el-col :span="24" class="applyForOutCell applyForOutCellHead">员工提案、建议表</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">姓名</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input v-model="userName" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	
					  	<el-col :span="4" class="applyForOutCell label">任职岗位</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input v-model="userJob" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">部门</el-col>
					  	<el-col :span="8" class="applyForOutCell">
					  		<el-input v-model="depName" class="value" placeholder="无法获取" disabled ></el-input>
					  	</el-col>
					  	<el-col :span="4" class="applyForOutCell label">上级主管</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					</el-row>

					<el-row class="applyForOutBodyRow applyForOutBodyRowHigh">
					  	<el-col :span="4" class="applyForOutCell label">提议具体内容</el-col>
					  	<el-col :span="20" class="applyForOutCell">
					  		<el-input v-model="adviceForm.content" class="value" type="textarea" placeholder="请输入内容"></el-input>
					  	</el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
					  	<el-col :span="4" class="applyForOutCell label">上级主管审批</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					</el-row>
					<el-row class="applyForOutBodyRow">
						<el-col :span="4" class="applyForOutCell label">相关部门评估结果</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					  	<el-col :span="4" class="applyForOutCell label">时间</el-col>
					  	<el-col :span="8" class="applyForOutCell"></el-col>
					</el-row>
				</div>

			</div>
			<el-button type="primary" class="submitBtn" @click="submitAdvice">提交</el-button>
			<div class="seeHistory" @click="seeHistoryAdvice">我的提案、建议表</div>

		</div>

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

		
		<van-overlay :show="showloading" >
			<div style="display: flex;justify-content: center;align-items: center;height: 100%;">
				<van-loading size="24px">加载中...</van-loading>
			</div>
			
		</van-overlay>

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
			active: 3,

			topTabActive:0,

			// userName:"",//员工名称
			// userJob:"",//员工岗位
			// userPic:"",//员工照片
			// userId:"",
			// gender:"",//员工性别
			// age:"",//员工年龄
			// empno:"",//员工编号
			// jobLevel:"",//员工职位等级
			// place:"",//员工工作地点
			// entryDate:"",//员工入职时间
			// probation:"",//员工试用期
			// seniority:"",//员工工龄年
			// contractAwardDate:"",//员工合同签订日期
			// contractvalidityDate:"",//员工合同有效期
			// depName:"",//员工部门



			// userName:"姓名",
			// userJob:"人力资源部/招聘经理",
			// userPic:"https://img.yzcdn.cn/vant/cat.jpeg",
			// userId:"330327199905018411",
			// gender:"男",
			// age:"41",
			// empno:"WZ-123456",
			// jobLevel:"经理级",
			// place:"浙江省   温州市   龙湾区",
			// entryDate:"2020-8-10",
			// probation:"2020-8-10至2020-8-10",
			// seniority:"5年",
			// contractAwardDate:"2020-8-10",
			// contractvalidityDate:"2020-8-10",

			// jbPic:require("@/assets/img/jb.png"),
			// zxPic:require("@/assets/img/zx.png"),
			// gwPic:require("@/assets/img/gw.png"),
			SHZPic:"",
			jbPic:"",

			jbTableData:[],

			zxPic:"",
			zxObj:{},

			gwPic:"",
			gwObj:{},

			// 个人外出申请
			form:{
				// name:"",
				// dep:"",
				// job:"",


				outTime:"",
				outAddress:"",
				outDescribe:"",
				workScheduling:"",

				// "approvalOpinion": "string",
				// "approvalPerson": "string",
				// "approvalStatus": "string",
				// "approvalTime": "string",
				// "empId": 0,
				empId: this.cookieTool.get('userId'),
			},

			// 我的提议建议
			adviceForm:{
				content:""
			},

			showloading:false

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

		topTabChange(index){
			// console.log(index)

			switch(index){
				case 1:
					this.getSHZ()
					break;
				case 2:
					this.getJB()
					break;
				case 3:
					this.getZX()
					break;
				case 5:
					this.getGW()
					break;
			}
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

		submit(){
			if(this.form.outTime==""){
				this.Toast("请输入外出时间")
				return
			}
			if(this.form.outAddress==""){
				this.Toast("请输入外出地点")
				return
			}
			if(this.form.outDescribe==""){
				this.Toast("请输入外出事由")
				return
			}
			if(this.form.workScheduling==""){
				this.Toast("请输入外出工作安排")
				return
			}

			// 提交表单
			var that=this;

			this.showloading=true;

			// that.form.outTime=that.form.outTime.Format("yyyy-MM-dd hh:mm:ss")
			var url=this.baseUrl+"/outApply/add";
			this.axios({
				method: 'post',
				url: url,
				// data:{
				// 	outApply:JSON.stringify(that.form)
				// },
				data:that.form
			}).then(function(response){

				that.showloading=false;
				
				if(response.data.code==200){
					// that.Dialog("提交申请成功")

					// setTimeout(function(){
					// 	that.$router.push("/applyHistory");
					// },1500)

					that.Dialog.alert({
					  message: '提交申请成功！',
					}).then(() => {
					  // on close
					  that.$router.push("/applyHistory");
					});
				}
				
				
			})

		},
		submitAdvice(){
			// console.log(store.state.userInfo.id)
			// console.log(this.userId)
			// console.log(this.empno)
			if(this.adviceForm.content==""){
				this.Toast("请输入提议具体内容")
				return
			}

			var that=this;
			this.showloading=true;
			var url=this.baseUrl+"/proposal/add";
			that.adviceForm.empId=store.state.userInfo.id

			this.axios({
				method: 'post',
				url: url,
				data:that.adviceForm
			}).then(function(response){
				console.log(response)
				that.showloading=false;
				if(response.data.code==200){
					that.Dialog.alert({
					  message: '提案、建议提交成功！',
					}).then(() => {
					  // on close
					  that.$router.push("/adviceHistory");
					});
				}
				// that.$router.push("/applyHistory");
			})
		},
		seeHistoryAdvice(){
			// 查看历史提交
			this.$router.push("/adviceHistory")
		},

		seeHistory(){
			// 查看历史表单
			this.$router.push("/applyHistory")
		},

		getSHZ(){
			// 获取守护者 
			var that=this;
			this.axios({
				method: 'get',
				url: this.baseUrl+"/notice/queryEmpId",
				params:{
					type:1
				},
			}).then(function(response){
				// console.log(response)
				that.SHZPic=response.data.result[0].content
			})
		},
		getJB(){
			// 获取基本制度
			var that=this;

			

			// this.axios({
			// 	method: 'get',
			// 	url: this.baseUrl+"/notice/queryEmpId",
			// 	params:{
			// 		type:2
			// 	},
			// }).then(function(response){
			// 	// console.log(response)
			// 	that.jbPic=response.data.result[0].content
			// })

			this.axios({
				method: 'get',
				url: this.baseUrl+"/com/scoreCalculation/list",
				params:{
					pageNo:1,
					pageSize:9999
				},
			}).then(function(res){
				console.log(res)
				if(res.data.code==200){
					// that.jbTableData=res.data.result.records
					var ar=[]
					for(var i=0;i<res.data.result.records.length;i++){
						var find=ar.find(function(o){
							return o.pointsTypeId==res.data.result.records[i].pointsTypeId
						})
						if(find){
							find.children.push(res.data.result.records[i])
						}else{
							ar.push({
								children:[],
								pointsTypeId:res.data.result.records[i].pointsTypeId,
								name:res.data.result.records[i].name
							})
						}
					}
					that.jbTableData=ar
					console.log(ar)
				}
			})

		},
		getZX(){
			// 获取部门专项制度
			var that=this;
			// this.axios({
			// 	method: 'get',
			// 	url: this.baseUrl+"/notice/queryEmpId",
			// 	params:{
			// 		type:3
			// 	},
			// }).then(function(response){
			// 	// console.log(response)
			// 	that.zxPic=response.data.result[0].content
			// })

			this.axios({
				method: 'get',
				url: this.baseUrl+"/departSepicalSystem/list",

			}).then(function(response){
				console.log(response)
				// that.zxPic=response.data.result[0].content
				that.zxObj=response.data.result
			})

			
		},
		getGW(){
			// 获取岗位工作表
			var that=this;
			// this.axios({
			// 	method: 'get',
			// 	url: this.baseUrl+"/notice/queryEmpId",
			// 	params:{
			// 		type:4
			// 	},
			// }).then(function(response){
			// 	// console.log(response)
			// 	that.gwPic=response.data.result[0].content
			// })
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
		// var url=this.baseUrl+"/com/emplyee/queryByUserId";
		// this.axios({
		// 	method: 'get',
		// 	url: url,
		// 	// params: {
		//  //      id: 2,
		//  //    }
		// }).then(function(response) {
		//   	var data=response.data
		//   	if(data.code==200){
		//   		that.userName=data.result.name
		//   		that.userJob=data.result.stationName
		//   		that.userPic=data.result.photo||that.userPic;
		//   		that.userId=data.result.idNumber
		//   		that.gender=data.result.sex
		// 		that.age=data.result.age
		// 		that.empno=data.result.number
		// 		that.jobLevel=data.result.stationLevel
		// 		that.place=data.result.workAddress
		// 		that.entryDate=data.result.createTime
		// 		that.probation=data.result.probationPeriod
		// 		that.seniority=data.result.workYears
		// 		that.contractAwardDate=data.result.lastSigningTime
		// 		that.contractvalidityDate=data.result.contractEndDate

		// 		// 外出申请表单
		// 		that.depName=data.result.depName


		//   	}else{
		//   		// that.Toast('网络错误');
		  		
		//   	}
		// })
		
		if(JSON.stringify(store.state.userInfo)=="{}"){

			store.dispatch('getUserInfo').then(function(msg){
				// nothing

			}).catch(function(error){
				that.Toast(error);
			})
		}



		this.getSHZ()

		// 获取守护者宣言，基本制度，专项制度

		// var url1=this.baseUrl+"/file/queryFile";
		// this.axios({
		// 	method: 'get',
		// 	url: url1,
		// }).then(function(response){
		// 	// console.log(response)
		// 	// 获取守护者宣言，基本制度，专项制度
		// 	var data=response.data;
		// 	if(data.code==200){
		// 		// data.result
		// 		// data.result.basicSystem
		// 		// data.result.guardianDeclaration
		// 		// data.result.specilSystem
		// 		// data.result.visualBoard
		// 	}else{
		// 		// that.Toast('网络错误');
		// 	}

		// })

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


	.mine{
		text-align: left;
	}

	.mine .defaultPic{
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		box-shadow: 0px 0px 6px rgba(0,0,0,0.16);
		height: 90px;
		width: 90px;
	}

	.mine .selfTab{
		display: flex;
		align-items: center;
	}
	.mine .selfTab .iconfont{
		margin-right: 2px;
	}

	.mine .specialRule{
		width: calc(100% - 30px);
		margin:0px auto;
	}
	.mine .specialRuleTitle{
		display: flex;
		align-items: center;
		
		padding: 10px 0px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.mine .specialRuleIconWrap{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #2E67B2;
		color:white;
		width: 28px;
		height: 28px;
	}
	.mine .specialRuleLabel{
		color: #2E67B2;
		margin-left: 10px;
		font-size: 16px;
	}
	.mine .tip{
		margin:12px 0px;
		color: #999999;
		font-size: 12px;
	}

	.mine .manifesto{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;
	}


	.userInfoWrap{
		width: calc(100% - 30px);
		margin:0px auto;
		margin-top: 10px;
		overflow: auto;
	}
	.mine .userInfo{
		width: fit-content;
		color: #333333;
	}
	.mine .divider{
		border: 1px solid #2E67B2;
	}

	.mine .userScope{
		display: flex;
		margin-top: 15px;
		margin-bottom: 35px;
	}
	.mine .userScopeLeft{
		box-shadow: 0px 0px 6px rgba(0,0,0,0.36);
	}
	.mine .userScopeRight{
		margin-left: 30px;
	}
	.mine .userName{
		font-size: 17px;
		font-weight: bold;
	}
	.mine .userJob{
		font-size: 17px;
		margin-top: 30px;
		font-weight: bold;
	}

	.mine .userInfoDetail{
		display: flex;
		margin-bottom: 15px;
	}
	.mine .userInfoDetailTitle{
		color: #2E67B2;
		font-size: 17px;
		margin-left: 5px;
	}


	.mine .userInfoDetailRow{
		font-size: 15px;
		color: #333333;
		margin-top: 30px;

		display: flex;
    	flex-wrap: nowrap;
    	white-space: nowrap;
	}
	.mine .userInfoDetailRowItem{
		display: flex;
		align-items: center;
	}
	.mine .userInfoDetailRowLeft{
		flex-basis: 270px;
		min-width: 270px;
	}



	.mine .applyForOutItem{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mine .applyForOut{
		width: 100%;
		overflow-x: auto;
	}
	.mine .applyForOutTable{
		width: 700px;
		border-left: 1px solid #707070;
		border-top: 1px solid #707070;
		margin:10px;
		font-size: 11px;
	}
	.mine .myAdvice .applyForOutTable{
		width: 400px;
	}


	.mine .applyForOutCell{
		border-bottom: 1px solid #707070;
		border-right: 1px solid #707070;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		text-align: center;
		
	}
	.mine .applyForOutBodyRow{
		height: 40px;

	}
	.mine .applyForOutBodyRowHigh{
		height: 80px;
	}

	.mine .applyForOutCellHead{
		color: white;
		background: #2E67B2;
		font-size: 15px;
	}

	.mine .applyForOutCell.label{

		background: #DDE9F8;
	}
	.mine .applyForOutCell .value{
		margin-left: -10px;
		margin-right: -10px;
		width: calc(100% + 20px);
		height: calc(100% + 20px);
		font-size: 12px;

	}
	.mine .applyForOutCell .value input,.mine .applyForOutCell .value textarea{
		border-color: rgba(0,0,0,0.2);
		height: 100%;
	}


	.mine .submitBtn{
		background-color: #2E67B2;
		width: 200px;
		margin:10px 0px;

	}

	.seeHistory{
		border-bottom: 1px solid #333333;
		padding-bottom: 5px;
		color: #333333;
		font-size: 14px;
		margin-bottom: 50px;
	}

	.mine .el-input--suffix .el-input__inner{
		padding-right: 10px;
	}


	/*基本制度表*/
	.mine .jbTable{
		/*width: 600px;*/
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
	}
	.mine .jbTableName{
		text-align: center;
		color: white;
		background-color: rgb(46, 103, 178);
		padding: 10px;
	}
	.mine .jbTableRow{
		display: flex;
		height: 40px;
	}
	.mine .jbTableHeadCell{
		background-color: rgb(233,235,245);
		/*height: 100%;*/
		font-size: 12px;
		text-align: center;
	}
	.mine .jbTableLeftCell{
		background-color: rgb(233,235,245);
		font-size: 12px;
	}
	.mine .jbcell{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		padding: 5px;
		
	}
	.mine .jbCenterCell{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mine .jbcellValue{
		font-size: 12px;
	}


	/*专项制度表*/
	.mine .zxTable{
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
		width: 600px;
	}
	.mine .zxTableName{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		background-color: rgb(46, 103, 178);
		text-align: center;
		color: white;
		padding: 10px;
	}
	.mine .zxTableCellLabel{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		background-color: rgb(233,235,245);
		padding:5px;
	}
	.mine .zxTableCellValue{
		border-bottom: 1px solid rgba(0,0,0,0.1);
		border-right: 1px solid rgba(0,0,0,0.1);
		font-size: 12px;
		padding:5px;
	}

	/*岗位工作标准表*/
	.mine .gwTable{
		border-top: 1px solid rgba(0,0,0,0.1);
		border-left: 1px solid rgba(0,0,0,0.1);
		width: 800px;
	}
	.mine .gwHeightCenterCell{
		display: flex;
		align-items: center;
		
	}
</style>