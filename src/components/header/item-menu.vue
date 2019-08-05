<template>
	<div class="item-menu" @click="$emit('click-item', data)">
		<img :src="data.webImage" class="img-menu">
		<span class="item-text" :style="data.select ? `color: ${colorSelect}` : '#4a4a4a'">{{data.title}}</span>
	</div>
</template>
<script>
export default {
	name: 'item-menu',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		colorSelect: String,
	},
};
</script>
<style lang="scss" scoped>
	.item-menu {
		align-items: center;
		display: flex;
	}

	.item-text {
		color: color(dark);
		font-family: font(bold);
		font-size: size(medium);
		margin-left: 12px;

		@media (max-width: 764px) {
			font-size: size(small);
		}
	}

	.img-menu {
		height: 32px;
		width: 31px;

		@media (max-width: 764px) {
			width: 24px;
		}
	}
</style>


