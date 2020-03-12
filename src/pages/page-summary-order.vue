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
		<section class="sumary-order-buttons-container">
			<button
				type="button"
				class="summary-order-button"
				:style="`background-color:${globalColors.primary}`"
				@click="seeOrder"
			>Ver Pedido</button>
			<button
				type="button"
				class="summary-order-button"
				:style="`background-color:${globalColors.primary}`"
				@click="cancalOrder"
			>Cancelar pedido</button>
		</section>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import productsBuyed from '@/components/order/products-buyed';
import summaryOrder from '@/components/order/summary-order';
import thanksMessage from '@/components/order/thanks-message';
import summaryInPayment from '@/components/order/summary-in-payment';
import paymentMethods from '@/components/order/payment-method';

function beforeDestroy() {
	this.SET_DEFAULT_VALUES();
}

function mounted() {
	this.$store.commit('EMPTY_CAR');
}

function seeOrder() {
	const { id } = this.getOrderInfo;
	this.$router.push({ name: 'order-detail', params: { id } });
}

async function cancalOrder() {
	const { id } = this.getOrderInfo;
	await this.CANCEL_ORDER({ context: this, id });
	this.goTo('page-home');
}

export default {
	name: 'page-summary-order',
	beforeDestroy,
	components: {
		paymentMethods,
		productsBuyed,
		summaryInPayment,
		summaryOrder,
		thanksMessage,
	},
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
	},
	methods: {
		...mapActions([
			'SET_DEFAULT_VALUES',
			'CANCEL_ORDER',
		]),
		cancalOrder,
		seeOrder,
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

	.sumary-order-buttons-container {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 30px 0 80px;
	}

	.summary-order-button {
		border-radius: 10px;
		box-sizing: border-box;
		color: white;
		font-family: font(bold);
		padding: 15px 50px;
		margin: 10px;
		width: 240px;
	}

	.summary-order-button:hover {
		filter: brightness(1.3);
	}
</style>
