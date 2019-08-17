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
				<p class="summary-amount-container separate shipping" v-if="stepThree">
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
				v-if="stepOne"
				action='Pagar'
				class="btn-order"
				:background="globalColors.primary"
				@click="goTo('buy-delivery')"
			/>
			<app-button
				v-else-if="stepTwo"
				action="Pasar a caja"
				class="btn-order"
				:background="globalColors.primary"
				:disabled="invalidOrder"
				@click="makeOrder"
			/>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import lib from '@/shared/lib';

function total() {
	return (this.getTotalToBuy - this.discount) + this.shippingCost;
}

function makeOrder() {
	const body = this.buildBody();
	this.$store.dispatch('CREATE_ORDER', { context: this, body });
	this.goTo('buy-delivery');
}

function buildBody() {
	return {
		flagPickUp: this.getFlagPickUp,
		paymentStateId: 1,
		warehouseId: process.env.WAREHOUSE_ID,
		warehouseName: process.env.WAREHOUSE_NAME,
		warehouseAddress: process.env.WAREHOUSE_ADDRESS,
		deliveryAddress: this.getDeliveryAddress,
		responsiblePickUp: this.getResponsible,
		details: this.getOrderDetails,
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

function stepThree() {
	return lib.getDeeper('meta.step')(this.$route) === 3;
}

function stepOne() {
	return lib.getDeeper('meta.step')(this.$route) === 1;
}

function stepTwo() {
	return lib.getDeeper('meta.step')(this.$route) === 2;
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
			'getDeliveryAddress',
			'getFlagPickUp',
			'getOrderId',
			'getOrderDetails',
			'getProductsToBuy',
			'getResponsible',
			'getTotalToBuy',
			'invalidOrder',
		]),
		stepOne,
		stepThree,
		stepTwo,
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
		position: sticky;
		top: 65px;
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

