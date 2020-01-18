<template>
  <div class="ueditor">
    <div>
      <script :id="editorId" type="text/plain"></script>
    </div>
  </div>
</template>
<script>
import '@public/lib/UEditor/ueditor.config.js'
import '@public/lib/UEditor/ueditor.all.js'
import '@public/lib/UEditor/ueditor.parse.js'
import '@public/lib/UEditor/lang/zh-cn/zh-cn.js'

export default {
  name: 'ueditor',
  data () {
    return {
      editor: null,
      editorId: 'ueditor' + Math.random()
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const _this = this
    // 初始化UE
    this.editor = UE.getEditor(this.editorId, this.config)
    // 确保UE加载完成后，放入内容。
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.value)
      if (_this.disabled) {
        _this.editor.setDisabled()
      }
      _this.editor.addListener('contentChange', function () {
        const content = _this.editor.getContent()
        _this.$emit('getContent', content)
      })
    })
  },
  methods: {
    // 获取内容方法
    getUEContent () {
      return this.editor.getContent()
    },
    checkTooLength () {
      // 只获取文字的长度
      if (this.editor.getContentLength(true) > this.config.maximumWords) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    disabled (nv) {
      if (nv) {
        this.editor.setDisabled()
      } else {
        this.editor.setEnabled()
        this.editor.blur()
      }
    },
    value (val) {
      // 数据渲染完毕之后再触发
      this.$nextTick(function () {
        this.editor.setContent(val)
      })
    }
  },
  destroyed () {
    if (this.editor) {
      // this.editor.setContent('');
      this.editor.destroy()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ueditor {
    line-height 20px
    script {
      width 100%
      height 120px
      border-radius 2px
      padding 10px
    }
  }
</style>
