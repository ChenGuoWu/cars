<template>
  <div class="select">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="100"
      >
        <ul class="select_lists">
          <li
            class="select_lists_content"
            @click="gotodetail(item)"
            v-for="item in arrSelect"
            :key="item.ROW_ID"
          >
            <div class="select_lists_title">
              {{ item.biaoTi }}
            </div>
            <div class="select_lists_body">
              <div>
                <div class="select_lists_body_title">申请时间:</div>
                <div class="select_lists_body_content">
                  {{ item.applicationDate }}
                </div>
              </div>
              <div>
                <div class="select_lists_body_title">申请人:</div>
                <div class="select_lists_body_content">
                  {{ item.drafterName }}
                </div>
              </div>
              <div>
                <div class="select_lists_body_title">用车部门:</div>
                <div class="select_lists_body_content">
                  {{ item.drafterBasicDepartName }}
                </div>
              </div>
              <div>
                <div class="select_lists_body_title">用车人:</div>
                <div class="select_lists_body_content">
                  {{ item.useVehiclePeople }}
                </div>
              </div>
              <div>
                <div class="select_lists_body_title">出发地点:</div>
                <div class="select_lists_body_content">
                  {{ item.departurePlace }}
                </div>
              </div>
              <div>
                <div class="select_lists_body_title">到达地点:</div>
                <div class="select_lists_body_content">
                  {{ item.arrivalPlace }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { PullRefresh, List } from "vant";

export default {
  components: {
    "van-pull-refresh": PullRefresh,
    "van-list": List,
  },
  data() {
    return {
      isLoading: false, //上拉加载是否显示刷新状态 为false表示加载完成  初始值为false
      loading: false, //下拉刷新完成后设置为 false 初始值为false
      finished: false, //下拉刷新数据全部完成后设置为 true 初始值为false
    };
  },
  computed: {},
  mounted() {},
  props: {
    arrSelect: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    //下拉加载
    onRefresh() {
      //子传父调用父组件的初始化事件
      this.$emit("pullRefresh");
    },
    //上拉刷新
    onLoad() {
      // 上拉刷新事件
      this.$emit("onLoading");
    },
    //修改loading状态为false及判断;
    loadingFalse() {
      this.loading = false;
      // 数据全部加载完成
      if (this.arrSelect.length >= this.total) {
        this.finished = true;
      }
    },
    //重置上拉加载及下拉刷新默认值
    reset() {
      this.isLoading = false;
      this.loading = false;
      if (this.arrSelect.length >= this.total) {
        this.finished = true;
      } else {
        this.finished = false;
      }
    },
    //修改finished
    finishedTrue() {
      this.finished = true;
    },
    //跳转详情页
    gotodetail(item) {
        this.$router.push({
          path: this.$route.meta.path,
          query: {
            param: JSON.stringify(item), //传参获取按钮事件
          },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/select.scss";
</style>


