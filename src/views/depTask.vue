<template>
  <div class="app-container">
    <van-nav-bar title="部门级" left-arrow class="pageNavNative" @click-left="onClickLeft" />
    <el-card class="box-card">
      <div class="legend" v-if="treeType=='可量化'">
        <p>基准指标"☆"代表</p>
        <p>挑战指标"★"代表</p>
      </div>
      <tree :json="treeData" id="6" class="treeBlock" :treeType="treeType"></tree>
    </el-card>
  </div>
</template>

<script>
import tree from "@/components/tree";

export default {
  name: "targetTaskTest",
  components: {
    tree,
  },
  data() {
    return {
      treeData: {
        name: "部门年度计划",
        id: 1,
        childers: [],
      },

      obj:null,
      treeType:null,
    };
  },
  created() {

    // var obj=JSON.parse(this.$router.currentRoute.query.obj);
    // this.obj=obj;
    // this.treeType=obj.type;
    // console.log(obj)

    // if(obj.type=="可量化"){
    //   this.fetchData();
    // }else{
    //   this.getTreeData();
    // }


    var that=this;
    var obj=JSON.parse(this.$router.currentRoute.query.obj);
    // this.obj=obj;
    // this.treeType=obj.type;
    // console.log(obj)

    var url=this.baseUrl+"/task/getTaskDetail";
      this.axios({
      method: 'get',
      url: url,
      params:{
        id:obj.aid
      }

    }).then(function(response) {
        var data=response.data
        // console.log(obj.id)
        // console.log(response)
        console.log(data.result.bodyList)
        if(data.code==200){
          for(var i=0;i<data.result.bodyList.length;i++){

            // console.log(data.result.bodyList[i].id)
            // console.log(obj.id)
            if(data.result.bodyList[i].id==obj.id){
              that.treeType=data.result.bodyList[i].type
              that.obj=data.result.bodyList[i]

            }

            // console.log(that.obj)
            // console.log("aaa")

            
          }
          // that.list=data.result
    
          if(obj.type=="可量化"){
            that.fetchData();
          }else{
            that.getTreeData();
          }

          
        }else{
          that.Toast('网络错误');
        }
    })






  },
  methods: {
    onClickLeft(){
        this.$router.go(-1)
    },

    computeData(){
      var rtn={
        "年":null,
        "第1季度":0,
        "第2季度":0,
        "第3季度":0,
        "第4季度":0,
        // "1月":0,
        // "2月":0,
        // "3月":0,
        // "4月":0,
        // "5月":0,
        // "6月":0,
        // "7月":0,
        // "8月":0,
        // "9月":0,
        // "10月":0,
        // "11月":0,
        // "12月":0,
      }
      for(var attr in rtn){
        rtn[attr]={
          plan:0,
          suportTarget:0,

          compareBaseTarget:0,
          complete:0,
        }
      }

      for(var i=1;i<13;i++){
        rtn[i+"月"]={
          plan:0,
          suportTarget:0,

          compareBaseTarget:0,
          complete:0,
        }
        for(var j=1;j<5;j++){
          rtn[i+"月"+"第"+j+"周"]={
            plan:0,
            suportTarget:0,

            compareBaseTarget:0,
            complete:0,
          }
        }
      }

      

      for(var i=0;i<this.obj.resultList.length;i++){
        
        var plan=isNaN(Number(this.obj.resultList[i].plan))?0:Number(this.obj.resultList[i].plan);
        var suportTarget=isNaN(Number(this.obj.resultList[i].suportTarget))?0:Number(this.obj.resultList[i].suportTarget);

        var compareBaseTarget=isNaN(Number(this.obj.resultList[i].compareBaseTarget))?0:Number(this.obj.resultList[i].compareBaseTarget);
        var complete=isNaN(Number(this.obj.resultList[i].complete))?0:Number(this.obj.resultList[i].complete);
        // 周赋值
        rtn[this.obj.resultList[i].tmonth+"月"+this.obj.resultList[i].cycle].plan=plan;
        rtn[this.obj.resultList[i].tmonth+"月"+this.obj.resultList[i].cycle].suportTarget=suportTarget;

        rtn[this.obj.resultList[i].tmonth+"月"+this.obj.resultList[i].cycle].compareBaseTarget=compareBaseTarget;
        rtn[this.obj.resultList[i].tmonth+"月"+this.obj.resultList[i].cycle].complete=complete;

        // 月赋值
        rtn[this.obj.resultList[i].tmonth+"月"].plan+=plan;
        rtn[this.obj.resultList[i].tmonth+"月"].suportTarget+=suportTarget;

        rtn[this.obj.resultList[i].tmonth+"月"].compareBaseTarget+=compareBaseTarget;
        rtn[this.obj.resultList[i].tmonth+"月"].complete+=complete;

        // 年
        rtn["年"].plan+=plan
        rtn["年"].suportTarget+=suportTarget

        rtn["年"].compareBaseTarget+=compareBaseTarget
        rtn["年"].complete+=complete
        // 季
        switch(this.obj.resultList[i].tmonth){
          case 1:
          case 2:
          case 3:
            rtn["第1季度"].plan+=plan;
            rtn["第1季度"].suportTarget+=suportTarget;

            rtn["第1季度"].compareBaseTarget+=compareBaseTarget;
            rtn["第1季度"].complete+=complete;
            break;

          case 4:
          case 5:
          case 6:
            rtn["第2季度"].plan+=plan;
            rtn["第2季度"].suportTarget+=suportTarget;

            rtn["第2季度"].compareBaseTarget+=compareBaseTarget;
            rtn["第2季度"].complete+=complete;
            break;

          case 7:
          case 8:
          case 9:
            rtn["第3季度"].plan+=plan;
            rtn["第3季度"].suportTarget+=suportTarget;

            rtn["第3季度"].compareBaseTarget+=compareBaseTarget;
            rtn["第3季度"].complete+=complete;
            break;

          case 10:
          case 11:
          case 12:
            rtn["第4季度"].plan+=plan;
            rtn["第4季度"].suportTarget+=suportTarget;

            rtn["第4季度"].compareBaseTarget+=compareBaseTarget;
            rtn["第4季度"].complete+=complete;
            break;

        }

      }

      return rtn

    },
    computeUnData(){
      var rtn={
        "第1阶段":null,
        "第2阶段":null,
        "第3阶段":null,
        "第4阶段":null,
      }
      for(var attr in rtn){
        rtn[attr]={
          plan:null,
          complete:null
        }
      }

      for(var i=0;i<this.obj.resultList.length;i++){
        switch(this.obj.resultList[i].cycle){
          case "第一阶段":
            rtn['第1阶段'].plan=this.obj.resultList[i].plan
            rtn['第1阶段'].complete=this.obj.resultList[i].complete
            break;
          case "第二阶段":
            rtn['第2阶段'].plan=this.obj.resultList[i].plan
            rtn['第2阶段'].complete=this.obj.resultList[i].complete
            break;
          case "第三阶段":
            rtn['第3阶段'].plan=this.obj.resultList[i].plan
            rtn['第3阶段'].complete=this.obj.resultList[i].complete
            break;
          case "第四阶段":
            rtn['第4阶段'].plan=this.obj.resultList[i].plan
            rtn['第4阶段'].complete=this.obj.resultList[i].complete
            break;
        }

      }
      return rtn


    },


    fetchData() {
      var rtn=this.computeData()

      let list = [];
      let id = 1;
      for (let i = 0; i < 4; i++) {
        // 遍历添加季度
        id++;
        let quarterlyData = {
          name: "第" + (i + 1) + "季度",
          id: id,
          extend: true,
          childers: [],

          baseTarget:rtn["第" + (i + 1) + "季度"].plan,
          supperTarget:rtn["第" + (i + 1) + "季度"].suportTarget,

          compareBaseTarget:rtn["第" + (i + 1) + "季度"].compareBaseTarget,
          complete:rtn["第" + (i + 1) + "季度"].complete,

        };
        for (let x = 0; x < 3; x++) {
          // 遍历添加月份
          id++;
          let monthData = {
            name: i * 3 + x + 1 + "月",
            id: id,
            extend: false,
            childers: [],

            baseTarget: rtn[i * 3 + x + 1 + "月"].plan,
            supperTarget: rtn[i * 3 + x + 1 + "月"].suportTarget,

            compareBaseTarget:rtn[i * 3 + x + 1 + "月"].compareBaseTarget,
            complete:rtn[i * 3 + x + 1 + "月"].complete,

          };
          for (let y = 0; y < 4; y++) {
            // 遍历添加周
            id++;
            let weekData = {
              name: "第" + (y + 1) + "周",
              id: id,

              // baseTarget: undefined,
              // supperTarget: undefined,
              baseTarget: rtn[i * 3 + x + 1 + "月"+"第" + (y + 1) + "周"].plan,
              supperTarget: rtn[i * 3 + x + 1 + "月"+"第" + (y + 1) + "周"].suportTarget,

              compareBaseTarget:rtn[i * 3 + x + 1 + "月"+"第" + (y + 1) + "周"].compareBaseTarget,
              complete:rtn[i * 3 + x + 1 + "月"+"第" + (y + 1) + "周"].complete,

            };
            monthData.childers.push(weekData);
          }
          quarterlyData.childers.push(monthData);
        }
        list.push(quarterlyData);
      }
      this.treeData.childers = list;

      // 年赋值
      this.treeData.baseTarget=rtn["年"].plan
      this.treeData.supperTarget=rtn["年"].suportTarget

      this.treeData.compareBaseTarget=rtn["年"].compareBaseTarget
      this.treeData.complete=rtn["年"].complete

    },


    // 不可量化
    getTreeData(){
      var rtn=this.computeUnData()

      let list = [];
      let id = 1;
      for (let i = 0; i < 4; i++){
        id++;
        let quarterlyData = {
          name: "第" + (i + 1) + "阶段",
          id: id,
          extend: true,
          // childers: [],

          // baseTarget: undefined,
          // supperTarget: undefined,
          plan:rtn["第" + (i + 1) + "阶段"].plan,
          complete:rtn["第" + (i + 1) + "阶段"].complete
          
        };

        list.push(quarterlyData);

      }

      this.treeData.childers = list;
    }

  },
};
</script>

<style type="text/css">
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

  .box-card{
    position: relative;
  }
  .legend{
    /*position: absolute;*/
    /*left: 10px;*/
    /*top: 10px;*/
    font-size: 11px;
    text-align: left;
  }
  .box-card{
    min-height: calc(100vh - 64px);
  }

  .treeBlock{
    min-height: calc(100vh - 164px);
  }
</style>
