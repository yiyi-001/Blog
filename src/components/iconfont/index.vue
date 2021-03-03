<template>
	<svg :class="svgClass" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#${this.icon}`
    },
    svgClass () {
      if (this.iconClass) {
        return `svg-icon svg-icon-${this.icon} ${this.iconClass}`
      } else {
        return `svg-icon svg-icon-${this.icon}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
