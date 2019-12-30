import { Fetch } from '@public/service/http'
import URL from '@public/service/url'

export const fetchDemo = (options) => Fetch({
  url: URL.demo,
  data: {
    ...options
  }
})
