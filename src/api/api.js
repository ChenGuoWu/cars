import axios from '@/config/httpConfig'
import axiosS from '@/config/httpConfigS'
//获取原始数据
export function getUserInfoes(params) {
    return axiosS.get( '/carsoa-base-dmz/findByUsername', params)
}
//获取角标
export function getjiaobiao(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/queryToDoTotal', params)
}
//登陆后用户人接口 赋值一些参数
export function getBasicDeptUserByIds(params) {
    return axiosS.get( '/carsoa-base-dmz/sysUser/getBasicDeptUserByIds', params)
}
//用车事由,需求，车型
export function categoryCode(params) {
    return axios.get( '/carsoa-integerated-dmz/businessDict/getBusinessDictsByCategoryCode', params)
}
//选择用车人
export function findUserTree(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/findDeptUserTreeByUserIds', params)
}
//选择驾驶员
export function getUseDriverManagementInfo(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/getUseDriverManagementInfo', params)
}
//选择车牌号
export function getVehicleManagementInfo(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/getUseVehicleManagementInfo', params)
}
//是否节假日
export function isNotHoliday(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/isNotHoliday', params)
}
//获取审批意见
export function findDetailPageByOpinion(params) {
    return axios.get( '/carsoa-integerated-dmz/oaOpinion/findDetailPageByOpinion', params)
}


//获取待办列表
export function selectUseVehicleQueryList(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/selectUseVehicleQueryList', params)
}
//获取已办列表
export function selectUseVehicleQueryToDoList(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/selectUseVehicleQueryToDoList', params)
}
//获取按钮
export function getWorkItemOptions(params) {
    return axios.get( '/carsoa-integerated-dmz/sysButton/getWorkItemOptions', params)
}
//获取待办已办详情
export function selectIntegeratedInfo(params) {
    return axios.get( '/carsoa-integerated-dmz/useVehicleManagement/selectIntegeratedInfo', params)
}
//获取调用安卓时的地址  参数是instanceId
export function viewUrl(params) {
    return process.env.VUE_APP_BASE_URL+"/carsoa-integerated-dmz/useVehicleManagement/getInstanceDetail?instanceId=" +params + "&isMobile=true" +"&name=";
}

//保存
export function workflowSave(params,config) {
    return axios.postJson( '/carsoa-integerated-dmz/workflow/save', params,config)
}
//启动流程(提交)
export function carsoaSubmit(params,config) {
    return axios.post( '/carsoa-integerated-dmz/workflow/carsoaSubmit', params,config)
}
//获取领导
export function nextNodeUserTree(params) {
    return axios.get( '/carsoa-integerated-dmz/workitem/nextNodeUserTree', params)
}
//获取流程信息
export function getByWorkitemId(params) {
    return axios.get( '/carsoa-integerated-dmz/workitem/getByWorkitemId', params)
}
//待办不同意
export function getWorkItemToBack(params) {
    return axios.post( '/carsoa-integerated-dmz/workflow/getWorkItemToBack', params)
}
//待办驳回
export function getWorkItemToRejected(params) {
    return axios.get( '/carsoa-integerated-dmz/workflow/getWorkItemToRejected', params)
}
//已办收回的树
export function recoverUserTree(params) {
    return axios.get( '/carsoa-integerated-dmz/workitem/recoverUserTree', params)
}
//已办收回树确定接口 收回
export function getWorkItemToCancel(params) {
    return axios.post( '/carsoa-integerated-dmz/workflow/getWorkItemToCancel', params)
}
//保存意见
export function saveOpinion(params,config) {
    return axios.post( '/carsoa-integerated-dmz/oaOpinion/saveOpinion', params,config)
}
