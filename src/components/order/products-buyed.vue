<template>
	<div class="buyed-main-container">
		<ol class="buyed-products-container">
			<li
				:style="`color: ${globalColors.secondary};`"
				class="list"
				v-for="product in getOrderDetails"
				:key="product.id"
			>
				<div class="grid-product">
					<span class="product-name">{{product.description}}</span>
					<span class="product-quantity">Cantidad: {{product.quantity}} / {{product.unitName}}</span>
					<h3
						:style="`color: ${globalColors.secondary};`"
						class="product-total"
					>{{getCurrencySymbol}}. {{product.total | currencyFormat}}</h3>
				</div>
			</li>
		</ol>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	name: 'products-buyed',
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'getOrderDetails',
		]),
	},
};
</script>
<style lang="scss" scoped>
	.buyed-main-container {
		background-color: white;
		border-radius: 8px;
		border: solid 1px color(border);
		font-family: font(bold);
		margin-bottom: 40px;
		padding: 10px 20px 10px 20px;

		@media (min-width: 768px) {
			padding: 20px 32px 27px 20px;
		}
	}

	.grid-product {
		align-items: center;
		display: grid;
    	grid-column-gap: 14px;
		grid-template-columns: 0.8fr 0.5fr 0.5fr;
		transform: translateX(15px);

		@media (max-width: 600px) {
			grid-column-gap: 0px;
			grid-row-gap: 10px;
			transform: translateX(0px);
		}
	}

	.product-total {
		font-size: size(large);
		text-align: center;

		@media (max-width: 600px) {
			grid-column: 2/4;
			grid-row: 2;
			text-align: right;
		}
	}

	.product-name {
		color: color(dark);

		@media (max-width: 600px) {
			grid-column: 1/4;
			grid-row: 1;
		}
	}

	.product-quantity {
		color: color(dark);
		font-family: font(medium);
		white-space: nowrap;

		@media (max-width: 600px) {
			grid-column: 1/2;
			grid-row: 2;
		}
	}

	.list {
		border-top: 1px solid color(border);
		padding: 14px 0;
	}

	.list:first-child {
		border-top: none;
	}
</style>