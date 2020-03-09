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
    houseItem: `${domain}/api/admin/house/item`,
    changeState: `${domain}/api/admin/house/changeState`,
    changeHot: `${domain}/api/admin/house/changeHot`,
    houseTypes: `${domain}/api/admin/apartment/items`,
    editHouseTypes: `${domain}/api/admin/apartment/edit`,
    apartmentItem: `${domain}/api/admin/apartment/item`
  },
  advertise: {
    list: `${domain}/api/admin/promote/items`,
    edit: `${domain}/api/admin/promote/edit`,
    changeStatus: `${domain}/api/admin/promote/changeStatus`,
    checkItem: `${domain}/api/admin/promote/item`
  },
  notice: {
    edit: `${domain}/api/admin/notices/edit`,
    list: `${domain}/api/admin/notices/items`,
    item: `${domain}/api/admin/notices/item`,
    changeState: `${domain}/api/admin/notices/changeState`
  },
  searchWord: {
    list: `${domain}/api/admin/searchWord/items`,
    edit: `${domain}/api/admin/searchWord/edit`,
    delete: `${domain}/api/admin/searchWord/del`,
    item: `${domain}/api/admin/searchWord/item`
  },
  customer: {
    list: `${domain}/api/admin/customer/items`
  }
}
