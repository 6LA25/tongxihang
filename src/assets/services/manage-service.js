import { Fetch } from '@public/service/http'
import URL from '@public/service/url'
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
