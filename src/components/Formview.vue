<template>
  <div class="application_message">
    <div class="application_basicinformation">
      <div class="application_basicinformation_content">
        <van-field
          v-model="applicationDate"
          class="inputs"
          label="申请日期"
          disabled
        />
        <van-popup v-model="popupShows.applicationDateShow" position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="application.application_date"
            title="申请日期"
            :min-date="minDate"
            @confirm="applicaOnConfirm"
            @cancel="popupShows.applicationDateShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          class="inputs"
          label="申请人"
          v-model="application.drafter_name"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          class="inputs"
          label="用车部门"
          v-model="application.drafter_basic_depart_name"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          readonly
          v-model="application.use_vehicle_people"
          class="inputs"
          @click="
            disableFlag ? false : $emit('initPeopleTrue');
            treetitle = '请选择用车人';
          "
          label="用车人"
          placeholder="选择用车人"
          :disabled="disableFlag"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.telephone_number"
          class="inputs"
          label="用车人手机号"
          :disabled="disableFlag"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field name="radio" label="用车事由" :disabled="disableFlag">
          <template #input>
            <van-radio-group v-model="application.use_vehicle_reason">
              <van-radio
                :name="item.businessCode"
                class="radios"
                v-for="item in radioReasonList"
                :key="item.businessCode"
                :disabled="disableFlag"
                >{{ item.businessValue }}</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field name="radio" label="用车需求" :disabled="disableFlag">
          <template #input>
            <van-radio-group v-model="application.use_vehicle_demand">
              <van-radio
                :name="item.businessCode"
                class="radios"
                v-for="item in radioDemandList"
                :key="item.businessCode"
                :disabled="disableFlag"
                >{{ item.businessValue }}</van-radio
              >
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="startTimeDate"
          class="inputs"
          label="出发时间"
          readonly
          @click="disableFlag ? false : (popupShows.startTimeShow = true)"
          placeholder="点击选择时间"
          :disabled="disableFlag"
        />
        <van-popup v-model="popupShows.startTimeShow" position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="application.departure_time"
            title="出发时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="startTimeOnConfirm"
            @cancel="popupShows.startTimeShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field name="radio" label="出发时间" disabled>
          <template #input>
            <van-radio-group v-model="application.is_holiday" disabled>
              <van-radio :name="false" class="radios">节假日/加班</van-radio>
              <van-radio :name="true" class="radios">工作日</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="endTimeDate"
          class="inputs"
          @click="disableFlag ? false : (popupShows.endTimeShow = true)"
          placeholder="点击选择时间"
          label="结束时间"
          readonly
          :disabled="disableFlag"
        />
        <van-popup v-model="popupShows.endTimeShow" position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="application.end_time"
            title="结束时间"
            :min-date="minDate"
            @confirm="endTimeOnConfirm"
            @cancel="popupShows.endTimeShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.departure_place"
          class="inputs"
          label="出发地点"
          placeholder="请输入出发地点"
          autosize
          type="textarea"
          :disabled="disableFlag"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.arrival_place"
          class="inputs"
          label="前往地点"
          placeholder="请输入前往地点"
          autosize
          type="textarea"
          :disabled="disableFlag"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field name="stepper" label="乘坐人数" :disabled="disableFlag">
          <template #input>
            <van-stepper
              v-model="application.take_number"
              :disabled="disableFlag"
            />
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field name="radio" label="车型" :disabled="disableFlag">
          <template #input>
            <van-radio-group v-model="application.vehicle_model">
              <van-radio
                v-for="item in radioVehicleModelList"
                :key="item.businessCode"
                :name="item.businessCode"
                class="radios"
                :disabled="disableFlag"
              >
                {{ item.businessValue }}
              </van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field name="radio" label="同行领导" :disabled="disableFlag">
          <template #input>
            <van-radio-group
              v-model="application.is_peer_leadership"
              direction="horizontal"
              :disabled="disableFlag"
            >
              <van-radio name="1" class="radios">有</van-radio>
              <van-radio name="0" class="radios">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.leader_remark"
          class="inputs"
          label="备注"
          placeholder="请输入备注"
          :disabled="this.application.is_peer_leadership == 1 &&requestType=='ShenQin'? false : true"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.driver_name"
          class="inputs"
          label="驾驶员"
          readonly
          :disabled="disableDriver"
          placeholder="选择驾驶员"
          @click="disableDriver ? false : (popupShows.driverShow = true)"
        />
        <van-popup v-model="popupShows.driverShow" position="bottom">
          <van-picker
            show-toolbar
            :columns="driverList"
            @confirm="driverPickerConfirm"
            @cancel="popupShows.driverShow = false"
          />
        </van-popup>
        <van-dialog
          title="占用时间"
          v-model="popupShows.occupiedTime"
          show-cancel-button
        >
          <div
            v-for="(item, index) in occupiedTimeList"
            :key="index"
            class="occupiedtime"
          >
            {{ item }}
          </div>
        </van-dialog>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.license_plate_number"
          class="inputs"
          label="车牌号"
          readonly
          @click="disableDriver ? false : (popupShows.numberPlateShow = true)"
          :disabled="disableDriver"
          placeholder="选择车牌号"
        />
        <van-popup v-model="popupShows.numberPlateShow" position="bottom">
          <van-picker
            show-toolbar
            :columns="carPlateList"
            @confirm="numberPlatPickerConfirm"
            @cancel="popupShows.numberPlateShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="startCarTimeDate"
          class="inputs"
          label="出车时间"
          readonly
          @click="disableOther ? false : (popupShows.startCarTimeShow = true)"
          placeholder="点击选择时间"
          :disabled="disableOther"
        />
        <van-popup v-model="popupShows.startCarTimeShow" position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="application.vehicle_start_time"
            title="出车时间"
            :min-date="minDate"
            @confirm="startCarTimeOnConfirm"
            @cancel="popupShows.startCarTimeShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="endCarTimeDate"
          class="inputs"
          readonly
          label="返回时间"
          @click="disableOther ? false : (popupShows.endCarTimeShow = true)"
          placeholder="点击选择时间"
          :disabled="disableOther"
        />
        <van-popup v-model="popupShows.endCarTimeShow" position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="application.vehicle_back_time"
            title="返回时间"
            :min-date="minDate"
            @confirm="endCarTimeOnConfirm"
            @cancel="popupShows.endCarTimeShow = false"
          />
        </van-popup>
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.appear_km"
          class="inputs"
          label="出场公里(公里)"
          :disabled="disableOther"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.backfiled_km"
          class="inputs"
          label="回场公里(公里)"
          :disabled="disableOther"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.driving_km"
          class="inputs"
          label="行驶公里(公里)"
          :disabled="disableOther"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.parking_fee"
          class="inputs"
          label="停车费(元)"
          :disabled="disableOther"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="application.overtime_hours"
          class="inputs"
          label="加班时长(小时)"
          :disabled="disableOther"
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="zhsw_bu_men_fu_ze_ren"
          class="inputs"
          label="部门负责人"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="zhsw_ban_gong_shi_fu_ze_ren"
          class="inputs"
          label="办公室负责人"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="zhsw_fen_guan_ling_dao"
          class="inputs"
          label="分管领导"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="zhsw_che_liang_zhu_guan"
          class="inputs"
          label="车辆主管"
          disabled
        />
      </div>
      <div class="application_basicinformation_content">
        <van-field
          v-model="zhsw_si_ji_qian_zi"
          class="inputs"
          label="驾驶员"
          disabled
        />
      </div>
      <div class="application_opinion">
        <div class="application_opinion_title">
          审批意见({{ this.allOpinion.length }})
        </div>
        <div
          class="application_opinion_content"
          @click="isSuccessShow"
          v-if="allOpinion.length > 2"
        >
          {{ successFlag ? "展开" : "收起" }}
        </div>
      </div>
      <div class="application_success">
        <div
          v-for="(item, index) in max == 2 ? newAllOpinion : allOpinion"
          :key="index"
        >
          <div>
            <span class="application_success_name"
              >{{ item.indexId }}.{{ item.approvalUserName }}({{
                item.displayName
              }})</span
            >
            : {{ item.approvalOpinionInput }}
          </div>
          <div class="application_success_content">
            <div>{{ item.approvalDepartment }}</div>
            <div>{{ item.approvalDate }}</div>
          </div>
        </div>
      </div>
      <div class="application_process">
        <div @click="getInstanceDetail">流程跟踪</div>
      </div>
      <div
        class="application_basicinformation_content"
        v-if="requestType !== 'YiBan'"
      >
        <van-field
          v-model="successContent"
          class="inputs"
          label="意见"
          placeholder="请输入意见"
          autosize
          type="textarea"
        />
      </div>
      <!-- 获取下一节点树 -->
      <my-tree
        :treedata="nextTree"
        :treetitle="treetitle"
        :flagTree="popupShows.nextShow"
        @initFalse="initNextFalse"
        @confirm="NextConfirm"
      ></my-tree>
      <!-- 已办收回树 -->
      <my-tree
        :treedata="doneTree"
        :treetitle="treetitle"
        :flagTree="popupShows.doneShow"
        @initFalse="initDoneFalse"
        @confirm="DoneConfirm"
      ></my-tree>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import {
  Field,
  Picker,
  Popup,
  DatetimePicker,
  RadioGroup,
  Radio,
  Stepper,
  Col,
  Dialog,
  Row,
} from "vant";
import myTree from "@/components/Tree.vue";
import {
  getBasicDeptUserByIds,
  categoryCode,
  getUseDriverManagementInfo,
  getVehicleManagementInfo,
  findDetailPageByOpinion,
  viewUrl,
  selectIntegeratedInfo,
  saveOpinion,
  workflowSave,
  carsoaSubmit,
  nextNodeUserTree,
  getByWorkitemId,
  getWorkItemToBack,
  getWorkItemToRejected,
  recoverUserTree,
  getWorkItemToCancel,
} from "@/api/api";
import listToTree from "@/utils/index.js";
import { mapState } from "vuex";
export default {
  props: {
    //控制弹框显示的开关变量
    disableFlag: {
      type: Boolean,
      default: false,
    },
    //是否启动流程跟踪
    ProcessTracking: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    "van-field": Field,
    "van-picker": Picker,
    "van-popup": Popup,
    "van-datetime-picker": DatetimePicker,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-stepper": Stepper,
    "van-col": Col,
    "van-row": Row,
    myTree: myTree,
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    ...mapState(["userinfo", "requestType","routeParams"]),
    //出发时间最多只能今天之后的两天
    maxDate() {
      let date = new Date().getTime();
      let threeDay = 2 * 24 * 3600 * 1000;
      let overDate = date + threeDay;
      return new Date(overDate);
    },
  },
  data() {
    return {
      //草稿显示字段
      yiJianTiJiao: false, //判断是否待办后一键提交
      yiJianTiJiaoShenQin: false, //判断是否申请后一键提交
      objectId: "", //数据主键id后端返回的documentId
      instanceId: "", //流程id 启动流程后端返回的
      workItemId: "", //任务id 启动流程后端返回的
      activityCode: "", // 启动流程后端返回的
      displayName: "", // 启动流程获取
      waitDoOrRead: "", // 启动流程获取
      approvalDepartmentInfo: "", // 启动流程获取
      approvalDepartmentId: "", // 启动流程获取
      drafterId: null, //申请人id
      driverId: null, //驾驶id
      vehicleId: null, //车牌号id
      disableDriver: true, //控制驾驶员和车牌号置灰
      disableOther: true, //控制驾驶员和车牌号下面到加班时长置灰
      minDate: new Date(), //弹出层最小日期
      radioReasonList: [], //用车事由List
      radioDemandList: [], //用车需求List
      radioVehicleModelList: [], //车型list
      applicationDate: null, //申请日期显示
      startTimeDate: null, //出发时间显示
      endTimeDate: null, //结束时间显示
      startCompareTime: null, // 开始时间 用于比较
      endCompareTime: null, // 结束时间 用于比较
      startCarTimeDate: null, //出车时间显示
      endCarTimeDate: null, //返回时间显示
      //驾驶员和车牌号 只有在车辆主管的待办下才不是置黑
      application: {
        application_date: null, //申请日期传值后端
        drafter_name: null, //申请人
        drafter_basic_depart_name: null, //用车部门
        use_vehicle_people: "", //用车人页面展示选中名称
        telephone_number: "", //用车人手机号
        use_vehicle_reason: null, //用车事由选择
        use_vehicle_demand: null, //用车需求选择
        departure_time: null, //出发时间
        end_time: null, //结束时间
        is_holiday: null, //是否节假日
        departure_place: null, //出发地点
        arrival_place: null, //结束地点
        take_number: 1, //乘坐人数
        vehicle_model: null, //车型
        is_peer_leadership: "0", //同行领导
        leader_remark: null, //备注
        driver_name: null, //驾驶员
        license_plate_number: null, //车牌号
        vehicle_start_time: null, //出车时间
        vehicle_back_time: null, //返回时间
        appear_km: 0, //出场公里
        backfiled_km: 0, //回场公里
        driving_km: 0, //行驶公里
        parking_fee: 0, //停车费
        overtime_hours: 0, //加班时长
      },
      zhsw_bu_men_fu_ze_ren: null, //部门负责人
      zhsw_ban_gong_shi_fu_ze_ren: null, //办公室负责人
      zhsw_fen_guan_ling_dao: null, //分管领导
      zhsw_che_liang_zhu_guan: null, //车辆主管
      zhsw_si_ji_qian_zi: null, //驾驶员
      successContent: null, //意见
      //获取领导及点击收回 保存接口所需参数
      leaderParam: {
        departId: null, //
        deptLevel: null,
        departSortNumber: null,
      },
      //弹出层开关
      popupShows: {
        applicationDateShow: false, //申请日期
        driverShow: false, //驾驶员弹出框
        numberPlateShow: false, //车牌号弹出框
        startTimeShow: false, //出发时间弹出框
        endTimeShow: false, //结束时间弹出框
        startCarTimeShow: false, //出车时间弹出框
        endCarTimeShow: false, //返回时间弹出框
        doneShow: false, //获取已办收回弹出框
        occupiedTime: false, //占用时间弹框
        nextShow:false,//下一级弹出框
      },
      //树弹出层标题
      treetitle: null, //用车人弹出层标题
      //用车人数的数据
      defaultProps: {
        children: "children",
        label: "title",
      },
      //驾驶员的列表数据
      driverList: [],
      driverAllList: [],
      driverId: "", //选中驾驶员的id
      occupiedTimeList: [], //占用时间数据数组
      //车牌号
      carPlateList: [], //车牌号的列表数据
      allOpinion: [], //审批意见的数据
      newAllOpinion: [], //新审批意见的数据
      successFlag: true, //控制意见展开收起 默认展开
      max: 2, //默认收起展开两条
      participantId: null, //选中领导id
      participantName: null, //选中领导名字
      nextActivityCode: null, //下一节点id
      opinionId: null, //意见id
      nextTree: [], //获取下一节点树的数据
      textFieldJson: {}, //保存意见需要的数据
      doneTree: [], //已办收回树
      readOrDo: null, //已办收回树确定需要参数
      activityType: null, //已办收回树确定需要的参数
      nextTreeFlag: false, //判断树弹框是否有点击取消默认没有点击取消
    };
  },
  created() {
    this.init();
  },
  methods: {
    //赋值初始值
    init() {
      //判断置黑操作 及 按钮获取
      if (this.requestType != "ShenQin") {
        this.findDetailPageByOpinionIndex();
        //回显
        this.selectIntegeratedInfoIndex();
      }
      //调用接口
      this.getBasicDeptUserByIdsIndex();
      this.categoryCodeIndex();
      this.cardemandIndex();
      this.carTypeIndex();
    },
    //登陆后用户人接口
    getBasicDeptUserByIdsIndex() {
      let params = {
        userIds: this.userinfo.userId,
        tagKey: "bumen",
      };
      getBasicDeptUserByIds({ params }).then((res) => {
        let resData = res.data[Object.keys(res.data)[0]];
        this.leaderParam.departId = resData.basicDept.objectId; //申请部门id
        this.leaderParam.deptLevel = resData.basicDept.deptLevel;
        this.leaderParam.departSortNumber = resData.basicDept.sortNumber;
      });
    },
    //用车事由、时长
    categoryCodeIndex() {
      let params = {
        categoryCode: "reason",
        companyId: this.userinfo.user.companyId,
      };
      categoryCode({ params }).then((res) => {
        this.radioReasonList = res.data;
        this.application.use_vehicle_reason = res.data[0].businessCode;
      });
    },
    //用车需求
    cardemandIndex() {
      let params = {
        categoryCode: "demand",
        companyId: this.userinfo.user.companyId,
      };
      categoryCode({ params }).then((res) => {
        this.radioDemandList = res.data;
        this.application.use_vehicle_demand = res.data[0].businessCode;
      });
    },
    //车型接口
    carTypeIndex() {
      let params = {
        categoryCode: "vehicle_model",
        companyId: this.userinfo.user.companyId,
      };
      categoryCode({ params }).then((res) => {
        this.radioVehicleModelList = res.data;
        this.application.vehicle_model = "vehicle_model_1";
      });
    },
    //驾驶员接口
    getUseDriverManagementInfoIndex() {
      let params = {
        companyId: this.userinfo.user.companyId,
        documentId: this.routeParams.documentId,
        driverName: "",
      };
      getUseDriverManagementInfo({ params }).then((res) => {
        this.driverAllList = res.data;
        this.driverList = res.data.map((item) => {
          return item.driverName;
        });
      });
    },
    //车牌号接口
    getVehicleManagementInfoIndex() {
      let params = {
        companyId: this.userinfo.user.companyId,
        documentId: this.routeParams.documentId,
        licensePlateNumber: "",
        vehicleType: "",
        vehicleSeating: "",
      };
      getVehicleManagementInfo({ params }).then((res) => {
        this.carPlateList = res.data.map((item) => {
          return item.licensePlateNumber;
        });
      });
    },
    //审批意见
    findDetailPageByOpinionIndex() {
      let params = {
        instanceId: this.routeParams.instanceId,
        approvalUserId: this.userinfo.userId,
        documentId: this.routeParams.documentId,
      };
      findDetailPageByOpinion({ params }).then((res) => {
        //深加工数据便于渲染编号
        this.allOpinion = res.data.allOpinion.map((item, index) => {
          item.indexId = index + 1;
          return item;
        });
        this.allOpinion.reverse();
        this.newAllOpinion = this.allOpinion.slice(
          res.data.allOpinion.length - 2
        );
        //控制回显
        this.zhsw_che_liang_zhu_guan =
          typeof res.data.zhsw_che_liang_zhu_guan != "undefined"
            ? res.data.zhsw_che_liang_zhu_guan[0].approvalUserName
            : ""; //显示车辆主管
        this.zhsw_bu_men_fu_ze_ren =
          typeof res.data.zhsw_bu_men_fu_ze_ren != "undefined"
            ? res.data.zhsw_bu_men_fu_ze_ren[0].approvalUserName
            : ""; //部门负责人
        this.zhsw_ban_gong_shi_fu_ze_ren =
          typeof res.data.zhsw_ban_gong_shi_fu_ze_ren != "undefined"
            ? res.data.zhsw_ban_gong_shi_fu_ze_ren[0].approvalUserName
            : ""; //办公室负责人
        this.zhsw_fen_guan_ling_dao =
          typeof res.data.zhsw_fen_guan_ling_dao != "undefined"
            ? res.data.zhsw_fen_guan_ling_dao[0].approvalUserName
            : ""; //分管领导
        this.zhsw_si_ji_qian_zi =
          typeof res.data.zhsw_si_ji_qian_zi != "undefined"
            ? res.data.zhsw_si_ji_qian_zi[0].approvalUserName
            : ""; //驾驶员
      });
    },
    //弹出层确定事件
    //申请日期确定事件
    applicaOnConfirm(date) {
      this.applicationDate = this.$moment(date).format("YYYY-MM-DD HH:mm");
      this.application.application_date = this.$moment(date).format(
        "YYYY-MM-DD HH-mm"
      );
      this.popupShows.applicationDateShow = false;
    },
    //选择驾驶员确定
    driverPickerConfirm(val, columnIndex) {
      this.popupShows.driverShow = false;
      this.application.driver_name = val;
      this.driverId = this.driverAllList[columnIndex].userId;
      this.occupiedTimeList = this.driverAllList[columnIndex].elapsedTime
        ? this.driverAllList[columnIndex].elapsedTime.split(",")
        : [];
      if (this.occupiedTimeList.length) {
        this.popupShows.occupiedTime = true;
      }
    },
    //选择车牌确定
    numberPlatPickerConfirm(val, columnIndex) {
      this.popupShows.numberPlateShow = false;
      this.application.license_plate_number = val;
    },
    //选择出发时间弹出层确定
    startTimeOnConfirm(date) {
      this.startCompareTime = date;
      //选择日期后，返回选定的日期
      this.startTimeDate = this.$moment(date).format("YYYY-MM-DD HH:mm");
      this.application.departure_time = this.$moment(date).format(
        "YYYY-MM-DD HH-mm"
      );
      this.popupShows.startTimeShow = false;
      //发送请求判断是否是节假日 调用父组件数据
      this.$emit("isNotHoliday", date);
    },
    //选择结束时间弹出层确定
    endTimeOnConfirm(date) {
      this.endCompareTime = date;
      //选择日期后，返回选定的日期
      this.endTimeDate = this.$moment(date).format("YYYY-MM-DD HH:mm");
      this.application.end_time = this.$moment(date).format("YYYY-MM-DD HH-mm");
      this.popupShows.endTimeShow = false;
    },
    //选择出车时间弹出层确定
    startCarTimeOnConfirm(date) {
      //选择日期后，返回选定的日期
      this.startCarTimeDate = this.$moment(date).format("YYYY-MM-DD HH:mm");
      this.application.vehicle_start_time = this.$moment(date).format(
        "YYYY-MM-DD HH-mm"
      );
      this.popupShows.startCarTimeShow = false;
    },
    //选择返回时间弹出层确定
    endCarTimeOnConfirm(date) {
      //选择日期后，返回选定的日期
      this.endCarTimeDate = this.$moment(date).format("YYYY-MM-DD HH:mm");
      this.application.vehicle_back_time = this.$moment(date).format("YYYY-MM-DD HH-mm");
      this.popupShows.endCarTimeShow = false;
    },
    //展开收起
    isSuccessShow() {
      //审批意见收起、展开
      this.successFlag = !this.successFlag;
      if (this.successFlag) {
        this.max = 2;
      } else {
        this.max = 0;
      }
    },
    //流程跟踪
    getInstanceDetail() {
      if (this.ProcessTracking) {
        if (window.master == "iosAndroid") {
          let url;
          if (Object.keys(this.routeParams).length) {
            url = viewUrl(this.routeParams.instanceId);
          } else {
            url = viewUrl("");
          }
          if (window.isTypePhone == "Android") {
            railsMobilePlatform.showTraceView(url);
          } else {
            window.webkit.messageHandlers.showTraceView.postMessage(url);
          }
        } else if (window.master == "H5") {
          this.$router.push({
            name: "ProcessView",
            params: {
              instanceId: Object.keys(this.routeParams).length
                ? this.routeParams.instanceId
                : "",
            },
          });
        }
      }else{
        this.$toast('暂未启动流程，无法查看流程跟踪')
      }
    },
    //待办和已办回显
    selectIntegeratedInfoIndex() {
      let params = {
        service_table: this.routeParams.serviceTable,
        object_id: this.routeParams.documentId,
      };
      selectIntegeratedInfo({ params }).then((res) => {
        this.drafterId = res.data.data.drafter_id; //赋值申请人id
        this.driverId = res.data.data.driver_id; //驾驶员id
        this.vehicleId = res.data.data.vehicle_id; //车牌号id
        this.startTimeDate = res.data.data.departure_time.substring(
          0,
          res.data.data.departure_time.lastIndexOf(":")
        ); //赋值显示页面的出发时间
        this.endTimeDate = res.data.data.end_time.substring(
          0,
          res.data.data.end_time.lastIndexOf(":")
        ); //赋值显示页面的结束时间
        this.applicationDate = res.data.data.application_date.substring(
          0,
          res.data.data.application_date.lastIndexOf(":")
        ); //赋值显示申请日期
        this.application = {
          ...res.data.data,
        };
        //后端只能接收这样的格式
        this.application.application_date = this.applicationDate.replace(
          ":",
          "-"
        );
        this.application.departure_time = this.startTimeDate.replace(":", "-");
        this.application.end_time = this.endTimeDate.replace(":", "-");
        //出发时间是否是工作日
        if (res.data.data.is_holiday == 0) {
          this.application.is_holiday = true;
        } else if (res.data.data.is_holiday == 1) {
          this.application.is_holiday = false;
        }
      });
    },
    //复原领导弹出层显示隐藏变量
    initNextFalse() {   
      this.popupShows.nextShow = false; 
      //点击取消改变开关变量
      this.nextTreeFlag = true;
    },
    //保存
    workflowSaveIndex() {
      // //插件有时不转化 如果没有转化就再转化一遍 拿endCompareTime赋值
      if (this.endCompareTime) {
        this.application.end_time = this.$moment(
          new Date(this.endCompareTime)
        ).format("YYYY-MM-DD HH-mm");
        this.application.departure_time = this.$moment(
          new Date(this.startCompareTime)
        ).format("YYYY-MM-DD HH-mm");
      }
      if(typeof this.application.vehicle_back_time=='object'&&this.application.vehicle_back_time!=null){
        this.application.vehicle_back_time=this.$moment(this.application.vehicle_back_time).format("YYYY-MM-DD HH-mm")
      }
      return new Promise((resolve) => {
        let params = {
          data: {
            drafter_id: this.userinfo.userId,
            ...this.application,
            driver_id: this.driverId, //驾驶员id
            vehicle_id: this.vehicleId, //车辆id
            biao_ti: `${this.application.drafter_name}_${this.application.application_date}_公务用车申请`,
            drafter_basic_depart_id: this.leaderParam.departId, //申请部门id
            company_id: this.userinfo.user.companyId, //登录接口里的companyId
            create_time: this.$moment(new Date()).format("YYYY-MM-DD HH-mm"), //当前时间
            object_id: Object.keys(this.routeParams).length
              ? this.routeParams.documentId
              : this.objectId, //待办已办的documentId
            service_table: "zhsw_application_vehicle", //移动端写死
            form_id: "b62aa7e0a3434457a5e5e1fae86d91de", //表单id,移动端写死
            workflow_code: "xxzx_yongche", //移动端写死
            instance_id: Object.keys(this.routeParams).length
              ? this.routeParams.instanceId
              : this.instanceId, //走流程提交时获取的流程id  待办已办中获取
          },
          service_table: "zhsw_application_vehicle", //移动端写死
        };
        workflowSave(params).then((res) => {
          this.objectId = res.data.data.object_id;
          return resolve();
        });
      });
    },
    //如果是拟稿先走流程
    carsoaSubmitIndex() {
      return new Promise((resolve) => {
        //如果用车事由是长途传1 否则传0
        let useVehicleReason = 0;
        if (this.application.use_vehicle_reason == "reason_4") {
          useVehicleReason = 1;
        }
        let params = {
          //如果是拟稿先 启动流程
          serviceTable: "zhsw_application_vehicle",
          documentId: this.objectId,
          instanceId: Object.keys(this.routeParams).length
            ? this.routeParams.instanceId
            : this.instanceId, //待办提交时在列表获取
          workItemId: Object.keys(this.routeParams).length
            ? this.routeParams.workitemId
            : this.workItemId, //待办提交时在列表获取任务id
          activityCode: Object.keys(this.routeParams).length
            ? this.routeParams.activityCode
            : this.activityCode, //待办提交时在列表获取
          userId: this.userinfo.userId,
          userName: this.userinfo.user.userName,
          documentWorkflowCode: "xxzx_yongche",
          useVehicleReason, //用车事由
          participant: this.participantId, //领导id
          participantName: this.participantName, //领导name
          nextActivityCode: this.nextActivityCode, //下一个节点
          opinionId: this.opinionId, //意见id
          workitemType: Object.keys(this.routeParams).length
            ? this.routeParams.workitemType
            : this.waitDoOrRead, //待办提交时在列表获取
          finishAccessPoint: "mobile",
          isSendMessage: "false",
        };
        carsoaSubmit(params).then((res) => {
          if (JSON.stringify(res.data) == "{}") {
            //如果返回空对象说明是第二遍提交 则提交成功 则返回上一级
            this.$toast("提交成功");
            this.$router.push({ name: "Home" });
          } else {
            this.instanceId = res.data.instanceId;
            this.workItemId = res.data.workItem.workitem_id;
            this.activityCode = res.data.workItem.activity_code;
            this.displayName = res.data.workItem.display_name;
            this.waitDoOrRead = res.data.workItem.workitem_type;
            this.approvalDepartmentInfo = res.data.workItem.orgunit_name;
            this.approvalDepartmentId = res.data.workItem.orgunit_id;
          }
          return resolve();
        });
      });
    },
    //获取领导
    nextNodeUserTreeIndex() {
      return new Promise((resolve) => {
        let params = {
          workItemId: Object.keys(this.routeParams).length
            ? this.routeParams.workitemId
            : this.workItemId,
          userId: this.userinfo.userId,
          departId: this.leaderParam.departId,
        };
        nextNodeUserTree({ params }).then((res) => {
          this.nextActivityCode = res.data[0].nodeCode;
          this.nextTree = JSON.parse(
            JSON.stringify(listToTree(res.data[0].data)).replace(
              /name/g,
              "title"
            )
          );
          this.nextTree[0].id = 1;
          //业务代码  判断单人单节点时 不弹树 直接赋值
          if (res.directSubmit) {
            this.$dialog
              .confirm({
                title: `您确定提交到${this.nextTree[0].children[0].title} ?`,
                message: "",
              })
              .then(() => {
                // on confirm
                this.NextConfirm(this.nextTree[0].children[0]);
              })
              .catch(() => {
                //说明取消了一键提交
                this.yiJianTiJiaoShenQin = true;
                // on cancel
              });
          } else if (this.application.driver_name) {
            //如果存在驾驶员且数组里也有驾驶员 那么也不弹框
            let newList = res.data[0].data.filter((item) => {
              //去除字符串中的空格
              this.application.driver_name = this.application.driver_name.replace(
                /(\s*$)/g,
                ""
              );
              if (item.id == this.driverId) {
                return item;
              }
            });
            if (newList.length) {
              //一键提交加提示框
              this.$dialog
                .confirm({
                  title: `您确定提交到${newList[0].name} ?`,
                  message: "",
                })
                .then(() => {
                  // on confirm
                  this.yiJianTiJiao = true;
                  //赋值 提交接口需要的参数
                  this.participantId = newList[0].id;
                  this.participantName = newList[0].name;
                  this.NextConfirm();
                })
                .catch(() => {
                  // on cancel
                });
            } else {
              //这儿直接这样去改 只改下面的子组件不更新 下面一行代码可不要
              this.popupShows.nextShow = true;
            }
          } else {
            //这儿直接这样去改 只改下面的子组件不更新 下面一行代码可不要
            this.popupShows.nextShow = true;
          }
          return resolve();
        });
      });
    },
    //选择领导人确定时赋值
    async NextConfirm(val) {
      if (!this.yiJianTiJiao) {
        this.participantId = val.id;
        this.participantName = val.title;
      }
      await this.workflowSaveIndex(); //调用保存接口 object 和 instancid 更新
      await this.getByWorkitemIdIndex(); //调用获取流程信息
      await this.saveOpinionIndex(); //调用保存意见接口
      await this.carsoaSubmitIndex(); //调用启动流程接口
      this.yiJianTiJiao = false; //还原一键取消变量
      this.yiJianTiJiaoShenQin = false; //还原一键取消变量
      this.$toast("提交成功");
    },
    getByWorkitemIdIndex() {
      //获取流程信息
      return new Promise((resolve) => {
        let params = {
          type: Object.keys(this.routeParams).length
            ? this.routeParams.workitemType
            : this.waitDoOrRead,
          workitemId: Object.keys(this.routeParams).length
            ? this.routeParams.workitemId
            : this.workItemId,
        };
        getByWorkitemId({ params }).then((res) => {
          this.textFieldJson = res.data.textField;
          this.approvalDepartmentId = res.data.orgunitId;
          this.approvalDepartmentInfo = res.data.orgunitName;
          this.displayName = res.data.displayName;
          return resolve();
        });
      });
    },
    //保存意见
    saveOpinionIndex() {
      return new Promise((resolve) => {
        let params = {
          documentId: Object.keys(this.routeParams).length
            ? this.routeParams.documentId
            : this.objectId,
          objectId: "", //第一次意见没有objectId
          instanceId: Object.keys(this.routeParams).length
            ? this.routeParams.instanceId
            : this.instanceId,
          workitemId: Object.keys(this.routeParams).length
            ? this.routeParams.workitemId
            : this.workItemId,
          activityCode: Object.keys(this.routeParams).length
            ? this.routeParams.activityCode
            : this.activityCode,
          displayName: this.displayName,
          waitDoOrRead: "",
          approvalOpinion: "",
          approvalOpinionImgId: "",
          counterSignDept: "",
          counterSignDeptId: "",
          approvalUserName: this.userinfo.user.userName,
          approvalDepartment: this.application.drafter_basic_depart_name,
          approvalDepartmentInfo: this.approvalDepartmentInfo,
          approvalDepartmentId: this.approvalDepartmentId,
          approvalPosition: "",
          deptLevel: this.leaderParam.deptLevel, //登陆后获取部门信息接口里获取
          departSortNumber: this.leaderParam.departSortNumber, //登陆后获取部门信息接口里获取
          departPostSortNumber: this.userinfo.user.sortNumber, //登陆用户信息里
          attachmentFileId: "",
          attachmentFileName: "",
          commentBath: "",
          optionalFeedbackComment: "",
          textField: "",
          textFieldJson: this.textFieldJson,
          state: 0,
          mobileOrPc: "mobile",
          deptName: this.application.drafter_basic_depart_name,
          approvalOpinionInput: this.successContent, //意见
        };
        saveOpinion(params).then((res) => {
          this.opinionId = res.data.objectId;
          return resolve();
        });
      });
    },
    //待办不同意
    getWorkItemToBackIndex() {
      let params = {
        userCode: this.userinfo.userId,
        workItemId: this.routeParams.workitemId,
        documentId: this.routeParams.documentId,
        opinionId: "",
        commentText: "",
        workitemType: this.routeParams.workitemType,
      };
      getWorkItemToBack(params).then((res) => {
        this.$toast("不同意");
        this.$router.push({ name: "Home" });
      });
    },
    //待办驳回
    getWorkItemToRejectedIndex() {
      let params = {
        userId: this.userinfo.userId,
        workItemId: this.routeParams.workitemId,
        documentId: this.routeParams.documentId,
        nextActivityCode: "Activity2",
        participant: this.drafterId,
        finishAccessPoint: "mobile",
        activityCode: this.routeParams.activityCode,
      };
      getWorkItemToRejected({ params }).then((res) => {
        this.$toast("已驳回");
        this.$router.push({ name: "Home" });
      });
    },
    //已办收回的树
    recoverUserTreeIndex() {
      return new Promise((resolve) => {
        let params = {
          workItemId: this.routeParams.workitemId,
          userId: this.userinfo.userId,
          departId: this.leaderParam.departId,
        };
        recoverUserTree({ params }).then((res) => {
          if (res.data.length) {
            this.doneTree = JSON.parse(
              JSON.stringify(listToTree(res.data[0].data)).replace(
                /name/g,
                "title"
              )
            );
            this.treetitle = "选择提交人员";
            this.doneTree[0].id = 1;
            this.popupShows.doneShow = true;
            this.readOrDo = res.data[0].readOrDo; //已办收回树点击确定
            this.activityType = res.data[0].sign; //已办收回树点击确定
            return resolve();
          } else {
            this.$toast("暂时无法收回");
          }
        });
      });
    },
    //复原已办收回显示隐藏变量
    initDoneFalse() {
      this.popupShows.doneShow = false;
    },
    //已办收回树点击事件
    DoneConfirm(val) {
      let workItemIds = val.workItemId;
      let params = {
        userCode: this.userinfo.userId,
        workItemIds,
        isActive: 1,
        activityType: this.activityType,
        documentId: this.routeParams.documentId,
        workItemId: this.routeParams.workitemId,
        readOrDo: this.readOrDo,
        isSendMessage: "false",
      };
      getWorkItemToCancel(params).then((res) => {
        this.$toast({ message: "收回成功" });
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/shenqin.scss";
</style>
