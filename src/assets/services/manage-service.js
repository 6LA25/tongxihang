import { Fetch } from '@public/service/http'
import URL from '@public/service/url'

// 获取首页基础报表
export const baseSheet = (options) => Fetch({
  url: URL.bench.base,
  data: {
    ...options
  }
})

// 经纪人排行
export const agentRank = (options) => Fetch({
  url: URL.bench.rank,
  data: {
    ...options
  }
})

// 获取首页浏览热门报表
export const hotView = (options) => Fetch({
  url: URL.bench.hotView,
  data: {
    ...options
  }
})

// 获取楼盘柱状图
export const chart = (options) => Fetch({
  url: URL.bench.chart,
  data: {
    ...options
  }
})

// 获取楼盘销售额比
export const salesRatio = (options) => Fetch({
  url: URL.bench.salesRatio,
  data: {
    ...options
  }
})

// 获取所有管理用户
export const fetchAllUsers = (options) => Fetch({
  url: URL.user.commonUser,
  data: {
    ...options
  }
})

export const handoverUser = (options) => Fetch({
  url: URL.user.handover,
  data: {
    ...options
  }
})

// 获取所有菜单权限
export const fetchAllPermissions = (options) => Fetch({
  url: URL.login.permission,
  data: {
    ...options
  }
})

// 新增角色
export const addRole = (options) => Fetch({
  url: URL.role.edit,
  data: {
    ...options
  }
})

// 获取所有角色
export const fetchAllRoles = (options) => Fetch({
  url: URL.role.all,
  data: {
    ...options
  }
})

// 获取单个角色
export const fetchRoleItem = (options) => Fetch({
  url: URL.role.item,
  data: {
    ...options
  }
})

// 获取地区
export const fetchArea = (options) => Fetch({
  url: URL.public.area,
  data: {
    ...options
  }
})

// 初始化上传接口
export const initUpload = () => Fetch({
  url: URL.upload.init
})

// 编辑楼盘
export const editHouse = (options) => Fetch({
  url: URL.house.editHouse,
  data: {
    ...options
  }
})

// 获取楼盘列表
export const fetchHouseList = (options) => Fetch({
  url: URL.house.houseItems,
  data: {
    ...options
  }
})

// 批量上下架
export const changeState = (options) => Fetch({
  url: URL.house.changeState,
  data: {
    ...options
  }
})

// 批量设置热门
export const changeHot = (options) => Fetch({
  url: URL.house.changeHot,
  data: {
    ...options
  }
})

// 获取户型列表
export const fetchHouseTypes = (options) => Fetch({
  url: URL.house.houseTypes,
  data: {
    ...options
  }
})

// 编辑户型
export const editHouseTypes = (options) => Fetch({
  url: URL.house.editHouseTypes,
  data: {
    ...options
  }
})

// 获取单个户型
export const fetchHouseTypeItem = (options) => Fetch({
  url: URL.house.apartmentItem,
  data: {
    ...options
  }
})

// 新增/编辑广告位
export const editAdvertise = (options) => Fetch({
  url: URL.advertise.edit,
  data: {
    ...options
  }
})

// 获取广告位列表
export const fetchAdver = (options) => Fetch({
  url: URL.advertise.list,
  data: {
    ...options
  }
})

// 修改广告位状态
export const batchEditAdvertise = (options) => Fetch({
  url: URL.advertise.changeStatus,
  data: {
    ...options
  }
})

// 查询单条广告位
export const fetchAdverItem = (options) => Fetch({
  url: URL.advertise.checkItem,
  data: {
    ...options
  }
})

// 新增，编辑活动信息
export const editNotice = (options) => Fetch({
  url: URL.notice.edit,
  data: {
    ...options
  }
})

// 查询所有活动信息
export const fetchNotice = (options) => Fetch({
  url: URL.notice.list,
  data: {
    ...options
  }
})

// 查询单个notice
export const fetchNoticeItem = (options) => Fetch({
  url: URL.notice.item,
  data: {
    ...options
  }
})

// 删除
export const deleteNotice = (options) => Fetch({
  url: URL.notice.changeState,
  data: {
    ...options
  }
})

// 获取单个楼盘信息
export const fetchHouseItem = (options) => Fetch({
  url: URL.house.houseItem,
  data: {
    ...options
  }
})

// 获取热词列表
export const fetchSearchWord = (options) => Fetch({
  url: URL.searchWord.list,
  data: {
    ...options
  }
})

// 编辑热词
export const editSearchWord = (options) => Fetch({
  url: URL.searchWord.edit,
  data: {
    ...options
  }
})

// 删除热词
export const deleteSearchWord = (options) => Fetch({
  url: URL.searchWord.delete,
  data: {
    ...options
  }
})

