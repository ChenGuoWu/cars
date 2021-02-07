<template>
  <div class="Upcoming">
    <headeres>
      <div class="home_title">待办</div>
    </headeres>
    <div class="Upcoming-content">
      <mySelect
        :arrSelect="arrUpcoming"
        :total="totalUpcoming"
        @pullRefresh="pullRefreshUpcoming"
        @onLoading="onLoadingUpcoming"
        ref="mychild"
      ></mySelect>
    </div>
  </div>
</template>
<script>
import { selectUseVehicleQueryList } from "@/api/api";
import mySelect from "@/components/Select.vue";
import Header from "@/components/Header.vue";
import { mapState } from "vuex";
export default {
  components: {
    headeres: Header,
    mySelect,
  },
  created() {
    this.selectUseVehicleQueryListIndex();
  },
  data() {
    return {
      pageNum: 1, //第一页
      arrUpcoming: [], //待办数据列表
      totalUpcoming:null,//总页数
      flag:false,//是否上拉刷新 如果是清空数组
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    //获取待办列表
    selectUseVehicleQueryListIndex() {
      return new Promise((resolve) => {
        let params = {
          pageNum: this.pageNum,
          pageSize: 10,
          userId: this.userinfo.userId,
          biaoTi: "",
        };
        selectUseVehicleQueryList({ params }).then((res) => {
          if (this.flag) {
            this.arrUpcoming=[];
          }
           this.arrUpcoming =this.arrUpcoming.concat(res.data);
          this.totalUpcoming=res.total;
          //数据太少时 显示没有更多
          if (this.arrUpcoming.length >= this.totalUpcoming) {
            this.$refs.mychild.finishedTrue();
          }
          this.flag=false;
          return resolve();
        });
      });
    },
    //上拉刷新事件
    async pullRefreshUpcoming() {
      this.flag =true;
      this.pageNum = 1;
      await this.selectUseVehicleQueryListIndex();
      this.$refs.mychild.reset();
      this.$toast('刷新成功');
    },
    //下拉加载事件
     async onLoadingUpcoming(){
      if (this.arrUpcoming.length<this.totalUpcoming) {
        this.pageNum++;
        await this.selectUseVehicleQueryListIndex();
        this.$refs.mychild.loadingFalse();
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/sass/daiban.scss";
</style>

