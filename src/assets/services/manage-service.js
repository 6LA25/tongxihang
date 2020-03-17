import { Fetch } from '@public/service/http'
import URL from '@public/service/url'
// 获取所有管理用户
export const fetchAllUsers = (options) => Fetch({
  url: URL.user.commonUser,
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
