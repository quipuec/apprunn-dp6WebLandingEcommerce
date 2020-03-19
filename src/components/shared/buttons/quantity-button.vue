<template>
	<div class="quantity-button">
		<button class="item" @click="$emit('click', 'less')">-</button>
		<div class="item item-number" :style="`color:${globalColors.title}`">{{number}}</div>
		<button class="item" @click="$emit('click', 'more')">+</button>
	</div>
</template>
<script>
export default {
	name: 'quantity-button',
	props: {
		number: {
			default: () => 1,
			type: Number,
		},
	},
};
</script>
<style lang="scss" scoped>
	.quantity-button {
		border: 1px solid color(base);
		border-radius: 5px;
		color: color(base);
		display: flex;
		font-family: font(bold);
		font-size: size(medium);
		height: 27px;
		width: 116px;

		.item {
			flex: 1 1 auto;
		}

		.item-number {
			align-items: center;
			border-left: 1px solid color(base);
			border-right: 1px solid color(base);
			display: flex;
			font-family: font(heavy);
			justify-content: center;
		}

		button:hover {
			background-color: color(border);
		}
	}
</style>