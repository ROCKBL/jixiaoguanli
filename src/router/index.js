import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    // 任务消息列表
    path: '/taskMessages',
    name: 'taskMessages',
    component: () => import('../views/taskMessages.vue')
  },
  {
    // 任务消息详情
    path: '/taskMessageDetail',
    name: 'taskMessageDetail',
    component: () => import('../views/taskMessageDetail.vue')
  },

  {
    // 积分消息
    path: '/jifenMessages',
    name: 'jifenMessages',
    component: () => import('../views/jifenMessages.vue')
  },
  {
    // 公司信息
    path: '/companyInfo',
    name: 'companyInfo',
    component: () => import('../views/companyInfo.vue')
  },

  {
    // 公告信息
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice.vue')
  },
  {
    // 公告信息详情
    path: '/noticeDetail',
    name: 'noticeDetail',
    component: () => import('../views/noticeDetail.vue')
  },

  {
    // 任务目标
    path: '/task',
    name: 'task',
    component: () => import('../views/task.vue')
  },
  {
    // 任务目标跳转中间层
    path: '/taskMid',
    name: 'taskMid',
    component: () => import('../views/taskMid.vue')
  },

  {
    // 积分详情
    path: '/jifenInfo',
    name: 'jifenInfo',
    component: () => import('../views/jifenInfo.vue')
  },

  {
    // 排行榜
    path: '/rank',
    name: 'rank',
    component: () => import('../views/rank.vue')
  },
  {
    // 排行榜
    path: '/rankdep',
    name: 'rankdep',
    component: () => import('../views/rankdep.vue')
  },


  {
    // 我的
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine.vue')
  },


  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },

  {
    path: '/taskDetail',
    name: 'taskDetail',
    component: () => import('../views/taskDetail.vue')
  },

  {
    // 个人任务
    path: '/personalTask',
    name: 'personalTask',
    component: () => import('../views/personalTask.vue')
  },

  {
    // 外出申请记录
    path: '/applyHistory',
    name: 'applyHistory',
    component: () => import('../views/applyHistory.vue')
  },
  {
    // 外出申请详情
    path: '/applyHistoryDetail',
    name: 'applyHistoryDetail',
    component: () => import('../views/applyHistoryDetail.vue')
  },

  {
    // 提交建议记录
    path: '/adviceHistory',
    name: 'adviceHistory',
    component: () => import('../views/adviceHistory.vue')
  },
  {
    // 提交建议详情
    path: '/adviceHistoryDetail',
    name: 'adviceHistoryDetail',
    component: () => import('../views/adviceHistoryDetail.vue')
  },

  {
    // 公司级任务
    path: '/companyTask',
    name: 'companyTask',
    component: () => import('../views/companyTask.vue')
  },
  {
    // 部门级任务
    path: '/depTask',
    name: 'depTask',
    component: () => import('../views/depTask.vue')
  },


  {
    // 附件
    path: '/fujian',
    name: 'fujian',
    component: () => import('../views/fujian.vue')
  },

  {
    // 附件申请下载
    path: '/fujianApply',
    name: 'fujianApply',
    component: () => import('../views/fujianApply.vue')
  },
  {
    // 附件下载
    path: '/fujianDownload',
    name: 'fujianDownload',
    component: () => import('../views/fujianDownload.vue')
  },


  {
    // 生日提醒列表
    path: '/birthdayNotice',
    name: 'birthdayNotice',
    component: () => import('../views/birthdayNotice.vue')
  },

  {
    // 生日提醒列表
    path: '/approvalNotice',
    name: 'approvalNotice',
    component: () => import('../views/approvalNotice.vue')
  },


  {
    // 功勋福利
    path: '/gongxunfuli',
    name: 'gongxunfuli',
    component: () => import('../views/gongxunfuli.vue')
  },

  {
    // 三会列表
    path: '/meetings',
    name: 'meetings',
    component: () => import('../views/meetings.vue')
  },
  {
    // 三会详情
    path: '/meetingInfo',
    name: 'meetingInfo',
    component: () => import('../views/meetingInfo.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',

  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
