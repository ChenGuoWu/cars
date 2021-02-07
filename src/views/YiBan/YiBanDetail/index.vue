<template>
  <div class="application">
    <headeres>
      <div class="home_title">已办详情</div>
    </headeres>
    <formView :disableFlag="disableFlag" ref="form">
      <!-- 已办 按钮 -->
      <div class="footer">
      <div class="footer_all">
        <van-button
          type="info"
          class="footer_submit"
          native-type="submit"
          @click="goBtn(item)"
          v-for="(item, index) in showBtnList"
          :key="index"
          >{{ item.infoValue.value }}</van-button
        >
      </div>
      </div>
    </formView>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import FormView from "@/components/Formview.vue";
import { Button } from "vant";
import { mapMutations } from "vuex";
import { form } from "@/mixin/form.js"; // 引入mixin文件

export default {
  mixins: [form],
  components: {
    headeres: Header,
    formView: FormView,
    "van-button": Button,
  },
  computed: {},
  data() {
    return {
      disableFlag: true, //待办置灰按钮
    };
  },
  created() {
    //接收参数
    this.setRouteParams(
      this.$route.query.param ? JSON.parse(this.$route.query.param) : {}
    );
    //按钮
    this.showBtns();
  },
  methods: {
    ...mapMutations(["setRouteParams"]),
    // 已办提交
    async goBtn(val) {
      //说明是待办或者已办
      this.$refs.form.treetitle = "选择提交人员";
      if (val.infoType == "shou_hui") {
        this.$refs.form.recoverUserTreeIndex(); //点击收回 调取收回树接口
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/common.scss";
</style>
