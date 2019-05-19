export default {
  methods: {
    showMessage(message, type, icon) {
      this.$store.commit('showMessage', {
        message,
        type,
        icon,
      });

      setTimeout(() => {
        this.hideMessage();
      }, 2000);
    },

    hideMessage() {
      this.$store.commit('hideMessage');
    },

    success(message) {
      this.showMessage(message, 'success', 'check');
    },

    error(message) {
      this.showMessage(message, 'error', 'times');
    },
  },
};
