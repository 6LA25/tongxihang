import { Fetch } from '@public/service/http'
import URL from '@public/service/url'
// 获取地区
export const fetchArea = (options) => Fetch({
  url: URL.public.area,
  data: {
    ...options
  }
})
