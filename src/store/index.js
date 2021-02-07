import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
import addressbkks from './modules/addressbkks'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: null,
    showloading: false,
    requestType: null,//判断从待办还是已办进来 home传参的方法 返回上一级会丢失
    routeParams:{},//待办已办传参
  },
  mutations: {
    show_loading(state) {
      state.showloading = true
    },
    hide_loading(state) {
      state.showloading = false
    },
    setUserinfo(state, value) {
      state.userinfo = value;
    },
    setRequestType(state, value) {
      state.requestType = value;
    },
    setRouteParams(state, value) {
      state.routeParams = value;
    },
  },
  actions: {},
  modules: {
    user, addressbkks
  }
});
