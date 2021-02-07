<template>
  <div class="application">
    <headeres>
      <div class="home_title">新建申请单</div>
    </headeres>
    <formView
      ref="form"
      @isNotHoliday="isNotHolidayIndex"
      @initPeopleTrue="initPeopleTrue"
      :ProcessTracking='ProcessTrackingFalse'
    >
      <div class="footer">
        <!-- 草稿暂时写死，接口不通 -->
        <div class="footer_all">
          <van-button
            type="info"
            class="footer_submit"
            native-type="submit"
            @click="goBtn"
            >提交</van-button
          >
        </div>
      </div>
    </formView>
    <my-tree
      :treedata="carPeopleTree"
      :treetitle="treetitle"
      :flagTree="popupShows.flagTreePeople"
      @initFalse="initPeopleFalse"
      @confirm="carPeopleNameConfirm"
    ></my-tree>
  </div>
</template>
<script>
import { isNotHoliday, findUserTree } from "@/api/api";
import Header from "@/components/Header.vue";
import FormView from "@/components/Formview.vue";
import { Button } from "vant";
import { mapState } from "vuex";
import myTree from "@/components/Tree.vue";
import listToTree from "@/utils/index.js";
export default {
  components: {
    headeres: Header,
    formView: FormView,
    "van-button": Button,
    myTree: myTree,
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  data() {
    return {
      ProcessTrackingFalse:false,//是否启动流程跟踪 否
      carPeopleTree: [], //用车人树的数据
      treetitle: "请选择用车人", //用车人弹框标题
      popupShows: {
        nextShow: false, //获取下一领导节点弹出框
        flagTreePeople: false, //用车人弹出框
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //申请页面赋初始值
      //赋值变量
      this.$refs.form.application.drafter_name = this.userinfo.user.userName;
      this.$refs.form.application.drafter_basic_depart_name = this.userinfo.user.basicDeptName;
      //赋值申请日期默认值
      this.$refs.form.applicationDate = this.$moment(new Date()).format(
        "YYYY-MM-DD HH:mm"
      );
      this.$refs.form.application.application_date = this.$moment(
        new Date()
      ).format("YYYY-MM-DD HH-mm");
      this.findUserTreeIndex(); //用车人树的数据
    },
    //用车人树的数据接口
    findUserTreeIndex() {
      let params = {
        userIds: this.userinfo.userId,
      };
      findUserTree({ params }).then((res) => {
        this.carPeopleTree = JSON.parse(
          JSON.stringify(listToTree(res.data)).replace(/name/g, "title")
        );
        this.carPeopleTree[0].id = 1;
      });
    },
    //显示用车人弹出层
    initPeopleTrue() {
      this.popupShows.flagTreePeople = true;
    },
    //复原用车人弹出层
    initPeopleFalse() {
      this.popupShows.flagTreePeople = false;
    },
    //选择用车人确定时赋值
    carPeopleNameConfirm(val) {
      this.$refs.form.application.use_vehicle_people = val.title;
      this.$refs.form.application.telephone_number = val.phonenumber;
    },
    //是否是节假日
    isNotHolidayIndex(date) {
      let params = {
        userId: this.userinfo.userId,
        dateTime: this.$moment(date).format("YYYY-MM-DD"),
      };
      isNotHoliday({ params }).then((res) => {
        this.$refs.form.application.is_holiday = res.data.isWorkDay;
      });
    },
    //校验规则
    checkRule() {
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/; //11位手机号码正则
      if (this.$refs.form.applicationDate == "") {
        this.$toast({ message: "请选择申请日期" });
      } else if (this.$refs.form.application.drafter_name == "") {
        this.$toast({ message: "请输入申请人" });
      } else if (this.$refs.form.application.use_vehicle_people == "") {
        this.$toast({ message: "请选择用车人" });
      } else if (this.$refs.form.application.telephone_number == "") {
        this.$toast({ message: "请输入用车人手机号" });
      } else if (!reg_tel.test(this.$refs.form.application.telephone_number)) {
        this.$toast({ message: "请输入正确格式的手机号" });
      } else if (this.$refs.form.application.use_vehicle_reason == "") {
        this.$toast({ message: "请选择用车事由" });
      } else if (this.$refs.form.application.use_vehicle_demand == "") {
        this.$toast({ message: "请选择用车需求" });
      } else if (this.$refs.form.application.departure_time == "") {
        this.$toast({ message: "请选择出发时间" });
      } else if (this.$refs.form.application.end_time == "") {
        this.$toast({ message: "请选择结束时间" });
      } else if (
        this.$refs.form.startCompareTime >= this.$refs.form.endCompareTime
      ) {
        this.$toast({ message: "结束时间应大于开始时间" });
      } else if (this.$refs.form.application.departure_place == "") {
        this.$toast({ message: "请输入出发地点" });
      } else if (this.$refs.form.application.arrival_place == "") {
        this.$toast({ message: "请输入前往地点" });
      } else if (this.$refs.form.application.take_number == "") {
        this.$toast({ message: "请输入乘坐人数" });
      } else if (this.$refs.form.application.vehicle_model == "") {
        this.$toast({ message: "请选择车型" });
      } else if (this.$refs.form.application.is_peer_leadership == "") {
        this.$toast({ message: "请选择同行领导" });
      } else {
        return true;
      }
    },
    // 申请单提交
    async goBtn() {
       //如果是拟稿 保存申请单 - 提交(启动流程) - 选领导 - 保存申请单 - 获取流程信息 - 保存意见 - 提交
      //现在接口调不通 所以这样写
      this.checkRule(); ////先调用校验方法为true时校验通过
      if (this.checkRule()) {
        if (!this.$refs.form.nextTreeFlag) {
          //如果申请页面一键提交的话 说明不会弹框 判断加在这儿  这儿接手的人问清楚业务
          if (!this.$refs.form.yiJianTiJiaoShenQin) {
            await this.$refs.form.workflowSaveIndex(); //调用保存接口
            await this.$refs.form.carsoaSubmitIndex(); //调用启动流程接口
            this.$refs.form.treetitle = "选择提交人员";
            await this.$refs.form.nextNodeUserTreeIndex(); //获取领导
          } else {
            await this.$refs.form.nextNodeUserTreeIndex(); //获取领导
          }
        } else {
          //点击取消的情况则重新获取领导
          await this.$refs.form.nextNodeUserTreeIndex(); //获取领导
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/sass/common.scss";
</style>
