<template>
	<div class="summary-order-main-container">
		<thanks-message/>
		<section class="order-products-container">
			<products-buyed class="products"/>
			<summary-order class="amounts"/>
		</section>
		<section>
			<summary-in-payment/>
		</section>
	</div>
</template>
<script>

const productsBuyed = () => import('@/components/order/products-buyed');
const summaryOrder = () => import('@/components/order/summary-order');
const thanksMessage = () => import('@/components/order/thanks-message');
const summaryInPayment = () => import('@/components/order/summary-in-payment');

export default {
	name: 'page-summary-order',
	components: {
		productsBuyed,
		summaryInPayment,
		summaryOrder,
		thanksMessage,
	},
};
</script>
<style lang="scss" scoped>
	.order-products-container {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 65px 80px;
	}

	.products {
		flex: 1 1 50%;
		height: max-content;
		margin: 0 10px;
	}

	.amounts {
		flex: 1 1 5%;
		height: 100%;
		margin: 0 10px;
	}
</style>
