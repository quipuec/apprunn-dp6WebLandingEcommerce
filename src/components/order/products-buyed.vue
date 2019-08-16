<template>
	<div class="buyed-main-container">
		<ol class="buyed-products-container">
			<li class="list">
				<div class="grid-product">
					<span class="product-name">Hoco. Audífonos con micrófono Original Hoco. Audífonos con micrófono Original </span>
					<span class="product-quantity">Cantidad: 100</span>
					<h3 class="product-total">S/. 1.4567</h3>
				</div>
			</li>
			<li class="list">
				<div class="grid-product">
					<span class="product-name">Hoco. Audífonos con micrófono Original </span>
					<span class="product-quantity">Cantidad: 100</span>
					<h3 class="product-total">S/. 1.4567</h3>
				</div>
			</li>
		</ol>
	</div>
</template>
<script>
export default {
	name: 'products-buyed',
	props: {
		products: {
			default: () => [],
			type: Array,
		},
	},
};
</script>
<style lang="scss" scoped>
	.buyed-main-container {
		background-color: white;
		border-radius: 8px;
		border: solid 1px color(border);
		font-family: font(bold);
		padding: 27px 92px 27px 55px;
	}

	.grid-product {
		align-items: center;
		display: grid;
    	grid-column-gap: 40px;
		grid-template-columns: 1fr 90px 0.5fr;
		transform: translateX(15px);
	}

	.product-total {
		color: color(secondary);
		font-size: size(large);
	}

	.product-name {
		color: color(dark);
	}

	.product-quantity {
		color: color(dark);
		font-family: font(medium);
	}

	.list {
		border-top: 1px solid color(border);
		color: color(secondary);
		padding: 14px 0;
	}

	.list:first-child {
		border-top: none;
	}
</style>