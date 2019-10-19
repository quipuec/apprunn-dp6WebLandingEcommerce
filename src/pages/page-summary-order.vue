<template>
	<div class="summary-order-main-container">
		<thanks-message/>
		<section class="order-products-container">
			<products-buyed class="products"/>
			<summary-order class="amounts"/>
		</section>
		<section class="summary">
			<summary-in-payment/>
		</section>
		<section class="payment">
			<payment-methods/>
		</section>
	</div>
</template>
<script>

const productsBuyed = () => import('@/components/order/products-buyed');
const summaryOrder = () => import('@/components/order/summary-order');
const thanksMessage = () => import('@/components/order/thanks-message');
const summaryInPayment = () => import('@/components/order/summary-in-payment');
const paymentMethods = () => import('@/components/order/payment-method');

function mounted() {
	this.$store.commit('EMPTY_CAR');
}

export default {
	name: 'page-summary-order',
	components: {
		paymentMethods,
		productsBuyed,
		summaryInPayment,
		summaryOrder,
		thanksMessage,
	},
	mounted,
};
</script>
<style lang="scss" scoped>
	.order-products-container {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 65px 80px;

		@media (max-width: 600px) {
			margin: auto;
		}
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

	.summary {
		border-bottom: 1px solid color(border);
		border-top: 1px solid color(border);
		padding: 35px 0;
	}

	.payment {
		margin: 0 130px 50px;

		@media (max-width: 600px) {
			margin: auto;
		}
	}
</style>
