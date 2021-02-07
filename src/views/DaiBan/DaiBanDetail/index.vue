<template>
  <div class="application">
    <headeres>
      <div class="home_title">待办详情</div>
    </headeres>
    <formView :disableFlag="disableFlag" ref="form">
      <!-- 待办 按钮 -->
      <div class="footer">
        <div class="footer_all">
          <van-button
            :type="
              item.infoType == 'tui_hui' ||
              item.infoType == 'bo_hui' ||
              item.infoType == 'shou_hui'
                ? 'danger'
                : 'info'
            "
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
    <van-dialog
      title="您确定结束吗"
      v-model="popupShows.overSure"
      show-cancel-button
      :beforeClose="chargeBtn"
    >
    </van-dialog>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import FormView from "@/components/Formview.vue";
import { Dialog, Button } from "vant";
import { form } from "@/mixin/form.js"; // 引入mixin文件
import { mapMutations } from "vuex";
export default {
  mixins: [form],
  components: {
    headeres: Header,
    formView: FormView,
    [Dialog.Component.name]: Dialog.Component,
    "van-button": Button,
  },
  computed: {},
  data() {
    return {
      isMounted: false,
      disableFlag: true, //待办置灰按钮
      //弹出层开关
      popupShows: {
        overSure: false, //结束提示框
      },
    };
  },
  created() {
    //接收参数
    this.setRouteParams(
      this.$route.query.param ? JSON.parse(this.$route.query.param) : {}
    );
    //按钮
    this.btnDai();
  },
  methods: {
    ...mapMutations(["setRouteParams"]),
    //显示按钮
    async btnDai() {
      await this.showBtns();
      let that=this;
      this.list.map((item) => {
        //控制驾驶员和车牌号置灰
        if (
          item.infoType == "jia_shi_yuan" // 或者item.infoType == "che_pai_hao"
        ) {
          that.$refs.form.disableDriver = false;
          //调用驾驶员和车牌号接口
          that.$refs.form.getUseDriverManagementInfoIndex();
          that.$refs.form.getVehicleManagementInfoIndex();
        }
        //控制驾驶员和车牌号下面至加班时长置灰
        if (
          item.infoType == "jia_ban_shi_chang" ||
          item.infoType == "ting_che_fei" ||
          item.infoType == "chu_chang_gong_li" ||
          item.infoType == "xing_shi_gong_li"
        ) {
          that.$refs.form.disableOther = false;
        }
      });
    },
    // 待办提交
    //如果是待办 选领导 - 保存申请单 - 获取流程信息 - 保存意见 - 提交
    async goBtn(val) {
      //说明是待办或者已办
      this.$refs.form.treetitle = "选择提交人员";
      if (val.infoType == "ti_jiao") {
        await this.$refs.form.nextNodeUserTreeIndex(); //点击同意 获取领导
      }
      if (val.infoType == "tui_hui") {
        this.$dialog
          .confirm({
            title: `您确定退回吗`,
            message: "",
          })
          .then(() => {
            this.$refs.form.getWorkItemToBackIndex(); //点击不同意 调取不同意接口
          })
          .catch(() => {
            // on cancel
          });
      }
      if (val.infoType == "bo_hui") {
        this.$dialog
          .confirm({
            title: `您确定驳回吗`,
            message: "",
          })
          .then(() => {
            this.$refs.form.getWorkItemToRejectedIndex(); //点击不同意 调取驳回接口
          })
          .catch(() => {
            // on cancel
          });
      }
      if (val.infoType == "shou_hui") {
        this.$refs.form.recoverUserTreeIndex(); //点击收回 调取收回树接口
      }
      if (val.infoType == "jie_shu") {
        this.popupShows.overSure = true;
      }
    },
    //结束提示框
    async chargeBtn(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        done();
        await this.$refs.form.workflowSaveIndex(); //点击结束调保存接口
        this.$refs.form.nextActivityCode = "Activity4";
        await this.$refs.form.carsoaSubmitIndex(); //然后调提交
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/common.scss";
</style>
