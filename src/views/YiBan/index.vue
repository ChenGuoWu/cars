<template>
  <div class="Upcoming">
    <headeres>
      <div class="home_title">已办</div>
    </headeres>
    <div class="Upcoming-content">
      <mySelect
        :arrSelect="arrHaving"
        :total="totalHaving"
        @pullRefresh="pullRefreshHaving"
        @onLoading="onLoadingHaving"
        ref="mychild"
      ></mySelect>
    </div>
  </div>
</template>
<script>
import { selectUseVehicleQueryToDoList } from "@/api/api";
import mySelect from "@/components/Select.vue";
import Header from "@/components/Header.vue";
import { mapState } from "vuex";
export default {
  components: {
    headeres: Header,
    mySelect,
  },
  created() {
    this.selectUseVehicleQueryToDoListIndex();
  },
  data() {
    return {
      pageNum: 1, //第一页
      arrHaving: [], //已办数据列表
      totalHaving:null,//总页数
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    //获取已办列表
    selectUseVehicleQueryToDoListIndex() {
      return new Promise((resolve) => {
        let params = {
          pageNum: this.pageNum,
          pageSize: 10,
          userId: this.userinfo.userId,
          biaoTi: "",
        };
        selectUseVehicleQueryToDoList({ params }).then((res) => {
           this.arrHaving =this.arrHaving.concat(res.data);
          this.totalHaving=res.total;
          //数据太少时 显示没有更多
          //数据太少时 显示没有更多
          if (this.arrHaving.length >= this.totalHaving) {
            this.$refs.mychild.finishedTrue();
          }
          return resolve();
        });
      });
    },
    //上拉刷新事件
    async pullRefreshHaving() {
      this.arrHaving =[];
      this.pageNum = 1;
      await this.selectUseVehicleQueryToDoListIndex();
      this.$refs.mychild.reset();
      this.$toast('刷新成功');
    },
    //下拉加载事件
     async onLoadingHaving(){
      if (this.arrHaving.length<this.totalHaving) {
        this.pageNum++;
        await this.selectUseVehicleQueryToDoListIndex();
        this.$refs.mychild.loadingFalse();
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/sass/daiban.scss";
</style>

