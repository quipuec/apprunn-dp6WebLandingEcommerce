<template>
	<button
		class="app-button"
		@click="$emit('click-image')"
		v-bind="$attrs"
	>
		<div class="button-number" v-if="ifNumber">{{number}}</div>
		<img :src="imageUser"
			:alt="data.name"
			:height="data.height || 20" 
		>
		{{name}}
	</button>
</template>
<script>
function imageUser() {
	return this.data.image || this.data.logo || this.data.urlImage || process.env.DEFAULT_AVATAR;
}

export default {
	name: 'app-button-image',
	computed: {
		imageUser,
	},
	inheritAttrs: false,
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		name: {
			type: String,
			default: '',
		},
		url: String,
		ifNumber: {
			type: Boolean,
			default: false,
		},
		number: [String, Number],
	},
};
</script>
<style lang="scss" scoped>
	.button-number {
		background: color(primary);
		border-radius: 50%;
		color: color(white);
		height: 14px;
		font-family: font(bold);
		font-size: size(xsmall);
		position: absolute;
		right: -6px;
		text-align: center;
		top: -6px;
		width: 14px; 
	}

	.app-button {
		position: relative;
	}

	[disabled] {
		background-color: color(disabled);
		cursor: not-allowed;
	}
</style>


