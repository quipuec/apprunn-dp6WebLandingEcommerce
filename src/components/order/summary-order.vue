<template>
	<div class="summary-container">
		<section class="summary-order">
			<div class="summary-header text-xs-center">
				<p class="summary-title">Resumen de Compra</p>
			</div>
			<div class="summary-amounts">
				<p class="summary-amount-container separate">
					<span>Subtotal</span><span class="summary-amount">{{getCurrencySymbol}}. {{getTotalToBuy | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Descuento</span><span class="summary-amount">{{getCurrencySymbol}}. {{discount | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Envío</span><span class="summary-amount">{{getCurrencySymbol}}. {{getShippingCost | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container total">
					<span>Total</span><span class="summary-total">{{getCurrencySymbol}}. {{total | currencyFormat}}</span>
				</p>
			</div>
		</section>
		<section class="btns-summary-order">
			<app-button
				v-if="stepOne"
				action='Hacer pedido'
				class="btn-order"
				:background="globalColors.primary"
				@click="goToMakeOrder"
			/>
			<app-button
				v-else-if="stepTwo"
				action="Pasar a caja"
				class="btn-order"
				:background="globalColors.primary"
				:disabled="invalidOrder"
				@click="makeOrder(false)"
			/>
			<app-button
				v-else-if="stepThree"
				action="Pagar"
				class="btn-order"
				:background="globalColors.primary"
				@click="makeOrder(true)"
			/>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import { getDeeper } from '@/shared/lib';

function total() {
	return (this.getTotalToBuy - this.discount) + this.getShippingCost;
}

function makeOrder(flagFinish) {
	this.$store.dispatch('MAKE_ORDER', { flagFinish, context: this });
}

function stepThree() {
	return getDeeper('meta.step')(this.$route) === 3;
}

function stepOne() {
	return getDeeper('meta.step')(this.$route) === 1;
}

function stepTwo() {
	return getDeeper('meta.step')(this.$route) === 2;
}

function goToMakeOrder() {
	if (this.token) {
		this.goTo('buy-delivery');
	} else {
		this.showGenericError('Debe iniciar sesión para hacer el pedido');
	}
}

function data() {
	return {
		discount: 0,
	};
}

export default {
	name: 'summary-order',
	components: {
		appButton,
	},
	computed: {
		...mapGetters([
			'getBillingData',
			'getCurrencySymbol',
			'getCustomerAddress',
			'getCustomerAddressId',
			'getDeliveryAddress',
			'getFlagBill',
			'getFlagPickUp',
			'getFlagStatusOrder',
			'getOrderDetails',
			'getOrderId',
			'getOrderInfo',
			'getOrderStateId',
			'getOrderStatus',
			'getProductsToBuy',
			'getResponsible',
			'getShippingCost',
			'getTotalToBuy',
			'getWayPayment',
			'invalidOrder',
			'token',
		]),
		stepOne,
		stepThree,
		stepTwo,
		total,
	},
	data,
	methods: {
		goToMakeOrder,
		makeOrder,
	},
};
</script>
<style lang="scss" scoped>
	.summary-container {
		position: sticky;
		top: 115px;
		margin: 0 auto;
		max-width: 400px;
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

