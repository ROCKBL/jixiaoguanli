<template>
  <div class="treechart">

    <table v-if="treeData && treeData.name">
      <tr>
        <td
          :colspan="treeData.childers ? treeData.childers.length * 2 : 1"
          :class="{parentLevel: treeData.childers, extend: treeData.childers && treeData.extend}"
        >
          <div :class="{node: true, hasMate: treeData.mate}">
            <div class="person" @click="$emit('click-node', treeData)">
              <div class="name">{{treeData.name}}</div>
              <!-- <div class="data" v-if="treeData.childers == null"> -->

                <div class="data" v-if="treeType=='可量化'">
                  <div class="dataBox">
                    ☆: 
                    <!-- <el-input v-model="treeData.baseTarget"></el-input>万 -->
                    <!-- {{ treeData.baseTarget }}万 -->
                    {{
                    treeData.baseTarget!= null && treeData.baseTarget> 0
                      ? treeData.baseTarget>= treeData.complete
                        ? "还剩" +
                          (Number(treeData.baseTarget) - Number(treeData.complete))
                        : "超出" +
                          (Number(treeData.complete) - Number(treeData.baseTarget))
                      : 0
                  }}万
                  </div>
                  <div class="dataBox">
                    ★: 
                    <!-- <el-input v-model="treeData.supperTarget"></el-input>万 -->
                    <!-- {{ treeData.supperTarget }}万 -->
                    {{
                    treeData.supperTarget!= null && treeData.baseTarget> 0
                      ? treeData.supperTarget>= treeData.complete
                        ? "还剩" +
                          (Number(treeData.supperTarget) -
                            Number(treeData.complete))
                        : "超出" +
                          (Number(treeData.complete) -
                            Number(treeData.supperTarget))
                      : 0
                  }}万
                  </div>
                  <!-- <div class="dataBox">相较☆：{{ treeData.compareBaseTarget }}万</div> -->
                  <!-- <div class="dataBox">相较★：{{ treeData.compareSupperTarget }}万</div> -->

                  <div class="dataBox">实际达成：{{ treeData.complete }}万</div>

                </div>


                <div class="data" v-else >
                  <div class="dataBox" v-if="treeData.hasOwnProperty('plan')">
                    {{ treeData.plan }}
                  </div>
                  <div class="dataBox" v-if="treeData.hasOwnProperty('complete')">
                    {{ treeData.complete }}
                  </div>
                  <!-- <div class="dataBox">
                    {{ treeData.supperTarget }}
                  </div> -->
                </div>

            </div>
          </div>
          <div
            class="extend_handle"
            v-if="treeData.childers && treeData.childers.length"
            @click="toggleExtend(treeData)"
          ></div>
        </td>
      </tr>
      <!-- 这是一个递归组件,注意,这里还要调用,需要传递的数据这里也要传递,否则操作时拿不到子级的数据 -->
      <tr v-show="treeData" v-if="treeData.childers && treeData.childers.length && treeData.extend">
        <td
          v-for="(childers, index) in treeData.childers"
          :key="index"
          colspan="2"
          class="childLevel"
        >
          <TreeChart class="aa"
            :totalRates="totalRates"
            :json="childers"
            :oldTreeData="treeData"
            :isDetail="isDetail"
            :id="lastId"
            @click-node="$emit('click-node', $event)"

            :treeType="treeType"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  import TreeChart from "vue-tree-chart";

