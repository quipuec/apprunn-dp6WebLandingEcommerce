<template>
	<div>
		<app-button :background="globalColors.primary" action='Tarjeta de crédito'/>
		<component :is="paymenMethodSelected"></component>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

const visaPayment = () => import('@/components/order/visa-payment');

function data() {
	return {
		paymenMethodSelected: 'visaPayment',
	};
}

export default {
	name: 'payment',
	components: {
		appButton,
		visaPayment,
	},
	data,
};
</script>

