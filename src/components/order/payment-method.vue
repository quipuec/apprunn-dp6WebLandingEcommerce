<template>
	<div>
		<deposit-methods/>
	</div>
</template>
<script>
import depositMethods from '@/components/order/deposit-payment';

export default {
	name: 'payment-method',
	components: {
		depositMethods,
	},
};
</script>