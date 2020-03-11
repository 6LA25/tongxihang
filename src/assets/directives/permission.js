export default {
  /**
     * 操作权限自定义指令
     * @param el 指令所绑定的元素，可以用来直接操作 DOM
     * @param binding 一个对象，包含指令的相关属性
     */
  bind: function (el, binding) {
    let permission = binding.value
    // 暂时从前台session中取
    let permissions = sessionStorage.getItem('permissions')
    if (!permissions || !permission) {
      // el.style.display = 'none'
      return
    }
    if (permissions.indexOf(permission) === -1) {
      // el.style.display = 'none'
    }
  }

}