// 获取单个热词
export const fetchHotWordItem = (options) => Fetch({
  url: URL.searchWord.item,
  data: {
    ...options
  }
})

// 意向客户公海
export const fetchCustomerSea = (options) => Fetch({
  url: URL.customer.list,
  data: {
    ...options
  }
})

export const fetchOvertimeCustomer = (options) => Fetch({
  url: URL.customer.timeout,
  data: {
    ...options
  }
})

export const exportOvertimeExcel  = (options, name) => Fetch({
  responseType: 'blob',
  url: URL.customer.excel,
  data: {
    ...options
  }
}, name)



// 关单
export const closeCustomerCase = (options) => Fetch({
  url: URL.customer.close,
  data: {
    ...options
  }
})

// 新增意向客户公海
export const addCustomerSea = (options) => Fetch({
  url: URL.customer.add,
  data: {
    ...options
  }
})

// 获取我的客户列表
export const fetchMyCustomer = (options) => Fetch({
  url: URL.customer.myList,
  data: {
    ...options
  }
})

// 派单
export const sendCustomerCase = (options) => Fetch({
  url: URL.customer.send,
  data: {
    ...options
  }
})

// 新增跟进日志
export const addFollowLog = (options) => Fetch({
  url: URL.customer.addLog,
  data: {
    ...options
  }
})

// 获取跟进日志
export const fetchFollowLogs = (options) => Fetch({
  url: URL.customer.logs,
  data: {
    ...options
  }
})

// 新增员工
export const addStaff = (options) => Fetch({
  url: URL.staff.add,
  data: {
    ...options
  }
})

// 获取员工
export const fetchAlllStaff = (options) => Fetch({
  url: URL.staff.all,
  data: {
    ...options
  }
})

// 获取单个员工信息
export const fetchStaffItem = (options) => Fetch({
  url: URL.staff.item,
  data: {
    ...options
  }
})

// 删除户型
export const deleteHouseType = (options) => Fetch({
  url: URL.house.deleteType,
  data: {
    ...options
  }
})

// 分销审核
export const fetchDistributionList = (options) => Fetch({
  url: URL.distribution.list,
  data: {
    ...options
  }
})

// 审核分销
export const rejectDistribution = (options) => Fetch({
  url: URL.distribution.reject,
  data: {
    ...options
  }
})

export const passDistribution = (options) => Fetch({
  url: URL.distribution.pass,
  data: {
    ...options
  }
})

export const resetDistribution = (options) => Fetch({
  url: URL.distribution.reset,
  data: {
    ...options
  }
})

// 打款列表
export const fetchCommissionList = (options) => Fetch({
  url: URL.commission.list,
  data: {
    ...options
  }
})

// 查询用户基础信息
export const fetchCommissionUser = (options) => Fetch({
  url: URL.commission.user,
  data: {
    ...options
  }
})

// 查询单个用户打款记录
export const fetchCommissionItem = (options) => Fetch({
  url: URL.commission.item,
  data: {
    ...options
  }
})

// 结算单查询
export const fetchCommissionItems = (options) => Fetch({
  url: URL.commission.items,
  data: {
    ...options
  }
})

// 查询某个付款数据
export const fetchCommissionSingle = (options) => Fetch({
  url: URL.commission.singleItem,
  data: {
    ...options
  }
})

// 添加打款
export const commissionPay = (options) => Fetch({
  url: URL.commission.pay,
  data: {
    ...options
  }
})

// 获取用户列表
export const fetchAllRegisters = (options) => Fetch({
  url: URL.user.items,
  data: {
    ...options
  }
})

// 获取经纪人列表
export const fetchAllAgents = (options) => Fetch({
  url: URL.user.agents,
  data: {
    ...options
  }
})

// 员工发展
export const fetchUserDevelop = (options) => Fetch({
  url: URL.staff.develop,
  data: {
    ...options
  }
})

// 新增楼盘动态
export const editHouseDynamic = (options) => Fetch({
  url: URL.house.editDynamic,
  data: {
    ...options
  }
})

// 楼盘动态列表
export const houseDynamicList = (options) => Fetch({
  url: URL.house.dynamicList,
  data: {
    ...options
  }
})

// 删除动态
export const delDynamicList = (options) => Fetch({
  url: URL.house.delDynamic,
  data: {
    ...options
  }
})

// 编辑客户
export const editCustomer = (options) => Fetch({
  url: URL.customer.edit,
  data: {
    ...options
  }
})

// 获取单个客户
export const fetchKehuItem = (options) => Fetch({
  url: URL.customer.kehuItem,
  data: {
    ...options
  }
})

// 编辑待完善客户
export const editDwsCustomer = (options) => Fetch({
  url: URL.customer.editDws,
  data: {
    ...options
  }
})

