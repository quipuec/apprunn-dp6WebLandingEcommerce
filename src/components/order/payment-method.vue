<template>
	<div>
		<deposit-methods/>
	</div>
</template>
<script>

const depositMethods = () => import('@/components/order/deposit-payment');

export default {
	name: 'payment-method',
	components: {
		depositMethods,
	},
};
</script>