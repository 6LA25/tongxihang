import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashbord.vue'),
    children: [
      {
        path: '/dashboard-work-bench',
        name: 'dashboard-work-bench',
        component: () => import(/* webpackChunkName: "workbench" */ '../views/WorkBench.vue')
      },
      {
        path: '/manage-houses',
        name: 'manage-houses',
        component: () => import(/* webpackChunkName: "ManageHouses" */ '../views/manage/ManageHouses.vue')
      },
      {
        path: '/add-houses',
        name: 'add-houses',
        component: () => import(/* webpackChunkName: "AddHouses" */ '../views/manage/AddHouses.vue')
      }, {
        path: '/house-dynamic',
        name: 'house-dynamic',
        component: () => import(/* webpackChunkName: "HouseDynamic" */ '../views/manage/HouseDynamic.vue')
      },
      {
        path: '/add-role',
        name: 'add-role',
        component: () => import(/* webpackChunkName: "AddRole" */ '../views/manage/AddRole.vue')
      },
      {
        path: '/add-house-type',
        name: 'add-house-type',
        component: () => import(/* webpackChunkName: "AddHouseType" */ '../views/manage/AddHouseType.vue')
      },
      {
        path: '/add-following-record',
        name: 'add-following-record',
        component: () => import(/* webpackChunkName: "AddFollowingRecord" */ '../views/manage/AddFollowingRecord.vue')
      },
      {
        path: '/manage-label',
        name: 'manage-label',
        component: () => import(/* webpackChunkName: "ManageLabel" */ '../views/manage/ManageLabel.vue')
      },
      {
        path: '/manage-customer-sea',
        name: 'manage-customer-sea',
        component: () => import(/* webpackChunkName: "ManageCustomerSea" */ '../views/manage/ManageCustomerSea.vue')
      },
      {
        path: '/perfect-customer-info',
        name: 'perfect-customer-info',
        component: () => import(/* webpackChunkName: "PerfectCustomerInfo" */ '../views/manage/PerfectCustomerInfo.vue')
      },
      {
        path: '/edit-customer',
        name: 'edit-customer',
        component: () => import(/* webpackChunkName: "EditCustomer" */ '../views/manage/EditCustomer.vue')
      },
      {
        path: '/edit-dws-customer',
        name: 'edit-dws-customer',
        component: () => import(/* webpackChunkName: "EditDwsCustomer" */ '../views/manage/EditDwsCustomer.vue')
      },
      {
        path: '/add-intention-customer',
        name: 'add-intention-customer',
        component: () => import(/* webpackChunkName: "AddIntentionCustomer" */ '../views/manage/AddIntentionCustomer.vue')
      },
      {
        path: '/manage-customer-following',
        name: 'manage-customer-following',
        component: () => import(/* webpackChunkName: "ManageCustomerFollowing" */ '../views/manage/ManageCustomerFollowing.vue')
      },
      {
        path: '/manage-commission',
        name: 'manage-commission',
        component: () => import(/* webpackChunkName: "ManageComission" */ '../views/manage/ManageCommission.vue')
      },
      {
        path: '/confirm-transfer-account',
        name: 'confirm-transfer-account',
        component: () => import(/* webpackChunkName: "ConfirmTransferAccount" */ '../views/manage/ConfirmTransferAccount.vue')
      },
      { // 结算管理
        path: '/manage-settled',
        name: 'manage-settled',
        component: () => import(/* webpackChunkName: "ManageSettled" */ '../views/manage/ManageSettled.vue')
      },
      {
        path: '/check-final-statement',
        name: 'check-final-statement',
        component: () => import(/* webpackChunkName: "CheckFinalStatement" */ '../views/manage/CheckFinalStatement.vue')
      },
      { // 财务统计表
        path: '/manage-financial-statistics',
        name: 'manage-financial-statistics',
        component: () => import(/* webpackChunkName: "ManageFinancialStatistics" */ '../views/manage/ManageFinancialStatistics.vue')
      },
      {
        path: '/manage-register-user',
        name: 'manage-register-user',
        component: () => import(/* webpackChunkName: "ManageRegisterUser" */ '../views/manage/ManageRegisterUser.vue')
      },
      {
        path: '/broker-info',
        name: 'broker-info',
        component: () => import(/* webpackChunkName: "BrokerInfo" */ '../views/manage/BrokerInfo.vue')
      },
      {
        path: '/manage-advertise-place',
        name: 'manage-advertise-place',
        component: () => import(/* webpackChunkName: "ManageAdvertisePlace" */ '../views/manage/ManageAdvertisePlace.vue')
      },
      {
        path: '/add-advertisement-position',
        name: 'add-advertisement-position',
        component: () => import(/* webpackChunkName: "AddAdvertisementPosition" */ '../views/manage/AddAdvertisementPosition.vue')
      },
      {
        path: '/manage-hot-word',
        name: 'manage-hot-word',
        component: () => import(/* webpackChunkName: "ManageHotWord" */ '../views/manage/ManageHotWord.vue')
      },
      {
        path: '/manage-activity-message',
        name: 'manage-activity-message',
        component: () => import(/* webpackChunkName: "ManageActivityMessage" */ '../views/manage/ManageActivityMessage.vue')
      },
      {
        path: '/manage-role',
        name: 'manage-role',
        component: () => import(/* webpackChunkName: "ManageRole" */ '../views/manage/ManageRole.vue')
      },
      {
        path: '/manage-staff',
        name: 'manage-staff',
        component: () => import(/* webpackChunkName: "ManageStaff" */ '../views/manage/ManageStaff.vue')
      },
      {
        path: '/add-staff',
        name: 'add-staff',
        component: () => import(/* webpackChunkName: "AddStaff" */ '../views/manage/AddStaff.vue')
      },
      {
        path: '/manage-permission',
        name: 'manage-permission',
        component: () => import(/* webpackChunkName: "ManagePermission" */ '../views/manage/ManagePermission.vue')
      },
      {
        path: '/user-develop',
        name: 'user-develop',
        component: () => import(/* webpackChunkName: "ManagePermission" */ '../views/manage/UserDevelop.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
