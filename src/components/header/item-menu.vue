<template>
	<div 
		class="item-menu" 
		@click="$emit('click-item', data)"
		@mouseenter="$emit('hover-item', data)">
		<img
			:src="data.webImage"
			:class="[
				'img-menu',
				{ 'active': data.select },
			]"
		>
		<span 
			class="item-text"
			:style="data.select ? `color: white` : `color: ${globalColors.title};transition:all 200ms ease-in;`"
		>{{data.title}}</span>
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
		filter: brightness(0) invert(0.28);
		height: 27px;
		width: 27px;

		@media (max-width: 764px) {
			width: 24px;
		}
	}

	.active {
		filter: brightness(10);
	}
</style>


