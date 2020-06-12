// close dropdown on click outside
export const closeOnClickOutside = {
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    }
  },
  mounted() {
    window.addEventListener("click", this.close);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.close);
  }
};