// 获取待完善客户
export const fetchDwsKehuItem = (options) => Fetch({
  url: URL.customer.dwsItem,
  data: {
    ...options
  }
})

// 获取待完善信息客户列表
export const fetchDwsList = (options) => Fetch({
  url: URL.customer.dwsItems,
  data: {
    ...options
  }
})

// 关单及重启
export const updateCustomerCase = (options) => Fetch({
  url: URL.customer.updateStatus,
  data: {
    ...options
  }
})

// 获取单个佣金数据
export const fetchDistributionItem = (options) => Fetch({
  url: URL.distribution.item,
  data: {
    ...options
  }
})

// 重新派单
export const redistributionCase = (options) => Fetch({
  url: URL.customer.reSend,
  data: {
    ...options
  }
})

// 更新日志展示
export const updateLogShow = (options) => Fetch({
  url: URL.customer.updateLog,
  data: {
    ...options
  }
})

// 获取结算单详情
export const fetchPaymentItem = (options) => Fetch({
  url: URL.commission.paymentItem,
  data: {
    ...options
  }
})

// 编辑文章
export const editArticle = (options) => Fetch({
  url: URL.article.edit,
  data: {
    ...options
  }
})

// 搜索文章
export const fetchAllArticles = (options) => Fetch({
  url: URL.article.items,
  data: {
    ...options
  }
})

// 搜索文章
export const fetchItemArticle = (options) => Fetch({
  url: URL.article.item,
  data: {
    ...options
  }
})

// 批量上下架文章
export const shelvesArticles  = (options) => Fetch({
  url: URL.article.shelves,
  data: {
    ...options
  }
})

export const deleteArticle  = (options) => Fetch({
  url: URL.article.delete,
  data: {
    ...options
  }
})

// 营销活动-报名活动
export const editMarketRegister  = (options) => Fetch({
  url: URL.marketregister.edit,
  data: {
    ...options
  }
})

export const fetchMarketRegister  = (options) => Fetch({
  url: URL.marketregister.items,
  data: {
    ...options
  }
})

export const fetchRegistrations  = (options) => Fetch({
  url: URL.marketregister.registrations,
  data: {
    ...options
  }
})

// 上下架
export const batchRegistrationsShelves = (options) => Fetch({
  url: URL.marketregister.shelves,
  data: {
    ...options
  }
})

export const fetchMarketRegisterItem  = (options) => Fetch({
  url: URL.marketregister.item,
  data: {
    ...options
  }
})

export const exportRegisterExcel  = (options, name) => Fetch({
  responseType: 'blob',
  url: URL.marketregister.excel,
  data: {
    ...options
  }
}, name)

// 楼盘活动
export const editMarkethouse  = (options) => Fetch({
  url: URL.markethouse.edit,
  data: {
    ...options
  }
})

export const fetchMarkethouse  = (options) => Fetch({
  url: URL.markethouse.items,
  data: {
    ...options
  }
})

export const fetchMarkethouseItem  = (options) => Fetch({
  url: URL.markethouse.item,
  data: {
    ...options
  }
})

export const deleteMarkethouse  = (options) => Fetch({
  url: URL.markethouse.delete,
  data: {
    ...options
  }
})

export const upMarkethouse  = (options) => Fetch({
  url: URL.markethouse.shelves,
  data: {
    ...options
  }
})

export const fetchMarkethouseRegistrations  = (options) => Fetch({
  url: URL.markethouse.registrations,
  data: {
    ...options
  }
})

export const exportMarkethouseExcel  = (options, name) => Fetch({
  responseType: 'blob',
  url: URL.markethouse.excel,
  data: {
    ...options
  }
}, name)

export const fetchContract  = (options) => Fetch({
  url: URL.customer.contract,
  data: {
    ...options
  }
})

export const fetchCustomerCommission  = (options) => Fetch({
  url: URL.commission.customerCommission,
  data: {
    ...options
  }
})

export const fetchAllDepartments  = (options) => Fetch({
  url: URL.department.items,
  data: {
    ...options
  }
})

export const editDepartment  = (options) => Fetch({
  url: URL.department.edit,
  data: {
    ...options
  }
})

export const deleteDepartment  = (options) => Fetch({
  url: URL.department.delete,
  data: {
    ...options
  }
})

export const fetchExternalUsers  = (options) => Fetch({
  url: URL.externalUsers.items,
  data: {
    ...options
  }
})

export const editExternalUser  = (options) => Fetch({
  url: URL.externalUsers.edit,
  data: {
    ...options
  }
})

export const fetchExternalUser  = (options) => Fetch({
  url: URL.externalUsers.item,
  data: {
    ...options
  }
})

export const deleteExternalUser  = (options) => Fetch({
  url: URL.externalUsers.delete,
  data: {
    ...options
  }
})

