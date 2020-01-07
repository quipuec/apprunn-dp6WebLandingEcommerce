<template>
	<div>
	<v-btn
			v-if="!notAllowed"
			slot="activator"
			class="pa-2"
			type="button"
			:style="btnStyle"
			v-bind="$attrs"
			v-on="$listeners"
		>{{feature.value}}
		</v-btn>
	<v-tooltip top v-else>
		<v-btn
			slot="activator"
			class="pa-2"
			type="button"
			:style="btnStyle"
			v-bind="$attrs"
			v-on="$listeners"
		>{{feature.value}}
		</v-btn>
		<span>No Disponible</span>
	</v-tooltip>
	</div>
</template>
<script>

function btnStyle() {
	const bgSelected = this.globalColors.primary;
	const notAllowedColor = this.globalColors.base;
	const notAllowedStatus = this.notAllowed ? notAllowedColor : bgSelected;
	const bg = `background-color:${this.isSelected ? bgSelected : 'white'}`;
	const color = `color:${this.isSelected ? 'white' : notAllowedStatus}`;
	const border = `border:${this.isSelected ? 'red' : notAllowedStatus}`;
	const borderAllowed = `border:1px solid ${notAllowedStatus}`;
	return `${bg};${color};${border};${borderAllowed}`;
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