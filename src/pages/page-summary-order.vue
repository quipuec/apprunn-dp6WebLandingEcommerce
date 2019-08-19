<template>
	<div class="summary-order-main-container">
		<thanks-message/>
	</div>
</template>
<script>

const thanksMessage = () => import('@/components/order/thanks-message');

export default {
	name: 'page-summary-order',
	components: {
		thanksMessage,
	},
};
</script>
<style lang="scss" scoped>

</style>
