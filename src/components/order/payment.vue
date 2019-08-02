<template>
	<div>
		<app-button :background="globalColors.primary" action='Tarjeta de crédito'/>
		<component :is="paymenMethodSelected"></component>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

function data() {
	return {
		paymenMethodSelected: 'visaPayment',
	};
}

export default {
	name: 'payment',
	components: {
		appButton,
		visaPayment: () => import('@/components/order/visa-payment'),
	},
	data,
};
</script>

