<template>
	<div class="quantity-button">
		<button class="item" @click="$emit('click', 'less')">-</button>
		<div class="item item-number">{{number}}</div>
		<button class="item" @click="$emit('click', 'more')">+</button>
	</div>
</template>
<script>
export default {
	name: 'quantity-button',
	props: {
		number: {
			default: 1,
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
		font-size: size(large);
		height: 37px;
		width: 116px;

		.item {
			flex: 1 1 auto;
		}

		.item-number {
			align-items: center;
			display: flex;
			justify-content: center;
		}
	}
</style>