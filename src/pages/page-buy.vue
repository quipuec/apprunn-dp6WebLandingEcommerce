<template>
	<div class="buy-container">
		<div v-if="stepThree" class="summary">
			<summary-in-payment
				:delivery="{}"
				:billing="{}"
			/>
		</div>
		<div class="buy-layout">
			<section class="big">
				<div v-if="stepOneAndTwo" class="mb-5">
					<div class="section-title" v-if="stepTwo">
						<img :src="logo.section" alt="logo del método de pago">
						<h2 class="payment-section-title">PRODUCTOS </h2>
					</div>
					<product-in-car v-for="product in getProductToBuy" :key="product.id" :product="product"/>
					<div class="footter-products-buy">
						<app-button
							max-width="225px"
							action="Continuar comprando"
							class="continue-buying"
							:background="globalColors.secondary"
							@click="goTo('page-home')"
						/>
						<div class="total-product">
							<span>Total de productos: </span>
							<div class="amount-total-products">
								<output>{{getTotalQuantityProducts}}</output>
							</div>
						</div>
					</div>
				</div>
				<router-view></router-view>
			</section>
			<section class="small">
				<summary-order/>
			</section>
		</div>
	</div>
</template>
<script>
import lib from '@/shared/lib';
import { mapGetters } from 'vuex';

const appButton = () => import('@/components/shared/buttons/app-button');
const productInCar = () => import('@/components/products/product-in-car');
const summaryOrder = () => import('@/components/order/summary-order');
const summaryInPayment = () => import('@/components/order/summary-in-payment');

function stepOneAndTwo() {
	const step = lib.getDeeper('meta.step')(this.$route);
	return step !== 3;
}

function stepThree() {
	return lib.getDeeper('meta.step')(this.$route) === 3;
}

function stepTwo() {
	return lib.getDeeper('meta.step')(this.$route) === 2;
}

function getProductToBuyHandler(newProducts) {
	if (newProducts && newProducts.length === 0) {
		this.goTo('page-home');
	}
}

function data() {
	return {
		logo: {
			section: '/static/icons/shopping-basket.svg',
		},
	};
}

export default {
	name: 'page-buy',
	components: {
		appButton,
		productInCar,
		summaryOrder,
		summaryInPayment,
	},
	computed: {
		...mapGetters([
			'getProductToBuy',
			'getTotalQuantityProducts',
		]),
		stepOneAndTwo,
		stepThree,
		stepTwo,
	},
	data,
	methods: {
		getProductToBuyHandler,
	},
	watch: {
		getProductToBuy: {
			deep: true,
			handler: getProductToBuyHandler,
		},
	},
};
</script>
<style lang="scss" scoped>
	.buy-container {
		display: grid;
		grid-template-rows: 1fr;
		margin: 0 auto;
		max-width: 1186px;
		padding: 40px 0;

		@media (max-width: 600px) {
			padding: 40px 10px 0;
		}
	}
	.buy-layout {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
		height: 100%
	}

	.big {
		flex: 1 1 50%;
		height: max-content;
		margin: 0 10px;
	}

	.small {
		flex: 1 1 5%;
		height: 100%;
		margin: 0 10px;
	}

	.footter-products-buy {
		align-items: center;
		display: flex;
		justify-content: space-between;

		@media (max-width: 600px) {
			align-items: flex-end;
			font-size: size(xsmall);
			justify-content: flex-end;
			margin-bottom: 55px;
		}
	}

	.total-product {
		align-items: center;
		color: color(base);
		display: flex;
		flex-wrap: wrap;
		font-family: font(demi);

		@media (max-width: 600px) {
			justify-content: flex-end;
		}
	}

	.amount-total-products {
		align-items: center;
		background-color: color(base);
		border-radius: 5px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.18);
		color: white;
		display: flex;
		height: 38px;
		justify-content: center;
		margin-left: 5px;
		width: 102px;

		output {
			font-family: font(demi);
			font-size: size(large);
			font-weight: bold;
		}
	}

	.continue-buying {
		width: 225px;

		@media (max-width: 600px) {
			width: 190px !important;
		}
	}

	.summary {
		border-bottom: 3px solid color(primary);
		margin-bottom: 30px;
		padding: 30px 0;
	}

	.payment-section-title {
		font-size: size(large);
		font-family: font(bold);
		margin-left: 12px;
		text-transform: uppercase;
	}

	.section-title {
		align-items: baseline;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 40px;
	}
</style>
