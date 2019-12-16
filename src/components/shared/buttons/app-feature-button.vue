<template>
	<button
		class="pa-2"
		type="button"
		:style="btnStyle"
		v-bind="$attrs"
		v-on="$listeners"
	>{{feature.value}}</button>
</template>
<script>

function btnStyle() {
	const bgSelected = this.globalColors.secondary;
	const notAllowedColor = this.globalColors.base;
	const notAllowedStatus = this.notAllowed ? notAllowedColor : bgSelected;
	const bg = `background-color:${this.isSelected ? bgSelected : 'white'}`;
	const color = `color:${this.isSelected ? 'white' : notAllowedStatus}`;
	const border = `border:1px solid ${notAllowedStatus}`;
	return `${bg};${color};${border};`;
}

export default {
	name: 'app-feature-button',
	computed: {
		btnStyle,
	},
	inheritAttrs: false,
	props: {
		feature: {
			default: () => {},
			type: Object,
		},
		isSelected: {
			default: false,
			type: Boolean,
		},
		notAllowed: {
			default: false,
			type: Boolean,
		},
	},
};
</script>
<style lang="scss" scoped>
	button {
		border-radius: 5px;
		font-family: font(bold);
	}
</style>