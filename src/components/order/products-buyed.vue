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
		margin-bottom: 70px;
		padding: 27px 92px 27px 55px;

		@media (max-width: 600px) {
			padding: 27px 20px 26px 21px;
		}
	}

	.grid-product {
		align-items: center;
		display: grid;
    	grid-column-gap: 40px;
		grid-template-columns: 1fr 0.5fr 0.5fr;
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