import { Fetch } from '@public/service/http'
import URL from '@public/service/url'

export const fetchKey = (options) => Fetch({
  url: URL.login.keys,
  data: {
    ...options
  }
})