export default {
  name: "TreeChart",
  components: {
      TreeChart
  },
  props: {
    json: {}, // 渲染数据
    oldTreeData: {}, // 原始数据
    totalRates: 0, // 股东占股比例
    isDetail: {
      default: true, // 是否是详情
    },
    id: null, // 最后一级id,前端添加数据需要

    treeType:null,
  },

  data() {
    return {
      treeData: {},
      // oldTreeData: {},
      ruleForm: {
        type: 1,
        partnerName: "",
        proportionShares: null,
      },
      totalRate: 0,
      lastId: null, // 最后一级id
    };
  },

  created() {
    // 设置语言
    this.lastId = Number(this.id);

  },

  watch: {
    json: {
      // 遍历当前的数据
      handler: function (Props) {
        let extendKey = function (jsonData) {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend;
          if (Array.isArray(jsonData.children) && jsonData.children.length) {
            jsonData.children.forEach((c) => {
              extendKey(c);
            });
          }
          return jsonData;
        };
        if (Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 设置规则
    toggleExtend(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss">
.treechart {
  width: 100%;
  overflow-x: auto;
  table {
    border-collapse: separate !important;
    border-spacing: 0 !important;
  }
  td {
    position: relative;
    vertical-align: top;
    padding: 0 0 50px 0;
    text-align: center;
  }

  .extend_handle {
    position: absolute;
    left: 50%;
    bottom: 27px;
    width: 10px;
    height: 10px;
    padding: 10px;
    transform: translate3d(-15px, 0, 0);
    cursor: pointer;
  }
  .extend_handle:before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border: 2px solid;
    border-color: #ccc #ccc transparent transparent;
    transform: rotateZ(135deg);
    transform-origin: 50% 50% 0;
    transition: transform ease 300ms;
  }
  .extend_handle:hover:before {
    border-color: #333 #333 transparent transparent;
  }
  .extend .extend_handle:before {
    transform: rotateZ(-45deg);
  }

  .extend::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 15px;
    height: 15px;
    border-left: 2px solid #ccc;
    transform: translate3d(-1px, 0, 0);
  }
  .childLevel::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 100%;
    height: 15px;
    border-left: 2px solid #ccc;
    transform: translate3d(-1px, 0, 0);
  }
  .childLevel::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -15px;
    border-top: 2px solid #ccc;
  }
  .childLevel:first-child:before,
  .childLevel:last-child:before {
    display: none;
  }
  .childLevel:first-child:after {
    left: 50%;
    height: 15px;
    border: 2px solid;
    border-color: #ccc transparent transparent #ccc;
    border-radius: 6px 0 0 0;
    transform: translate3d(1px, 0, 0);
  }
  .childLevel:last-child:after {
    right: 50%;
    height: 15px;
    border: 2px solid;
    border-color: #ccc #ccc transparent transparent;
    border-radius: 0 6px 0 0;
    transform: translate3d(-1px, 0, 0);
  }
  .childLevel:first-child.childLevel:last-child::after {
    left: auto;
    border-radius: 0;
    border-color: transparent #ccc transparent transparent;
    transform: translate3d(1px, 0, 0);
  }

  .node {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    padding: 0 5px;
    .person {
      padding-top: 5px;
      position: relative;
      display: inline-block;
      z-index: 2;
      overflow: hidden;
      .name {
        padding: 0 20px;
        display: block;
        height: 40px;
        line-height: 38px;
        margin: auto;
        word-break: break-all;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        border-radius: 4px;
        white-space: nowrap;
      }
      .data {
        padding-top: 8px;
        .dataBox {
          padding: 0 5px;
          margin: 2px 0;
          display: flex;
          align-items: center;
          width: 100px;
          height: 20px;
          border: 1px solid #548235;
          border-radius: 3px;
          font-size: 12px;
          .el-input{
            padding: 2px 5px;
            width: 60px;
            height: 100%;
            display: flex;
            align-items: center;
            .el-input__inner{
              padding: 0;
              width: 100%;
              height: 100%;
              line-height: 14px;
              border: none;
              font-size: 12px;
              border-radius: 0;
              border-bottom: 1px solid #70AE47;
            }
          }
        }
      }
    }
  }
  .node.hasMate::after {
    content: "";
    position: absolute;
    left: 2em;
    right: 2em;
    top: 15px;
    border-top: 2px solid #ccc;
    z-index: 1;
  }
  .node.hasMate .person:last-child {
    margin-left: 1em;
  }

  .landscape {
    transform: rotate(-90deg);
    padding: 0 4em;
  }
  .landscape .node {
    text-align: left;
    height: 8em;
    width: 8em;
  }
  .landscape .person {
    position: relative;
    transform: rotate(90deg);
    padding-left: 4.5em;
    height: 4em;
    top: 4em;
    left: -1em;
  }
  .landscape .person .avat {
    position: absolute;
    left: 0;
  }
  .landscape .person .name {
    height: 4em;
    line-height: 4em;
  }
  .landscape .hasMate {
    position: relative;
  }
  .landscape .hasMate .person {
    position: absolute;
  }
  .landscape .hasMate .person:first-child {
    left: auto;
    right: -4em;
  }
  .landscape .hasMate .person:last-child {
    left: -4em;
    margin-left: 0;
  }
}
</style>