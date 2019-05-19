export default {
  methods: {
    loading(bool) {
      this.$store.commit('loading', bool);
    },
  },
};
