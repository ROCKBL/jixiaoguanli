<template>
  	<div class="taskDetail" >
    	<van-nav-bar title="目标任务"  left-arrow class="pageNavNative" @click-left="onClickLeft" />

    	<div id="test"></div>
  	</div>
</template>

<script>
// @ is an alias to /src
import Konva from 'konva'

export default {
  	name: 'Home',
  	components: {
    
  	},
  	data(){
  		return{
  			type:"",//type:可量化，不可量化
  			rtn:[],//任务详细数据

  		}
  	},
  	methods:{
  		onClickLeft(){
            this.$router.go(-1)
        },
  		createTopRect(x,y,valueObj){
  			// 年度计划框框
  			var valueObj1=valueObj||{jz:10,tz:10,lrmb:'50%',nvdc:"60%"}

  			var layer = new Konva.Layer();
  			var complexText = new Konva.Text({
		        x: x-70,
		        y: y,
		        text:"公司年度计划",
		        fontSize: 18,
		        fontFamily: 'Calibri',
		        fill: '#fff',
		        width: 140,
		        padding: 10,
		        align: 'center',
		    });
		    var rect2 = new Konva.Rect({
		        x: x-70,
		        y: y,
		        width: complexText.width(),
		        height: complexText.height(),
		        fill: 'rgba(84,130,53,1)',
		        shadowBlur: 2,
		        cornerRadius: 2,
		    });

		    layer.add(rect2);
			layer.add(complexText);

			var group=this.createValueBlock("row",x+75,y,valueObj1)
			layer.add(group)

		    return layer
  		},
  		createBottomRect(x,y,text,valueObj){
  			// 季度框框
  			var valueObj1=valueObj||{jz:10,tz:11,lrmb:'50%',nvdc:"60%"}

  			console.log(valueObj1)
  			var layer = new Konva.Layer();
  			var complexText = new Konva.Text({
		        x: x-50,
		        y: y,
		        text:text,
		        fontSize: 18,
		        fontFamily: 'Calibri',
		        fill: '#fff',
		        width: 100,
		        height:40,
		        padding: 10,
		        align: 'center',
		    });
		    var rect2 = new Konva.Rect({
		        x: x-50,
		        y: y,
		        width: complexText.width(),
		        height: complexText.height(),
		        fill: 'rgba(169,209,142,1)',
		        shadowBlur: 2,
		        cornerRadius: 2,
		    });

		    var group=this.createValueBlock("row",x+55,y,valueObj1)
			layer.add(group)

		    layer.add(rect2);
			layer.add(complexText);
		    return layer
  		},
  		createLine(topx,topy,bottomx,bottomy,step,num){
  			// 年度计划和季度的连接线,季度和月 之间的连接线
  			// topx,topy,bottomx:左下角线的端点,bottomy,step：底部线的间距,num：底部线的数量
  			var layer = new Konva.Layer();
  			var midy=(topy+bottomy)/2


  			var line = new Konva.Line({
		        points: [topx,topy,topx,midy],
		        stroke: 'black',
		        strokeWidth: 1,
		        
		    });
  			layer.add(line);
  			// 中间横线
  			var line1 = new Konva.Line({
		        points: [bottomx,midy,bottomx+step*(num-1),midy],
		        stroke: 'black',
		        strokeWidth: 1,
		        
		    });
  			layer.add(line1);
  			for(var i=0;i<num;i++){
  				var line2 = new Konva.Line({
			        points: [bottomx+step*i,midy,bottomx+step*i,bottomy],
			        stroke: 'black',
			        strokeWidth: 1,
			        
			    });
  				layer.add(line2);

  			}
  			return layer
  		},

  		createMonthBalls(x,y,step,radius,ar){

  			// 月份球  x,y起始圆中心坐标
  			var layer = new Konva.Layer();

  			for(var i=0;i<ar.length;i++){
  				var circle = new Konva.Circle({
			        x: x+i*step,
			        y: y,
			        radius: radius,
			        fill: ar[i].color,
			        stroke: 'black',
			        strokeWidth: 0,
			    });

  				var complexText = new Konva.Text({
			        x: x+i*step-20,
			        y: y-8,
			        text:ar[i].label,
			        fontSize: 20,
			        fontStyle:'bold',
			        fontFamily: 'Calibri',
			        width:40,			        
			        align: 'center',
			    });

  				// var group=this.createValueBlock("column",x+i*step-50,y+radius+5,{jz:10,tz:10,lrmb:'50%',nvdc:"60%"})
  				var group=this.createValueBlock("column",x+i*step-50,y+radius+5,ar[i].valueObj||{jz:10,tz:10,lrmb:'50%',nvdc:"60%"})
				layer.add(group)

			    layer.add(circle)
			    layer.add(complexText)
  			}
  			
  			return layer;
  		},
  		createLabel(x,y){
  			// 左上角注释
  			var layer = new Konva.Layer();
  			// ★
  			// ☆

  			var complexText = new Konva.Text({
		        x: x,
		        y: y,
		        text:"基准目标“☆”代表\n挑战目标“★”代表",
		        fontSize: 14,
		        fontStyle:'bold',
		        fontFamily: 'Calibri',
		        fill: '#000',
		        // width: 140,
		        lineHeight:1.5,
		        padding: 10,
		        align: 'center',
		    });

  			layer.add(complexText)
  			return layer;
  		},
  		createValueBlock(type,x,y,valueObj){
  			// type  row:2个2个横着接 column:2个2个竖着接
  			// var layer = new Konva.Layer();
  			var layer = new Konva.Group({
		        // x: 120,
		        // y: 40,
		        // rotation: 20,
		    });
  			var blockPadding=5;
  			var borderColor="rgba(84,130,53,1)";
  			var textAlign="left"

  			var text1=valueObj.jz
  			var text2=valueObj.tz
  			var text3=valueObj.lrmb
  			var text4=valueObj.nvdc
  			// 基准目标方块
  			var text11="";
  			if(this.type=="可量化"){
  				text11="☆:"+text1+"万"
  				
  			}else{
  				text11="☆:"+text1
  			}
  			
  			var complexText1 = new Konva.Text({
		        x: x,
		        y: y,
		        text:text11,
		        fontSize: 14,
		        fontFamily: 'Calibri',
		        fill: '#555',
		        width: 100,
		        padding: blockPadding,
		        align: textAlign,
		    });
		    var rect1 = new Konva.Rect({
		        x: x,
		        y: y,
		        stroke: borderColor,
		        strokeWidth: 1,
		        width: 100,
		        height: complexText1.height(),
		        cornerRadius: 5,
		    });
		    layer.add(rect1);
      		layer.add(complexText1);


		    var blockHeight=complexText1.height()
		    var blockWidth=complexText1.width()

		    // 挑战目标方块
		    var text22="";
  			if(this.type=="可量化"){
  				text22="★:"+text2+"万"
  			}else{
  				text22="★:"+text2
  			}

		    var complexText2 = new Konva.Text({
		        x: x,
		        y: y+blockHeight,
		        text:text22,
		        fontSize: 14,
		        fontFamily: 'Calibri',
		        fill: '#555',
		        width: 100,
		        padding: blockPadding,
		        align: textAlign,
		    });
		    var rect2 = new Konva.Rect({
		        x: x,
		        y: y+blockHeight,
		        stroke: borderColor,
		        strokeWidth: 1,
		        width: 100,
		        height: blockHeight,
		        cornerRadius: 5,
		    });
		    layer.add(rect2);
      		layer.add(complexText2);

      		var xbase=0;
      		var ybase=0;
      		if(type=="row"){
      			xbase=x+blockWidth;
      			ybase=y;
      		}
      		if (type=="column") {
				xbase=x;
      			ybase=y+2*blockHeight;
      		}


      		// 利润目标达成
      		var complexText3 = new Konva.Text({
		        x: xbase,
		        y: ybase,
		        text:text3,
		        fontSize: 14,
		        fontFamily: 'Calibri',
		        fill: '#555',
		        width: 100,
		        padding: blockPadding,
		        align: textAlign,
		    });
		    var rect3 = new Konva.Rect({
		        x: xbase,
		        y: ybase,
		        stroke: borderColor,
		        strokeWidth: 1,
		        width: 100,
		        height: blockHeight,
		        cornerRadius: 5,
		    });
		    layer.add(rect3);
      		layer.add(complexText3);

      		// 努力达成
      		var complexText4 = new Konva.Text({
		        x: xbase,
		        y: ybase+blockHeight,
		        text:text4,
		        fontSize: 14,
		        fontFamily: 'Calibri',
		        fill: '#555',
		        width: 100,
		        padding: blockPadding,
		        align: textAlign,
		    });
		    var rect4 = new Konva.Rect({
		        x: xbase,
		        y: ybase+blockHeight,
		        stroke: borderColor,
		        strokeWidth: 1,
		        width: 100,
		        height: blockHeight,
		        cornerRadius: 5,
		    });
		    layer.add(rect4);
      		layer.add(complexText4);


      		return layer
  		},

  		// 调用其他方法绘制canvas
  		draw(obj){
  			var stage = new Konva.Stage({
			  	container: 'test',   // id of container <div> *包裹舞台的DIV元素的ID
			  	width: 1600,
			  	height: 700,
			  	// width: 400,
			  	// height: 400,
			});

	  		var topy=60;
	  		var midy=260;
	  		var bottomy=460;
	  		var ballRadius=20;// 月份球的半径

	  		var stageWidth=stage.getWidth()
	  		var leftPadding=100;// stage左侧空留空间
	  		var rightPadding=100;// stage右侧空留空间
	  		var totalPadding=leftPadding+rightPadding;
	  		var stageWidthLeave=stageWidth-totalPadding;

			var layer =this.createTopRect(stageWidthLeave/2+leftPadding,topy,obj.yearObj)
			var layer1 =this.createBottomRect(stageWidthLeave/8+leftPadding,midy,"季度一",obj.season1)
			var layer2 =this.createBottomRect(stageWidthLeave/8*3+leftPadding,midy,"季度二",obj.season2)
			var layer3 =this.createBottomRect(stageWidthLeave/8*5+leftPadding,midy,"季度三",obj.season3)
			var layer4 =this.createBottomRect(stageWidthLeave/8*7+leftPadding,midy,"季度四",obj.season4)

			// 第一层和第二层的连接线
			var lineLayer=this.createLine(stageWidthLeave/2+leftPadding,topy+40,stageWidthLeave/8+leftPadding,midy,stageWidthLeave/4,4)

			// 第二层和第三层的连接线
			var lineLayer1=this.createLine(stageWidthLeave/8+leftPadding,midy+40,stageWidthLeave/8-stageWidthLeave/12+leftPadding,bottomy-ballRadius,stageWidthLeave/12,3)
			var lineLayer2=this.createLine(stageWidthLeave/8*3+leftPadding,midy+40,stageWidthLeave/8*3-stageWidthLeave/12+leftPadding,bottomy-ballRadius,stageWidthLeave/12,3)
			var lineLayer3=this.createLine(stageWidthLeave/8*5+leftPadding,midy+40,stageWidthLeave/8*5-stageWidthLeave/12+leftPadding,bottomy-ballRadius,stageWidthLeave/12,3)
			var lineLayer4=this.createLine(stageWidthLeave/8*7+leftPadding,midy+40,stageWidthLeave/8*7-stageWidthLeave/12+leftPadding,bottomy-ballRadius,stageWidthLeave/12,3)

			// 左上角的注释
			var labelLayer=this.createLabel(40,40)

			var ar=[
				{label:"3",color:"rgba(123,159,95,1)",valueObj:obj.month3},
				{label:"4",color:"rgba(123,159,95,1)",valueObj:obj.month4},
				{label:"5",color:"rgba(123,159,95,1)",valueObj:obj.month5},
				{label:"6",color:"rgba(235,199,95,1)",valueObj:obj.month6},
				{label:"7",color:"rgba(235,199,95,1)",valueObj:obj.month7},
				{label:"8",color:"rgba(235,199,95,1)",valueObj:obj.month8},
				{label:"9",color:"rgba(180,84,18,1)",valueObj:obj.month9},
				{label:"10",color:"rgba(180,84,18,1)",valueObj:obj.month10},
				{label:"11",color:"rgba(180,84,18,1)",valueObj:obj.month11},
				{label:"12",color:"rgba(133,153,207,1)",valueObj:obj.month12},
				{label:"1",color:"rgba(133,153,207,1)",valueObj:obj.month1},
				{label:"2",color:"rgba(133,153,207,1)",valueObj:obj.month2},
			]
			// 月份球
			var ballsLayer=this.createMonthBalls(stageWidthLeave/8-stageWidthLeave/12+leftPadding,bottomy,stageWidthLeave/12,ballRadius,ar)
			
			stage.add(layer);
			stage.add(layer1);
			stage.add(layer2);
			stage.add(layer3);
			stage.add(layer4);

			stage.add(lineLayer);
			stage.add(labelLayer);
			stage.add(ballsLayer);


			stage.add(lineLayer1);
			stage.add(lineLayer2);
			stage.add(lineLayer3);
			stage.add(lineLayer4);
  		},

  		// 计算数据
  		computeData(){
  			var that=this;
  			var defaultValue={
				jz:0,
				tz:0,
				lrmb:'0%',
				nvdc:"0%"
			}
			var obj={
				yearObj:{},
				season1:{},
				season2:{},
				season3:{},
				season4:{},
				month1:{},
				month2:{},
				month3:{},
				month4:{},
				month5:{},
				month6:{},
				month7:{},
				month8:{},
				month9:{},
				month10:{},
				month11:{},
				month12:{},

			};//绘制的参数
			for(var attr in obj){
				obj[attr].jz=defaultValue.jz
				obj[attr].tz=defaultValue.tz
				obj[attr].lrmb=defaultValue.lrmb
				obj[attr].nvdc=defaultValue.nvdc
			}

			for(var i =0;i<that.rtn.length;i++){
				switch(that.rtn[i].month){
					case 1:
						obj.month1.jz+=parseFloat(that.rtn[i].baseTarget);
						obj.month1.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season4.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season4.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 2:
						obj.month2.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month2.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season4.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season4.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 3:
						obj.month3.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month3.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season1.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season1.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 4:
						obj.month4.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month4.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season1.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season1.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 5:
						obj.month5.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month5.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season1.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season1.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 6:
						obj.month6.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month6.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season2.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season2.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 7:
						obj.month7.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month7.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season2.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season2.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 8:
						obj.month8.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month8.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season2.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season2.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 9:
						obj.month9.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month9.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season3.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season3.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 10:
						obj.month10.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month10.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season3.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season3.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 11:
						obj.month11.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month11.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season3.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season3.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
					case 12:
						obj.month12.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.month12.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.season4.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.season4.tz+=parseFloat(that.rtn[i].supperTarget)

						obj.yearObj.jz+=parseFloat(that.rtn[i].baseTarget)
						obj.yearObj.tz+=parseFloat(that.rtn[i].supperTarget)
						break;
				}
			}

			return obj

  		},
  		computeUnData(){
  			var that=this;
  			var defaultValue={
				jz:"",
				tz:"",
				lrmb:'',
				nvdc:""
			}
			var obj={
				yearObj:{},
				season1:{},
				season2:{},
				season3:{},
				season4:{},
				month1:{},
				month2:{},
				month3:{},
				month4:{},
				month5:{},
				month6:{},
				month7:{},
				month8:{},
				month9:{},
				month10:{},
				month11:{},
				month12:{},

			};//绘制的参数
			for(var attr in obj){
				obj[attr].jz=defaultValue.jz
				obj[attr].tz=defaultValue.tz
				obj[attr].lrmb=defaultValue.lrmb
				obj[attr].nvdc=defaultValue.nvdc
			}

			for(var i =0;i<that.rtn.length;i++){
				switch(that.rtn[i].month){
					case 1:
						obj.month1.jz=that.rtn[i].baseTarget
						obj.month1.tz=that.rtn[i].supperTarget

						obj.season4.jz=that.rtn[i].baseTarget
						obj.season4.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 2:
						obj.month2.jz=that.rtn[i].baseTarget
						obj.month2.tz=that.rtn[i].supperTarget

						obj.season4.jz=that.rtn[i].baseTarget
						obj.season4.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 3:
						obj.month3.jz=that.rtn[i].baseTarget
						obj.month3.tz=that.rtn[i].supperTarget

						obj.season1.jz=that.rtn[i].baseTarget
						obj.season1.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 4:
						obj.month4.jz=that.rtn[i].baseTarget
						obj.month4.tz=that.rtn[i].supperTarget

						obj.season1.jz=that.rtn[i].baseTarget
						obj.season1.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 5:
						obj.month5.jz=that.rtn[i].baseTarget
						obj.month5.tz=that.rtn[i].supperTarget

						obj.season1.jz=that.rtn[i].baseTarget
						obj.season1.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 6:
						obj.month6.jz=that.rtn[i].baseTarget
						obj.month6.tz=that.rtn[i].supperTarget

						obj.season2.jz=that.rtn[i].baseTarget
						obj.season2.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 7:
						obj.month7.jz=that.rtn[i].baseTarget
						obj.month7.tz=that.rtn[i].supperTarget

						obj.season2.jz=that.rtn[i].baseTarget
						obj.season2.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 8:
						obj.month8.jz=that.rtn[i].baseTarget
						obj.month8.tz=that.rtn[i].supperTarget

						obj.season2.jz=that.rtn[i].baseTarget
						obj.season2.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 9:
						obj.month9.jz=that.rtn[i].baseTarget
						obj.month9.tz=that.rtn[i].supperTarget

						obj.season3.jz=that.rtn[i].baseTarget
						obj.season3.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 10:
						obj.month10.jz=that.rtn[i].baseTarget
						obj.month10.tz=that.rtn[i].supperTarget

						obj.season3.jz=that.rtn[i].baseTarget
						obj.season3.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 11:
						obj.month11.jz=that.rtn[i].baseTarget
						obj.month11.tz=that.rtn[i].supperTarget

						obj.season3.jz=that.rtn[i].baseTarget
						obj.season3.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
					case 12:
						obj.month12.jz=that.rtn[i].baseTarget
						obj.month12.tz=that.rtn[i].supperTarget

						obj.season4.jz=that.rtn[i].baseTarget
						obj.season4.tz=that.rtn[i].supperTarget

						obj.yearObj.jz=that.rtn[i].baseTarget
						obj.yearObj.tz=that.rtn[i].supperTarget
						break;
				}
			}

			return obj
  		}

  	},
  	computed:{},
	watch:{},
  	mounted(){
  		

  		var json=this.$router.currentRoute.query.obj

  		var that=this;
		// var url=this.baseUrl+"/task/queryById";
		var url=this.baseUrl+"/task/list";

		var params={};

		var jsonObj=JSON.parse(json)
		// id:任务id
		// params.id=jsonObj.id
		params.targetId=jsonObj.id
		this.type=jsonObj.type


		console.log(jsonObj)
		console.log(params)


		this.axios({
			method: 'get',
			url: url,
			params:params
	
		}).then(function(response) {
		  	var data=response.data
		  	if(data.code==200){
		  		// 获取数据并处理
		  		that.rtn=data.result.records

		  		var obj={}
		  		if(that.type=="可量化"){
		  			obj=that.computeData()
		  		}else{
		  			obj=that.computeUnData()
		  		}
		  		
				
		  		that.draw(obj)

		  	}else{

		  	}
		})

		
		

	},
	created(){}
}
</script>

<style type="text/css">
	#test{
		width: 100%;
		/*height: 100%;*/
		overflow: auto;
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
</style>