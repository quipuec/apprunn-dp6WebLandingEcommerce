<template>
	<div 
		class="item-menu" 
		@click="$emit('click-item', data)"
		@mouseenter="$emit('hover-item', data)">
		<img :src="data.webImage" class="img-menu">
		<span class="item-text" :style="data.select ? `color: ${globalColors.primary}` : `color: ${globalColors.dark}`">{{data.title}}</span>
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
		height: 27px;
		width: 27px;
	}
</style>


