import Vue from "vue";
import VueRouter from "vue-router";
// import store from '@/store/index.js'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("@/views/Home.vue"),
    meta: {
      tittle: '首页'
    }
  },
  {
    path: "/daiBan",
    name: "DaiBan",
    component: () =>
      import("@/views/DaiBan"),
    meta: {
      tittle: '待办',
      path:'daiBanDetail'
    }
  },
  {
    path: "/daiBanDetail",
    name: "DaiBanDetail",
    component: () =>
      import("@/views/DaiBan/DaiBanDetail"),
    meta: {
      tittle: '待办详情',
    }
  },
  {
    path: "/yiBan",
    name: "YiBan",
    component: () =>
      import("@/views/YiBan"),
    meta: {
      tittle: '已办',
      path:'yiBanDetail'
    }
  },
  {
    path: "/yiBanDetail",
    name: "YiBanDetail",
    component: () =>
      import("@/views/YiBan/YiBanDetail"),
    meta: {
      tittle: '已办详情',
     
    }
  },
  {
    path: "/shenQIN",
    name: "ShenQin",
    component: () =>
      import("@/views/ShenQin"),
    meta: {
      tittle: '申请'
    }
  },
  {
    path: "/processView",
    name: "ProcessView",
    component: () =>
      import("@/components/ProcessView.vue"),
    meta: {
      tittle: '流程跟踪'
    }
  },
  {
    path: "*",
    component: () =>
      import("@/views/Not.vue"),
    meta: {
      tittle: '404'
    }
  }
];
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});
// router.beforeEach((to, from, next) => {
//   if (window.localStorage.getItem('userToken')) {
//     // 如果用户在登录页面
//     next();
//   } else {
//     if (to.name === 'Home') {
//       next();
//     } else {
//       next({ path: '/' })
//     }
//   }
// })
//解决from  home  to  ligin的 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router;
