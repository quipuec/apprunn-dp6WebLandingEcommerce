<template>
	<div>
		<app-button v-if="!getOrderId" action='Tarjeta de crédito'/>
		<component :is="paymenMethodSelected"></component>
	</div>
</template>
<script>

function data() {
	return {
		paymenMethodSelected: 'visaPayment',
	};
}

export default {
	name: 'payment',
	components: {
		visaPayment: () => import('@/components/order/visa-payment'),
	},
	data,
};
</script>

