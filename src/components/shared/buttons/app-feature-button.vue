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
	const bg = `background-color: ${this.isSelected ? this.globalColors.primary : 'white'}`;
	const color = `color:${this.isSelected ? 'white' : this.globalColors.primary}`;
	const border = `border:1px solid ${this.globalColors.primary}`;
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
	},
};
</script>
<style lang="scss" scoped>
	button {
		border-radius: 5px;
		font-family: font(bold);
	}
	[disabled] {
		background-color: color(disabled) !important;
		cursor: not-allowed;
	}
</style>