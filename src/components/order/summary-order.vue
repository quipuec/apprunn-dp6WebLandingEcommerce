<template>
	<div class="summary-container">
		<section class="summary-order">
			<div class="summary-header text-xs-center">
				<p class="summary-title">Resumen de Compra</p>
			</div>
			<div class="summary-amounts">
				<p class="summary-amount-container separate">
					<span>Subtotal</span><span class="summary-amount">{{getTotalToBuy}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Descuento</span><span class="summary-amount">{{discount}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Envío</span><span class="summary-amount">{{shippingCost}}</span>
				</p>
				<p class="summary-amount-container separate shipping">
					<button
						type="button"
						class="shipping-cost"
					>
						<span>Calcular costo de envío</span>
						<i class="material-icons">expand_less</i>
					</button>
				</p>
				<p class="summary-amount-container total">
					<span>Total</span><span class="summary-total">{{total}}</span>
				</p>
			</div>
		</section>
		<section class="btns-summary-order">
			<app-button
				v-if="!getOrderId"
				class="btn-order"
				action="Pasar a caja"
				:background="globalColors.primary"
				@click="makeOrder"
			/>
			<app-button
				v-else action='Pagar'
				class="btn-order"
				:background="globalColors.primary"
				@click="goTo('buy-payment')"
			/>
		</section>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';
import { mapGetters } from 'vuex';

function total() {
	return (this.getTotalToBuy - this.discount) + this.shippingCost;
}

function makeOrder() {
	const body = this.buildBody();
	this.$store.dispatch('CREATE_ORDER', { context: this, body });
}

function buildBody() {
	return {
		flagKardex: 1,
		flagPickUp: 2,
		paymentStateId: 1,
		comments: 'Comment created by a test',
		additionalInfo: null,
		warehouseId: 493,
		warehouseName: 'Lima',
		warehouseAddress: '',
		deliveryAddress: null,
		responsiblePickUp: {
			name: 'Celso Espinoza',
			dni: '44556677',
			phone: '998877665',
			email: 'espinoza.arce13@gmail.com',
		},
		details: [
			{
				productId: 1,
				discount: 0,
				quantity: 10,
				salePrice: 20,
				warehouseId: 493,
				warehouseName: 'nombre del almacen',
			},
			{
				productId: 2,
				discount: 0,
				quantity: 15,
				salePrice: 5,
				warehouseId: 493,
				warehouseName: 'nombre del almacen',
			},
		],
		customerAddress: {
			type: 1,
			name: 'Mansión en Palo Alto',
			addressLine1: 'Dirección de Palo Alto',
			zipcode: '94301',
			documentNumber: '38726496',
		},
		commerceCode: process.env.COMMERCE_CODE,
	};
}

function data() {
	return {
		discount: 0,
		shippingCost: 0,
	};
}

export default {
	name: 'summary-order',
	components: {
		appButton,
	},
	computed: {
		...mapGetters([
			'getOrderId',
			'getProductsToBuy',
			'getTotalToBuy',
		]),
		total,
	},
	data,
	methods: {
		buildBody,
		makeOrder,
	},
};
</script>
<style lang="scss" scoped>
	.summary-container {
		position: relative;
		top: 0px;
	}

	.summary-order {
		background-color: white;
		border-radius: 20px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
		margin-bottom: 10px;
		padding: 8px;
	}

	.summary-header {
		border-bottom: 1px solid color(border);
		color: color(dark);
		font-family: font(demi);
		font-size: size(medium);
		font-weight: bold;
		padding: 25px 70px 17px;
	}

	.summary-title {
		margin: 0 auto;
		white-space: nowrap;	
	}

	.summary-amounts {
		color: color(dark);
		font-family: font(demi);
		font-size: size(medium);
		padding: 50px 32px 16px;
	}

	.summary-amount-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.total {
		margin-bottom: 0;
	}

	.separate {
		border-bottom: 1px solid color(border);
	}

	.shipping {
		color: color(primary) !important;
		padding-bottom: 12px;
	}

	.shipping-cost {
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.summary-amount {
		color: color(base);
		font-family: font(medium);
		font-size: size(medium);
	}

	.summay-total {
		font-family: font(bold);
	}
</style>

