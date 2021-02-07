import {
    getWorkItemOptions,
} from "@/api/api";
import { mapState } from "vuex";
export const form = {
    data() {
        return {
            list: null,//接口数据
            showBtnList: null,//按钮数据
        }
    },
    computed: {
        ...mapState(["requestType","routeParams"]),
    },
    mounted() {
    },
    methods: {
        //按钮
        showBtns() {
            return new Promise((resolve) => {
                //三个页面的固定参数格式
                let arr = ['ShenQin', 'DaiBan', 'YiBan'];
                let newArr = ['ni_gao', 'dai_ban', 'yi_ban'];
                let requestType = newArr[arr.indexOf(this.requestType)]
                let params = {
                    workflowCode: "xxzx_yongche",
                    requestType,
                    activityCode: this.routeParams.activityCode,
                };
                getWorkItemOptions({ params }).then((res) => {
                    this.list=res.data;
                    //删选出需要展示的数组
                    this.showBtnList = res.data.filter((item) => {
                        if (
                            item.infoType == "tui_hui" ||
                            item.infoType == "ti_jiao" ||
                            item.infoType == "bo_hui" ||
                            item.infoType == "jie_shu" ||
                            item.infoType == "shou_hui"
                        ) {
                            return item;
                        }
                    });
                    return resolve();
                });
            });
        },
    },
}