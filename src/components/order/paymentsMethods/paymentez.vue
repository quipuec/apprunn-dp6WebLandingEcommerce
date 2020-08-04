<template>
	<div>
		<button class="js-paymentez-checkout" @click="openPaymentezModal">
			<img src="https://developers.paymentez.com/wp-content/uploads/2017/10/logo.png" alt="logo de paymentez">
		</button>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import orderStatesEnum from '@/shared/enums/orderStateId';

function openPaymentezModal() {
	this.checkout()
		.then((res) => {
			console.log(res);
			/* eslint-disable new-cap */
			const paymentezCheckout = new window.PaymentezCheckout.modal({
				client_app_code: this.clientAppCode,
				client_app_key: this.clientAppKey,
				locale: 'es',
				env_mode: process.env.NODE_ENV === 'production' ? 'prod' : 'stg',
				onOpen: () => console.log('open Modal Paymentez'),
				onClose: () => console.log('close Modal Paymentez'),
				onResponse: this.onCreditCardResponse,
			});
			paymentezCheckout.open({
				user_id: String(this.getOrderInfo.customer.id),
				user_email: this.getOrderInfo.customer.email,
				user_phone: this.getOrderInfo.customer.phone || '0000000000',
				order_description: `${this.getCommerceData.name}-PE:${this.getOrderInfo.number}`,
				order_amount: this.getOrderInfo.total,
				order_vat: 0, // valor del impuesto
				order_reference: String(this.getOrderInfo.number),
				// taxable_amount: subtotal (total sin impuesto)
				// tax_percentage: valor porcentual del impuesto
			});
		})
		.catch((error) => {
			this.showNotification(
				'Ocurrió un error en el checkout de Paymentez. Recargue e intente de nuevo',
				'error',
			);
			console.log(error);
		});
}

async function checkout() {
	const url = 'payment-gateway/paymentez/checkout';
	const body = {
		orderId: this.getOrderInfo.id,
		commerceCode: process.env.COMMERCE_CODE,
	};
	return this.$httpSales.post(url, body);
}

function clientAppCode() {
	return process.env.PAYMENTEZ_CLIENT;
}

function clientAppKey() {
	return process.env.PAYMENTEZ_KEY;
}

async function onCreditCardResponse(response) {
	const { transaction: { status } } = response;
	this.$store.dispatch('updateGatewayErrorCode', status === 'success' ? null : status);
	this.$store.dispatch('updateGatewayAuthorizationResponse', response);
	if (status === 'success') {
		await this.getOrderStateIdForCreditCard(orderStatesEnum.confirmed.code);
		this.showNotification('Pago realizado con éxito', 'success');
	} else if (status === 'failure') {
		this.showNotification('El pago no fue realizado con éxito', 'error');
		await this.getOrderStateIdForCreditCard(orderStatesEnum.canceled.code);
	} else if (status === 'pending') {
		this.showNotification('El pago está en revisión', 'warning');
		await this.getOrderStateIdForCreditCard(orderStatesEnum.requested.code);
	}
	this.$store.dispatch('MAKE_ORDER', { flagFinish: true, context: this });
}

async function getOrderStateIdForCreditCard(state) {
	await this.$store.dispatch('LOAD_ORDERS_STATUS', this);
	const creditCardState = this.$store.getters.getStates.find(s => s.code === state);
	this.$store.commit('SET_ORDER_STATUS', creditCardState.id);
}

export default {
	name: 'paymentez',
	computed: {
		...mapGetters([
			'getCommerceData',
			'getOrderInfo',
		]),
		clientAppKey,
		clientAppCode,
	},
	methods: {
		checkout,
		getOrderStateIdForCreditCard,
		onCreditCardResponse,
		openPaymentezModal,
	},
};
</script>
<style lang="scss" scoped>
	.js-paymentez-checkout {
		align-items: center;
		background-color: #333333;
		display: flex;
		height: 50px;
		overflow: hidden;
		padding: 0 2rem;
	}
</style>