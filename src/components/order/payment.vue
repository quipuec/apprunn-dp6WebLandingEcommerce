<template>
	<div>
		<products-buyed/>
		<app-button
			action='Tarjeta de crédito o débito'
			:active="paymenMethodSelected === paymentMethodName"
			:background="globalColors.secondary"
			:border="globalColors.secondary"
			max-width="264px"
			@click="onSelect(paymentMethodName)"
		/>
		<component
			:is="paymenMethodSelected"
		></component>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

const productsBuyed = () => import('@/components/order/products-buyed');
const visaPayment = () => import('@/components/order/visa-payment');

function onSelect(paymentName) {
	this.paymenMethodSelected = paymentName;
}

function data() {
	return {
		paymentMethodName: 'visaPayment',
		paymenMethodSelected: '',
	};
}

export default {
	name: 'payment',
	components: {
		appButton,
		productsBuyed,
		visaPayment,
	},
	data,
	methods: {
		onSelect,
	},
};
</script>

