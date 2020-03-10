import { Fetch } from '@public/service/http'
import URL from '@public/service/url'

// 获取登录密码加密
export const fetchKey = () => Fetch({
  url: URL.login.keys
})

// 登录
export const login = (options) => Fetch({
  url: URL.login.login,
  data: {
    ...options
  }
})

// 获取用户权限
export const fetchStaffPermissions = (options) => Fetch({
  url: URL.staff.permissions,
  data: {
    ...options
  }
})
