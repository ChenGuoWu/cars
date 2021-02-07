<template>
  <div class="home">
    <headeres>
      <div class="home_title">用车管理</div>
    </headeres>
    <div class="home_title_approve">
      <div class="home_title_approve_title">车辆审批</div>
      <div class="home_title_approve_content">
        <div
          v-for="(item, index) in showapprovlist"
          :key="index"
          class="home_title_approve_show"
          @click="goclickapprove(item.url)"
        >
          <div class="home_title_approve_img">
            <img :src="imgsrc(item.img)" />
          </div>
          <div class="home_title_approve_contents">{{ item.content }}</div>
          <div v-if="item.queryTotal" class="home_title_approve_jiaobiao">{{item.queryTotal}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getjiaobiao } from "@/api/api";
import Header from "@/components/Header.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    headeres: Header,
  },
  data() {
    return {
      showapprovlist: [
        {
          content: "申请",
          url: "ShenQin",
          img: "shenQin.png",
        },
        {
          content: "待办",
          url: "DaiBan",
          img: "daiBan.png",
        },
        {
          content: "已办",
          url: "YiBan",
          img: "yiBan.png",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    window.setTimeout(() => {
      this.getjiaobiaoes();
    }, 500);
    
  },
  methods: {
     ...mapMutations(["setRequestType"]),
    //获取角标
    getjiaobiaoes() {
      getjiaobiao({
        params: { userId: this.$store.state.userinfo.userId },
      }).then((res) => {
        //赋值角标
        this.showapprovlist=this.showapprovlist.map(item=>{
          if (item.content=='待办') {
                item.queryTotal=res.data.totle;
          }
          return item;
        })
      });
    },
    //导入图片地址
    imgsrc(item) {
      return require("@/assets/img/" + item);
    },
    //点击跳转对应的页面
    goclickapprove(val) {
      //赋值store中的from
      this.setRequestType(val)
      this.$router.push({
        name: val,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/home.scss";
</style>

