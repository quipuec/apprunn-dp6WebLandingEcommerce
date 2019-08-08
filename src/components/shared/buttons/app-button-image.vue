<template>
  <div class="app-button-image">
		<button class="app-button" @click="$emit('click-image')">
			<div class="button-number" v-if="ifNumber">{{number}}</div>
			<img :src="imageUser"
				:alt="data.name"
				:height="data.height || 20" 
			>
		</button>
	</div>
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
	props: {
		data: {
			type: Object,
			default: () => {},
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
</style>


