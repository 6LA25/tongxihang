let domin = process.env.NODE_ENV === 'development' ? '' : 'http://txh.17zxiu.com'

export default {
  login: {
    keys: `${domin}/api/member/admin/login/publickey`,
    login: `${domin}/api/member/admin/login`
  }
}
