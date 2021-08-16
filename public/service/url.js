let domain = process.env.NODE_ENV === 'development' ? '' : 'http://anxuanhouse.com'
// let domain = process.env.NODE_ENV === 'development' ? '' : 'http://106.15.190.210:8888'
// let domain = process.env.NODE_ENV === 'development' ? '' : ''
// let domain = ''

export default {
  bench: {
    base: `${domain}/api/admin/index/base`,
    rank: `${domain}/api/admin/index/agent`,
    hotView: `${domain}/api/admin/index/hotView`,
    salesRatio: `${domain}/api/admin/index/salesRatio`,
    chart: `${domain}/api/admin/index/items`
  },
  login: {
    keys: `${domain}/api/member/admin/login/publickey`,
    login: `${domain}/api/member/admin/login`,
    logout: `${domain}/api/member/admin/logout`,
    permission: `${domain}/api/admin/common/permissions/all`,
    userSig: `${domain}/api/im/genUserSig`
  },
  user: {
    all: `${domain}/api/admin/adminuser/items`,
    commonUser: `${domain}/api/admin/common/authorization/users`,
    items: `${domain}/api/admin/user/items`,
    agents: `${domain}/api/admin/userAgent/items`,
    handover: `${domain}/api/admin/adminuser/handover`
  },
  staff: {
    add: `${domain}/api/admin/adminuser/edit`,
    all: `${domain}/api/admin/adminuser/items`,
    item: `${domain}/api/admin/adminuser/item`,
    permissions: `${domain}/api/admin/common/user/permissions`,
    develop: `${domain}/api/admin/adminuser/report`
  },
  role: {
    edit: `${domain}/api/admin/roles/edit`,
    all: `${domain}/api/admin/roles/items`,
    item: `${domain}/api/admin/roles/item`
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
    apartmentItem: `${domain}/api/admin/apartment/item`,
    deleteType: `${domain}/api/admin/apartment/del`,
    editDynamic: `${domain}/api/admin/house/trends/edit`,
    dynamicList: `${domain}/api/admin/house/trends/items`,
    delDynamic: `${domain}/api/admin/house/trends/del`
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
    list: `${domain}/api/admin/customer/items`,
    kehuItem: `${domain}/api/admin/customer/item`,
    close: `${domain}/api/admin/customer/close`,
    send: `${domain}/api/admin/customer/distribute`,
    add: `${domain}/api/admin/customer/add`,
    myList: `${domain}/api/admin/mycustomer/items`,
    addLog: `${domain}/api/admin/mycustomer/follow/edit`,
    logs: `${domain}/api/admin/mycustomer/follow/items`,
    edit: `${domain}/api/admin/customer/edit`,
    editDws: `${domain}/api/admin/customer/collect/edit`,
    dwsItems: `${domain}/api/admin/customer/collect/items`,
    dwsItem: `${domain}/api/admin/customer/collect/item`,
    updateStatus: `${domain}/api/admin/customer/collect/updateStatus`,
    reSend: `${domain}/api/admin/customer/redistribution`,
    updateLog: `${domain}/api/admin/customer/follow/updateStatus`,
    timeout: `${domain}/api/admin/customer/timeout/items`,
    excel: `${domain}/api/admin/customer/timeout/export`,
    contract: `${domain}/api/admin/customer/contract`
  },
  distribution: {
    list: `${domain}/api/admin/distribution/items`,
    pass: `${domain}/api/admin/distribution/pass`,
    reset: `${domain}/api/admin/distribution/reset`,
    reject: `${domain}/api/admin/distribution/reject`,
    item: `${domain}/api/admin/distribution/item`
  },
  commission: {
    list: `${domain}/api/admin/commission/items`,
    user: `${domain}/api/admin/commission/user/items`,
    item: `${domain}/api/admin/commission/user`,
    items: `${domain}/api/admin/commission/payments`,
    singleItem: `${domain}/api/admin/commission/item`,
    pay: `${domain}/api/admin/commission/pay`,
    paymentItem: `${domain}/api/admin/commission/paymentItem`,
    customerCommission: `${domain}/api/admin/customer/commission`
  },
  article: {
    edit: `${domain}/api/admin/article/edit`,
    items: `${domain}/api/admin/article/items`,
    item: `${domain}/api/admin/article/item`,
    shelves: `${domain}/api/admin/article/shelves`,
    delete: `${domain}/api/admin/article/delete`,
  },
  marketregister: {
    edit: `${domain}/api/admin/marketregister/edit`,
    items: `${domain}/api/admin/marketregister/items`,
    item: `${domain}/api/admin/marketregister/item`,
    registrations: `${domain}/api/admin/marketregister/registrations`,
    shelves: `${domain}/api/admin/marketregister/shelves`,
    excel: `${domain}/api/admin/marketregister/registrations/export`
  },
  markethouse: {
    edit: `${domain}/api/admin/markethouse/edit`,
    items: `${domain}/api/admin/markethouse/items`,
    item: `${domain}/api/admin/markethouse/item`,
    delete: `${domain}/api/admin/markethouse/delete`,
    shelves: `${domain}/api/admin/markethouse/shelves`,
    registrations: `${domain}/api/admin/markethouse/registrations`,
    excel: `${domain}/api/admin/markethouse/registrations/export`
  },
  department: {
    items: `${domain}/api/admin/department/items`,
    edit: `${domain}/api/admin/department/edit`,
    delete: `${domain}/api/admin/department/delete`,
  },
  externalUsers: {
    items: `${domain}/api/admin/externalUsers/items`,
    edit: `${domain}/api/admin/externalUsers/edit`,
    item: `${domain}/api/admin/externalUsers/item`,
    delete: `${domain}/api/admin/externalUsers/delete`,
  }
}
