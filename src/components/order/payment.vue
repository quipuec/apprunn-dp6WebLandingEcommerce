<template>
	<div>
		<products-buyed/>
		<section class="section-container">
			<div class="section-title">
				<img :src="logo.section" alt="logo del método de pago">
				<h2 class="payment-section-title">método de pago</h2>
			</div>
			<div class="methods-container">
				<app-button
					v-for="method in methods"
					:key="method.id"
					max-width="360px"
					class="method-item"
					:action="method.title"
					:active="paymenMethodSelected === method.paymentMethodName"
					:background="globalColors.secondary"
					:border="globalColors.secondary"
					@click="onSelect(method.paymentMethodName)"
				/>
			</div>
			<component class="component-container"
				:is="paymenMethodSelected"
			></component>
		</section>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

const depositPayment = () => import('@/components/order/deposit-payment');
const productsBuyed = () => import('@/components/order/products-buyed');
const recievedPayment = () => import('@/components/order/recieved-payment');
const visaPayment = () => import('@/components/order/visa-payment');

function onSelect(paymentMethodName) {
	this.paymenMethodSelected = paymentMethodName;
}

function data() {
	return {
		logo: {
			section: '/static/icons/payment.svg',
		},
		methods: [
			{ id: 1, paymentMethodName: 'visaPayment', title: 'Tarjeta de crédito o débito' },
			{ id: 2, paymentMethodName: 'depositPayment', title: 'Banca por internet o depósito' },
			{ id: 3, paymentMethodName: 'recievedPayment', title: 'Paga tu compra al recibir' },
		],
		paymenMethodSelected: 'depositPayment',
	};
}

export default {
	name: 'payment',
	components: {
		depositPayment,
		appButton,
		productsBuyed,
		recievedPayment,
		visaPayment,
	},
	data,
	methods: {
		onSelect,
	},
};
</script>
<style lang="scss" scoped>
	.methods-container {
		align-items: center;
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		
		@media (max-width: 600px) {
			margin: 0 20px;
		}
	}

	.component-container {

		@media (max-width: 600px) {
			margin: 0 20px;
		}
	}

	.payment-section-title {
		font-size: size(large);
		font-family: font(bold);
		margin-left: 12px;
		text-transform: uppercase;
	}

	.section-title {
		align-items: baseline;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 40px;
	}

	.section-container {
		margin-bottom: 30px;
	}
</style>