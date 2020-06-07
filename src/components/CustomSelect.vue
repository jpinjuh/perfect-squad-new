<template>
  <div class="select-wrapper">
    <div class="select-title">{{ title }}:</div>
    <div class="custom-select" @blur="open = false">
      <div :class="[{ open: open }, 'selected']" @click="open = !open">
        <i>{{ selected }}</i>
      </div>
      <div :class="[{ selectHide: !open }, 'items']">
        <div
          v-for="(option, i) of options"
          :class="[{ active: option === selected }, 'item']"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);
          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selected: null,
    open: false
  }),
  mounted() {
    this.selected = "none selected";
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_base.scss";

.select-wrapper {
  display: flex;
  align-items: center;
}

.select-title {
  color: $secondaryColor;
}

.custom-select {
  position: relative;
  width: 108px;
  outline: none;
  text-align: center;
  line-height: normal;
}

.selected {
  color: $secondaryColor;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.active {
  color: $accentColor !important;
}

.items {
  color: $secondaryColor;
  overflow: hidden;
  position: absolute;
  padding: 25px 0px;
  background-color: $primaryColor;
  box-shadow: 0px 2px 4.9px 0.1px rgba(0, 0, 0, 0.4);
  left: 0;
  right: 0;
  .item {
    color: $secondaryColor;
    text-align: center;
    cursor: pointer;
    user-select: none;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}

.selectHide {
  display: none;
}
</style>
