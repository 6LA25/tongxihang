let domain = process.env.NODE_ENV === 'development' ? '' : 'http://txh.17zxiu.com'
// let domain = 'http://txh.17zxiu.com'

export default {
  login: {
    keys: `${domain}/api/member/admin/login/publickey`,
    login: `${domain}/api/member/admin/login`
  },
  public: {
    area: `${domain}/api/admin/common/area/children`
  },
  upload: {
    init: `${domain}/api/admin/common/upload/init`
  },
  house: {
    editHouse: `${domain}/api/admin/house/edit`,
    houseItems: `${domain}/api/admin/house/items`,
    changeState: `${domain}/api/admin/house/changeState`,
    changeHot: `${domain}/api/admin/house/changeHot`
  }
}
