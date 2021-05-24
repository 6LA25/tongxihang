<template>
  <div class="chat-bubble">
    <div>撤回</div>
  </div>
</template>
<script>
export default {
  name: 'MessageBubble',
  components: {},
  data() {
    return {
      isTimeout: false,
      showConversationList: false,
      relayMessage: {},
      selectedConversation: [],
      testMergerMessage: {},
    }
  },
  props: {
    isMine: {
      type: Boolean,
    },
    isNew: {
      type: Boolean,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  created() {},
  mounted() {
  },
  beforeDestroy() {
  },
  beforeDestroy() {
    if (this.$refs.dropdown && this.$refs.dropdown.$el) {
      this.$refs.dropdown.$el.removeEventListener(
        'mousedown',
        this.handleDropDownMousedown
      )
    }
  },
  updated() {},
  computed: {},
  methods: {
    handleDropDownMousedown(e) {
      console.log('e', e)
      if (e.buttons === 2) {
        if (this.$refs.dropdown.visible) {
          // this.$refs.dropdown.hide()
        } else {
          this.$refs.dropdown.show()
        }
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'revoke':
          this.tim
            .revokeMessage(this.message)
            .then(() => {
              this.isTimeoutHandler()
            })
            .catch((err) => {
              this.$store.commit('showMessage', {
                message: err,
                type: 'warning',
              })
            })
          break
        case 'relay':
          this.showConversationList = true
          this.$store.commit('setRelayType', 1)
          this.$store.commit('showConversationList', true)
          this.$store.commit('setRelayMessage', this.message)
          break
        case 'merger':
          this.$bus.$emit('mergerSelected', true)
          break
        default:
          break
      }
    },
    isTimeoutHandler() {
      // 从发送消息时间开始算起，两分钟内可以编辑
      let now = new Date()
      if (parseInt(now.getTime() / 1000) - this.message.time > 2 * 60) {
        this.isTimeout = true
        return
      }
      setTimeout(this.isTimeoutHandler, 1000)
    },
    reEdit() {
      this.$bus.$emit('reEditMessage', this.message.payload.text)
    },
  },
}
</script>
<style lang="stylus">
.chat-bubble {
  position: absolute;
  top: 0;
  left: 0;
}
</style>