<template>
  <svg :style="{ 'height': size, 'width': size }" viewBox="0 0 26 26" fill="none">
    <rect :style="{ 'height': size, 'width': size }" fill="none"/>
    <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13 24C19.0751 24 24 19.0751 24 13C24 6.92487 19.0751 2 13 2C6.92487 2 2 6.92487 2 13C2 19.0751 6.92487 24 13 24Z" fill="black"/>
    <path :style="{ 'fill': color }" fill-rule="evenodd" clip-rule="evenodd" d="M12 13.2157V5.88232H14V12.7846L17.569 16.1553L16.1957 17.6093L12.3134 13.9427C12.1134 13.7538 12 13.4908 12 13.2157Z" fill="black"/>
  </svg>
</template>

<script>
export default {
  name: 'time-icon',
  props: {
    color: String,
    size: Number,
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_colors.scss';
</style>
